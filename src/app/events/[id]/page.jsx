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
            <h2
              className="layout-event-season"
              style={{ display: "inline", paddingLeft: "150px" }}
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
              <h3>وصف الحدث</h3>
              <p>{event.description}</p>
            </div>
            <div className="layout-event-speakers"></div>
          </div>
        </div>
        <div className="layout-event-highlights">
          <h3>المتحدثون</h3>
        </div>
        <div className="events-cards">
          {speakers &&
            speakers.map((speaker) => (
              <SpeakerCard key={speaker.name} speaker={speaker} />
            ))}
        </div>
        <div className="layout-event-highlights">
          <h3>أبرز النقاط</h3>
          <ul>
            {event.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </div>
        <div className="layout-event-highlights">
          <h3>صور الحدث</h3>
        </div>
        <div className="events-cards">
          {event.media.map((media) => (
            <Image
              className="event-media"
              key={media}
              src={media}
              width={200}
              height={200}
              alt="صور الحدث"
            />
          ))}
        </div>
        <div className="layout-event-highlights">
          <h3>فيديوهات الحدث</h3>
        </div>
        <div className="events-cards">
          {event.videos.map((videos) => (
            <video
              className="event-media"
              key={videos}
              src={videos}
              width={300}
              height={300}
              controls
              muted
            ></video>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
