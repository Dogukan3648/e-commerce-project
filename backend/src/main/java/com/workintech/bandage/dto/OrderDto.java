package com.workintech.bandage.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Map;

public record OrderDto(Long id, @NotNull Long userId, Long addressId, Map<String,Object>shippingAddressSnapshot, Map<String, Object> billingAddressSnapshot,
                       String cardLastFour, OffsetDateTime orderDate, String status,
                       @DecimalMin("0.0") BigDecimal subtotal, @DecimalMin("0.0") BigDecimal discount, @DecimalMin("0.0") BigDecimal shipping,
                      @NotNull @DecimalMin("0.0")BigDecimal total) {
}
