package com.workintech.bandage.controller;

import com.workintech.bandage.dto.OrderItemDto;
import com.workintech.bandage.entity.Order;
import com.workintech.bandage.entity.OrderItem;
import com.workintech.bandage.entity.Product;
import com.workintech.bandage.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order-items")
public class OrderItemController {
    private OrderItemService orderItemService;

    @Autowired
    public OrderItemController(OrderItemService orderItemService) {
        this.orderItemService = orderItemService;
    }

    @GetMapping("/order/{orderId}")
    public List<OrderItemDto> getOrderItemsByOrderId(@PathVariable long orderId) {
        return orderItemService.getOrderItemsByOrderId(orderId).stream().map(this::toDto).toList();
    }

    @GetMapping("/{id}")
    public OrderItemDto getOrderItemById(@PathVariable long id) {
        OrderItem orderItem = orderItemService.getOrderItemById(id);

        return toDto(orderItem);
    }

    @PostMapping
    public OrderItemDto save(@RequestBody OrderItemDto request) {
        OrderItem orderItem = toEntity(request);

        OrderItem savedOrderItem = orderItemService.save(orderItem);

        return toDto(savedOrderItem);
    }
    private OrderItemDto toDto(OrderItem orderItem) {
        if (orderItem == null) {
            return null;
        }

        return new OrderItemDto(
                orderItem.getId(),
                orderItem.getOrder().getId(),
                orderItem.getProduct().getId(),
                orderItem.getQuantity(),
                orderItem.getUnitPrice(),
                orderItem.getProductName(),
                orderItem.getDetail()
        );
    }
    private OrderItem toEntity(OrderItemDto request) {
        OrderItem orderItem = new OrderItem();

        orderItem.setQuantity(request.quantity());
        orderItem.setUnitPrice(request.unitPrice());
        orderItem.setProductName(request.productName());
        orderItem.setDetail(request.detail());

        if (request.orderId() != null) {
            Order order = new Order();
            order.setId(request.orderId());
            orderItem.setOrder(order);
        }

        if (request.productId() != null) {
            Product product = new Product();
            product.setId(request.productId());
            orderItem.setProduct(product);
        }

        return orderItem;
    }
}
