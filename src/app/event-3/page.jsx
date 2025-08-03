"use client";
import { useState, useEffect } from "react";
import FireEffect from "../components/FireEffect";

export default function Event3Page() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    });

    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="palestinian-flag-background">
      <div className="content-wrapper fade-in">
        <FireEffect />
        <h1 className="event-title text-shadow">عودٌ على بَدْء</h1>
        <div className="event-info">
          <div
            className="event-info-item"
            style={{ backgroundColor: "#CE1126", color: "#FFFFFF" }}
          >
            <p>الموسم 3</p>
          </div>
          <div
            className="event-info-item"
            style={{ backgroundColor: "#007A3D", color: "#FFFFFF" }}
          >
            <p>6 سبتمبر 2025</p>
          </div>
          <div
            className="event-info-item"
            style={{ backgroundColor: "#000000", color: "#FFFFFF" }}
          >
            <p>9:00 صباحاً - 7:00 مساءً</p>
          </div>
          <div
            className="event-info-item"
            style={{ backgroundColor: "#007A3D", color: "#FFFFFF" }}
          >
            <p>14 شارع أسماء فهمي - هليوبوليس </p>
          </div>
        </div>

        <div className="event-description">
          <p>
            {" "}
            الحياةُ مسرحٌ مليءٌ بالتحدياتِ يواجهُ المرءُ فيها مصيرَهُ متسلحًا
            بمقوماتِهِ الراسخةِ والتي يكمن بعضها في إرادتِهِ، فتحدثه نفسه أن{" "}
            <strong style={{ color: "#CE1126" }}>
              &rdquo;ليس سوى أنْ تُريدَ&rdquo;
            </strong>
            .
          </p>
          <p>
            {" "}
            كما يكمن جلها بيد خالقه .. يمنحه اياه لما يري عزمه{" "}
            <strong style={{ color: "#CE1126" }}>
              &rdquo;فعلى قدرِ أهلِ العزمِ تأتي العزائمُ&rdquo;
            </strong>
            .
          </p>
          <p>
            وها نحنُ ذا نعود لنبدأُ، فمن حيثُ توقفنا، نحاولُ أن نخلقَ تغييرًا في
            قصتِنا فمن رجع عوده على بدئه لم يقطع ذهابه حتى يصله برجوعه ف
            <strong style={{ color: "#CE1126" }}>
              &rdquo;عودٌ على بدءٍ&rdquo;
            </strong>
            .
          </p>
        </div>

        <div className="event-location">
          <h2 className="section-title">العنوان على الخريطة</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.4565117224747!2d31.32895640000001!3d30.081109500000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583e17809a44f1%3A0xec99bb4b7ae932db!2sFaculty%20of%20Women%2C%20Ain%20Shams%20University!5e0!3m2!1sen!2seg!4v1753821511707!5m2!1sen!2seg"
              width="100%"
              height="450"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
        <h2 className="section-title">حجز تذكرة</h2>
        <button
type="button"
onClick={() =>
window.open("https://events.xpay.app/event-details/168")
} className="blog-link">
    احجز تذكرتك الآن
