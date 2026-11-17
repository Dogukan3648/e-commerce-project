package com.workintech.bandage.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BandageException.class)
    public ResponseEntity<BandageErrorResponse> handleBandageException(BandageException exception){
        log.error("Bandage error: {}",exception.getMessage());

        BandageErrorResponse response = new BandageErrorResponse(exception.getMessage());

        return new ResponseEntity<>(response,exception.getHttpStatus());
    }
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<BandageErrorResponse> handleIllegalArgumentException(IllegalArgumentException exception){
        log.error("Invalid argument: {}",exception.getMessage());
        BandageErrorResponse response = new BandageErrorResponse(exception.getMessage());

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<BandageErrorResponse> handleException(Exception exception){
        log.error("Unexpected error",exception);

        BandageErrorResponse response = new BandageErrorResponse("An unexpected error occurred.");

        return new ResponseEntity<>(response,HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<BandageErrorResponse> handleValidationException(MethodArgumentNotValidException exception) {
        log.error("Validation error: {}",exception.getMessage());

        BandageErrorResponse response = new BandageErrorResponse("Invalid request data");

        return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
    }
}
