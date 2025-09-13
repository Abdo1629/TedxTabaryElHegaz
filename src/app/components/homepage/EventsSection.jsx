import Image from "next/image";
import Link from "next/link";
import eventCardsData from "../../data/eventsData";

const generateStars = () => {
  const stars = [];
  for (let i = 0; i < 10; i++) {
    const randomTop = Math.random() * -30;
    const randomRight = Math.random() * 70 + 30;
    const randomDelay = Math.random() * 2;
    stars.push(
      <div
        key={i}
        className="shooting-star"
        style={{
          top: `${randomTop}px`,
          right: `${randomRight}%`,
          animationDelay: `${randomDelay}s`,
        }}
      ></div>
    );
  }
  return stars;
};

const EventsSection = () => {
  const { events } = eventCardsData;

  return (
    <div className="events-container" id="events-section">
      <div className="events-card">
        <div className="content arabic-content">
          <span>مستمرون</span>
          <div className="EventsHeader">
            <h2>الفعاليات</h2>
          </div>
        </div>
      </div>

      <div className="events-cards">
        {events.map((event) => (
          <Link href={event.id === 3 ? `/event-3` : `/events/${event.id}`} key={event.id} style={{ textDecoration: "none" }}>
              <div
                className={`event-card ${event.id === 3 ? "special" : ""}`}
              >
                <Image
                  src={event.image}
                  alt={event.name}
                  width={260}
                  height={260}
                  className="event-image"
                />
                <div className="event-content">
                  <h3 className="event-title">{event.name}</h3>
                  <h4 className="season">{event.season}</h4>
                  <p className={`event-state ${event.id === 3 ? "ended" : ""}`}>{event.status}</p>
                  <div className="event-meta">
                    <span className="event-date">{event.date}</span>
                  </div>
                </div>
                {event.id === 3 && generateStars()}
              </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventsSection;
