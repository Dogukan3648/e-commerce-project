package com.workintech.bandage.controller;

import com.workintech.bandage.entity.CreditCard;
import com.workintech.bandage.service.CreditCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/credit-cards")
public class CreditCardController {
    private CreditCardService creditCardService;

    @Autowired
    public CreditCardController(CreditCardService creditCardService){
        this.creditCardService = creditCardService;
    }
    @GetMapping("/user/{userId}")
    public List<CreditCard> getCardsByUserId(@PathVariable long userId){
        return creditCardService.getCardsByUserId(userId);
    }
    @GetMapping("/{id}")
    public CreditCard getCardById(@PathVariable long id){
        return creditCardService.getCardById(id);
    }
    @PostMapping
    public CreditCard save(@RequestBody CreditCard creditCard){
        return creditCardService.save(creditCard);
    }
    @PutMapping("/{id}/user/{userId}")
    public CreditCard updateCreditCard(@PathVariable long id,@PathVariable long userId,@RequestBody CreditCard creditCard){
        return creditCardService.updateCreditCard(id, userId, creditCard);
    }
    @DeleteMapping("/{id}/user/{userId}")
    public void deleteCreditCard(@PathVariable long id,@PathVariable long userId){
        creditCardService.deleteCreditCard(id, userId);
    }
}
