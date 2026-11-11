package com.workintech.bandage.service;

import com.workintech.bandage.entity.Product;
import com.workintech.bandage.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService{

    private ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository){
        this.productRepository = productRepository;
    }


    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(long productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);

        if (optionalProduct.isPresent()){
            return optionalProduct.get();
        }
        return null;
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


        PageRequest pageable = PageRequest.of(
                offset / limit,
                limit,
                sorting
        );

        return productRepository.findAll(spec, pageable);
    }

}
