
package com.workintech.bandage.service;

import com.workintech.bandage.entity.Product;
import com.workintech.bandage.entity.ProductImage;
import com.workintech.bandage.exception.BandageException;
import com.workintech.bandage.repository.ProductImageRepository;
import com.workintech.bandage.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductImageServiceImpl implements ProductImageService {

    private final ProductImageRepository productImageRepository;
    private final ProductRepository productRepository;

    public ProductImageServiceImpl(
            ProductImageRepository productImageRepository,
            ProductRepository productRepository) {
        this.productImageRepository = productImageRepository;
        this.productRepository = productRepository;
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
            throw new BandageException("Invalid product image data", HttpStatus.BAD_REQUEST);
        }

        Product product = checkProductOwnership(productImage.getProduct());
        productImage.setProduct(product);

        return productImageRepository.save(productImage);
    }

    @Override
    public ProductImage updateProductImage(long id, ProductImage productImage) {
        if (productImage == null) {
            throw new BandageException("Product image cannot be null", HttpStatus.BAD_REQUEST);
        }

        ProductImage existingImage = getImageById(id);

        checkProductOwnership(existingImage.getProduct());
        Product product = checkProductOwnership(productImage.getProduct());

        existingImage.setUrl(productImage.getUrl());
        existingImage.setImageIndex(productImage.getImageIndex());
        existingImage.setProduct(product);

        return productImageRepository.save(existingImage);
    }

    @Override
    public void deleteProductImage(long id) {
        ProductImage productImage = getImageById(id);

        checkProductOwnership(productImage.getProduct());

        productImageRepository.delete(productImage);
    }

    private Product checkProductOwnership(Product product) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        if (!(authentication instanceof JwtAuthenticationToken jwtAuth)) {
            throw new BandageException("Authentication required", HttpStatus.UNAUTHORIZED);
        }

        if (!"store".equals(jwtAuth.getToken().getClaimAsString("role"))) {
            throw new BandageException("Only store owners can manage images", HttpStatus.FORBIDDEN);
        }

        if (product == null || product.getId() == null) {
            throw new BandageException("Product is required", HttpStatus.BAD_REQUEST);
        }

        Product existingProduct = productRepository.findById(product.getId())
                .orElseThrow(() -> new BandageException(
                        "Product not found: " + product.getId(),
                        HttpStatus.NOT_FOUND
                ));

        Number userId = jwtAuth.getToken().getClaim("userId");

        if (userId == null
                || existingProduct.getStore() == null
                || existingProduct.getStore().getUser() == null
                || !existingProduct.getStore().getUser().getId().equals(userId.longValue())) {
            throw new BandageException(
                    "You cannot manage images of this product",
                    HttpStatus.FORBIDDEN
            );
        }

        return existingProduct;
    }
}
