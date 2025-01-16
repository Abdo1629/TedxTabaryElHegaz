"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ContactsSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ask: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });

      // Since we're using 'no-cors', we can't check response.ok
      // We'll assume it's successful if there's no error
      setSubmitMessage("تم إرسال رسالتك بنجاح!");
      setFormData({ name: "", email: "", ask: "" });
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitMessage("حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);

      // Hide success message after 4 seconds
      setTimeout(() => {
        setSubmitMessage("");
      }, 4000);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll(".content, .form-row, .btn1, .send");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <div className="events-container" id="contactform">
        <div className="content arabic-content">
          <div className="EventsHeader">
            <h2>جهات الاتصال</h2>
          </div>
        </div>
      </div>

      <div className="events-container">
        <span className="content section-title arabic-content">
          تواصل معنا
        </span>
        <div className="contact">
          <form onSubmit={handleSubmit} action="https://script.google.com/macros/s/AKfycbwI5IyQ3sKLSuMcjL4jKTrU5_tld0n0HKd74bbwRRaBn_T_BPiSLjwHlRyFWwO6Yf-Q/exec" method="POST">
            <div className="form-row">
              <div className="arabic-content">
                <div>
                  <label htmlFor="name">الاسم:</label>
                </div>
                <input
                  className="cont-input"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="من فضلك ادخل إسمك"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
                <div>
                  <label htmlFor="email">البريد الإلكتروني:</label>
                </div>
                <input
                  className="cont-input"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="من فضلك ادخل بريدك الإلكتروني"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="arabic-content">
                <label htmlFor="ask">السؤال:</label>
                <input
                  className="cont-input"
                  type="text"
                  id="ask"
                  name="ask"
                  placeholder="من فضلك اخبرنا إستفسارك"
                  required
                  value={formData.ask}
                  onChange={handleChange}
                />
              </div>
            </div>
            <input type="hidden" name="timestamp" value={new Date().toISOString()} />
            <button className="btn1" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "جاري الإرسال..." : "إرسال"}
            </button>
          </form>
          {submitMessage && (
            <p className="submit-message" style={{ 
              marginTop: '1rem', 
              textAlign: 'center',
              color: submitMessage.includes('نجاح') ? '#4CAF50' : '#f44336'
            }}>
              {submitMessage}
            </p>
          )}
        </div>
      </div>

      <p className="send content arabic-content">
        أو أرسل رسالة إلى صفحتنا على{" "}
        <Link href="https://www.facebook.com/TEDxYouthTabaryElHegazHS" className="liness">
          فيسبوك
        </Link>
        .
      </p>
    </div>
  );
}

