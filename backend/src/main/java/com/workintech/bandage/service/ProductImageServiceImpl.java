package com.workintech.bandage.service;

import com.workintech.bandage.entity.ProductImage;
import com.workintech.bandage.repository.ProductImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductImageServiceImpl implements ProductImageService {
    private ProductImageRepository productImageRepository;

    @Autowired
    public ProductImageServiceImpl(ProductImageRepository productImageRepository){
        this.productImageRepository = productImageRepository;
    }


    @Override
    public List<ProductImage> getImagesByProductId(long productId) {
        return productImageRepository.findByProductIdOrderByImageIndexAsc(productId);
    }
}
