
package com.workintech.bandage.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.List;

public record ProductDto(
        Long id,
        @NotBlank String name,
        String description,
        @NotNull @DecimalMin("0.0") BigDecimal price,
        @Min(0) int stock,
        BigDecimal rating,
        @JsonProperty("sell_count") @Min(0) int sellCount,
        @JsonProperty("category_id") Long categoryId,
        @JsonProperty("store_id") Long storeId,
        List<ImageDto> images
) {
    public record ImageDto(String url,int index){}
}
