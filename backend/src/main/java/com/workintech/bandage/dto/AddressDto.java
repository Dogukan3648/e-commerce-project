package com.workintech.bandage.dto;

import jakarta.validation.constraints.NotBlank;

public record AddressDto(Long id, Long userId, @NotBlank String title, String name,
                         String surname, String phone,@NotBlank String city,@NotBlank String district, String neighborhood,@NotBlank String address) {
}
