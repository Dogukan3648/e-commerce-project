package com.workintech.bandage.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record ProductDto(Long id,
                         @NotBlank String name,
                         String description,
                         @NotNull @DecimalMin("0.0") BigDecimal price,
                         @Min(0) int stock,
                         BigDecimal rating,
                         @Min(0) int sellCount, Long categoryId, Long storeId) {
}
