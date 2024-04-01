package com.intuit.assignment.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserOrEventNotFoundException extends RuntimeException {
    public UserOrEventNotFoundException(String message) {
        super(message);
    }
}