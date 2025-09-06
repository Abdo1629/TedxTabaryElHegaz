"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// بيانات الأجندة من الصورة (بالترتيب الزمني الصحيح)
const agendaItems = [
  // بداية اليوم
  { 
    name: "التسجيل", 
    type: "Registration", 
    time: "10 - 9", 
    image: "/images/registration.jpg"
  },
  { 
    name: "أحمد، عبدالرحمن مصطفى", 
    type: "Opening", 
    time: "10.50 - 10", 
    image: "/images/speakers/Opening.jpg"
  },
  { 
    name: "د. محمد حربى",
    type: "Keynote", 
    time: "11 - 10.50", 
    subtitle: "Qudraat",
    image: "/images/speakers/Mohamed-Kheir.jpg"
  },
  { 
    name: "ايمن الشربينى", 
    type: "Talk", 
    time: "11.20 - 11", 
    image: "/images/speakers/Ayman-ElShiebidy.jpg"
  },
  { 
    name: "علي عبد الفتاح", 
    type: "Talk", 
    time: "11.40 - 11.20", 
    image: "/images/speakers/Ali-Abd-ElFattah.jpg"
  },

  // المجموعة الثانية
  { 
    name: "هلال السيد", 
    type: "Talk", 
    time: "12 - 11.40", 
    image: "/images/speakers/Helal-ElSayed.jpg"
  },
  { 
    name: "احمد الفيشاوى", 
    type: "Keynote", 
    time: "12.10 - 12", 
    subtitle: "Special Courses",
    image: "/images/speakers/Ahmed-ElKishawi.jpg"
  },
  { 
    name: "محمد أيمن", 
    type: "Talk", 
    time: "12.30 - 12.10", 
    image: "/images/speakers/Mohamed-Ayman.jpg"
  },
  { 
    name: "ياسمين مجد", 
    type: "Talk", 
    time: "12.50 - 12.30", 
    image: "/images/speakers/Yasmin-Magd.jpg"
  },
  { 
    name: "عبدالله جمال", 
    type: "Talk", 
    time: "1.10 - 12.50", 
    image: "/images/speakers/Abdullah-Gamal.jpg"
  },

  // فترة الاستراحة والصلاة
  { 
    name: "مهند الشرقاوى", 
    type: "Keynote", 
    time: "1.20 - 1.10", 
    subtitle: "Digital Knights Academy",
    image: "/images/speakers/Morid-ElSharkawi.jpg"
  },
  { 
    name: "صلاة الظهر + استراحة", 
    type: "Break", 
    time: "2 - 1.20", 
    image: "/images/prayer-break.jpg"
  },

  // ما بعد الاستراحة
  { 
    name: "إبراهيم أنور", 
    type: "Talk", 
    time: "2.20 - 2", 
    image: "/images/speakers/Ibrahim-Anwar.jpg"
  },
  { 
    name: "أحمد طلبة", 
    type: "Talk", 
    time: "2.40 - 2.20", 
    image: "/images/speakers/Ahmed-Talba.jpg"
  },
  { 
    name: "محمد عكاشة", 
    type: "Talk", 
    time: "3 - 2.40", 
    image: "/images/speakers/Mohamed-Okasha.jpg"
  },

  // المجموعة الرابعة
  { 
    name: "شوشة", 
    type: "Performance", 
    time: "3.30 - 3", 
    image: "/images/speakers/Shousha.jpg"
  },
  { 
    name: "طارق الجزار", 
    type: "Keynote", 
    time: "3.40 - 3.30", 
    subtitle: "Elavate",
    image: "/images/speakers/Tarek-ElGazzar.jpg"
  },
  { 
    name: "محمد أبو سريع", 
    type: "Talk", 
    time: "4 - 3.40", 
    image: "/images/speakers/Mohamed-AbuSarea.jpg"
  },
  { 
    name: "محمد أبو مسلم", 
    type: "Talk", 
    time: "4.20 - 4", 
    image: "/images/speakers/Mohamed-AbuMuslim.jpg"
  },

  // استراحة العصر
  { 
    name: "صلاة العصر + الغداء", 
    type: "Break", 
    time: "4.50 - 4.20", 
    image: "/images/lunch-break.jpg"
  },

  // نهاية اليوم
  { 
    name: "حاتم جبر", 
    type: "Talk", 
    time: "5.10 - 4.50", 
    image: "/images/speakers/Hatem-Gabr.jpg"
  },
  { 
    name: "عبد الرحمن صابر", 
    type: "Keynote", 
    time: "5.20 - 5.10", 
    subtitle: "Rec Studio",
    image: "/images/speakers/AbdelRahman-Saber.jpg"
  },
  { 
    name: "جيمي", 
    type: "Performance", 
    time: "5.40 - 5.20", 
    image: "/images/speakers/Jimmy.jpg"
  },
  { 
    name: "أحمد، عبدالرحمن مصطفى", 
    type: "Closing", 
    time: "6.30 - 5.40", 
    image: "/images/speakers/Closing.jpg"
  }
];

