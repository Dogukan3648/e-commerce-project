package com.workintech.bandage.controller;


import com.workintech.bandage.entity.Order;
import com.workintech.bandage.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {
    private OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService){
        this.orderService = orderService;
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUserId(@PathVariable long userId){
        return orderService.getOrdersByUserId(userId);
    }
    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable long id){
        return orderService.getOrderById(id);
    }
    @PostMapping
    public Order save(@RequestBody Order order){
        return orderService.save(order);
    }
    @PatchMapping("/{id}/status")
    public Order updateOrderStatus(@PathVariable long id,@RequestParam String status){
        return orderService.updateOrderStatus(id, status);
    }
}
