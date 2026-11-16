package com.workintech.bandage.dto;

import java.math.BigDecimal;

public record OrderItemDto(Long id, Long orderId, Long productId, int quantity, BigDecimal unitPrice,String productName,String detail) {
}
