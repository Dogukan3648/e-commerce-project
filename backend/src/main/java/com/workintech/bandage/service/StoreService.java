package com.workintech.bandage.service;

import com.workintech.bandage.entity.Store;

import java.util.List;

public interface StoreService {
    List<Store> getAllStores();
    Store getStoreById(long id);
    Store save(Store store);
    Store updateStore(long id,Store store);
    void deleteStore(long id);
}
