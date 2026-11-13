package com.workintech.bandage.service;

import com.workintech.bandage.entity.Order;

import java.util.List;

public interface OrderService {
    List<Order> getOrdersByUserId(long userId);
    Order getOrderById(long id);
    Order save(Order order);
    Order updateOrderStatus(long id,String status);
}
