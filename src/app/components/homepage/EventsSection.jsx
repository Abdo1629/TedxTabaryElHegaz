"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const EventsSection = () => {
  const [isArabic, setIsArabic] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            }
          });
        },
        { threshold: 0.2 } // يبدأ الأنيميشن عند ظهور 20% من العنصر
    );

    const elements = document.querySelectorAll(".fadeUp1, .fadeUp2, .fadeUp3");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
      <div className="margintop">
        <div className="events-container">
          <div
              className={
                isArabic ? "fadeUp1 arabic-content" : "fadeUp1 english-content"
              }
          >
            <span>{isArabic ? "مُستمرون" : "Events"}</span>
            <div className="EventsHeader">
              <h2>{isArabic ? "المواسم" : "Seasons"}</h2>
            </div>
          </div>
        </div>
        <div className="events-cards">
          {/* Event 1 */}
          <Link href="#" className="">
            <button className="fadeUp2 card">
              <Image
                  src="/images/tred.jpg"
                  alt="Event Thumbnail"
                  width={500}
                  height={300}
                  className="thumb"
              />
              <div
                  className={
                    isArabic
                        ? "card-info arabic-content"
                        : "card-info english-content"
                  }
              >
                <div className="card-name">
                  <p>ليس سوى ان تريد</p>
                  <h4>{isArabic ? "الموسم 1" : "Season 1"}</h4>
                  <h4 className="ended">{isArabic ? "إنتهى" : "Ended"}</h4>
                </div>
                <span>30/10/2021</span>
              </div>
            </button>
          </Link>

          {/* Event 2 */}
          <Link href="#" className="">
            <button className="fadeUp3 card">
              <Image
                  src="/images/3azm.jpg"
                  alt="Event Thumbnail"
                  width={500}
                  height={300}
                  className="thumb"
              />
              <div
                  className={
                    isArabic
                        ? "card-info arabic-content"
                        : "card-info english-content"
                  }
              >
                <div className="card-name">
                  <p>على قدر أهل العزم</p>
                  <h4>{isArabic ? "الموسم 2" : "Season 2"}</h4>
                  <h4 className="ended">{isArabic ? "إنتهى" : "Ended"}</h4>
                </div>
                <span>27/8/2022</span>
              </div>
            </button>
          </Link>

          {/* Event 3 */}
          <Link href="event-3.html" className="">
            <button className="fadeUp3 card-soon">
              <Image
                  src="/images/3azm.jpg"
                  alt="Event Thumbnail"
                  width={500}
                  height={300}
                  className="thumb"
              />
              <div
                  className={
                    isArabic
                        ? "card-info arabic-content"
                        : "card-info english-content"
                  }
              >
                <div className="card-name">
                  <p>عودُ على بدء</p>
                  <h4>{isArabic ? "الموسم 3" : "Season 3"}</h4>
                  <h4 className="soon">{isArabic ? "قريباً" : "Soon"}</h4>
                </div>
                <span>15/2/2025</span>
              </div>
            </button>
          </Link>
        </div>
      </div>
  );
};

export default EventsSection;
