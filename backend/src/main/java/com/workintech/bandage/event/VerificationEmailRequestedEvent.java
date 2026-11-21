package com.workintech.bandage.event;

public record VerificationEmailRequestedEvent(String email,String token) {
}
