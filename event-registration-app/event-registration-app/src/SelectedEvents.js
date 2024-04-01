import React from 'react';
import './EventList.css';
import formatTime from './utils';

function SelectedEvents({ events, selectedEvents, toggleSelectedEvent }) {
    return (
        <div className="selected-event-list">
            <h2>My Selected Events</h2>
            <div className="event-cards">
                {events.filter(event => selectedEvents.includes(event.id)).map(event => (
                    <div key={event.id} className="event-card selected">
                        <div className="event-info">
                            <div className="event-name">{event.eventName}</div>
                            <div className="event-category">{event.eventCategory}</div>
                            <div className="event-timings">{formatTime(event.startTime)} - {formatTime(event.endTime)}</div>
                        </div>
                        <button onClick={() => toggleSelectedEvent(event.id)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SelectedEvents;
