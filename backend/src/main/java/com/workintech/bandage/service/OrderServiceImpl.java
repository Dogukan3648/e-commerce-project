
package com.workintech.bandage.service;

import com.workintech.bandage.dto.OrderCreateRequestDto;
import com.workintech.bandage.entity.*;
import com.workintech.bandage.exception.BandageException;
import com.workintech.bandage.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;

@Service
public class OrderServiceImpl implements OrderService {
    private OrderRepository orderRepository;
    private ProductRepository productRepository;
    private OrderItemRepository orderItemRepository;
    private UserRepository userRepository;
    private AddressRepository addressRepository;
    private CreditCardRepository creditCardRepository;

    @Autowired
    public OrderServiceImpl(
            OrderRepository orderRepository,
            ProductRepository productRepository,
            OrderItemRepository orderItemRepository,
            UserRepository userRepository,
            AddressRepository addressRepository,
            CreditCardRepository creditCardRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.orderItemRepository = orderItemRepository;
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
        this.creditCardRepository = creditCardRepository;
    }

    @Override
    public List<Order> getOrdersByUserId(long userId) {
        checkOwnership(userId);
        return orderRepository.findByUserId(userId);
    }

    @Override
    public Order getOrderById(long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new BandageException(
                        "Order not found: " + id,
                        HttpStatus.NOT_FOUND
                ));

        checkOwnership(order.getUser().getId());

