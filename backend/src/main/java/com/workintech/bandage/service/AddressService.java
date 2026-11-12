package com.workintech.bandage.service;

import com.workintech.bandage.entity.Address;

import java.util.List;

public interface AddressService {

        List<Address> getAddressesByUserId(long userId);
        Address getAddressById(long id);
        Address save(Address address);
        Address updateAddress(long id, long userId, Address address);
        void deleteAddress(long id,long userId);
    }



