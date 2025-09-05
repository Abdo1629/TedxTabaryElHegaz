"use client";

import Image from "next/image";

const sponsors = [
  {
    name: "QR Tag",
    logo: "/sponsors/qr-tag.png",
    description: `
شركة متخصصة في تقديم حلول QR وNFC مبتكرة لمشاركة المعلومات والروابط والملفات بسهولة فائقة، 
بدون الحاجة إلى تطبيقات معقدة أو بطاقات ورقية.
رؤيتهم أن يكونوا الخيار الأول للأفراد والشركات في الشرق الأوسط للتواصل الرقمي بطرق عصرية وصديقة للبيئة.
منتجاتهم تشمل KeyTag NFC، كروت أعمال ذكية، وحلول مخصصة للشركات.
    `,
    url: "https://example.com",
    bg: "bg-blue-50",
  },
  {
    name: "LinkOut",
    logo: "/sponsors/linkout.png",
    description: `
شركة ناشئة مصرية متخصصة في تقديم حلول ذكية وسريعة لمشاركة المعلومات عبر QR وNFC.
بتركز على ربط الأفراد والشركات مع بعض بشكل عصري وسهل.
    `,
    url: "https://example.com",
    bg: "bg-green-50",
  },
  {
    name: "Elavate Holding",
    logo: "/sponsors/elavate.png",
    description: `
    إيلافيت هولدنغ هي شركة متخصصة في تقديم حلول إدارة المشاريع، 
    وتقديم نتائج بامتياز، بالإضافة إلى كونها مركز اتصال رئيسي متخصص في خدمة العملاء، 
    التسويق عبر الهاتف والاستشارات التجارية.  
    نحن ملتزمون بتزويد عملائنا بخدمات استثنائية من خلال توظيف أفضل الكفاءات وتبني أحدث الأساليب.  
    `,
    url: "https://example.com",
    bg: "bg-green-50",
  },
  {
    name: "Apple Mechanic",
    logo: "/sponsors/apple-mechanic.png",
    description:`
Apple Mechanic هو مركز رائد ومتخصص في صيانة أجهزة أبل وأندرويد، تأسس عام 2010 لخدمة كل شخص يبحث عن الثقة، الأمانة، والإتقان في إصلاح أجهزته الإلكترونية. 
خلال أكثر من 15 سنة، خدمنا أكثر من 15,000 عميل، وقدمنا تدريبًا احترافيًا لأكثر من 1,000 طالب. 
رؤيتنا أن نصبح المرجع الأول والأكثر ثقة في مصر والشرق الأوسط لصيانة أجهزة أبل وتدريب الفنيين المحترفين. 
مهمتنا تقديم خدمات صيانة عالية الجودة وموثوقة، وبرامج تدريب متخصصة للشباب.
قيمنا: الثقة – الإتقان – الأمانة – المعرفة قوة – الابتكار.
    `,
    url: "https://example.com",
    bg: "bg-red-50",
  },
  {
    name: "Qudraat",
    logo: "/sponsors/qudraat.png",
    description: `
    قدرات ليست مجرد شركة بل منصة تبدأ من سؤال "من أنا؟" وتساعد الشباب على استكشاف إمكانياتهم 
    وتنمية مهاراتهم في مجالات متعددة مثل التصوير، البرمجة، وريادة الأعمال.  
    رؤيتنا: أن يكون الشباب قادرًا على مواكبة سوق العمل بمهارات حقيقية وفرص تدريبية وتمكينية.  
    نرى في الشباب بذرة تحتاج إلى الثقة والعلم والفرص لتنمو وتثمر.  
    `,
    url: "https://example.com",
    bg: "bg-yellow-50",
  },
  {
    name: "Rehla Travel",
    logo: "/sponsors/rehla.png",
    description: `
شركة سياحة بتقدم تجارب سفر مميزة ومختلفة للشباب والعائلات، 
مع خطط منظمة وأسعار مناسبة.
    `,
    url: "https://example.com",
    bg: "bg-orange-50",
  },
  {
    name: "English Capsules",
    logo: "/sponsors/english-capsules.png",
    description: `
المؤسسة التعليمية الرائدة منذ عام 2015، والتي ساهمت في تمكين أكثر من 100,000 طالب من تطوير مهاراتهم اللغوية والمهنية، ليصبحوا أكثر استعدادًا للتواصل والنجاح في عالمٍ مترابط.  
`,
    url: "https://example.com",
    bg: "bg-indigo-50",
  },
  {
    name: "Covix Care",
    logo: "/sponsors/covix-care.png",
    description: `
Covix Care هو علامة سعودية مبتكرة متخصصة في منتجات العناية الشخصية والصحية ذات الجودة العالية، تُقدم تركيبات فعّالة وآمنة تركز على النظافة الصحية والعناية بالبشرة.  
منتجاتنا تشمل: كريمات التفتيح، لوشن الجسم، غسولات مخصصة لمناطق حساسة، غسولات يومية ومرطبات، مما يجعلنا الخيار الأمثل لمن يبحث عن نظافة شخصية راقية وصديقة للبشرة.  
`,
    url: "https://example.com",
    bg: "bg-teal-50",
  },
  {
    name: "Tseppas",
    logo: "/sponsors/tseppas.png",
    description: `
تسيباس غنيّين عن التعريف، واحد من أكثر الأسماء شعبيّة في عالم الحلويات الشرقية والغربية، وتميّز في تقديم الجودة والطعم المميّز للملايين، ما يجعله علامة تجارية محبّبة وموثوق بها.  
`,
    url: "https://example.com",
    bg: "bg-pink-50",
  },
  {
    name: "Special Courses Academy",
    logo: "/sponsors/special-courses.png",
    description: `
أكاديمية سبيشيال كورس من أقوى الأكاديميات التدريبية في مصر، 
بتقدم كورسات لغات وكورسات مهنية بأسلوب عملي يوصل الطلبة والخريجين لسوق العمل.
من الكورسات: 
- إنجليزي من المبتدئ للمحترف 
- ألماني، إيطالي، أسباني، فرنساوي 
- جرافيك ديزاين وموشن جرافيك 
- ICDL وبرمجة 
- موارد بشرية وتسويق عملي 
- إعداد المدربين وتنمية المهارات الشخصية
    `,
    url: "https://example.com",
    bg: "bg-purple-50",
  },
];

export default function SponsorsPage() {
  return (
    <main className="w-full min-h-screen p-6 md:p-12 bg-white text-[#0F2451]">
      <h1 className="mb-10 text-3xl font-bold text-center">
        شركاؤنا 
      </h1>
      <div className="space-y-10">
        {sponsors.map((sponsor, index) => (
          <section
            key={index}
            className={`flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl shadow-md ${sponsor.bg}`}
          >
            <div className="relative flex-shrink-0 w-40 h-40">
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex-1 text-right">
              <h2 className="mb-2 text-2xl font-semibold">{sponsor.name}</h2>
              <p className="leading-relaxed whitespace-pre-line">
                {sponsor.description}
              </p>
              {sponsor.url && (
                <a
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-blue-600 hover:underline"
                >
                  الموقع الرسمي
                </a>
              )}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
