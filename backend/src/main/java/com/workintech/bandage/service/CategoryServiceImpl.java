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
}
