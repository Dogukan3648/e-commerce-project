package com.workintech.bandage.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "stores")
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String phone;
    @Column(name = "tax_no")
    private String taxNo;
    @Column(name = "bank_account")
    private String bankAccount;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false,unique = true)
    private User user;
}
