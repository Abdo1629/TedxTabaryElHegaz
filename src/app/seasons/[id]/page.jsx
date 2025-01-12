"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import seasonsData from "../../data/seasonsData.json";

export default function SeasonPage() {
  const params = useParams();
  const seasonId = params.id;
  const season = seasonsData.seasons[`season${seasonId}`];

  if (!season) {
    return <div className="content-error-container">الموسم غير موجود</div>;
  }

  return (
    <div className="speaker-layout-page">
      <div className="speaker-layout-container">
        <Link href="/seasons" className="layout-return-button">
          <span>عودة</span>
        </Link>
        
        <div className="season-content">
          <h1 className="season-title">{season.name}</h1>
          
          <div className="season-meta">
            <div className="meta-item">
              <span className="meta-label">التاريخ:</span>
              <span className="meta-value">{season.date}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">المكان:</span>
              <span className="meta-value">{season.venue}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">عدد الحضور:</span>
              <span className="meta-value">{season.attendees}</span>
            </div>
          </div>

          <div className="season-description">
            <h2>عن الموسم</h2>
            <p>{season.description}</p>
          </div>

          <div className="season-highlights">
            <h2>أبرز النقاط</h2>
            <ul>
              {season.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>

          <div className="season-speakers">
            <h2>المتحدثون</h2>
            <div className="speakers-grid">
              {season.speakers.map((speaker, index) => (
                <div key={index} className="speaker-card">
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    width={200}
                    height={200}
                    className="speaker-image"
                  />
                  <h3 className="speaker-name">{speaker.name}</h3>
                  <p className="speaker-topic">{speaker.topic}</p>
                </div>
              ))}
            </div>
          </div>

          {season.gallery.length > 0 && (
            <div className="season-gallery">
              <h2>معرض الصور</h2>
              <div className="gallery-grid">
                {season.gallery.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`صورة من ${season.name}`}
                    width={300}
                    height={200}
                    className="gallery-image"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

