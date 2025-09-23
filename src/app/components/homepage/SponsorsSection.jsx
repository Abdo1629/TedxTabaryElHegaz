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
        "/images/Sponsors/18.jpg",
        "/images/Sponsors/19.jpg",
        "/images/Sponsors/20.jpg",
        "/images/Sponsors/21.jpg",
        "/images/Sponsors/22.jpg",
        "/images/spon1.jpg",
        "/images/spon2.jpeg",
        "/images/spon3.jpg",
        "/images/spon4.jpg",
        "/images/spon5.jpg",
        "/images/spon6.jpg",
        "/images/spon7.jpg",
        "/images/Real-Sponsors/DigitalWeb.jpg"
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
        <div className="margintop events-container">
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
                        <div key={index} className={`fadeSponsor fadeSponsor${index + 1}`}>
                            <Image
                                src={logo}
                                alt={`Sponsor Logo ${index + 1}`}
                                loading="lazy"
                                width={200}
                                height={200}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
