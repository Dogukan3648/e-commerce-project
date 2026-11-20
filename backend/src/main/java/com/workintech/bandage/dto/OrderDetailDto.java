package com.workintech.bandage.dto;

import java.util.List;

public record OrderDetailDto(OrderDto order, List<OrderItemDto> items) {
}
