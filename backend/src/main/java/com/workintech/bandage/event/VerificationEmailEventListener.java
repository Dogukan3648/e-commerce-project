package com.workintech.bandage.event;

import com.workintech.bandage.service.EmailService;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
public class VerificationEmailEventListener {
    private final EmailService emailService;

    public VerificationEmailEventListener(EmailService emailService){
        this.emailService = emailService;
    }
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handle(VerificationEmailRequestedEvent event){
        String verificationLink = "http://localhost:8080/verify-email?token=" + event.token();
        emailService.sendVerificationEmail(event.email(),verificationLink);
    }
}
