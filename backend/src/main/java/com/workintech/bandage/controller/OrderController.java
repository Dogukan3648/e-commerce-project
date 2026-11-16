package com.workintech.bandage.controller;


import com.workintech.bandage.dto.OrderDto;
import com.workintech.bandage.entity.Address;
import com.workintech.bandage.entity.Order;
import com.workintech.bandage.entity.User;
import com.workintech.bandage.service.OrderService;
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
    public OrderDto getOrderById(@PathVariable long id) {
        Order order = orderService.getOrderById(id);

        return toDto(order);
    }

    @PostMapping
    public OrderDto save(@RequestBody OrderDto request) {
        Order order = toEntity(request);

        Order savedOrder = orderService.save(order);

        return toDto(savedOrder);
    }

    @PatchMapping("/{id}/status")
    public OrderDto updateOrderStatus(@PathVariable long id, @RequestParam String status) {
        Order updatedOrder = orderService.updateOrderStatus(id,status);

        return toDto(updatedOrder);
    }
    private OrderDto toDto(Order order) {
        if (order == null) {
            return null;
        }

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
    private Order toEntity(OrderDto request) {
        Order order = new Order();

        order.setShippingAddressSnapshot(request.shippingAddressSnapshot());
        order.setBillingAddressSnapshot(request.billingAddressSnapshot());
        order.setCardLastFour(request.cardLastFour());

        order.setSubtotal(request.subtotal());
        order.setDiscount(request.discount());
        order.setShipping(request.shipping());
        order.setTotal(request.total());

        if (request.userId() != null) {
            User user = new User();
            user.setId(request.userId());
            order.setUser(user);
        }

        if (request.addressId() != null) {
            Address address = new Address();
            address.setId(request.addressId());
            order.setAddress(address);
        }

        return order;
    }
}
