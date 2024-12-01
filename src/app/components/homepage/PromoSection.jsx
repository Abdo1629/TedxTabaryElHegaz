"use client";
import { useEffect } from "react";

const PromoSection = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            }
          });
        },
        { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".goUp");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
      <section className="promo-section goUp">
        <div className="events-container">
          <div className="english-content" style={{ display: "none" }}>
            <video className="promo-video" autoPlay muted loop>
              <source src="promo1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="arabic-content">
            <video className="promo-video" autoPlay muted loop>
              <source
                  src="https://res.cloudinary.com/dbgdvnkev/video/upload/v1730659957/promo1_arcngy.mp4"
                  type="video/mp4"
              />
              متصفحك لا يدعم علامة الفيديو.
            </video>
          </div>
        </div>
      </section>
  );
};

export default PromoSection;
