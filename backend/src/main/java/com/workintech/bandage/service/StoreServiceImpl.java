package com.workintech.bandage.service;

import com.workintech.bandage.entity.Store;
import com.workintech.bandage.exception.BandageException;
import com.workintech.bandage.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
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
        return storeRepository.findById(id).orElseThrow(() -> new BandageException("Store not found: " +
                id, HttpStatus.NOT_FOUND));
    }

    @Override
    public Store save(Store store) {
        if (store == null || store.getId() != null){
            throw new BandageException("Invalid store data",HttpStatus.BAD_REQUEST);
        }
        if (store.getUser() == null || store.getUser().getId() == null){
            throw new BandageException("Store user is required.",HttpStatus.BAD_REQUEST);
        }

        checkStoreOwnership(store.getUser().getId());


        return storeRepository.save(store);
    }


    @Override
    public Store updateStore(long id, Store store) {
        Store existingStore = getStoreById(id);

        if (store == null) {
            throw new BandageException(
                    "Store cannot be null.",
                    HttpStatus.BAD_REQUEST
            );
        }

        checkStoreOwnership(existingStore.getUser().getId());

        existingStore.setName(store.getName());
        existingStore.setBankAccount(store.getBankAccount());
        existingStore.setPhone(store.getPhone());
        existingStore.setTaxNo(store.getTaxNo());

        return storeRepository.save(existingStore);
    }


    @Override
    public void deleteStore(long id) {
        Store store = getStoreById(id);

        checkStoreOwnership(store.getUser().getId());

        storeRepository.delete(store);

    }

    private void checkStoreOwnership(Long userId) {
        var authentication = SecurityContextHolder.getContext()
                .getAuthentication();

        if (!(authentication instanceof JwtAuthenticationToken jwtAuth)) {
            throw new BandageException(
                    "Authentication required",
                    HttpStatus.UNAUTHORIZED
            );
        }

        Number authenticatedUserId = jwtAuth.getToken().getClaim("userId");
        String role = jwtAuth.getToken().getClaimAsString("role");

        if (!"store".equals(role)) {
            throw new BandageException(
                    "Only store owners can manage stores",
                    HttpStatus.FORBIDDEN
            );
        }

        if (authenticatedUserId == null || userId == null
                || authenticatedUserId.longValue() != userId.longValue()) {
            throw new BandageException(
                    "You cannot manage this store",
                    HttpStatus.FORBIDDEN
            );
        }
    }


}
