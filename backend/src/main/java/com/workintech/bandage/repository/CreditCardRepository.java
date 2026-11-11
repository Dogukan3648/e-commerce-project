package com.workintech.bandage.repository;

import com.workintech.bandage.entity.CreditCard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CreditCardRepository extends JpaRepository<CreditCard,Long> {
    List<CreditCard> findByUserId(long userId);
}
