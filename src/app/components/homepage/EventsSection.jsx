"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import eventsData from "../../data/eventsData.json";

const EventsSection = () => {
  const [isArabic] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll(".event-card");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="events-section-wrapper">
      <div className="events-section">
        <div className="events-container">
          <div className="events-header">
            <span className="events-subtitle">{isArabic ? "مواسمنا" : "Our Seasons"}</span>
            <h2 className="events-title">{isArabic ? "رحلة الإلهام" : "Journey of Inspiration"}</h2>
            <p className="events-description">
              {isArabic
                ? "اكتشف رحلتنا الملهمة عبر مواسم TEDx طبري الحجاز المختلفة. كل موسم يجلب معه أفكارًا جديدة وقصصًا مؤثرة من مجتمعنا، تعكس تنوع وإبداع المواهب المحلية."
                : "Discover our inspiring journey through the different seasons of TEDx Tabary ElHegaz. Each season brings new ideas and impactful stories from our community, reflecting the diversity and creativity of local talents."}
            </p>
          </div>
          <div className="events-grid">
            {eventsData.events.map((event) => (
              <div key={event.id} className="event-card ">
                <Image
                  src={event.image}
                  alt={`Event Thumbnail - ${event.name}`}
                  width={400}
                  height={225}
                  className="event-image"
                  style={{ objectFit: 'cover', width: '100%', height: '225px' }}
                />
                <div className="event-content">
                  <h3 className="event-name">{event.name}</h3>
                  <p className="event-season">{event.season}</p>
                  <p className="event-date">{event.date}</p>
                  <span className={`event-status ${event.status === "قريباً" ? "soon" : "ended"}`}>
                    {event.status}
                  </span>
                  <Link
                    href={event.id === 3 ? "/event-3" : `/events/${event.id}`}
                    className={`event-link ${event.id === 3 ? "event-link-green" : ""}`}
                  >
                    {event.id === 3 ? (isArabic ? "حجز التذكرة" : "Book Ticket") : (isArabic ? "التفاصيل" : "Details")}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;

