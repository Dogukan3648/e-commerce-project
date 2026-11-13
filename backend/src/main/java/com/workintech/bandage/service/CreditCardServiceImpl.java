package com.workintech.bandage.service;

import com.workintech.bandage.entity.CreditCard;
import com.workintech.bandage.repository.CreditCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CreditCardServiceImpl implements CreditCardService {

    private CreditCardRepository creditCardRepository;

    @Autowired
    public CreditCardServiceImpl(CreditCardRepository creditCardRepository){
        this.creditCardRepository = creditCardRepository;
    }

    @Override
    public List<CreditCard> getCardsByUserId(long userId) {
        return creditCardRepository.findByUserId(userId);
    }

    @Override
    public CreditCard getCardById(long id) {
        return creditCardRepository.findById(id).orElse(null);
    }

    @Override
    public CreditCard save(CreditCard creditCard) {
        if (creditCard == null || creditCard.getId() != null){
            return null;
        }
        return creditCardRepository.save(creditCard);
    }

    @Override
    public CreditCard updateCreditCard(long id, long userId, CreditCard creditCard) {
        CreditCard existingCreditCard = getCardById(id);

        if (existingCreditCard == null || creditCard == null) {
            return null;
        }

        if (!existingCreditCard.getUser().getId().equals(userId)){
            return null;
        }

        existingCreditCard.setExpireMonth(creditCard.getExpireMonth());
        existingCreditCard.setExpireYear(creditCard.getExpireYear());
        existingCreditCard.setLastFour(creditCard.getLastFour());
        existingCreditCard.setNameOnCard(creditCard.getNameOnCard());

        return creditCardRepository.save(existingCreditCard);
    }

    @Override
    public void deleteCreditCard(long id, long userId) {
        CreditCard creditCard = getCardById(id);

        if (creditCard != null && creditCard.getUser().getId().equals(userId)){
            creditCardRepository.delete(creditCard);
        }

    }
}
