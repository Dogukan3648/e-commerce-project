package com.workintech.bandage.dto;

public record AddressDto(Long id,Long userId, String title,String name,
                         String surname,String phone,String city,String district,String neighborhood,String address) {
}
