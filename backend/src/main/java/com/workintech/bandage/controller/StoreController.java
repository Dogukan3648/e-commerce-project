package com.workintech.bandage.controller;

import com.workintech.bandage.dto.StoreRequestDto;
import com.workintech.bandage.dto.StoreResponseDto;
import com.workintech.bandage.entity.Store;
import com.workintech.bandage.entity.User;
import com.workintech.bandage.service.StoreService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stores")
public class StoreController {
    private StoreService storeService;

    @Autowired
    public StoreController(StoreService storeService) {
        this.storeService = storeService;
    }

    @GetMapping
    public List<StoreResponseDto> getAllStores() {
        return storeService.getAllStores().stream().map(this::toDto).toList();
    }

    @GetMapping("/{id}")
    public StoreResponseDto getStoreById(@PathVariable long id) {
       Store store = storeService.getStoreById(id);

       return toDto(store);
    }

    @PostMapping
    public StoreResponseDto save(@Valid @RequestBody StoreRequestDto request) {
        Store store = toEntity(request);

        Store savedStore = storeService.save(store);

        return toDto(savedStore);
    }

    @PutMapping("/{id}")
    public StoreResponseDto updateStore(@PathVariable long id, @Valid @RequestBody StoreRequestDto request) {
        Store store = toEntity(request);

        Store updateStore = storeService.updateStore(id,store);

        return toDto(updateStore);
    }

    @DeleteMapping("/{id}")
    public void deleteStore(@PathVariable long id) {
        storeService.deleteStore(id);
    }

    private StoreResponseDto toDto(Store store){

        return new StoreResponseDto(store.getId(),store.getUser().getId(),store.getName(),store.getPhone());

    }

    private Store toEntity(StoreRequestDto request){
        Store store = new Store();

        store.setName(request.name());
        store.setPhone(request.phone());
        store.setTaxNo(request.taxNo());
        store.setBankAccount(request.bankAccount());

        if (request.userId() != null){
            User user = new User();
            user.setId(request.userId());
            store.setUser(user);
        }
        return store;
    }

}
