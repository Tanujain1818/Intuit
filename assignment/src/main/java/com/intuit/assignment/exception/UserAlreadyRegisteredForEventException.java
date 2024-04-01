
package com.intuit.assignment.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class UserAlreadyRegisteredForEventException extends RuntimeException {
    public UserAlreadyRegisteredForEventException(String message) {
        super(message);
    }
}