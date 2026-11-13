package com.workintech.bandage.service;

import com.workintech.bandage.entity.EmailVerificationToken;
import com.workintech.bandage.repository.EmailVerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;

@Service
public class EmailVerificationTokenServiceImpl implements EmailVerificationTokenService {
    private EmailVerificationTokenRepository emailVerificationTokenRepository;

    @Autowired
    public EmailVerificationTokenServiceImpl(EmailVerificationTokenRepository emailVerificationTokenRepository){
        this.emailVerificationTokenRepository = emailVerificationTokenRepository;
    }

    @Override
    public EmailVerificationToken getTokenByHash(String tokenHash) {
        return emailVerificationTokenRepository.findByTokenHash(tokenHash).orElse(null);
    }

    @Override
    public EmailVerificationToken save(EmailVerificationToken emailVerificationToken) {
        if (emailVerificationToken == null || emailVerificationToken.getId() != null){
            return null;
        }
        return emailVerificationTokenRepository.save(emailVerificationToken);
    }

    @Override
    public EmailVerificationToken markTokenAsUsed(long id) {
        EmailVerificationToken existingToken = emailVerificationTokenRepository.findById(id).orElse(null);

        if (existingToken == null){
            return null;
        }
        existingToken.setUsedAt(OffsetDateTime.now());
        return emailVerificationTokenRepository.save(existingToken);
    }
}
