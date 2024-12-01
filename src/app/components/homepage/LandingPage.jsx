"use client"
import Image from "next/image";

const LandingPage = () => {
  return (
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
        <Image
          className="landing-page-photo"
          id="carousel-image"
          src="/images/landing_photo2.jpg"
          alt="Landing Page Photo"
          width={1200} // Example width, adjust accordingly
          height={1200} // Example height, adjust accordingly
          layout="responsive"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default LandingPage;
