package com.workintech.bandage.dto;

import jakarta.validation.constraints.*;

public record CreditCardDto(Long id, Long userId, @NotBlank String nameOnCard,
                 @NotBlank @Pattern(regexp = "\\d{4}") String lastFour, @Min(1) @Max(12) short expireMonth, @Positive short expireYear) {
}
