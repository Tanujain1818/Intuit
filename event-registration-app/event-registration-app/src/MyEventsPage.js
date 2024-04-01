import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyEventsPage({ userId }) {
    const [registeredEvents, setRegisteredEvents] = useState([]);

    useEffect(() => {
        if (!userId) return;
        // Fetch registered events for the user from the backend
        axios.get(`http://localhost:8080/api/events/registered?userId=${userId}`)
            .then(response => setRegisteredEvents(response.data))
            .catch(error => console.error('Error fetching registered events:', error));
    }, [userId]);

       // Function to format date and time
       const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure 2-digit minutes
        const amPm = date.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM/PM
        return `${date.toLocaleDateString()} ${hours}:${minutes} ${amPm}`; // Format date and time
    };

    return (
        <div className="my-events-page" >
            <h2 style={{ marginLeft: '40px' }}>My Events</h2>
            <ul style={{ listStyle: 'none' }}>
                {registeredEvents.map(event => (
                    <li key={event.id} className="event-card" >
                        <div className="event-details">
                            <div className="event-name">{event.eventName}</div>
                            <div className="event-category">{event.eventCategory}</div>
                            <div className="event-time">{formatDate(event.startTime)} - {formatDate(event.endTime)}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyEventsPage;
