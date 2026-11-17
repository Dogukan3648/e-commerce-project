package com.workintech.bandage.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class BandageException extends RuntimeException {
    private HttpStatus httpStatus;

    public BandageException(String message,HttpStatus httpStatus){
        super(message);
        this.httpStatus = httpStatus;
    }
}
