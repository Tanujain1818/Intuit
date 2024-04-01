import React from 'react';
import './EventList.css';
import formatTime from './utils';

function EventList({ events, selectedEvents, toggleSelectedEvent }) {
    return (
        <div className="event-list">
            <h2>All Events</h2>
            <div className="event-cards">
                {events.map(event => (
                    <div key={event.id} className={`event-card ${selectedEvents.includes(event.id) ? 'selected' : ''}`}>
                        <div className="event-info">
                            <div className="event-name">{event.eventName}</div>
                            <div className="event-category">{event.eventCategory}</div>
                            <div className="event-timings">{formatTime(event.startTime)} - {formatTime(event.endTime)}</div>
                        </div>
                        <button onClick={() => toggleSelectedEvent(event.id)}>
                            {selectedEvents.includes(event.id) ? 'Remove' : 'Select'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventList;
