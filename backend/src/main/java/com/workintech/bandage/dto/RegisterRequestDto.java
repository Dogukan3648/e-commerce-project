package com.workintech.bandage.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record RegisterRequestDto(
        @NotBlank String name,
        @NotBlank @Email String email,
        @NotBlank String password,
        @JsonProperty("role_id") @Positive long roleId,
        @Valid StoreInfo store
) {
    public record StoreInfo(
            @NotBlank String name,
            String phone,
           @JsonProperty("tax_no") String taxNo,
           @JsonProperty("bank_account") String bankAccount
    ) {}
}