import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import eventsData from '../data/eventsData.json';

const EventsPage = () => {
  return (
    <div className="events-page">
      <div className="events-container">
        <h1 className="page-title">فعاليات TEDx طبري الحجاز</h1>
        <div className="events-grid">
          {eventsData.events.map((event) => (
            <div key={event.id} className="event-card">
              <Image
                src={event.image}
                alt={event.name}
                width={400}
                height={200}
                className="event-image"
              />
              <div className="event-content">
                <h2 className="event-title">{event.name}</h2>
                <p className="event-season">{event.season}</p>
                <div className="event-meta">
                  <span className="event-date">{event.date}</span>
                  <span className={`event-status ${event.status === "قريباً" ? "soon" : "ended"}`}>
                    {event.status}
                  </span>
                </div>
                <Link href={`/events/${event.id}`} className="read-more">
                  التفاصيل
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;

