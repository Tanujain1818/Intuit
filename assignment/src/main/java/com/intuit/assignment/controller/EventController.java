package com.intuit.assignment.controller;

import com.intuit.assignment.model.Event;
import com.intuit.assignment.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/events")
public class EventController {
    @Autowired
    private EventService eventService;

    // API to get all events
    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }

    // API to get registered events for a user
    @GetMapping("/registered")
    public ResponseEntity<Set<Event>> getRegisteredEvents(@RequestParam String userId) {
        Set<Event> events = eventService.getRegisteredEvents(userId);
        return ResponseEntity.ok(events);
    }

    // API to register a user for an event
    @PostMapping("/register")
    public ResponseEntity<?> registerEvent(@RequestParam String userId, @RequestParam Long eventId) {
        eventService.registerEvent(userId, eventId);
        return ResponseEntity.ok().build();
    }

    // API to unregister a user from an event
    @PostMapping("/unregister")
    public ResponseEntity<?> unregisterEvent(@RequestParam String userId, @RequestParam Long eventId) {
        eventService.unregisterEvent(userId, eventId);
        return ResponseEntity.ok().build();
    }
}
