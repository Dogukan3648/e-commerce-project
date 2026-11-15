package com.workintech.bandage.controller;

import com.workintech.bandage.entity.ProductImage;
import com.workintech.bandage.service.ProductImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product-images")
public class ProductImageController {
    private ProductImageService productImageService;

    @Autowired
    public ProductImageController(ProductImageService productImageService){
        this.productImageService = productImageService;
    }
    @GetMapping("/product/{productId}")
    public List<ProductImage> getImagesByProductId(@PathVariable long productId){
        return productImageService.getImagesByProductId(productId);
    }
    @GetMapping("/{id}")
    public  ProductImage getImageById(@PathVariable long id){
        return productImageService.getImageById(id);
    }
    @PostMapping
    public ProductImage save(@RequestBody ProductImage productImage){
        return productImageService.save(productImage);
    }
    @PutMapping("/{id}")
    public ProductImage updateProductImage(@PathVariable long id,@RequestBody ProductImage productImage){
        return productImageService.updateProductImage(id, productImage);
    }
    @DeleteMapping("/{id}")
    public void deleteProductImage(@PathVariable long id){
        productImageService.deleteProductImage(id);
    }
}
