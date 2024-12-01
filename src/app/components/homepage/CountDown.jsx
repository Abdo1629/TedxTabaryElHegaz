"use client"
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Countdown() {
  const [countdown, setCountdown] = useState({
    weeks: "00",
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const eventDate = new Date("Feb 15, 2025 10:00:00");
    const interval = setInterval(() => {
      const now = new Date();
      const diff = eventDate - now;

      if (diff <= 0) {
        clearInterval(interval);
      } else {
        const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
        const days = Math.floor(
          (diff % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24)
        );
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setCountdown({ weeks, days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="countdown-bar">
      <div className="countdown-overlay"></div>
      <div className="countdown-text">
        <h2 id="countdown "></h2>
        <div className="countdowns">
          <div className="box">
            <h3>{countdown.weeks}</h3>
            <h3>أسابيع</h3>
          </div>
          <div className="box">
            <h3>{countdown.days}</h3>
            <h3>أيام</h3>
          </div>
          <div className="box">
            <h3>{countdown.hours}</h3>
            <h3>ساعات</h3>
          </div>
          <div className="box">
            <h3>{countdown.minutes}</h3>
            <h3>دقائق</h3>
          </div>
          <div className="box">
            <h3>{countdown.seconds}</h3>
            <h3>ثواني</h3>
          </div>
        </div>
      </div>
      <div className="register-btn">
        <Link href="/event-3" className="btn">
          سجل الأن
        </Link>
      </div>
    </div>
  );
}
