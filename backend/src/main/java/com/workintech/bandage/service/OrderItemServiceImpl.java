package com.workintech.bandage.service;

import com.workintech.bandage.entity.OrderItem;
import com.workintech.bandage.exception.BandageException;
import com.workintech.bandage.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemServiceImpl implements OrderItemService {
    private OrderItemRepository orderItemRepository;

    @Autowired
    public OrderItemServiceImpl(OrderItemRepository orderItemRepository){
        this.orderItemRepository = orderItemRepository;
    }

    @Override
    public List<OrderItem> getOrderItemsByOrderId(long orderId) {
        return orderItemRepository.findByOrderId(orderId);
    }

    @Override
    public OrderItem getOrderItemById(long id) {
        return orderItemRepository.findById(id)
                .orElseThrow(() -> new BandageException(
                        "Order item not found: " + id,
                        HttpStatus.NOT_FOUND
                ));
    }

    @Override
    public OrderItem save(OrderItem orderItem) {
        if (orderItem == null || orderItem.getId() != null) {
            throw new BandageException(
                    "Invalid order item data",
                    HttpStatus.BAD_REQUEST
            );
        }

        return orderItemRepository.save(orderItem);
    }
}
