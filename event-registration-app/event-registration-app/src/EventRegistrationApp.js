import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventList from './EventList';
import SelectedEvents from './SelectedEvents';
import { toast } from 'react-toastify';
import { useToast } from './useToast';


function EventRegistrationApp({ userId }) {
    const [events, setEvents] = useState([]);
    const [selectedEvents, setSelectedEvents] = useState([]);
    const { showError } = useToast();
    
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all events from the backend
                const eventsResponse = await axios.get('http://localhost:8080/api/events');
                setEvents(eventsResponse.data);
    
                // Fetch registered events for the user
                if (userId) {
                    const registeredResponse = await axios.get(`http://localhost:8080/api/events/registered?userId=${userId}`);
                    const registeredEventIds = registeredResponse.data.map(event => event.id);
                    setSelectedEvents(registeredEventIds);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                showError('Error fetching data.');
            }
        };
    
        fetchData();
    }, [userId, showError]);


       // Function to check if an event conflicts with already selected events
       const hasConflict = (eventId) => {
        const selectedEventTimes = selectedEvents.map(id => {
            const event = events.find(event => event.id === id);
            return {
                startTime: new Date(event.startTime),
                endTime: new Date(event.endTime)
            };
        });

        const newEvent = events.find(event => event.id === eventId);
        const newEventStartTime = new Date(newEvent.startTime);
        const newEventEndTime = new Date(newEvent.endTime);

        return selectedEventTimes.some(time => {
            return (newEventStartTime >= time.startTime && newEventStartTime < time.endTime) ||
                   (newEventEndTime > time.startTime && newEventEndTime <= time.endTime) ||
                   (newEventStartTime <= time.startTime && newEventEndTime >= time.endTime);
        });
    };

    // Function to add or remove event from selectedEvents
    const toggleSelectedEvent =  (eventId) => {

        if (selectedEvents.includes(eventId)) {
            unregisterEvent(eventId);
            setSelectedEvents(selectedEvents.filter(id => id !== eventId));
        }  else if(selectedEvents.length < 3 && !hasConflict(eventId)) {
            registerEvent(eventId);
            setSelectedEvents([...selectedEvents, eventId]);
        } else if (selectedEvents.length >= 3) {
            showError('You can only select up to 3 events.');
        } else {
            showError('Event timings conflict with already selected events.');
        }
    };

    // Function to register the user for an event
    const registerEvent = async (eventId) => {
        try {
            // Make a POST request to register the event
            const response = await axios.post(`http://localhost:8080/api/events/register?userId=${userId}&eventId=${eventId}`);
            // Handle success
            console.log('Event registered successfully:', response.data);
            toast.success('Event registered successfully.');
            setSelectedEvents([...selectedEvents, eventId]);
        } catch (error) {
            // Handle error
            console.error('Error registering event:', error.response);
            toast.error('Error registering event.');
        }
    };

    // Function to unregister the user from an event
    const unregisterEvent = async (eventId) => {
        try {
            // Make a POST request to unregister the event
            const response = await axios.post(`http://localhost:8080/api/events/unregister?userId=${userId}&eventId=${eventId}`);
            // Handle success
            console.log('Event unregistered successfully:', response.data);
            toast.success('Event unregistered successfully.');
        } catch (error) {
            // Handle error
            console.error('Error unregistering event:', error.response);
            toast.error('Error unregistering event.');
        }
    };

    return (
        <div className="event-registration-app">
            <div className="container">
                <div className="event-list-container">
            <EventList events={events} selectedEvents={selectedEvents} toggleSelectedEvent={toggleSelectedEvent} />
            </div>
            <div className="selected-events-container">
            <SelectedEvents events={events} selectedEvents={selectedEvents} toggleSelectedEvent={toggleSelectedEvent} />
            </div>
            </div>
         </div>    
    );
}

export default EventRegistrationApp;