const typeColors = {
  Talk: { bg: '#dc2626', text: 'white' },
  Keynote: { bg: '#059669', text: 'white' },
  Opening: { bg: '#d97706', text: 'white' },
  Closing: { bg: '#92400e', text: 'white' },
  Performance: { bg: '#7c3aed', text: 'white' },
  Registration: { bg: '#1f2937', text: 'white' },
  Break: { bg: '#1f2937', text: 'white' }
};

export default function AgendaPage() {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    const circles = containerRef.current?.querySelectorAll('.agenda-circle') || [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-index'));
            setVisible((v) => (v.includes(idx) ? v : [...v, idx]));
          }
        });
      },
      { threshold: 0.3 }
    );
    circles.forEach((circle) => observer.observe(circle));
    return () => observer.disconnect();
  }, []);

  return (
    <main dir="rtl" className="agenda-page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <div className="tedx-logo">
            <span className="tedx-main">TEDx</span>
            <span className="tedx-youth">Youth</span>
            <div className="tedx-location">@TabaryElHegazHS</div>
            <div className="tedx-subtitle">An independently organized TED event</div>
          </div>
          <h1 className="main-title">أجندة اليوم</h1>
          <div className="tabary-logo">
            <Image 
              src="/images/Tabarylogo.png" 
              alt="Tabary Logo" 
              width={120} 
              height={120}
            />
          </div>
        </div>
      </div>

      {/* Timeline Container - Grid Layout */}
      <div className="timeline-grid" ref={containerRef}>
        {/* خط الربط العمودي الرئيسي */}
        <div className="vertical-connector"></div>
        
        {/* الصف الأول */}
        <div className="timeline-row">
          <div className="connecting-line"></div>
          {[4, 3, 2, 1, 0].map(index => (
            <div
              key={index}
              className={`agenda-circle ${visible.includes(index) ? 'visible' : ''}`}
              data-index={index}
            >
              <div className="circle-image">
                <Image
                  src={agendaItems[index].image}
                  alt={agendaItems[index].name}
                  width={100}
                  height={100}
                  className="speaker-img"
                />
              </div>
              <div 
                className="circle-type"
                style={{ 
                  backgroundColor: typeColors[agendaItems[index].type]?.bg || '#6b7280',
                  color: typeColors[agendaItems[index].type]?.text || 'white'
                }}
              >
                {agendaItems[index].type}
              </div>
              <div className="circle-name">{agendaItems[index].name}</div>
              {agendaItems[index].subtitle && (
                <div className="circle-subtitle">{agendaItems[index].subtitle}</div>
              )}
              <div className="circle-time">{agendaItems[index].time}</div>
            </div>
          ))}
        </div>

        {/* الصف الثاني */}
        <div className="timeline-row">
          <div className="connecting-line"></div>
          {[5, 6, 7, 8, 9].map(index => (
            <div
              key={index}
              className={`agenda-circle ${visible.includes(index) ? 'visible' : ''}`}
              data-index={index}
            >
              <div className="circle-image">
                <Image
                  src={agendaItems[index].image}
                  alt={agendaItems[index].name}
                  width={100}
                  height={100}
                  className="speaker-img"
                />
              </div>
              <div 
                className="circle-type"
                style={{ 
                  backgroundColor: typeColors[agendaItems[index].type]?.bg || '#6b7280',
                  color: typeColors[agendaItems[index].type]?.text || 'white'
                }}
              >
                {agendaItems[index].type}
              </div>
              <div className="circle-name">{agendaItems[index].name}</div>
              {agendaItems[index].subtitle && (
                <div className="circle-subtitle">{agendaItems[index].subtitle}</div>
              )}
              <div className="circle-time">{agendaItems[index].time}</div>
            </div>
          ))}
        </div>

        {/* الصف الثالث */}
        <div className="timeline-row">
          <div className="connecting-line"></div>
          {[14, 13, 12, 11, 10].map(index => (
            <div
              key={index}
              className={`agenda-circle ${visible.includes(index) ? 'visible' : ''}`}
              data-index={index}
            >
              <div className="circle-image">
                <Image
                  src={agendaItems[index].image}
                  alt={agendaItems[index].name}
                  width={100}
                  height={100}
                  className="speaker-img"
                />
              </div>
              <div 
                className="circle-type"
                style={{ 
                  backgroundColor: typeColors[agendaItems[index].type]?.bg || '#6b7280',
                  color: typeColors[agendaItems[index].type]?.text || 'white'
                }}
              >
                {agendaItems[index].type}
              </div>
              <div className="circle-name">{agendaItems[index].name}</div>
              {agendaItems[index].subtitle && (
                <div className="circle-subtitle">{agendaItems[index].subtitle}</div>
              )}
              <div className="circle-time">{agendaItems[index].time}</div>
            </div>
          ))}
        </div>

        {/* الصف الرابع */}
        <div className="timeline-row">
          <div className="connecting-line"></div>
          {[15, 16, 17, 18, 19].map(index => (
            <div
              key={index}
              className={`agenda-circle ${visible.includes(index) ? 'visible' : ''}`}
              data-index={index}
            >
              <div className="circle-image">
                <Image
                  src={agendaItems[index].image}
                  alt={agendaItems[index].name}
                  width={100}
                  height={100}
                  className="speaker-img"
                />
              </div>
              <div 
                className="circle-type"
                style={{ 
                  backgroundColor: typeColors[agendaItems[index].type]?.bg || '#6b7280',
                  color: typeColors[agendaItems[index].type]?.text || 'white'
                }}
              >
                {agendaItems[index].type}
              </div>
              <div className="circle-name">{agendaItems[index].name}</div>
              {agendaItems[index].subtitle && (
                <div className="circle-subtitle">{agendaItems[index].subtitle}</div>
              )}
              <div className="circle-time">{agendaItems[index].time}</div>
            </div>
          ))}
        </div>

        {/* الصف الخامس */}
        <div className="timeline-row">
          <div className="connecting-line"></div>
          {[23, 22, 21, 20].map(index => (
            <div
              key={index}
              className={`agenda-circle ${visible.includes(index) ? 'visible' : ''}`}
              data-index={index}
            >
              <div className="circle-image">
                <Image
                  src={agendaItems[index].image}
                  alt={agendaItems[index].name}
                  width={100}
                  height={100}
                  className="speaker-img"
                />
              </div>
              <div 
                className="circle-type"
                style={{ 
                  backgroundColor: typeColors[agendaItems[index].type]?.bg || '#6b7280',
                  color: typeColors[agendaItems[index].type]?.text || 'white'
                }}
              >
                {agendaItems[index].type}
              </div>
              <div className="circle-name">{agendaItems[index].name}</div>
              {agendaItems[index].subtitle && (
                <div className="circle-subtitle">{agendaItems[index].subtitle}</div>
              )}
              <div className="circle-time">{agendaItems[index].time}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .agenda-page-wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 2rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .page-header {
          text-align: center;
          margin-bottom: 4rem;
          position: relative;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
        }

        .tedx-logo {
          text-align: left;
        }

        .tedx-main {
          font-size: 3rem;
          font-weight: 900;
          color: #000;
          letter-spacing: -2px;
        }

        .tedx-youth {
          font-size: 2rem;
          font-weight: 700;
          color: #dc2626;
          display: block;
          margin-top: -8px;
        }

        .tedx-location {
          font-size: 0.9rem;
          color: #4b5563;
          margin-top: 4px;
        }

        .tedx-subtitle {
          font-size: 0.7rem;
          color: #6b7280;
          margin-top: 2px;
        }

        .main-title {
          font-size: 4rem;
          font-weight: 800;
          background: linear-gradient(135deg, #dc2626, #ef4444, #f87171);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
          position: relative;
        }

        .main-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          right: 50%;
          transform: translateX(50%);
          width: 120px;
          height: 4px;
          background: linear-gradient(90deg, #dc2626, #ef4444);
          border-radius: 2px;
        }

        .tabary-logo {
          opacity: 0.9;
        }

        .timeline-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 0;
          position: relative;
        }

        .vertical-connector {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 6px;
          background: linear-gradient(180deg, #dc2626, #ef4444, #f87171, #dc2626);
          border-radius: 3px;
          transform: translateX(-50%);
          z-index: 0;
          opacity: 0.3;
        }

        .timeline-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4rem;
          position: relative;
          padding: 2rem 1rem;
        }

        .connecting-line {
          position: absolute;
          top: 50%;
          left: 10%;
          right: 10%;
          height: 4px;
          background: linear-gradient(90deg, #dc2626, #ef4444, #f87171);
          border-radius: 2px;
          transform: translateY(-50%);
          z-index: 1;
        }

        .agenda-circle {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          background: white;
          border-radius: 20px;
          padding: 1.5rem 1rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border: 3px solid #f1f5f9;
          min-width: 180px;
          max-width: 200px;
          opacity: 0;
          transform: translateY(30px) scale(0.9);
          transition: all 0.6s ease;
          z-index: 2;
        }

        .agenda-circle.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .agenda-circle:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          border-color: #dc2626;
        }

        .circle-image {
          margin-bottom: 1rem;
          position: relative;
        }

        .speaker-img {
          width: 100px !important;
          height: 100px !important;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #dc2626;
          box-shadow: 0 5px 15px rgba(220, 38, 38, 0.3);
        }

        .circle-type {
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          min-width: 80px;
        }

        .circle-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.3rem;
          line-height: 1.2;
          min-height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .circle-subtitle {
          font-size: 0.8rem;
          font-weight: 600;
          color: #059669;
          margin-bottom: 0.5rem;
          font-style: italic;
        }

        .circle-time {
          font-size: 1rem;
          font-weight: 700;
          color: #dc2626;
          background: #fee2e2;
          padding: 0.5rem 0.8rem;
          border-radius: 15px;
          display: inline-block;
          margin-top: auto;
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .agenda-page-wrapper {
            padding: 1rem;
          }

          .header-content {
            flex-direction: column;
            gap: 2rem;
          }

          .main-title {
            font-size: 2.5rem;
          }

          .tedx-main {
            font-size: 2rem;
          }

          .tedx-youth {
            font-size: 1.5rem;
          }

          .timeline-row {
            flex-direction: column;
            gap: 2rem;
            padding: 1rem;
          }

          .connecting-line {
            display: none;
          }

          .agenda-circle {
            min-width: 250px;
            max-width: 300px;
            margin-bottom: 1rem;
          }

          .speaker-img {
            width: 80px !important;
            height: 80px !important;
          }

          .circle-name {
            font-size: 1rem;
          }

          .circle-time {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .agenda-circle {
            min-width: 200px;
            max-width: 250px;
            padding: 1rem 0.5rem;
          }

          .speaker-img {
            width: 70px !important;
            height: 70px !important;
          }

          .circle-name {
            font-size: 0.9rem;
            min-height: 2rem;
          }

          .circle-type {
            font-size: 0.7rem;
            padding: 0.3rem 0.8rem;
          }
        }
      `}</style>
    </main>
  );
}
