package com.intuit.assignment.controller;

import com.intuit.assignment.exception.UserNotFoundException;
import com.intuit.assignment.model.User;
import com.intuit.assignment.repository.UserRepository;
import com.intuit.assignment.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        if (!isValidUser(user)) {
            return ResponseEntity.badRequest().body("Invalid userId"); // Returns 400 Bad Request if user data is invalid
        }
        if (userRepository.existsById(user.getUserId())) {
            return ResponseEntity.badRequest().body("User with this user ID already exists"); // Return 400 Bad Request with error message
        }

        User createdUser = userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User user) {
        User u = userService.loginUser(user.getUserId());
        if (u == null) {
            throw new UserNotFoundException("User not found with ID: " + user.getUserId());
        }
        return ResponseEntity.ok(u);
    }

    private boolean isValidUser(User user) {
        if (user == null || user.getUserId() == null || user.getUserId().isEmpty()) {
            return false; // Invalid if username is null or empty
        }
        return true; // If all validation checks pass
    }


}