        return order;
    }

    @Override
    @Transactional
    public Order save(OrderCreateRequestDto request) {
        if (request == null || request.userId() == null
                || request.items() == null || request.items().isEmpty()) {
            throw new BandageException(
                    "Invalid order data",
                    HttpStatus.BAD_REQUEST
            );
        }

        checkOwnership(request.userId());

        User user = userRepository.findById(request.userId())
                .orElseThrow(() -> new BandageException(
                        "User not found",
                        HttpStatus.NOT_FOUND
                ));

        Order order = new Order();
        order.setUser(user);

        Address address = addressRepository.findById(request.addressId()).orElseThrow(() -> new BandageException(
                "Address not found",HttpStatus.NOT_FOUND
        ));
        if (!address.getUser().getId().equals(request.userId())){
            throw new BandageException("You cannot use this address",HttpStatus.FORBIDDEN);
        }
        order.setAddress(address);

        Map<String, Object> shippingSnapshot = new HashMap<>();

        shippingSnapshot.put("title", address.getTitle());
        shippingSnapshot.put("name", address.getName());
        shippingSnapshot.put("surname", address.getSurname());
        shippingSnapshot.put("phone", address.getPhone());
        shippingSnapshot.put("city", address.getCity());
        shippingSnapshot.put("district", address.getDistrict());
        shippingSnapshot.put("neighborhood", address.getNeighborhood());
        shippingSnapshot.put("address", address.getAddress());

        order.setShippingAddressSnapshot(shippingSnapshot);
        Map<String, Object> billingSnapshot = new HashMap<>(shippingSnapshot);

        if (request.billingAddressId() != null) {
            Address billingAddress = addressRepository.findById(request.billingAddressId())
                    .orElseThrow(() -> new BandageException(
                            "Billing address not found",
                            HttpStatus.NOT_FOUND
                    ));

            if (!billingAddress.getUser().getId().equals(request.userId())) {
                throw new BandageException(
                        "You cannot use this billing address",
                        HttpStatus.FORBIDDEN
                );
            }

            billingSnapshot.put("title", billingAddress.getTitle());
            billingSnapshot.put("name", billingAddress.getName());
            billingSnapshot.put("surname", billingAddress.getSurname());
            billingSnapshot.put("phone", billingAddress.getPhone());
            billingSnapshot.put("city", billingAddress.getCity());
            billingSnapshot.put("district", billingAddress.getDistrict());
            billingSnapshot.put("neighborhood", billingAddress.getNeighborhood());
            billingSnapshot.put("address", billingAddress.getAddress());
        }

        order.setBillingAddressSnapshot(billingSnapshot);
        CreditCard creditCard = creditCardRepository.findById(request.creditCardId())
                .orElseThrow(() -> new BandageException(
                        "Credit card not found",
                        HttpStatus.NOT_FOUND
                ));

        if (!creditCard.getUser().getId().equals(request.userId())) {
            throw new BandageException(
                    "You cannot use this credit card",
                    HttpStatus.FORBIDDEN
            );
        }

        order.setCardLastFour(creditCard.getLastFour());
        order.setStatus("PENDING");

        BigDecimal subtotal = calculateSubtotal(request);

        order.setSubtotal(subtotal);
        order.setDiscount(BigDecimal.ZERO);
        order.setShipping(BigDecimal.ZERO);
        order.setTotal(subtotal);

        Order savedOrder = orderRepository.save(order);

        for (OrderCreateRequestDto.Item item : request.items()) {
            Product product = productRepository.findById(item.productId())
                    .orElseThrow(() -> new BandageException(
                            "Product not found: " + item.productId(),
                            HttpStatus.NOT_FOUND
                    ));

            if (item.quantity() < 1
                    || product.getStock() < item.quantity()) {
                throw new BandageException(
                        "Insufficient stock: " + product.getName(),
                        HttpStatus.CONFLICT
                );
            }

            product.setStock(product.getStock() - item.quantity());

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(savedOrder);
            orderItem.setProduct(product);
            orderItem.setQuantity(item.quantity());
            orderItem.setUnitPrice(product.getPrice());
            orderItem.setProductName(product.getName());
            orderItem.setDetail(product.getDescription());

            orderItemRepository.save(orderItem);
        }

        return savedOrder;
    }

    @Override
    public Order updateOrderStatus(long id, String status) {
        Order existingOrder = getOrderById(id);

        if (status == null || status.isBlank()) {
            throw new IllegalArgumentException("Order status cannot be empty");
        }

        String normalizedStatus = status.trim().toUpperCase(Locale.ROOT);

        Set<String> validStatuses = Set.of(
                "PENDING", "PROCESSING", "SHIPPED",
                "DELIVERED", "CANCELLED"
        );

        if (!validStatuses.contains(normalizedStatus)) {
            throw new IllegalArgumentException("Invalid order status");
        }

        existingOrder.setStatus(normalizedStatus);

        return orderRepository.save(existingOrder);
    }

    @Override
    public List<OrderItem> getOrderItemsByOrderId(long orderId) {
        getOrderById(orderId);
        return orderItemRepository.findByOrderId(orderId);
    }

    private void checkOwnership(Long userId) {
        var authentication = SecurityContextHolder.getContext()
                .getAuthentication();

        if (!(authentication instanceof JwtAuthenticationToken jwtAuth)) {
            throw new BandageException(
                    "Authentication required",
                    HttpStatus.UNAUTHORIZED
            );
        }

        Number authenticatedUserId = jwtAuth.getToken().getClaim("userId");

        if (authenticatedUserId == null || userId == null
                || authenticatedUserId.longValue() != userId.longValue()) {
            throw new BandageException(
                    "You cannot access this order",
                    HttpStatus.FORBIDDEN
            );
        }
    }

    private BigDecimal calculateSubtotal(OrderCreateRequestDto request) {
        BigDecimal subtotal = BigDecimal.ZERO;

        for (OrderCreateRequestDto.Item item : request.items()) {
            Product product = productRepository.findByIdForUpdate(item.productId())
                    .orElseThrow(() -> new BandageException(
                            "Product not found: " + item.productId(),
                            HttpStatus.NOT_FOUND
                    ));

            if (item.quantity() < 1 || product.getPrice() == null
                    || product.getPrice().signum() < 0) {
                throw new BandageException(
                        "Invalid product price or quantity",
                        HttpStatus.BAD_REQUEST
                );
            }

            BigDecimal itemTotal = product.getPrice()
                    .multiply(BigDecimal.valueOf(item.quantity()));

            subtotal = subtotal.add(itemTotal);
        }

        return subtotal;
    }
}
