package com.workintech.bandage.service;

import com.workintech.bandage.entity.EmailVerificationToken;
import com.workintech.bandage.exception.BandageException;
import com.workintech.bandage.repository.EmailVerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;

@Service
public class EmailVerificationTokenServiceImpl implements EmailVerificationTokenService {
    private EmailVerificationTokenRepository emailVerificationTokenRepository;

    @Autowired
    public EmailVerificationTokenServiceImpl(EmailVerificationTokenRepository emailVerificationTokenRepository) {
        this.emailVerificationTokenRepository = emailVerificationTokenRepository;
    }
    @Override
    public EmailVerificationToken getTokenByHash(String tokenHash) {
        return emailVerificationTokenRepository.findByTokenHash(tokenHash)
                .orElseThrow(() -> new BandageException(
                        "Verification token not found",
                        HttpStatus.NOT_FOUND
                ));
    }
    @Override
    public EmailVerificationToken save(EmailVerificationToken emailVerificationToken) {
        if (emailVerificationToken == null || emailVerificationToken.getId() != null) {
            throw new BandageException(
                    "Invalid verification token data",
                    HttpStatus.BAD_REQUEST
            );
        }

        return emailVerificationTokenRepository.save(emailVerificationToken);
    }

    @Override
    public EmailVerificationToken markTokenAsUsed(long id) {
        EmailVerificationToken existingToken = emailVerificationTokenRepository.findById(id)
                .orElseThrow(() -> new BandageException(
                        "Verification token not found: " + id,
                        HttpStatus.NOT_FOUND
                ));

        if (existingToken.getUsedAt() != null) {
            throw new BandageException(
                    "Verification token already used",
                    HttpStatus.CONFLICT
            );
        }

        existingToken.setUsedAt(OffsetDateTime.now());

        return emailVerificationTokenRepository.save(existingToken);
    }
}
