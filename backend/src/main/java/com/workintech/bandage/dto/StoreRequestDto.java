package com.workintech.bandage.dto;

import jakarta.validation.constraints.NotBlank;

public record StoreRequestDto(Long userId, @NotBlank String name, String phone, String taxNo, String bankAccount) {
}
