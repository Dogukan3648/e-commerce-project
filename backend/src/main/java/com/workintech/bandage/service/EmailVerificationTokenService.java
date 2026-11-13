package com.workintech.bandage.service;

import com.workintech.bandage.entity.EmailVerificationToken;

public interface EmailVerificationTokenService {
    EmailVerificationToken getTokenByHash(String tokenHash);
    EmailVerificationToken save(EmailVerificationToken emailVerificationToken);
    EmailVerificationToken markTokenAsUsed(long id);
}
