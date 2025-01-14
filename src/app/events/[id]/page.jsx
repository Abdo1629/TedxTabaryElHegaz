"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import eventsData from "../../data/eventsData.json";

const EventPage = () => {
  const params = useParams();
  const eventId = parseInt(params.id);
  const event = eventsData.events.find((e) => e.id === eventId);

  if (!event) {
    return <div className="content-error-container">الحدث غير موجود</div>;
  }

  return (
    <div className="event-layout-page">
      <div className="event-layout-container">
        <Link href="" className="layout-return-button">
          <span>عودة</span>
        </Link>
        <div className="layout-content-wrapper">
          <div className="layout-image-section">
            <Image
              src={event.image}
              alt={event.name}
              width={400}
              height={400}
              className="layout-event-image"
            />
          </div>
          <div className="layout-info-section">
            <h1 className="layout-event-name">{event.name}</h1>
            <h2 className="layout-event-season">{event.season}</h2>
            <div className="layout-event-meta">
              <span className="event-date">{event.date}</span>
              <span className={`event-status ${event.status === "قريباً" ? "soon" : "ended"}`}>
                {event.status}
              </span>
            </div>
            <div className="layout-event-description">
              <h3>وصف الحدث</h3>
              <p>{event.description}</p>
            </div>
            <div className="layout-event-speakers">
              <h3>المتحدثون</h3>
              <ul>
                {event.speakers.map((speaker, index) => (
                  <li key={index}>{speaker}</li>
                ))}
              </ul>
            </div>
            <div className="layout-event-highlights">
              <h3>أبرز النقاط</h3>
              <ul>
                {event.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;

