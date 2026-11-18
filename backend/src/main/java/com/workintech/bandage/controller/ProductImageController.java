package com.workintech.bandage.controller;

import com.workintech.bandage.dto.ProductImageDto;
import com.workintech.bandage.entity.Product;
import com.workintech.bandage.entity.ProductImage;
import com.workintech.bandage.service.ProductImageService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product-images")
public class ProductImageController {
    private ProductImageService productImageService;

    @Autowired
    public ProductImageController(ProductImageService productImageService) {
        this.productImageService = productImageService;
    }

    @GetMapping("/product/{productId}")
    public List<ProductImageDto> getImagesByProductId(@PathVariable long productId) {
        return productImageService.getImagesByProductId(productId).stream().map(this::toDto).toList();
    }

    @GetMapping("/{id}")
    public ProductImageDto getImageById(@PathVariable long id) {
        ProductImage productImage = productImageService.getImageById(id);

        return toDto(productImage);
    }

    @PostMapping
    public ProductImageDto save(@Valid @RequestBody ProductImageDto request) {
        ProductImage productImage = toEntity(request);

        ProductImage savedImage = productImageService.save(productImage);

        return toDto(savedImage);
    }

    @PutMapping("/{id}")
    public ProductImageDto updateProductImage(@PathVariable long id,@Valid @RequestBody ProductImageDto request) {
        ProductImage productImage = toEntity(request);

        ProductImage updatedImage = productImageService.updateProductImage(id,productImage);

        return toDto(updatedImage);
    }

    @DeleteMapping("/{id}")
    public void deleteProductImage(@PathVariable long id) {
        productImageService.deleteProductImage(id);
    }

    private ProductImageDto toDto(ProductImage productImage){

        return new ProductImageDto(productImage.getId(),productImage.getUrl(),productImage.getImageIndex(),productImage.getProduct().getId());
    }
    private ProductImage toEntity(ProductImageDto request){
        ProductImage productImage = new ProductImage();

        productImage.setUrl(request.url());
        productImage.setImageIndex(request.imageIndex());

        if (request.productId() != null){
            Product product = new Product();

            product.setId(request.productId());
            productImage.setProduct(product);
        }
        return productImage;
    }
}
