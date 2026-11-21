
package com.workintech.bandage.event;

import com.workintech.bandage.service.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Slf4j
@Component
public class VerificationEmailEventListener {

    private final EmailService emailService;
    private final String baseUrl;

    public VerificationEmailEventListener(
            EmailService emailService,
            @Value("${app.base-url:http://localhost:8080}") String baseUrl) {
        this.emailService = emailService;
        this.baseUrl = baseUrl;
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handle(VerificationEmailRequestedEvent event) {
        String verificationLink = baseUrl + "/verify-email?token=" + event.token();

        try {
            emailService.sendVerificationEmail(event.email(),verificationLink);
        }catch (MailException exception){
            log.error("Verification email could not be sent",exception);
        }
    }
}
