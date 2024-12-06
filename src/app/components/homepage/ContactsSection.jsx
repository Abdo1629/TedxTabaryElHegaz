"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ContactsSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ask: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
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
        { threshold: 0.2 } // يبدأ الأنيميشن عند ظهور 20% من العنصر
    );

    const elements = document.querySelectorAll(".content, .form-row, .btn1, .send");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect(); // تنظيف المراقب عند إزالة المكون
  }, []);

  return (
      <div>
        {/* Contact Header */}
        <div className="events-container" id="contactform">
          <div className="content arabic-content">
            <div className="EventsHeader">
              <h2>جهات الاتصال</h2>
            </div>
          </div>
          <div className="content english-content" style={{ display: "none" }}>
            <div className="EventsHeader">
              <h2>Contacts</h2>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="events-container">
        <span className="content section-title arabic-content">
          تواصل معنا
        </span>
          <span className="content section-title english-content" style={{ display: "none" }}>
          Contact Us
        </span>
          <div className="contact">
            <form onSubmit={handleSubmit} name="contactform">
              {/* Name and Email Fields */}
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
                <div className="english-content" style={{ display: "none" }}>
                  <div>
                    <label htmlFor="name">Name:</label>
                  </div>
                  <input
                      className="cont-input"
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Please Enter Your Name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                  />
                  <div>
                    <label htmlFor="email">Email:</label>
                  </div>
                  <input
                      className="cont-input"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Please Enter A Valid Email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                  />
                </div>
              </div>

              {/* Question Field */}
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
                <div className="english-content" style={{ display: "none" }}>
                  <label htmlFor="ask">Question:</label>
                  <input
                      className="cont-input"
                      type="text"
                      id="ask"
                      name="ask"
                      placeholder="Please Enter Your Question"
                      required
                      value={formData.ask}
                      onChange={handleChange}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <input className="btn1" type="submit" value="Send" />
            </form>
          </div>
        </div>

        {/* Footer Note */}
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
