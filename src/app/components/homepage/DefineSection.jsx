"use client";
import { useEffect } from "react";
import Link from "next/link";

const DefineSection = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            }
          });
        },
        { threshold: 0.1 } // يبدأ الأنيميشن عند ظهور 10% من العنصر
    );

    const elements = document.querySelectorAll(".definition");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect(); // تنظيف المراقب عند إزالة المكون
  }, []);

  return (
      <div className="definition">
        <div className="arabic-content">
          <h2>
            ما هي TED
            <sup>
              <span className="highlight">x</span>
            </sup>
            ؟
          </h2>
        </div>
        <div className="content arabic-content">
          <h5>
            <span className="highlight">TED</span> (والتي تعني التكنولوجيا والترفيه
            والتصميم)
            (<span className="highlight">T</span>echnology, <span className="highlight">E</span>ntertainment, <span className="highlight">D</span>esign)

          </h5>
          <p>
            هي منظمة غير ربحية معترف بها عالميًا، ملتزمة بنشر الأفكار المبتكرة من خلال
            محادثات قوية ومختصرة. منذ إنشائها في عام 1984، تطورت تيد إلى منصة للخبراء
            وقادة الفكر عبر مجموعة واسعة من التخصصات، بما في ذلك العلوم والفن والأعمال
            والتعليم والقضايا العالمية.
          </p>
          <p>
            تتميز فعاليات تيد بعروض تقديمية قصيرة وفعالة - عادة ما تكون محددة بـ 18
            دقيقة - تركز على تبسيط الموضوعات المعقدة وتحويلها إلى أفكار سهلة الفهم
            وجذابة. الحدث الرئيسي للمنظمة، وهو مؤتمر تيد السنوي، يجذب قادة عالميين ورواد
            أعمال ورؤى ومفكرين مؤثرين يقدمون محادثات تهدف إلى الإلهام والتوعية وإثارة
            التفكير. يتم إتاحة هذه المحادثات مجانًا على
            <Link href="http://www.TED.com/" target="_blank">
              TED
            </Link>
            وغيرها من المنصات، مما يسهم في ديمقراطية الوصول إلى المعرفة ويسمح للأشخاص
            في جميع أنحاء العالم بالتعلم من بعض من أذكى العقول في مختلف المجالات.
          </p>
          <p>
            تُعرف تيد بشعارها &quot;أفكار تستحق الانتشار&quot;، والذي يؤكد على
            رسالتها في تعزيز الحلول المبتكرة، والقصص الملهمة، ووجهات النظر التحويلية
            حول التحديات العالمية الحرجة. حيث <span className="highlight">x</span> =
            حدث تيد المنظم بشكل مستقل.
          </p>
          <p>
            تابع تيد على تويتر:
            <Link href="http://twitter.com/TEDTalks">
              http://twitter.com/TEDTalks
            </Link>
          </p>
          <p>
            أو على فيسبوك:
            <Link href="http://www.facebook.com/TED">
              http://www.facebook.com/TED
            </Link>
          </p>
        </div>
      </div>
  );
};

export default DefineSection;
