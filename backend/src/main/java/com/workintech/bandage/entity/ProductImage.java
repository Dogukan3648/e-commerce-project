package com.workintech.bandage.entity;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "product_images")
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String url;
    @Column(name = "image_index")
    private int imageIndex;

    @ManyToOne
    @JoinColumn(name = "product_id",nullable = false)
    private Product product;

}
