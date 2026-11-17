package com.workintech.bandage.controller;


import com.workintech.bandage.entity.Category;
import com.workintech.bandage.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {
    private CategoryService  categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService){
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<Category> getAllCategories(){
        return categoryService.getAllCategories();
    }
    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable long id){
        return categoryService.getCategoryById(id);
    }
    @PostMapping
    public Category save(@Valid @RequestBody Category category){
        return categoryService.save(category);
    }
    @PutMapping("/{id}")
    public Category updateCategory(@PathVariable long id,@Valid @RequestBody Category category){
        return categoryService.updateCategory(id, category);
    }
    @DeleteMapping("/{id}")
    public void  deleteCategory(@PathVariable long id){
        categoryService.deleteCategory(id);
    }
}
