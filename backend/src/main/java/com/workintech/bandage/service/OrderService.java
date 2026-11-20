package com.workintech.bandage.service;

import com.workintech.bandage.dto.OrderCreateRequestDto;
import com.workintech.bandage.entity.Order;
import com.workintech.bandage.entity.OrderItem;

import java.util.List;

public interface OrderService {
    List<Order> getOrdersByUserId(long userId);
    Order getOrderById(long id);
    Order save(OrderCreateRequestDto request);
    Order updateOrderStatus(long id,String status);
    List<OrderItem> getOrderItemsByOrderId(long orderId);

}
