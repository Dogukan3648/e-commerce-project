package com.workintech.bandage.service;

import com.workintech.bandage.entity.EmailVerificationToken;
import com.workintech.bandage.entity.User;
import com.workintech.bandage.exception.BandageException;
import com.workintech.bandage.repository.EmailVerificationTokenRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.OffsetDateTime;
import java.util.Base64;
import java.util.HexFormat;
import java.util.Optional;

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

        OffsetDateTime now = OffsetDateTime.now();

        if (existingToken.getExpiresAt() == null
                || !existingToken.getExpiresAt().isAfter(now)) {
            throw new BandageException(
                    "Verification token has expired",
                    HttpStatus.BAD_REQUEST
            );
        }

        existingToken.setUsedAt(now);

        return emailVerificationTokenRepository.save(existingToken);
    }

    @Override
    public String createVerificationToken(User user) {
        if (user == null || user.getId() == null){
            throw new BandageException("Invalid user",HttpStatus.BAD_REQUEST);
        }
        byte[] randomBytes = new byte[32];
        new SecureRandom().nextBytes(randomBytes);

        String token = Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);

        String tokenHash;

        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(token.getBytes(StandardCharsets.UTF_8));
            tokenHash = HexFormat.of().formatHex(hashBytes);
        }catch (NoSuchAlgorithmException exception){
            throw new IllegalStateException("SHA-256 not available",exception);
        }
        EmailVerificationToken verificationToken = new EmailVerificationToken();
        verificationToken.setUser(user);
        verificationToken.setTokenHash(tokenHash);
        verificationToken.setExpiresAt(OffsetDateTime.now().plusHours(24));
        save(verificationToken);

        return token;
    }

    @Override
    @Transactional
    public void verifyEmail(String token) {
        if (token == null || token.isBlank()) {
            throw new BandageException("Invalid verification token",HttpStatus.BAD_REQUEST);
        }
        String tokenHash;
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(token.getBytes(StandardCharsets.UTF_8));

            tokenHash = HexFormat.of().formatHex(hashBytes);
        }catch (NoSuchAlgorithmException exception){
            throw new IllegalStateException("SHA-256 not available",exception);
        }
        EmailVerificationToken verificationToken = getTokenByHash(tokenHash);
        EmailVerificationToken usedToken = markTokenAsUsed(verificationToken.getId());

        usedToken.getUser().setEmailVerified(true);
    }

    @Override
    @Transactional
    public void deleteTokenByUserId(Long userId) {
        emailVerificationTokenRepository.deleteByUserId(userId);
    }

    @Override
    public Optional<EmailVerificationToken> getLatestTokenByUserId(Long userId) {
        return emailVerificationTokenRepository.findTopByUserIdOrderByCreatedAtDesc(userId);
    }


}
