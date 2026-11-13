package com.workintech.bandage.service;

import com.workintech.bandage.entity.OrderItem;

import java.util.List;

public interface OrderItemService {
    List<OrderItem> getOrderItemsByOrderId(long orderId);
    OrderItem getOrderItemById(long id);
    OrderItem save(OrderItem orderItem);
}
