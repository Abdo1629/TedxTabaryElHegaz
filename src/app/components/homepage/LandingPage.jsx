"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const LandingPage = () => {
  const images = [
    "/images/landing_photo2.jpg",
    "/images/landing_photo3.jpg", // Add more images as needed
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsFading(false);
      }, 500); // Match this duration with your CSS animation duration
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  return (
    <>
      <div className="landing-page">
        <div className="landing-page-left-section">
          <div className="arabic-content">
            <h2>
              نحن لسنا <span className="highlight">مجرد فريق</span>
            </h2>
            <h2>
              نحن <span className="highlight">عائلة</span>
            </h2>
            <h1 className="skip">
              أول <span className="highlight">TEDx</span> في مدرسة حكومية
            </h1>
            <p>
              إدراكًا منا ولمواكبة التطور العلمي وأهمية دور الشباب الريادي لذلك
              يجب أن نكون موجودين لإعداد وتأهيل قادة المستقبل القريب, وهم طلاب
              الثانوية بعد أن أثبتوا أنهم قادرين علي التعلم والإصرار للوصول
              للنجاح، ولهذا اتخذنا خطوة إقامة حدث مهم وفريد من نوعه مثل تيد إكس
              يوث طبري الحجاز.
            </p>
            <p>
              وما يجعل هذا الحدث فريد هو إنه لأول مرة يقام حدث تيد إكس لمدرسة
              حكومية علي مستوي جمهورية مصر العربية!
            </p>
          </div>
        </div>
        <div className="carousel">
          <div className={`image-wrapper ${isFading ? "fade" : ""}`}>
            <Image
              className="landing-page-photo"
              src={images[currentImageIndex]}
              alt="Landing Page Carousel Photo"
              width={1200}
              height={1200}
              layout="responsive"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        .image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          transition: opacity 0.5s ease-in-out; /* Smooth transition for fading */
        }

        .fade {
          opacity: 0; /* Start fade-out effect */
        }
      `}</style>
    </>
  );
};

export default LandingPage;
