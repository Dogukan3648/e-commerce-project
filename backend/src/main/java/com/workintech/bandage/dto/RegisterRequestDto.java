package com.workintech.bandage.dto;

public record RegisterRequestDto(String name,String email,String password,long roleId,StoreInfo store) {
    public record  StoreInfo(String name,String phone,String taxNo,String bankAccount){}
}

