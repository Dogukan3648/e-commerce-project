package com.workintech.bandage.controller;

import com.workintech.bandage.entity.Address;
import com.workintech.bandage.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/addresses")
public class AddressController {
    private AddressService addressService;

    @Autowired
    public AddressController(AddressService addressService){
        this.addressService = addressService;
    }
    @GetMapping("/user/{userId}")
    public List<Address> getAddressesByUserId(@PathVariable long userId){
        return addressService.getAddressesByUserId(userId);
    }
    @GetMapping("/{id}")
    public Address getAddressById(@PathVariable long id){
        return addressService.getAddressById(id);
    }
    @PostMapping
    public Address save(@RequestBody Address address){
        return addressService.save(address);
    }
    @PutMapping("/{id}/user/{userId}")
    public Address updateAddress(@PathVariable long id,@PathVariable long userId,@RequestBody Address address){
        return addressService.updateAddress(id, userId, address);
    }
    @DeleteMapping("/{id}/user/{userId}")
    public void deleteAddress(@PathVariable long id,@PathVariable long userId){
        addressService.deleteAddress(id, userId);
    }


}
