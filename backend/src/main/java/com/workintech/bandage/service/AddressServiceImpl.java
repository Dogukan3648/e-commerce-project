package com.workintech.bandage.service;

import com.workintech.bandage.entity.Address;
import com.workintech.bandage.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressServiceImpl implements AddressService{
    private AddressRepository addressRepository;

    @Autowired
    public AddressServiceImpl(AddressRepository addressRepository){
        this.addressRepository = addressRepository;
    }

    @Override
    public List<Address> getAddressesByUserId(long userId) {
        return addressRepository.findByUserId(userId);
    }

    @Override
    public Address addAddress(Address address) {
        return addressRepository.save(address);
    }

    @Override
    public void deleteAddress(long addressId, long userId) {
        Optional<Address> optionalAddress = addressRepository.findById(addressId);

        if (optionalAddress.isPresent()){
            Address address = optionalAddress.get();

            if (address.getUser().getId().equals(userId)){
                addressRepository.delete(address);
            }
        }
    }
}
