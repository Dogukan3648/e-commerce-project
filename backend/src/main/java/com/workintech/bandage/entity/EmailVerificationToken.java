package com.workintech.bandage.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "email_verification_tokens")
public class EmailVerificationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "token_hash")
    private String tokenHash;
    @Column(name = "expires_at")
    private OffsetDateTime expiresAt;
    @Column(name = "used_at")
    private OffsetDateTime usedAt;
    @CreationTimestamp
    @Column(name = "created_at",nullable = false,updatable = false)
    private OffsetDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;
}
