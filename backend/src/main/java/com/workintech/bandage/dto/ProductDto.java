package com.workintech.bandage.dto;

import java.math.BigDecimal;

public record ProductDto(Long id, String name, String description,
                         BigDecimal price,int stock, BigDecimal rating,int sellCount,Long categoryId,Long storeId) {
}
