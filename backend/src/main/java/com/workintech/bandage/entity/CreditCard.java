package com.workintech.bandage.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "credit_cards")
public class CreditCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name_on_card")
    private String nameOnCard;
    @Column(name = "last_four")
    private String lastFour;
    @Column(name = "expire_month")
    private short expireMonth;
    @Column(name = "expire_year")
    private short expireYear;
    @CreationTimestamp
    @Column(name = "created_at",nullable = false,updatable = false)
    private OffsetDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;
}
