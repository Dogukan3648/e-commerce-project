package com.workintech.bandage.service;

import com.workintech.bandage.entity.Order;
import com.workintech.bandage.exception.BandageException;
import com.workintech.bandage.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.Set;

@Service
public class OrderServiceImpl implements OrderService{
    private OrderRepository orderRepository;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository){
        this.orderRepository = orderRepository;
    }

    @Override
    public List<Order> getOrdersByUserId(long userId) {
        return orderRepository.findByUserId(userId);
    }
    @Override
    public Order getOrderById(long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new BandageException(
                        "Order not found: " + id,
                        HttpStatus.NOT_FOUND
                ));
    }

    @Override
    public Order save(Order order) {
        if (order == null || order.getId() != null) {
            throw new BandageException(
                    "Invalid order data",
                    HttpStatus.BAD_REQUEST
            );
        }

        return orderRepository.save(order);
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
}
