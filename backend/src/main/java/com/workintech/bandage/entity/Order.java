package com.workintech.bandage.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Map;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "shipping_address_snapshot", columnDefinition = "jsonb")
    private Map<String,Object> shippingAddressSnapshot;
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "billing_address_snapshot", columnDefinition = "jsonb")
    private Map<String, Object> billingAddressSnapshot;
    @Column(name = "card_last_four")
    private String cardLastFour;
    @CreationTimestamp
    @Column(name = "order_date", nullable = false, updatable = false)
    private OffsetDateTime orderDate;
    private String status = "PENDING";
    @Column(name = "subtotal_amount")
    private BigDecimal subtotal;
    @Column(name = "discount_amount")
    private BigDecimal discount;
    @Column(name = "total_amount")
    private BigDecimal total;
    @Column(name = "shipping_amount")
    private BigDecimal shipping;

    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;

}
