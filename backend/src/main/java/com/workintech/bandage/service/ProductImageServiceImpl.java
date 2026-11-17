package com.workintech.bandage.service;

import com.workintech.bandage.entity.ProductImage;
import com.workintech.bandage.exception.BandageException;
import com.workintech.bandage.repository.ProductImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    @Override
    public ProductImage getImageById(long id) {
        return productImageRepository.findById(id)
                .orElseThrow(() -> new BandageException(
                        "Product image not found: " + id,
                        HttpStatus.NOT_FOUND
                ));
    }
    @Override
    public ProductImage save(ProductImage productImage) {
        if (productImage == null || productImage.getId() != null) {
            throw new BandageException(
                    "Invalid product image data",
                    HttpStatus.BAD_REQUEST
            );
        }

        return productImageRepository.save(productImage);
    }

    @Override
    public ProductImage updateProductImage(long id, ProductImage productImage) {
        ProductImage existingProductImage = getImageById(id);

        if (productImage == null) {
            throw new BandageException(
                    "Product image cannot be null",
                    HttpStatus.BAD_REQUEST
            );
        }

        existingProductImage.setImageIndex(productImage.getImageIndex());
        existingProductImage.setProduct(productImage.getProduct());
        existingProductImage.setUrl(productImage.getUrl());

        return productImageRepository.save(existingProductImage);
    }

    @Override
    public void deleteProductImage(long id) {
        ProductImage productImage = getImageById(id);
        productImageRepository.delete(productImage);
    }
}
