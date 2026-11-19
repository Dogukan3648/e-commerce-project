
package com.workintech.bandage.service;

import com.workintech.bandage.entity.CreditCard;
import com.workintech.bandage.exception.BandageException;
import com.workintech.bandage.repository.CreditCardRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CreditCardServiceImpl implements CreditCardService {

    private final CreditCardRepository creditCardRepository;

    public CreditCardServiceImpl(CreditCardRepository creditCardRepository) {
        this.creditCardRepository = creditCardRepository;
    }

    @Override
    public List<CreditCard> getCardsByUserId(long userId) {
        checkOwnership(userId);
        return creditCardRepository.findByUserId(userId);
    }

    @Override
    public CreditCard getCardById(long id) {
        CreditCard creditCard = creditCardRepository.findById(id)
                .orElseThrow(() -> new BandageException(
                        "Credit card not found: " + id,
                        HttpStatus.NOT_FOUND
                ));

        checkOwnership(creditCard.getUser().getId());

        return creditCard;
    }

    @Override
    public CreditCard save(CreditCard creditCard) {
        if (creditCard == null || creditCard.getId() != null) {
            throw new BandageException(
                    "Invalid credit card data",
                    HttpStatus.BAD_REQUEST
            );
        }

        if (creditCard.getUser() == null ||
                creditCard.getUser().getId() == null) {
            throw new BandageException(
                    "Credit card user is required",
                    HttpStatus.BAD_REQUEST
            );
        }

        checkOwnership(creditCard.getUser().getId());

        return creditCardRepository.save(creditCard);
    }

    @Override
    public CreditCard updateCreditCard(long id, long userId, CreditCard creditCard) {
        CreditCard existingCreditCard = getCardById(id);

        if (creditCard == null) {
            throw new BandageException(
                    "Credit card cannot be null",
                    HttpStatus.BAD_REQUEST
            );
        }

        if (!existingCreditCard.getUser().getId().equals(userId)) {
            throw new BandageException(
                    "You cannot update this credit card",
                    HttpStatus.FORBIDDEN
            );
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

        if (!creditCard.getUser().getId().equals(userId)) {
            throw new BandageException(
                    "You cannot delete this credit card",
                    HttpStatus.FORBIDDEN
            );
        }

        creditCardRepository.delete(creditCard);
    }

    private void checkOwnership(Long userId) {
        var authentication = SecurityContextHolder.getContext()
                .getAuthentication();

        if (!(authentication instanceof JwtAuthenticationToken jwtAuth)) {
            throw new BandageException(
                    "Authentication required",
                    HttpStatus.UNAUTHORIZED
            );
        }

        Number authenticatedUserId =
                jwtAuth.getToken().getClaim("userId");

        if (authenticatedUserId == null || userId == null
                || authenticatedUserId.longValue() != userId.longValue()) {
            throw new BandageException(
                    "You cannot access this credit card",
                    HttpStatus.FORBIDDEN
            );
        }
    }
}
