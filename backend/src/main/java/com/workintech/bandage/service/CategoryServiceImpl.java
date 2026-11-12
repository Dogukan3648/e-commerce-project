package com.workintech.bandage.service;

import com.workintech.bandage.entity.Category;
import com.workintech.bandage.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService{

    private CategoryRepository categoryRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository){
        this.categoryRepository = categoryRepository;
    }



    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @Override
    public Category save(Category category) {
        if (category == null || category.getId() != null) {
            return null;
        }

        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(long id, Category category) {
        Category existingCategory = getCategoryById(id);

        if (existingCategory == null || category == null){
            return null;
        }
        existingCategory.setCode(category.getCode());
        existingCategory.setTitle(category.getTitle());
        existingCategory.setGender(category.getGender());
        existingCategory.setImg(category.getImg());
        existingCategory.setRating(category.getRating());

        return categoryRepository.save(existingCategory);
    }

    @Override
    public void deleteCategory(long id) {
        Category category = getCategoryById(id);

        if (category != null){
            categoryRepository.delete(category);
        }
    }
}
