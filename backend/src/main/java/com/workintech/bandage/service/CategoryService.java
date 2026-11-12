package com.workintech.bandage.service;

import com.workintech.bandage.entity.Category;

import java.util.List;

public interface CategoryService {
    List<Category> getAllCategories();
    Category getCategoryById(long id);
    Category save(Category category);
    Category updateCategory(long id,Category category);
    void deleteCategory(long id);

}
