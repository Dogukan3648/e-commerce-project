package com.workintech.bandage.service;

import com.workintech.bandage.entity.Address;
import com.workintech.bandage.exception.BandageException;
import com.workintech.bandage.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
        return addressRepository.findById(id)
                .orElseThrow(() -> new BandageException(
                        "Address not found: " + id,
                        HttpStatus.NOT_FOUND
                ));
    }

    @Override
    public Address save(Address address) {
        if (address == null || address.getId() != null) {
            throw new BandageException(
                    "Invalid address data",
                    HttpStatus.BAD_REQUEST
            );
        }

        return addressRepository.save(address);
    }
    @Override
    public Address updateAddress(long id, long userId, Address address) {
        Address existingAddress = getAddressById(id);

        if (address == null) {
            throw new BandageException(
                    "Address cannot be null",
                    HttpStatus.BAD_REQUEST
            );
        }

        if (!existingAddress.getUser().getId().equals(userId)) {
            throw new BandageException(
                    "You cannot update this address",
                    HttpStatus.FORBIDDEN
            );
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

        if (!address.getUser().getId().equals(userId)) {
            throw new BandageException(
                    "You cannot delete this address",
                    HttpStatus.FORBIDDEN
            );
        }

        addressRepository.delete(address);
    }

}
