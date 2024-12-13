"use client";

import React, { useEffect, useRef, useState } from "react";
import { Users, Gift, Layers } from "lucide-react";

export default function StatsSection() {
    return (
        <div className="events-container">
            <div className="stats-section">
                <div className="margintop"></div>
                <div className="stats-container">
                    <Stat
                        icon={<Layers />}
                        value={5404}
                        label="Community-made UI elements"
                    />
                    <Stat
                        icon={<Gift />}
                        value={100}
                        suffix="%"
                        label="Free for personal and commercial use"
                    />
                    <Stat
                        icon={<Users />}
                        value={114977}
                        label="Contributors to the community"
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
