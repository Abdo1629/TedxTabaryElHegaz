"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function SponsorsSection() {
    const sponsorLogos = [
        "/images/Sponsors/1.jpg",
        "/images/Sponsors/2.jpg",
        "/images/Sponsors/3.jpg",
        "/images/Sponsors/4.jpg",
        "/images/Sponsors/5.jpg",
        "/images/Sponsors/6.jpg",
        "/images/Sponsors/7.jpg",
        "/images/Sponsors/8.jpg",
        "/images/Sponsors/9.jpg",
        "/images/Sponsors/10.jpg",
        "/images/Sponsors/11.jpg",
        "/images/Sponsors/12.jpg",
        "/images/Sponsors/13.jpg",
        "/images/Sponsors/14.jpg",
        "/images/Sponsors/15.jpg",
        "/images/Sponsors/16.jpg",
        "/images/Sponsors/17.jpg",
    ];

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

        const titleElements = document.querySelectorAll(".section-title, .fadeSponsor");
        titleElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect(); // تنظيف المراقب عند إزالة المكون
    }, []);

    return (
        <div className="events-container">
            <div className="margintop"></div>
                <span className="section-title arabic-content">
          الشركاء والرعاة
        </span>
            <div className="sponsors-container">
                {/* Section Title */}
                <span
                    className="section-title english-content"
                    style={{ display: "none" }}
                >
          Partners & Sponsors
        </span>

                {/* Sponsor Logos */}
                <div className="sponsor-logos">
                    {sponsorLogos.map((logo, index) => (
                        <a key={index} className={`fadeSponsor fadeSponsor${index + 1}`}>
                            <Image
                                src={logo}
                                alt={`Sponsor Logo ${index + 1}`}
                                loading="lazy"
                                width={200}
                                height={200}
                            />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
