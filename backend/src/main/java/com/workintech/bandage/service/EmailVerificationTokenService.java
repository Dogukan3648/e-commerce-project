package com.workintech.bandage.service;

import com.workintech.bandage.entity.EmailVerificationToken;
import com.workintech.bandage.entity.User;

import java.util.Optional;

public interface EmailVerificationTokenService {
    EmailVerificationToken getTokenByHash(String tokenHash);
    EmailVerificationToken save(EmailVerificationToken emailVerificationToken);
    EmailVerificationToken markTokenAsUsed(long id);
    String createVerificationToken(User user);
    void verifyEmail(String token);
    void deleteTokenByUserId(Long userId);
    Optional<EmailVerificationToken> getLatestTokenByUserId(Long userId);
}
