package com.workintech.bandage.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record OrderItemDto(Long id, @NotNull Long orderId, @NotNull Long productId, @Min(1) int quantity,
                           @NotNull @DecimalMin("0.0") BigDecimal unitPrice, String productName, String detail) {
}
