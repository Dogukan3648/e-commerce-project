package com.workintech.bandage.service;

import com.workintech.bandage.entity.CreditCard;

import java.util.List;

public interface CreditCardService {
    List<CreditCard> getCardsByUserId(long userId);
    CreditCard getCardById(long id);
    CreditCard save(CreditCard creditCard);
    CreditCard updateCreditCard(long id,long userId,CreditCard creditCard);
    void deleteCreditCard(long id,long userId);
}
