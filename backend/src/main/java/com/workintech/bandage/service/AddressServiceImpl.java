package com.workintech.bandage.service;

import com.workintech.bandage.entity.Address;
import com.workintech.bandage.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


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
    public Address getAddressById(long id) {
        return addressRepository.findById(id).orElse(null);
    }

    @Override
    public Address save(Address address) {
        return addressRepository.save(address);
    }

    @Override
    public Address updateAddress(long id, long userId, Address address) {
        Address existingAddress = getAddressById(id);

        if (existingAddress == null || address == null) {
            return null;
        }

        if (!existingAddress.getUser().getId().equals(userId)) {
            return null;
        }

        existingAddress.setAddress(address.getAddress());
        existingAddress.setCity(address.getCity());
        existingAddress.setDistrict(address.getDistrict());
        existingAddress.setName(address.getName());
        existingAddress.setNeighborhood(address.getNeighborhood());
        existingAddress.setPhone(address.getPhone());
        existingAddress.setSurname(address.getSurname());
        existingAddress.setTitle(address.getTitle());

        return addressRepository.save(existingAddress);
    }
    @Override
    public void deleteAddress(long id, long userId) {
        Address address = getAddressById(id);

        if (address != null &&
                address.getUser().getId().equals(userId)) {
            addressRepository.delete(address);
        }
    }

}
