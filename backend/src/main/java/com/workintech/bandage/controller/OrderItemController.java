package com.workintech.bandage.controller;

import com.workintech.bandage.entity.OrderItem;
import com.workintech.bandage.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order-items")
public class OrderItemController {
    private OrderItemService orderItemService;

    @Autowired
    public OrderItemController(OrderItemService orderItemService){
        this.orderItemService = orderItemService;
    }
    @GetMapping("/order/{orderId}")
    public List<OrderItem> getOrderItemsByOrderId(@PathVariable long orderId){
        return orderItemService.getOrderItemsByOrderId(orderId);
    }
    @GetMapping("/{id}")
    public OrderItem getOrderItemById(@PathVariable long id){
        return orderItemService.getOrderItemById(id);
    }
    @PostMapping
    public OrderItem save(@RequestBody OrderItem orderItem){
        return orderItemService.save(orderItem);
    }
}
