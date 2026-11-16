package com.workintech.bandage.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Map;

public record OrderDto(Long id, Long userId, Long addressId, Map<String,Object>shippingAddressSnapshot, Map<String, Object> billingAddressSnapshot,
                       String cardLastFour, OffsetDateTime orderDate, String status, BigDecimal subtotal,BigDecimal discount,BigDecimal shipping,BigDecimal total) {
}
