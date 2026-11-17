package com.workintech.bandage.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record CreditCardDto(Long id, Long userId, @NotBlank String nameOnCard,
                 @NotBlank @Pattern(regexp = "\\d{4}") String lastFour, @Min(1) @Max(12) short expireMonth, short expireYear) {
}
