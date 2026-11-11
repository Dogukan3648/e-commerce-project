package com.workintech.bandage.service;

import com.workintech.bandage.entity.ProductImage;

import java.util.List;

public interface ProductImageService {
    List<ProductImage> getImagesByProductId(long productId);
}
