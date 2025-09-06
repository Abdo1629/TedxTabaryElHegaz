"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const qrButtons = [
  {
    id: 1,
    title: "أجندة الحدث",
    subtitle: "الجدول الزمني للفعاليات",
    description: "استعرض برنامج اليوم الكامل والمتحدثين",
    link: "/agenda"
  },
  {
    id: 2,
    title: "الرعاة والشركاء",
    subtitle: "شركاؤنا في النجاح",
    description: "تعرف على الداعمين والمؤسسات المشاركة",
    link: "/sponsors3"
  },
  {
    id: 3,
    title: "مجموعة واتساب",
    subtitle: "انضم لمجتمع TEDx",
    description: "كن جزءاً من المناقشات والتحديثات",
    link: "https://chat.whatsapp.com/YOUR_GROUP_LINK",
    external: true
  }
];

export default function QRCodePage() {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll('.qr-button') || [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-index'));
            setVisible((v) => (v.includes(idx) ? v : [...v, idx]));
          }
        });
      },
      { threshold: 0.2 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const handleButtonClick = (button) => {
    if (button.external) {
      window.open(button.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <main dir="rtl" className="qr-page">
      {/* Header Section */}
      <div className="header-section">
        <div className="container">
          <div className="tedx-logo">
            <span className="tedx-text">TED</span>
            <span className="x-text">x</span>
            <div className="location-text">TabaryElHegaz</div>
          </div>
          <h1 className="page-title">
            روابط سريعة
            <span className="title-accent">للوصول المباشر</span>
          </h1>
          <p className="page-subtitle">
            اختر الرابط المطلوب للانتقال مباشرة
          </p>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="buttons-section" ref={containerRef}>
        <div className="container">
          <div className="buttons-grid">
            {qrButtons.map((button, index) => (
              button.external ? (
                <div
                  key={button.id}
                  className={`qr-button ${visible.includes(index) ? 'visible' : ''}`}
                  data-index={index}
                  onClick={() => handleButtonClick(button)}
                  style={{ '--delay': `${index * 0.15}s` }}
                >
                  <div className="button-content">
                    <h3 className="button-title">{button.title}</h3>
                    <p className="button-subtitle">{button.subtitle}</p>
                    <p className="button-description">{button.description}</p>
                  </div>
                  <div className="button-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                  <div className="button-bg"></div>
                </div>
              ) : (
                <div
                  key={button.id}
                  className={`qr-button ${visible.includes(index) ? 'visible' : ''}`}
                  data-index={index}
                  onClick={() => window.location.href = button.link}
                  style={{ '--delay': `${index * 0.15}s` }}
                >
                  <div className="button-content">
                    <h3 className="button-title">{button.title}</h3>
                    <p className="button-subtitle">{button.subtitle}</p>
                    <p className="button-description">{button.description}</p>
                  </div>
                  <div className="button-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                  <div className="button-bg"></div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>

      {/* Footer QR Info */}
      <div className="footer-info">
        <div className="container">
          <div className="qr-info">
            <div className="qr-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="5" height="5"/>
                <rect x="3" y="16" width="5" height="5"/>
                <rect x="16" y="3" width="5" height="5"/>
                <path d="M21 16h-3a2 2 0 0 0-2 2v3"/>
                <path d="M21 21v.01"/>
                <path d="M12 7v3a2 2 0 0 1-2 2H7"/>
                <path d="M3 12h.01"/>
                <path d="M12 3h.01"/>
                <path d="M12 16v.01"/>
                <path d="M16 12h1"/>
                <path d="M21 12v.01"/>
                <path d="M12 21v-1"/>
              </svg>
            </div>
            <span>صفحة الروابط السريعة - TEDx TabaryElHegaz</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .qr-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Header Section */
        .header-section {
          background: linear-gradient(135deg, #ffffff 0%, #f1f3f4 100%);
          padding: 60px 0 40px;
          text-align: center;
          border-bottom: 3px solid #dc2626;
        }

        .tedx-logo {
          margin-bottom: 30px;
        }

        .tedx-text {
          font-size: 4rem;
          font-weight: 900;
          color: #1a1a1a;
          letter-spacing: -3px;
        }

        .x-text {
          font-size: 3.5rem;
          font-weight: 900;
          color: #dc2626;
          margin-left: 5px;
        }

        .location-text {
          font-size: 1.1rem;
          color: #6b7280;
          font-weight: 500;
          margin-top: 5px;
          letter-spacing: 1px;
        }

        .page-title {
          font-size: 3rem;
          font-weight: 800;
          color: #1a1a1a;
          margin: 0 0 15px;
          line-height: 1.2;
        }

        .title-accent {
          display: block;
          color: #dc2626;
          font-size: 2rem;
          margin-top: 5px;
        }

        .page-subtitle {
          font-size: 1.3rem;
          color: #4b5563;
          margin: 0;
          font-weight: 400;
        }

        /* Buttons Section */
        .buttons-section {
          padding: 80px 0;
          background: #f8f9fa;
        }

        .buttons-grid {
          display: grid;
          gap: 30px;
          max-width: 600px;
          margin: 0 auto;
        }

        .qr-button {
          position: relative;
          display: block;
          background: #ffffff;
          border: 2px solid #e5e7eb;
          border-radius: 15px;
          padding: 40px 30px;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(30px);
          opacity: 0;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .qr-button.visible {
          transform: translateY(0);
          opacity: 1;
          animation-delay: var(--delay);
        }

        .qr-button:hover {
          transform: translateY(-8px);
          border-color: #dc2626;
          box-shadow: 0 20px 40px rgba(220, 38, 38, 0.15);
        }

        .qr-button:hover .button-bg {
          opacity: 1;
          transform: scale(1.02);
        }

        .qr-button:hover .button-arrow {
          transform: translateX(-5px);
          color: #dc2626;
        }

        .button-content {
          position: relative;
          z-index: 2;
          padding-left: 60px;
        }

        .button-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: #1f2937;
          margin: 0 0 8px;
          line-height: 1.3;
        }

        .button-subtitle {
          font-size: 1.1rem;
          color: #dc2626;
          font-weight: 600;
          margin: 0 0 12px;
        }

        .button-description {
          font-size: 1rem;
          color: #6b7280;
          line-height: 1.5;
          margin: 0;
        }

        .button-arrow {
          position: absolute;
          top: 50%;
          left: 20px;
          transform: translateY(-50%);
          color: #9ca3af;
          transition: all 0.3s ease;
        }

        .button-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.03) 0%, rgba(220, 38, 38, 0.08) 100%);
          opacity: 0;
          transition: all 0.4s ease;
        }

        /* Footer Info */
        .footer-info {
          padding: 40px 0;
          background: #ffffff;
          border-top: 1px solid #e5e7eb;
        }

        .qr-info {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: #6b7280;
          font-size: 0.95rem;
        }

        .qr-icon {
          opacity: 0.7;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .header-section {
            padding: 40px 0 30px;
          }

          .tedx-text {
            font-size: 3rem;
          }

          .x-text {
            font-size: 2.5rem;
          }

          .page-title {
            font-size: 2.2rem;
          }

          .title-accent {
            font-size: 1.5rem;
          }

          .page-subtitle {
            font-size: 1.1rem;
          }

          .buttons-section {
            padding: 50px 0;
          }

          .qr-button {
            padding: 30px 25px;
          }

          .button-title {
            font-size: 1.5rem;
          }

          .button-content {
            padding-left: 45px;
          }

          .button-arrow {
            left: 12px;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 15px;
          }

          .buttons-grid {
            gap: 20px;
          }

          .qr-button {
            padding: 25px 20px;
          }

          .button-content {
            padding-left: 50px;
          }

          .button-arrow {
            left: 15px;
          }
        }
      `}</style>
    </main>
  );
}
