package com.workintech.bandage.controller;

import com.workintech.bandage.entity.Store;
import com.workintech.bandage.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stores")
public class StoreController {
    private StoreService storeService;

    @Autowired
    public StoreController(StoreService storeService){
        this.storeService = storeService;
    }

    @GetMapping
    public List<Store> getAllStores(){
        return storeService.getAllStores();
    }
    @GetMapping("/{id}")
    public Store getStoreById(@PathVariable long id){
        return storeService.getStoreById(id);
    }
    @PostMapping
    public Store save(@RequestBody Store store){
        return storeService.save(store);
    }
    @PutMapping("/{id}")
    public Store updateStore(@PathVariable long id,@RequestBody Store store){
        return storeService.updateStore(id, store);
    }
    @DeleteMapping("/{id}")
    public void deleteStore(@PathVariable long id){
        storeService.deleteStore(id);
    }

}
