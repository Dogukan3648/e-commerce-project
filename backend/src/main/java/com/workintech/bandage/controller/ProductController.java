package com.workintech.bandage.controller;

import com.workintech.bandage.dto.ProductDto;
import com.workintech.bandage.entity.Category;
import com.workintech.bandage.entity.Product;
import com.workintech.bandage.entity.Store;
import com.workintech.bandage.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/all")
    public List<ProductDto> getAllProducts() {
        return productService.getAllProducts().stream().map(this::toDto).toList();
    }

    @GetMapping
    public Page<ProductDto> getProducts(
            @RequestParam(name = "category", required = false) Long categoryId,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) BigDecimal priceMin,
            @RequestParam(required = false) BigDecimal priceMax,
            @RequestParam(required = false) String sort,
            @RequestParam(defaultValue = "25") int limit,
            @RequestParam(defaultValue = "0") int offset) {

        return productService.getProducts(
                categoryId, search, priceMin, priceMax,
                sort, limit, offset
        ).map(this::toDto);
    }


    @GetMapping("/{id}")
    public ProductDto getProductById(@PathVariable long id) {
        Product product = productService.getProductById(id);

        return toDto(product);
    }

    @PostMapping
    public ProductDto save(@RequestBody ProductDto request) {
        Product product = toEntity(request);

        Product savedProduct = productService.save(product);

        return toDto(savedProduct);
    }

    @PutMapping("/{id}")
    public ProductDto updateProduct(@PathVariable long id, @RequestBody ProductDto request) {
        Product product = toEntity(request);

        Product updatedProduct = productService.updateProduct(id,product);

        return toDto(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable long id) {
        productService.deleteProduct(id);
    }
    private ProductDto toDto(Product product){
        if (product == null){
            return null;
        }
        return new ProductDto(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getStock(),
                product.getRating(),
                product.getSellCount(),
                product.getCategory() != null
                        ? product.getCategory().getId() : null,
                product.getStore() != null
                        ? product.getStore().getId() : null
        );

    }
    private Product toEntity(ProductDto request) {
        Product product = new Product();

        product.setName(request.name());
        product.setDescription(request.description());
        product.setPrice(request.price());
        product.setStock(request.stock());
        product.setRating(request.rating());
        product.setSellCount(request.sellCount());

        if (request.categoryId() != null) {
            Category category = new Category();
            category.setId(request.categoryId());
            product.setCategory(category);
        }

        if (request.storeId() != null) {
            Store store = new Store();
            store.setId(request.storeId());
            product.setStore(store);
        }

        return product;
    }
}
