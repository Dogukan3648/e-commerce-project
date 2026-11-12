package com.workintech.bandage.service;


import com.workintech.bandage.entity.ProductImage;

import java.util.List;

public interface ProductImageService {
    List<ProductImage> getImagesByProductId(long productId);
    ProductImage getImageById(long id);
    ProductImage save(ProductImage productImage);
    ProductImage updateProductImage(long id,ProductImage productImage);
    void deleteProductImage(long id);
}
