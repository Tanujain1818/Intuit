
package com.intuit.assignment.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserNotRegisteredForEventException extends RuntimeException {
    public UserNotRegisteredForEventException(String message) {
        super(message);
    }
}
