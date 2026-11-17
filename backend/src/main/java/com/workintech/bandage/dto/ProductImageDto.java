package com.workintech.bandage.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProductImageDto(Long id, @NotBlank String url, int imageIndex,@NotNull Long productId) {
}
