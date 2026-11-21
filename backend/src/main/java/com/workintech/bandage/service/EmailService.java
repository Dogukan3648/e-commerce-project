package com.workintech.bandage.service;

public interface EmailService {
    void sendVerificationEmail(String to,String verificationLink);
}
