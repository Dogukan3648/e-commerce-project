
package com.workintech.bandage.service;

import com.workintech.bandage.entity.Address;
import com.workintech.bandage.exception.BandageException;
import com.workintech.bandage.repository.AddressRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;

    public AddressServiceImpl(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    @Override
    public List<Address> getAddressesByUserId(long userId) {
        checkOwnership(userId);
        return addressRepository.findByUserId(userId);
    }

    @Override
    public Address getAddressById(long id) {
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new BandageException(
                        "Address not found: " + id,
                        HttpStatus.NOT_FOUND
                ));

        checkOwnership(address.getUser().getId());

        return address;
    }

    @Override
    public Address save(Address address) {
        if (address == null || address.getId() != null) {
            throw new BandageException(
                    "Invalid address data",
                    HttpStatus.BAD_REQUEST
            );
        }

        if (address.getUser() == null || address.getUser().getId() == null) {
            throw new BandageException(
                    "Address user is required",
                    HttpStatus.BAD_REQUEST
            );
        }

        checkOwnership(address.getUser().getId());

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

    private void checkOwnership(Long userId) {
        var authentication = SecurityContextHolder.getContext()
                .getAuthentication();

        if (!(authentication instanceof JwtAuthenticationToken jwtAuth)) {
            throw new BandageException(
                    "Authentication required",
                    HttpStatus.UNAUTHORIZED
            );
        }

        Number authenticatedUserId =
                jwtAuth.getToken().getClaim("userId");

        if (authenticatedUserId == null || userId == null
                || authenticatedUserId.longValue() != userId.longValue()) {
            throw new BandageException(
                    "You cannot access this address",
                    HttpStatus.FORBIDDEN
            );
        }
    }
}
