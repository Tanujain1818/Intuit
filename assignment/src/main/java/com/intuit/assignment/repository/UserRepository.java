package com.intuit.assignment.repository;

import com.intuit.assignment.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    User findByUserId(String userId);
    List<User> findAll();
}

