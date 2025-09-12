"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Sponsor = {
  id: number;
  name: string;
  tier: string;
  logo: string;
  description: string;
  url?: string;
};

const tierMeta = {
  استراتيجي: { gradient: 'linear-gradient(90deg,#ff2d2d,#ff8d4d)', ring: 'rgba(255,60,60,0.55)' },
  بلاتينيوم: { gradient: 'linear-gradient(90deg,#ff2d2d,#ff8d4d)', ring: 'rgba(255,60,60,0.55)' },
  ذهبي: { gradient: 'linear-gradient(90deg,#ffb347,#ffd452)', ring: 'rgba(255,184,77,0.55)' },
};

export default function SponsorGameCard({ sponsor }: { sponsor: Sponsor }) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !visible) {
            setVisible(true);
            setScore((prev) => prev + 1);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div className="game-wrapper">
      {/* Score bar فوق الكارد */}
      <div className="game-bar">
        🎯 النقاط: {score}
        <div className="progress">
          <div className="fill" style={{ width: `${Math.min(score * 100, 100)}%` }} />
        </div>
      </div>

      <div
        ref={cardRef}
        className={`sponsor-card ${visible ? "visible" : ""}`}
        style={{
          "--tier-ring": tierMeta[sponsor.tier]?.ring || "rgba(0,0,0,0.25)",
        } as React.CSSProperties}
      >
        <div className="header-row">
          <h2 className="sponsor-name">{sponsor.name}</h2>
          <span
            className="badge tier"
            style={{ background: tierMeta[sponsor.tier]?.gradient }}
          >
            {sponsor.tier}
          </span>
        </div>
        <div className="logo-box">
          <Image
            src={sponsor.logo}
            alt={sponsor.name}
            fill
            className="logo-img"
            sizes="(max-width:768px) 140px, 200px"
          />
        </div>
        <p className="desc">{sponsor.description}</p>
      </div>

      <style jsx>{`
        .game-wrapper {margin-bottom: 30px;}
        .game-bar {
          background: #fff;
          padding: 8px 14px;
          border-radius: 12px;
          font-weight: 700;
          margin-bottom: 10px;
          font-size: 14px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
        }
        .progress {
          margin-top: 6px;
          width: 100%;
          height: 6px;
          background: #eee;
          border-radius: 6px;
          overflow: hidden;
        }
        .fill {
          height: 100%;
          background: linear-gradient(90deg, #ff2d2d, #ff8d4d);
          transition: width 0.6s ease;
        }

        .sponsor-card {
          opacity: 0;
          transform: translateY(60px) scale(0.9);
          transition: all 0.7s cubic-bezier(.17,.67,.83,.67);
          background: #fff;
          padding: 30px;
          border-radius: 24px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
        .sponsor-card.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .header-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 16px;
        }
        .sponsor-name {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 800;
        }
        .badge {
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          color: #fff;
        }
        .logo-box {
          position: relative;
          width: 160px;
          height: 160px;
          margin-bottom: 16px;
          border-radius: 20px;
          overflow: hidden;
          background: #fafafa;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .logo-img {
          object-fit: contain;
        }
        .sponsor-card.visible .logo-img {
          animation: bounce 1s infinite alternate;
        }
        .desc {
          font-size: 14px;
          color: #444;
          line-height: 1.6;
        }
        @keyframes bounce {
          from { transform: translateY(0); }
          to { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
