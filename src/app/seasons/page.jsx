import Link from "next/link";
import Image from "next/image";
import seasonsData from "../data/seasonsData.json";

export default function SeasonsPage() {
  const seasons = Object.entries(seasonsData.seasons);

  return (
    <div className="events-page">
      <div className="events-container">
        <h1 className="page-title">مواسم TEDx طبري الحجاز</h1>
        <div className="events-grid">
          {seasons.map(([key, season]) => (
            <div key={key} className="event-card">
              {season.gallery.length > 0 ? (
                <Image
                  src={season.gallery[0]}
                  alt={season.name}
                  width={400}
                  height={200}
                  className="event-image"
                />
              ) : (
                <Image
                  src="/placeholder.svg"
                  alt={season.name}
                  width={400}
                  height={200}
                  className="event-image"
                />
              )}
              <div className="event-content">
                <h2 className="event-title">{season.name}</h2>
                <div className="event-meta">
                  <span className="event-date">{season.date}</span>
                  <span className="event-attendees">{season.attendees}</span>
                </div>
                <p className="event-description">{season.description.slice(0, 100)}...</p>
                <Link href={`/seasons/${season.id}`} className="read-more">
                  التفاصيل
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

