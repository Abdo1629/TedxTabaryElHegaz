"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function VideosSection() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.2 } // الأنيميشن يبدأ عند ظهور 20% من العنصر
        );

        const elements = document.querySelectorAll(".fade-in, .slide-up");
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect(); // تنظيف المراقب عند إزالة المكون
    }, []);

    return (
        <div className="events-container">
            <div className="content arabic-content fade-in">
                <span>شاهد الأن</span>
                <div className="EventsHeader">
                    <h2>مقاطع الفيديو</h2>
                    <Link
                        href="https://youtube.com/playlist?list=PLcpez9tyjp7Rb7gMoL8QzxXd8-Wz-agv1&si=VRml5RdXQCtURKQi"
                        target="_blank"
                    >
                        <button className="btn slide-up">شاهد المزيد</button>
                    </Link>
                </div>
            </div>

            <div className="sponsors-container">
                <div className="videos">
                    <div className="vid-card slide-up">
                        <iframe
                            className="item"
                            src="https://www.youtube.com/embed/f0TqIzm9rYc"
                            loading="lazy"
                            allowFullScreen
                        />
                        <h5>لغتنا هويتنا</h5>
                    </div>
                    <div className="vid-card slide-up">
                        <iframe
                            className="item"
                            src="https://www.youtube.com/embed/2xFoxG3HFmw"
                            loading="lazy"
                            allowFullScreen
                        />
                        <h5>عائلتك ومجتمعك اولاً</h5>
                    </div>
                    <div className="vid-card slide-up">
                        <iframe
                            className="item"
                            src="https://www.youtube.com/embed/Os2k62pMn2Y"
                            loading="lazy"
                            allowFullScreen
                        />
                        <h5>هرمون الدوبامين</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}
