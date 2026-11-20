package com.workintech.bandage.controller;


import com.workintech.bandage.dto.OrderCreateRequestDto;
import com.workintech.bandage.dto.OrderDetailDto;
import com.workintech.bandage.dto.OrderDto;
import com.workintech.bandage.dto.OrderItemDto;
import com.workintech.bandage.entity.Order;
import com.workintech.bandage.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {
    private OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/user/{userId}")
    public List<OrderDto> getOrdersByUserId(@PathVariable long userId) {
        return orderService.getOrdersByUserId(userId).stream().map(this::toDto).toList();
    }

    @GetMapping("/{id}")
    public OrderDetailDto getOrderById(@PathVariable long id) {
        Order order = orderService.getOrderById(id);

        List<OrderItemDto> items = orderService.getOrderItemsByOrderId(id)
                .stream()
                .map(item -> new OrderItemDto(
                        item.getId(),
                        id,
                        item.getProduct().getId(),
                        item.getQuantity(),
                        item.getUnitPrice(),
                        item.getProductName(),
                        item.getDetail()
                ))
                .toList();

        return new OrderDetailDto(toDto(order), items);
    }

    @PostMapping
    public OrderDto save(@Valid @RequestBody OrderCreateRequestDto request) {

        Order savedOrder = orderService.save(request);

        return toDto(savedOrder);
    }

    @PatchMapping("/{id}/status")
    public OrderDto updateOrderStatus(@PathVariable long id,@RequestParam String status) {
        Order updatedOrder = orderService.updateOrderStatus(id,status);

        return toDto(updatedOrder);
    }
    private OrderDto toDto(Order order) {

        return new OrderDto(
                order.getId(),
                order.getUser().getId(),
                order.getAddress() != null
                        ? order.getAddress().getId() : null,
                order.getShippingAddressSnapshot(),
                order.getBillingAddressSnapshot(),
                order.getCardLastFour(),
                order.getOrderDate(),
                order.getStatus(),
                order.getSubtotal(),
                order.getDiscount(),
                order.getShipping(),
                order.getTotal()
        );
    }
}
