package com.workintech.bandage.dto;

public record LoginResponseDto(String token,long id,String name,String email,boolean emailVerified) {
}
