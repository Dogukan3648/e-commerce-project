package com.workintech.bandage.controller;

import com.workintech.bandage.dto.CreditCardDto;
import com.workintech.bandage.entity.CreditCard;
import com.workintech.bandage.entity.User;
import com.workintech.bandage.service.CreditCardService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/credit-cards")
public class CreditCardController {
    private CreditCardService creditCardService;

    @Autowired
    public CreditCardController(CreditCardService creditCardService) {
        this.creditCardService = creditCardService;
    }

    @GetMapping("/user/{userId}")
    public List<CreditCardDto> getCardsByUserId(@PathVariable long userId) {
       return creditCardService.getCardsByUserId(userId).stream().map(this::toDto).toList();
    }

    @GetMapping("/{id}")
    public CreditCardDto getCardById(@PathVariable long id) {
        CreditCard creditCard = creditCardService.getCardById(id);

        return toDto(creditCard);
    }

    @PostMapping
    public CreditCardDto save(@Valid @RequestBody CreditCardDto request) {
        CreditCard creditCard = toEntity(request);

        CreditCard savedCard = creditCardService.save(creditCard);

        return toDto(savedCard);
    }

    @PutMapping("/{id}/user/{userId}")
    public CreditCardDto updateCreditCard(@PathVariable long id, @PathVariable long userId,@Valid @RequestBody CreditCardDto request) {
        CreditCard creditCard = toEntity(request);

        CreditCard updateCard = creditCardService.updateCreditCard(id,userId,creditCard);

        return toDto(updateCard);
    }

    @DeleteMapping("/{id}/user/{userId}")
    public void deleteCreditCard(@PathVariable long id, @PathVariable long userId) {
        creditCardService.deleteCreditCard(id, userId);
    }
    private CreditCardDto toDto(CreditCard creditCard){

        return new CreditCardDto(creditCard.getId(),creditCard.getUser().getId(),creditCard.getNameOnCard(),
                creditCard.getLastFour(),creditCard.getExpireMonth(),creditCard.getExpireYear());
    }
    private CreditCard toEntity(CreditCardDto request){
        CreditCard creditCard = new CreditCard();

        creditCard.setNameOnCard(request.nameOnCard());
        creditCard.setLastFour(request.lastFour());
        creditCard.setExpireYear(request.expireYear());
        creditCard.setExpireMonth(request.expireMonth());

        if (request.userId() != null){
            User user = new User();
            user.setId(request.userId());
            creditCard.setUser(user);
        }
        return creditCard;

    }
}