</button>
        <div className="event-rules">
          <h2 className="section-title">قوانين الحدث</h2>
          <ol>
            <li>
              <strong style={{ color: "#CE1126" }}>معلومات التذاكر:</strong>{" "}
              التذكرة مرتبطة باسم المشارك، ويُفضل إحضار إثبات الهوية عند الدخول.
              يُرجى الاحتفاظ بالتذكرة حتى موعد الحدث، فهي ضرورية للدخول. نرجو
              الامتناع عن بيع التذاكر بشكل غير رسمي أو نقلها لأشخاص آخرين.
            </li>
            <li>
              <strong style={{ color: "#CE1126" }}>الحضور والتنظيم:</strong>{" "}
              يُفضل الوصول مبكرًا لتسهيل إجراءات الدخول والاستمتاع بتجربة
              متكاملة. نحرص على سير الحدث بسلاسة، لذا يُرجى تجنب الدخول أو
              الخروج أثناء الفقرات. في حال الوصول متأخرًا، قد يتم تعديل مكان
              المقعد بحسب ما يراه الفريق المنظم مناسبًا.
            </li>
            <li>
              <strong style={{ color: "#CE1126" }}>ترتيبات الجلوس:</strong> تم
              تخصيص مقاعد منفصلة لضمان راحة وخصوصية الجميع (أقسام للرجال وأخرى
              للنساء). نرجو الالتزام بهذه الترتيبات حفاظًا على تنظيم الحدث وسير
              التجربة.
            </li>
            <li>
              <strong style={{ color: "#CE1126" }}>
                فئات التذاكر لـ TEDxYouth@TabaryElHegazHS:
              </strong>
              <ul>
                <li>
                  <strong>Student Ticket – تذكرة الطالب:</strong> مخصصة لطلبة
                  المدارس والجامعات – <strong>249ج</strong> – دخول كامل، شهادة
                  حضور
                </li>
                <li>
                  <strong>
                    Parent & Employee Ticket – تذكرة أولياء الأمور والموظفين:
                  </strong>{" "}
                  للمهنيين وأولياء الأمور – <strong>399ج</strong> – دخول كامل،
                  مقعد مميز، حقيبة TEDx، شهادة حضور
                </li>
                <li>
                  <strong>Business Ticket – تذكرة البيزنس:</strong> لأصحاب
                  الشركات ورواد الأعمال – <strong>599ج</strong> – مقعد أمامي،
                  جلسة Networking مغلقة، حقيبة مميزة، شهادة خاصة
                </li>
                <li>
                  <strong>Friends Package – تذكرة الصحاب:</strong> باكدج 4 أشخاص
                  – <strong>849ج</strong> – دخول كامل + صورة جماعية في الفوتوبوث
                </li>
                <li>
                  <strong>Supporter Ticket – تذكرة الداعم:</strong> لمن يرغب في
                  دعم الحدث – <strong>999ج</strong> – مزايا تذكرة البيزنس + شكر
                  خاص على صفحاتنا الرسمية + دعوة لجلسة ما بعد الحدث مع الفريق
                </li>
              </ul>
            </li>
            <li>
              <strong style={{ color: "#CE1126" }}>سياسة الاسترجاع:</strong> في
              حال تم إلغاء الحدث لأي سبب، يتم استرداد قيمة التذكرة بالكامل خلال
              7 أيام عمل. لا يمكن استرداد أو استبدال التذاكر في حال الإلغاء بعد
              إتمام الشراء.
            </li>
            <li>
              <strong style={{ color: "#CE1126" }}>قواعد السلوك:</strong> نعمل
              على خلق بيئة إيجابية وآمنة للجميع، ويُرجى الحفاظ على الاحترام
              المتبادل. نرفض أي سلوك غير لائق، أو استخدام ألفاظ مسيئة، أو
              مضايقات من أي نوع. يحتفظ الفريق المنظم بحق اتخاذ الإجراءات
              المناسبة في حال وقوع أي مخالفة.
            </li>
            <li>
              <strong style={{ color: "#CE1126" }}>التصوير والتوثيق:</strong>{" "}
              يُمنع التصوير أو التسجيل خلال الحدث لمدة تتجاوز 10 ثوانٍ. هناك
              فريق تصوير رسمي موكل بتوثيق الحدث. قد تُستخدم اللقطات والصور
              لاحقًا في الأغراض الإعلامية والتسويقية للفعالية.
            </li>
            <li>
              <strong style={{ color: "#CE1126" }}>المظهر العام:</strong> نُقدّر
              الالتزام بالمظهر اللائق والملابس التي تعكس الثقافة المحلية. يحق
              للمنظمين منع الدخول في حال عدم الالتزام بالمعايير المتفق عليها.
            </li>
            <li>
              <strong style={{ color: "#CE1126" }}>الصحة والسلامة:</strong> يجب
              الالتزام بالبروتوكولات الصحية التي يحددها فريق التنظيم. في حال
              الشعور بأي توعك، يُرجى التوجه فورًا لأحد أفراد الطاقم.
            </li>
            <li>
              <strong style={{ color: "#CE1126" }}>سياسة الانضباط:</strong> نؤمن
              بأن احترام القواعد أساس التجربة الناجحة. يحق للفريق المنظم إبعاد
              أي مشارك يخالف القواعد دون رد قيمة التذكرة.
            </li>
          </ol>
          
          <p
            style={{
              textAlign: "center",
              marginTop: "1.5rem",
              fontWeight: "bold",
            }}
          >
            نشكركم لتفهمكم والتزامكم، ونتمنى لكم تجربة ملهمة واستثنائية!
          </p>
        </div>
      </div>
    </div>
  );
}
