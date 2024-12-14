"use client";

import React, { useEffect, useRef, useState } from "react";
import { Eye, Users, HeartHandshake } from "lucide-react"; // استيراد أيقونات Eye و Users و HeartHandshake

export default function StatsSection() {
    return (
        <div className="events-container">
            <div className="stats-section">
                <div className="margintop"></div>
                <div className="stats-container">
                    <Stat
                        icon={<Eye style={{ width: 51, height: 49 }} />}
                        value={110988}
                        label="عدد المشاهدات"
                    />
                    <Stat
                        icon={<Users style={{ width: 43, height: 43 }} />}
                        value={45}
                        label="عدد المتحدثين المشاركين"
                    />
                    <Stat
                        icon={<HeartHandshake style={{ width: 43, height: 47 }} />}
                        value={31}
                        label="عدد الرعاة"
                    />
                </div>
            </div>
        </div>
    );
}

function Stat({ icon, value, label, suffix = "" }) {
    const [isVisible, setIsVisible] = useState(false);
    const [count, setCount] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isVisible) {
            const duration = 2000;
            const steps = 60;
            const stepValue = value / steps;
            const stepDuration = duration / steps;

            let currentStep = 0;

            const timer = setInterval(() => {
                if (currentStep < steps) {
                    setCount(Math.round(stepValue * currentStep));
                    currentStep++;
                } else {
                    setCount(value);
                    clearInterval(timer);
                }
            }, stepDuration);

            return () => clearInterval(timer);
        }
    }, [isVisible, value]);

    return (
        <div
            ref={ref}
            className={`stat-card ${isVisible ? "visible" : ""}`}
        >
            <div className="stat-icon">{icon}</div>
            <div className="stat-value">
                {new Intl.NumberFormat().format(count)}
                {suffix}
            </div>
            <p className="stat-label">{label}</p>
        </div>
    );
}
