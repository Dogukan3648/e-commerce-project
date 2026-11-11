package com.workintech.bandage.service;

import com.workintech.bandage.entity.Address;

import java.util.List;

public interface AddressService {
    List<Address> getAddressesByUserId(long userId);
    Address addAddress(Address address);
    void deleteAddress(long addressId,long userId);
}
