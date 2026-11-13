package com.workintech.bandage.service;

import com.workintech.bandage.entity.Order;
import com.workintech.bandage.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
        return orderRepository.findById(id).orElse(null);
    }

    @Override
    public Order save(Order order) {
        if (order == null || order.getId() != null){
            return null;
        }
        return orderRepository.save(order);
    }

    @Override
    public Order updateOrderStatus(long id, String status) {
        Order existingOrder = getOrderById(id);

        if (existingOrder == null || status == null || status.isBlank()){
            return null;
        }
        existingOrder.setStatus(status);

        return orderRepository.save(existingOrder);
    }
}
