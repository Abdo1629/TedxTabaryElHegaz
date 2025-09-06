"use client";

import { useState, useEffect, useRef } from "react";

const faqData = [
  {
    id: 1,
    question: "ما الفرق بين TED وTEDx؟",
    answer: `TED هو مؤتمر عالمي سنوي يُنظم في كندا تحت شعار "أفكار تستحق الانتشار".
    أما TEDx فهو حدث مستقل يُنظم محليًا تحت ترخيص TED، يهدف إلى نشر الأفكار عبر المجتمعات المحلية بما يتوافق مع القيم العالمية للمنصة.`
  },
  {
    id: 2,
    question: "من يمكنه التقديم للتحدث في المنصة وكيف؟",
    answer: `كل من لديه فكرة تستحق المشاركة ومُلهمة، بغض النظر عن الخلفية أو المؤهل العلمي، يمكنه تقديم طلب عبر نموذج "تقديم المتحدثين" على الموقع. يتم اختيار المتقدمين بناء على جدوى الفكرة والتزامها بالقيم، والخضوع لعمليتي المقابلة والبروفة قبل التحدث.`
  },
  {
    id: 3,
    question: "هل يتقاضى المتحدثون أجرًا مقابل مشاركتهم؟",
    answer: `لا، المتحدثون يشاركون كمتطوعين، وليس هناك مقابل مالي لتقديم أي كلمة على المنصة.`
  },
  {
    id: 4,
    question: "متى سأتلقى تفاصيل الحضور مثل جدول الفقرات والتذاكر؟",
    answer: `بعد الاطلاع على التأكيدات، يتم إرسال كافة التفاصيل للمشاركين عبر البريد الإلكتروني الرسمي للفريق، كما تُنشر التحديثات بانتظام عبر صفحاتنا على وسائل التواصل الاجتماعي.`
  },
  {
    id: 5,
    question: "كيف يمكنني حجز تذكرة لحضور الحدث؟",
    answer: `يمكنك حجز تذكرتك بسهولة عبر منصتنا الإلكترونية المعتمدة فواتيرك، والتي تتيح الدفع الإلكتروني الآمن وتأكيد الحجز فورًا.`
  }
];

export default function FAQSection() {
  const [openItem, setOpenItem] = useState(null);
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index'));
            setVisibleItems(prev => 
              prev.includes(index) ? prev : [...prev, index].sort((a, b) => a - b)
            );
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = sectionRef.current?.querySelectorAll('.faq-item');
    items?.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="faq-section" ref={sectionRef} dir="rtl">
      <div className="container">
        {/* العنوان الرئيسي */}
        <div className="section-header">
          <span className="section-subtitle">الأسئلة الشائعة</span>
          <h2 className="section-title">
            كل ما تريد معرفته عن
            <span className="highlight-text"> TEDx</span>
          </h2>
          <div className="title-underline"></div>
        </div>

        {/* عناصر FAQ */}
        <div className="faq-container">
          {faqData.map((item, index) => (
            <div
              key={item.id}
              className={`faq-item ${visibleItems.includes(index) ? 'visible' : ''} ${openItem === item.id ? 'open' : ''}`}
              data-index={index}
            >
              <div 
                className="faq-question"
                onClick={() => toggleItem(item.id)}
              >
                <h3>{item.question}</h3>
                <div className="faq-icon">
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12" className="horizontal-line"></line>
                  </svg>
                </div>
              </div>
              <div className="faq-answer">
                <div className="answer-content">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* زر الحجز */}
        <div className="booking-section">
          <div className="booking-card">
            <div className="booking-content">
              <h3>جاهز للانضمام إلينا؟</h3>
              <p>احجز مقعدك الآن وكن جزءًا من تجربة TEDx الاستثنائية</p>
              <a 
                href="https://app.fawaterk.com/events/448/%D8%B9%D9%88%D8%AF%20%D8%B9%D9%84%D9%89%20%D8%A8%D8%AF%D8%A1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="booking-btn"
              >
                <span>اضغط هنا للحجز</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>
            </div>
            <div className="booking-decoration">
              <div className="tedx-logo-mini">
                <span className="ted-text">TED</span>
                <span className="x-text">x</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .faq-section {
          padding: 8rem 0;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%);
          position: relative;
          overflow: hidden;
        }

        .faq-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(220, 38, 38, 0.03) 0%, transparent 50%);
          animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
        }

        .section-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .section-subtitle {
          display: inline-block;
          background: linear-gradient(135deg, #dc2626, #ef4444);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 600;
          font-size: 1.1rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .section-title {
          font-size: 3.5rem;
          font-weight: 900;
          color: #1f2937;
          margin-bottom: 2rem;
          line-height: 1.1;
        }

        .highlight-text {
          background: linear-gradient(135deg, #dc2626, #ef4444, #f87171);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
        }

        .title-underline {
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #dc2626, #ef4444);
          margin: 0 auto;
          border-radius: 2px;
        }

        .faq-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-item {
          background: white;
          border-radius: 20px;
          margin-bottom: 1.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          border: 2px solid #f1f5f9;
          overflow: hidden;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .faq-item.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .faq-item:hover {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
          border-color: #dc2626;
          transform: translateY(-5px);
        }

        .faq-question {
          padding: 2rem;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
          position: relative;
        }

        .faq-question:hover {
          background: #fef2f2;
        }

        .faq-question h3 {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
          line-height: 1.4;
          flex: 1;
          margin-left: 1rem;
        }

        .faq-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #dc2626, #ef4444);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .faq-item.open .faq-icon {
          background: linear-gradient(135deg, #059669, #10b981);
          transform: rotate(45deg);
        }

        .faq-icon svg {
          transition: transform 0.3s ease;
        }

        .faq-item.open .horizontal-line {
          opacity: 0;
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .faq-item.open .faq-answer {
          max-height: 500px;
        }

        .answer-content {
          padding: 0 2rem 2rem;
          border-top: 1px solid #e5e7eb;
        }

        .answer-content p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #4b5563;
          margin: 1.5rem 0 0;
        }

        .booking-section {
          margin-top: 5rem;
        }

        .booking-card {
          background: linear-gradient(135deg, #dc2626, #ef4444, #f87171);
          border-radius: 25px;
          padding: 3rem;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .booking-card::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
          animation: pulse 4s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }

        .booking-content {
          color: white;
          position: relative;
          z-index: 2;
          flex: 1;
        }

        .booking-content h3 {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .booking-content p {
          font-size: 1.1rem;
          opacity: 0.9;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .booking-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          background: white;
          color: #dc2626;
          font-size: 1.1rem;
          font-weight: 700;
          padding: 1rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .booking-btn:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          color: #b91c1c;
        }

        .booking-decoration {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
        }

        .tedx-logo-mini {
          font-size: 3rem;
          font-weight: 900;
          opacity: 0.2;
        }

        .ted-text {
          color: white;
        }

        .x-text {
          color: #fbbf24;
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .faq-section {
            padding: 5rem 0;
          }

          .container {
            padding: 0 1rem;
          }

          .section-title {
            font-size: 2.5rem;
          }

          .faq-question {
            padding: 1.5rem;
          }

          .faq-question h3 {
            font-size: 1.1rem;
          }

          .booking-card {
            flex-direction: column;
            text-align: center;
            padding: 2rem;
          }

          .booking-decoration {
            margin-top: 2rem;
          }

          .booking-content h3 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
