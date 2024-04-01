package com.intuit.assignment.service;

import com.intuit.assignment.exception.*;
import com.intuit.assignment.model.Event;
import com.intuit.assignment.model.User;
import com.intuit.assignment.repository.EventRepository;
import com.intuit.assignment.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.List;
import java.util.Set;

@Service
public class EventService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    // Method to get all events
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

     //Method to get registered events for a user
    public Set<Event> getRegisteredEvents(String userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return user.getRegisteredEvents();
        }else {
            throw new UserNotFoundException("User not found with ID: " + userId);
        }

    }

    // Method to register a user for an event
    public ResponseEntity<?> registerEvent(String userId, Long eventId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        Optional<Event> optionalEvent = eventRepository.findById(eventId);

        if (optionalUser.isPresent() && optionalEvent.isPresent()) {
            User user = optionalUser.get();
            Event event = optionalEvent.get();

            // Check if the user is already registered for the event
            if (user.getRegisteredEvents().contains(event)) {
                throw new UserAlreadyRegisteredForEventException("User already registered for the event");
            }

            // Register the user for the event
            user.getRegisteredEvents().add(event);
            userRepository.save(user);

        } else {
                throw new UserOrEventNotFoundException("User or Event not found");
        }
        return ResponseEntity.ok().build();
    }


    // Method to unregister a user from an event
    public ResponseEntity<?> unregisterEvent(String userId, Long eventId) {

        // Retrieve the user from the repository
        Optional<User> optionalUser = userRepository.findById(userId);
        Optional<Event> optionalEvent = eventRepository.findById(eventId);

        if (optionalUser.isPresent() && optionalEvent.isPresent()) {
            User user = optionalUser.get();
            Event event = optionalEvent.get();

            // Check if the user is registered for the event
            if (user.getRegisteredEvents().contains(event)) {
                // UnRegister the user from the event
                user.getRegisteredEvents().remove(event);
                userRepository.save(user);
            } else {
                throw new UserNotRegisteredForEventException("User not registered for the event");
            }
        } else {
            throw new UserOrEventNotFoundException("User or Event not found");
        }
        return ResponseEntity.ok().build();
    }


    }



