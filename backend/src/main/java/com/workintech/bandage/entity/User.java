package com.workintech.bandage.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;


import java.time.OffsetDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Email
    private String email;
    private String password;
    @Column(name = "email_verified")
    private boolean emailVerified;
    @Column(name = "created_at", insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "role_id",nullable = false)
    private Role role;
}
