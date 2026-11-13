package com.workintech.bandage.service;

import com.workintech.bandage.entity.Store;
import com.workintech.bandage.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StoreServiceImpl implements StoreService {
    private StoreRepository storeRepository;

    @Autowired
    public StoreServiceImpl(StoreRepository storeRepository){
        this.storeRepository = storeRepository;
    }

    @Override
    public List<Store> getAllStores() {
        return storeRepository.findAll();
    }

    @Override
    public Store getStoreById(long id) {
        return storeRepository.findById(id).orElse(null);
    }

    @Override
    public Store save(Store store) {
        if (store == null || store.getId() != null){
            return null;
        }
        if (store.getUser() == null || store.getUser().getId() == null){
            return null;
        }
        return storeRepository.save(store);
    }

    @Override
    public Store updateStore(long id, Store store) {
        Store existingStore = getStoreById(id);

        if (existingStore == null || store == null){
            return null;
        }
        existingStore.setName(store.getName());
        existingStore.setBankAccount(store.getBankAccount());
        existingStore.setPhone(store.getPhone());
        existingStore.setTaxNo(store.getTaxNo());

        return storeRepository.save(existingStore);
    }

    @Override
    public void deleteStore(long id) {
        Store store = getStoreById(id);

        if (store != null){
            storeRepository.delete(store);
        }

    }
}
