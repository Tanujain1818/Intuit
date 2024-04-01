package com.intuit.assignment.service;

import com.intuit.assignment.model.User;
import com.intuit.assignment.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User loginUser(String userId) {
        return userRepository.findByUserId(userId);
    }

}
