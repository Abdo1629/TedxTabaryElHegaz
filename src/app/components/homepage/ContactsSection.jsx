"use client";
import Link from "next/link";
import { useState } from "react";
import { Facebook, Instagram, Linkedin, Share2 } from "lucide-react";

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

  return (
    <div id="contactform">
      <div>
        <div>
          <h2>جهات الاتصال</h2>
        </div>
      </div>

      <div>
        <span>تواصل معنا</span>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <div>
                  <label htmlFor="name">الاسم:</label>
                </div>
                <input
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
            <div>
              <label htmlFor="ask">السؤال:</label>
              <input
                type="text"
                id="ask"
                name="ask"
                placeholder="من فضلك اخبرنا إستفسارك"
                required
                value={formData.ask}
                onChange={handleChange}
              />
            </div>
            <input type="submit" value="Send" />
          </form>
        </div>
      </div>

      <p>
        أو أرسل رسالة إلى صفحتنا على{" "}
        <Link href="https://www.facebook.com/TEDxYouthTabaryElHegazHS">
          فيسبوك
        </Link>
        .
      </p>
      <div>
        <Link
          href="https://www.facebook.com/TEDxYouthTabaryElHegazHS"
          target="_blank"
        >
          <Facebook />
        </Link>
        <Link
          href="https://www.instagram.com/tedxtabaryelhegaz/"
          target="_blank"
        >
          <Instagram />
        </Link>
        <Link
          href="https://www.linkedin.com/tedxtabaryelhegaz/"
          target="_blank"
        >
          <Linkedin />
        </Link>
        <Link href="https://wa.me/201014735800" target="_blank">
          <Share2 />
        </Link>
      </div>
    </div>
  );
}
