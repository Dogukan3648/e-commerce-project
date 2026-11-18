package com.workintech.bandage.controller;

import com.workintech.bandage.dto.AddressDto;
import com.workintech.bandage.entity.Address;
import com.workintech.bandage.entity.User;
import com.workintech.bandage.service.AddressService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/addresses")
public class AddressController {
    private AddressService addressService;

    @Autowired
    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping("/user/{userId}")
    public List<AddressDto> getAddressesByUserId(@PathVariable long userId) {
        return addressService.getAddressesByUserId(userId).stream().map(this::toDto).toList();
    }

    @GetMapping("/{id}")
    public AddressDto getAddressById(@PathVariable long id) {
        Address address = addressService.getAddressById(id);

        return toDto(address);
    }

    @PostMapping
    public AddressDto save(@Valid @RequestBody AddressDto request) {
        Address address = toEntity(request);

        Address savedAddress = addressService.save(address);

        return toDto(savedAddress);
    }

    @PutMapping("/{id}/user/{userId}")
    public AddressDto updateAddress(@PathVariable long id, @PathVariable long userId,@Valid @RequestBody AddressDto request) {
        Address address = toEntity(request);

        Address updatedAddress = addressService.updateAddress(id,userId,address);

        return toDto(updatedAddress);
    }

    @DeleteMapping("/{id}/user/{userId}")
    public void deleteAddress(@PathVariable long id, @PathVariable long userId) {
        addressService.deleteAddress(id, userId);
    }

    private AddressDto toDto(Address address){

        return new AddressDto(address.getId(),address.getUser().getId(),address.getTitle(),address.getName(),
                address.getSurname(),address.getPhone(),address.getCity(),address.getDistrict(),address.getNeighborhood(),
                address.getAddress());
    }
    private Address toEntity(AddressDto request){
        Address address = new Address();

        address.setTitle(request.title());
        address.setName(request.name());
        address.setSurname(request.surname());
        address.setPhone(request.phone());
        address.setCity(request.city());
        address.setDistrict(request.district());
        address.setNeighborhood(request.neighborhood());
        address.setAddress(request.address());

        if (request.userId() != null){
            User user = new User();
            user.setId(request.userId());
            address.setUser(user);
        }
        return address;
    }


}
