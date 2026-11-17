package com.workintech.bandage.service;

import com.workintech.bandage.entity.Category;
import com.workintech.bandage.exception.BandageException;
import com.workintech.bandage.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private CategoryRepository categoryRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }


    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new BandageException(
                        "Category not found: " + id,
                        HttpStatus.NOT_FOUND
                ));
    }

    @Override
    public Category save(Category category) {
        if (category == null || category.getId() != null) {
            throw new BandageException("Invalid category data",HttpStatus.BAD_REQUEST);
        }

        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(long id, Category category) {
        Category existingCategory = getCategoryById(id);

        if (category == null) {
            throw new BandageException("Category cannot be null.", HttpStatus.BAD_REQUEST);
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
        categoryRepository.delete(category);
    }
}
