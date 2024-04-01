package com.intuit.assignment.repository;

import com.intuit.assignment.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    // Method to find all events
    List<Event> findAll();

}