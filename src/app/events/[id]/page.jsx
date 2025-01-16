"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import eventsData from "../../data/eventsData.json";
import SpeakerCard from "../../components/speakerspage/SpeakerCard.jsx";
import seasionOne from "../../data/seasionOne.json";
import seasionTwo from "../../data/seasionTwo.json";

const EventPage = () => {
  const params = useParams();
  const eventId = parseInt(params.id);
  const event = eventsData.events.find((e) => e.id === eventId);

  if (!event) {
    return <div className="content-error-container">الحدث غير موجود</div>;
  }

  const speakers =
    eventId === 1
      ? seasionOne.seasionOne
      : eventId === 2
      ? seasionTwo.seasionTwo
      : [];

  return (
    <div className="event-layout-page">
      <div className="event-layout-container">
        <Link href="//#events-section" className="layout-return-button">
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
            <h2
              className="layout-event-season"
              style={{ display: "inline", paddingLeft: "95px" }}
            >
              {event.season}
            </h2>
            <span
              className={`event-state ${event.id === "3" ? "soon" : ""}`}
              style={{ display: "inline" }}
            >
              {event.status}
            </span>
            <div className="layout-event-meta">
              <span className="event-date">{event.date}</span>
            </div>
            <div className="layout-event-description">
              <div className="events-container">
              <span className="section-title arabic-content">
           وصف الحدث
        </span>
        </div>
              <p>{event.description}</p>
            </div>
          </div>
        </div>
        <div className="events-container">
              <span className="section-title arabic-content">
            المتحدثون
        </span>
        <div className="events-cards">
          {speakers &&
            speakers.map((speaker) => (
              <SpeakerCard key={speaker.name} speaker={speaker} />
            ))}
        </div> 
        </div>
        <div className="events-container">
              <span className="section-title arabic-content">
            أبرز النقاط
        </span>
          <ul>
            {event.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </div>
        <div className="events-container">
              <span className="section-title arabic-content">
            صور الحدث
        </span>
        </div>
        <div className="events-cards">
          {event.media.map((media) => (
            <Image
              className="event-media"
              key={media}
              src={media}
              width={180}
              height={180}
              alt="صور الحدث"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
