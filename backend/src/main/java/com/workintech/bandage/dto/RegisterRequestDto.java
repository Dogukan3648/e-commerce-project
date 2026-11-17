package com.workintech.bandage.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record RegisterRequestDto(
        @NotBlank String name,
        @NotBlank @Email String email,
        @NotBlank String password,
        @Positive long roleId,
        StoreInfo store
) {
    public record StoreInfo(
            String name,
            String phone,
            String taxNo,
            String bankAccount
    ) {}
}