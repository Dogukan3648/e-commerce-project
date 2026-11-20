
package com.workintech.bandage.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;


public record OrderCreateRequestDto(
        @NotNull Long userId,
        @NotNull Long addressId,
        Long billingAddressId,
        @NotNull Long creditCardId,
        @NotEmpty List<@Valid Item> items
) {
    public record Item(
            @NotNull Long productId,
            @Min(1) int quantity
    ) {}
}
