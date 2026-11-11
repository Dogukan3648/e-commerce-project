package com.workintech.bandage.service;

import com.workintech.bandage.entity.Product;
import org.springframework.data.domain.Page;


import java.math.BigDecimal;
import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    Product getProductById(long productId);

      Page<Product> getProducts(
      Long categoryId,
      String search,
      BigDecimal priceMin,
      BigDecimal priceMax,
      String sort,
      int limit,
      int offset
    );
}
