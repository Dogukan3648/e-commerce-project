package com.workintech.bandage.dto;

public record CreditCardDto(Long id,Long userId, String nameOnCard, String lastFour, short expireMonth, short expireYear) {
}
