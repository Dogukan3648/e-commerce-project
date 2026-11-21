package com.workintech.bandage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    private JavaMailSender mailSender;

    @Autowired
    public EmailServiceImpl(JavaMailSender mailSender){
        this.mailSender = mailSender;
    }

    @Override
    public void sendVerificationEmail(String to, String verificationLink) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(to);
        message.setSubject("Bandage - E-posta Doğrulama");
        message.setText("E-posta adresinizi doğrulamak için aşağıdaki bağlantıya tıklayın:\n\n"+ verificationLink +
                "\n\nBu bağlantı 24 saat geçerlidir.");
        mailSender.send(message);
    }
}
