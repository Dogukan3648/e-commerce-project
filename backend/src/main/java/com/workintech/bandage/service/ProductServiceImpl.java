package com.workintech.bandage.service;

import com.workintech.bandage.entity.Product;
import com.workintech.bandage.entity.Store;
import com.workintech.bandage.exception.BandageException;
import com.workintech.bandage.repository.ProductRepository;
import com.workintech.bandage.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;


@Service
public class ProductServiceImpl implements ProductService{

    private ProductRepository productRepository;
    private StoreRepository storeRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository,StoreRepository storeRepository){
        this.productRepository = productRepository;
        this.storeRepository = storeRepository;
    }


    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new BandageException(
                        "Product not found: " + productId,
                        HttpStatus.NOT_FOUND
                ));
    }


    @Override
    public Page<Product> getProducts(
            Long categoryId,
            String search,
            BigDecimal priceMin,
            BigDecimal priceMax,
            String sort,
            int limit,
            int offset) {


        Specification<Product> spec =
                (root, query, cb) -> cb.conjunction();


        if (categoryId != null) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("category").get("id"), categoryId));
        }


        if (search != null && !search.isBlank()) {
            String keyword = "%" + search.trim().toLowerCase() + "%";

            spec = spec.and((root, query, cb) ->
                    cb.or(
                            cb.like(cb.lower(root.get("name")), keyword),
                            cb.like(cb.lower(root.get("description")), keyword)
                    ));
        }


        if (priceMin != null) {
            spec = spec.and((root, query, cb) ->
                    cb.greaterThanOrEqualTo(root.get("price"), priceMin));
        }


        if (priceMax != null) {
            spec = spec.and((root, query, cb) ->
                    cb.lessThanOrEqualTo(root.get("price"), priceMax));
        }


        Sort sorting = Sort.by("id").ascending();

        if ("price:asc".equals(sort)) {
            sorting = Sort.by("price").ascending()
                    .and(Sort.by("id").ascending());
        } else if ("price:desc".equals(sort)) {
            sorting = Sort.by("price").descending()
                    .and(Sort.by("id").ascending());
        } else if ("rating:asc".equals(sort)) {
            sorting = Sort.by("rating").ascending()
                    .and(Sort.by("id").ascending());
        } else if ("rating:desc".equals(sort)) {
            sorting = Sort.by("rating").descending()
                    .and(Sort.by("id").ascending());
        }
        else if ("sell_count:desc".equals(sort)) {
            sorting = Sort.by("sellCount").descending()
                    .and(Sort.by("id").ascending());
        }

        if (limit <= 0 || offset < 0 || offset % limit != 0) {
            throw new IllegalArgumentException("Invalid pagination parameters");
        }


        PageRequest pageable = PageRequest.of(
                offset / limit,
                limit,
                sorting
        );

        return productRepository.findAll(spec, pageable);
    }

    @Override
    public Product save(Product product) {
        if (product == null || product.getId() != null) {
            throw new BandageException(
                    "Invalid product data",
                    HttpStatus.BAD_REQUEST
            );
        }
        Store store = checkStoreOwnership(product.getStore());
        product.setStore(store);

        product.setRating(BigDecimal.ZERO);
        product.setSellCount(0);

        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(long id, Product product) {
        Product existingProduct = getProductById(id);

        if (product == null) {
            throw new BandageException(
                    "Product cannot be null",
                    HttpStatus.BAD_REQUEST
            );
        }

        checkStoreOwnership(existingProduct.getStore());
        Store targetStore = checkStoreOwnership(product.getStore());

        existingProduct.setCategory(product.getCategory());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setName(product.getName());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setStock(product.getStock());
        existingProduct.setStore(targetStore);

        return productRepository.save(existingProduct);
    }

    @Override
    public void deleteProduct(long id) {
        Product product = getProductById(id);
        checkStoreOwnership(product.getStore());
        productRepository.delete(product);
    }

    private Store checkStoreOwnership(Store store) {
        var authentication = SecurityContextHolder.getContext()
                .getAuthentication();

        if (!(authentication instanceof JwtAuthenticationToken jwtAuth)) {
            throw new BandageException(
                    "Authentication required",
                    HttpStatus.UNAUTHORIZED
            );
        }

        if (!"store".equals(jwtAuth.getToken().getClaimAsString("role"))) {
            throw new BandageException(
                    "Only store owners can manage products",
                    HttpStatus.FORBIDDEN
            );
        }

        if (store == null || store.getId() == null) {
            throw new BandageException(
                    "Product store is required",
                    HttpStatus.BAD_REQUEST
            );
        }

        Store existingStore = storeRepository.findById(store.getId())
                .orElseThrow(() -> new BandageException(
                        "Store not found: " + store.getId(),
                        HttpStatus.NOT_FOUND
                ));

        Number userId = jwtAuth.getToken().getClaim("userId");

        if (userId == null ||
                !existingStore.getUser().getId().equals(userId.longValue())) {
            throw new BandageException(
                    "You cannot manage products of this store",
                    HttpStatus.FORBIDDEN
            );
        }

        return existingStore;
    }


}
