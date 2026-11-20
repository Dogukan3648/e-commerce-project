
package com.workintech.bandage.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.Map;

public record OrderCreateRequestDto(
        @NotNull Long userId,
        Long addressId,
        Map<String, Object> shippingAddressSnapshot,
        Map<String, Object> billingAddressSnapshot,
        String cardLastFour,
        @NotEmpty List<@Valid Item> items
) {
    public record Item(
            @NotNull Long productId,
            @Min(1) int quantity
    ) {}
}
