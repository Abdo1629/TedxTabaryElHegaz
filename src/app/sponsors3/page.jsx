"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useMemo } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaGlobe,
  FaPhone,
  FaLink,
} from "react-icons/fa";

// صورة مؤقتة موحدة (Placeholder) لكل الرعاة إلى أن يتم تزويدنا بكل لوجو رسمي
const placeholderLogo = "/images/Tabarylogo.png"; // يمكن تغييرها لاحقاً بسهولة

// البيانات بعد دمج الروابط الجديدة التي قدمتها
const sponsors = [
  {
    name: "QR Tag",
  category: "تقني",
    description: `شركة متخصصة في تقديم حلول QR وNFC مبتكرة لمشاركة المعلومات والروابط والملفات بسهولة فائقة، بدون الحاجة إلى تطبيقات معقدة أو بطاقات ورقية.
رؤيتهم أن يكونوا الخيار الأول في الشرق الأوسط للتواصل الرقمي بطرق عصرية وصديقة للبيئة.
منتجاتهم تشمل KeyTag NFC، كروت أعمال ذكية، وحلول مخصصة للشركات.`,
    website: "https://www.qrtagapp.com",
    facebook: null,
    instagram: null,
    youtube: null,
    phone: null,
    bg: "from-blue-50 to-blue-100",
  },
  {
    name: "LinkOut",
  category: "تقني",
    description: `شركة ناشئة مصرية تقدم حلول سريعة وذكية لمشاركة المعلومات عبر QR وNFC لربط الأفراد والشركات بطريقة عصرية سهلة.`,
    website: "https://linkout.odoo.com",
    facebook: "https://www.facebook.com/LinkOut20",
    instagram: null,
    youtube: null,
    phone: null,
    bg: "from-emerald-50 to-green-100",
  },
  {
    name: "Elavate Holding",
  category: "أعمال",
    description: `إيلافيت هولدنغ متخصصة في حلول إدارة المشاريع، وخدمات مراكز الاتصال، والتسويق عبر الهاتف، والاستشارات التجارية مع التزام بمعايير عالية.`,
    website: null,
    facebook: null,
    instagram: null,
    youtube: null,
    phone: null,
    bg: "from-teal-50 to-teal-100",
  },
  {
    name: "Apple Mechanic",
  category: "تقني",
    description: `مركز متخصص في صيانة أجهزة أبل وأندرويد منذ 2010، خدم آلاف العملاء ودرّب مئات المتدربين، مع رؤية للريادة في الثقة والجودة والابتكار.`,
    website: null,
    facebook: "https://www.facebook.com/AppleMechanic.eg",
    instagram: null,
    youtube: null,
    phone: null,
    bg: "from-rose-50 to-red-100",
  },
  {
    name: "Qudraat",
  category: "تمكين",
    description: `منصة تمكين للشباب: اكتشاف الذات، بناء المهارات (تصوير، برمجة، ريادة أعمال) وتجهيز لسوق العمل بثقة وعلم وفرص.`,
    website: null,
    facebook: null,
    instagram: null,
    youtube: null,
    phone: null,
    bg: "from-yellow-50 to-amber-100",
  },
  {
    name: "Rehla Travel",
  category: "سفر",
    description: `شركة سياحية تقدم تجارب سفر مميزة للشباب والعائلات بخطط منظمة وأسعار مناسبة.`,
    website: null,
    facebook: null,
    instagram: null,
    youtube: null,
    phone: null,
    bg: "from-orange-50 to-orange-100",
  },
  {
    name: "English Capsules",
  category: "تعليم",
    description: `مؤسسة تعليمية منذ 2015 ساعدت أكثر من 100,000 طالب على تطوير مهاراتهم اللغوية والمهنية والاستعداد للتواصل والنجاح.`,
    website: "https://englishcapsules.com",
    facebook: "https://www.facebook.com/English.Capsules",
    instagram: null,
    youtube: null,
    phone: null,
    bg: "from-indigo-50 to-indigo-100",
  },
  {
    name: "Covix Care",
  category: "صحة",
    description: `علامة سعودية متخصصة في منتجات العناية الشخصية والصحية ذات تركيبات فعّالة وآمنة تركز على النظافة والعناية بالبشرة.`,
    website: null,
    facebook: null,
    instagram: null,
    youtube: null,
    phone: null,
    bg: "from-teal-50 to-cyan-100",
  },
  {
    name: "Tseppas",
  category: "أغذية",
    description: `اسم عريق في عالم الحلويات الشرقية والغربية بجودة عالية وطعم مميز جعل العلامة محبوبة وموثوقة.`,
    website: null,
    facebook: null,
    instagram: null,
    youtube: null,
    phone: null,
    bg: "from-pink-50 to-pink-100",
  },
  {
    name: "Special Courses Academy",
  category: "تعليم",
    description: `أكاديمية تدريب تقدم لغات ومهارات مهنية (إنجليزي، ألماني، جرافيك، برمجة، موارد بشرية، تسويق، إعداد مدربين) بأسلوب عملي يعبر للوظيفة.`,
    website: "https://specialcourse.io",
    facebook: "https://www.facebook.com/share/1BFAzfznZe/",
    instagram: "https://www.instagram.com/specialcourse_?igsh=bjRuZmNwY2tyMGE0",
    youtube: "https://youtube.com/@special-course?si=mqhtSy6qX59dfcT1",
    phone: "01556289284",
    bg: "from-purple-50 to-violet-100",
  },
];

// مكون بطاقة الراعي (داخل نفس الملف حسب الشرط)
// توليد تدرج فريد من الاسم (Hash بسيط)
function gradientFromName(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  const h1 = Math.abs(h) % 360;
  const h2 = (h1 + 40) % 360;
  return `linear-gradient(135deg,hsl(${h1} 85% 65% / .25),hsl(${h2} 85% 55% / .25))`;
}

function SponsorCard({ data, index, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(data)}
      style={{ ['--d']: `${index * 70}ms`, backgroundImage: gradientFromName(data.name) }}
      className="group relative reveal overflow-hidden rounded-3xl p-[2px] text-right shadow-lg shadow-black/10 transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/60"
    >
      <span className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18] mix-blend-multiply bg-[radial-gradient(circle_at_30%_20%,#ff2b06_0%,transparent_60%)]" />
      <span className="pointer-events-none absolute -right-20 -top-24 h-52 w-52 rounded-full bg-gradient-to-br from-red-500/25 to-amber-400/10 blur-3xl group-hover:scale-125 transition-transform duration-700" />
      <span className="relative flex h-full flex-col gap-4 rounded-3xl bg-white/95 p-6 backdrop-blur-md ring-1 ring-black/5">
        <span className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 shadow-inner shadow-black/10 after:absolute after:inset-0 after:bg-[linear-gradient(to_bottom_right,rgba(255,255,255,.6),rgba(255,255,255,0))] after:opacity-60">
          <Image
            src={placeholderLogo}
            alt={data.name}
            width={140}
            height={140}
            className="object-contain transition-transform duration-[1200ms] group-hover:scale-110 group-hover:rotate-[3deg]"
          />
        </span>
        <span className="flex flex-col flex-1">
          <span className="mb-1 inline-flex items-center gap-2 self-end rounded-full border border-slate-300/50 bg-white/70 px-3 py-[2px] text-[10px] font-semibold tracking-wider text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" /> {data.category}
          </span>
          <h2 className="mb-3 text-2xl font-extrabold leading-snug tracking-tight">
            <span className="bg-gradient-to-r from-[#0F2451] via-red-600 to-[#0F2451] bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-x">
              {data.name}
            </span>
          </h2>
          <p className="line-clamp-5 whitespace-pre-line leading-relaxed text-[13px] md:text-[15px] text-slate-700 font-medium selection:bg-red-500/60 selection:text-white">
            {data.description}
          </p>
          <span className="mt-5 flex flex-wrap items-center justify-end gap-3 text-base">
            {data.website && (
              <span
                onClick={(e)=>{e.stopPropagation(); window.open(data.website,'_blank');}}
                className="icon-btn cursor-pointer" title="الموقع" aria-label="Website"
              >
                <FaGlobe />
              </span>
            )}
            {data.facebook && (
              <span
                onClick={(e)=>{e.stopPropagation(); window.open(data.facebook,'_blank');}}
                className="icon-btn facebook cursor-pointer" aria-label="Facebook"
              >
                <FaFacebook />
              </span>
            )}
            {data.instagram && (
              <span
                onClick={(e)=>{e.stopPropagation(); window.open(data.instagram,'_blank');}}
                className="icon-btn instagram cursor-pointer" aria-label="Instagram"
              >
                <FaInstagram />
              </span>
            )}
            {data.youtube && (
              <span
                onClick={(e)=>{e.stopPropagation(); window.open(data.youtube,'_blank');}}
                className="icon-btn youtube cursor-pointer" aria-label="YouTube"
              >
                <FaYoutube />
              </span>
            )}
            {data.phone && (
              <a onClick={(e)=>e.stopPropagation()} href={`tel:${data.phone}`} className="icon-btn" aria-label="Phone">
                <FaPhone />
              </a>
            )}
            {!data.website && !data.facebook && !data.instagram && !data.youtube && !data.phone && (
              <span className="text-xs text-gray-400 flex items-center gap-1" title="قريباً">
                <FaLink className="opacity-40" /> قريباً
              </span>
            )}
          </span>
        </span>
        <span className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/5 group-hover:ring-red-500/40 transition-colors" />
      </span>
    </button>
  );
}

export default function SponsorsPage() {
  const containerRef = useRef(null);
  const parallaxRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('الكل');
  const [modalData, setModalData] = useState(null);

  const categories = useMemo(() => {
    const set = new Set(sponsors.map(s=>s.category));
    return ['الكل', ...Array.from(set)];
  }, []);

  const filtered = useMemo(()=>{
    if(activeFilter==='الكل') return sponsors;
    return sponsors.filter(s=>s.category===activeFilter);
  },[activeFilter]);

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll('.reveal');
    if (!cards) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('show');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  // Parallax خفيف
  useEffect(()=>{
    const el = parallaxRef.current;
    if(!el) return;
    const handler = (e)=>{
      const { innerWidth:w, innerHeight:h } = window;
      const x = (e.clientX - w/2) / w;
      const y = (e.clientY - h/2) / h;
      el.style.transform = `translate3d(${x*25}px, ${y*25}px,0)`;
    };
    window.addEventListener('pointermove', handler);
    return ()=>window.removeEventListener('pointermove', handler);
  },[]);

  return (
    <main className="relative w-full min-h-screen px-4 py-16 md:px-14 text-[#0F2451] font-sans overflow-hidden" dir="rtl">
      {/* خلفية الهوية البصرية */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,0,0,.10),transparent_60%),radial-gradient(circle_at_80%_40%,rgba(0,0,0,.08),transparent_55%),radial-gradient(circle_at_50%_85%,rgba(255,80,0,.12),transparent_65%)]" />
        <div className="absolute left-1/2 top-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2 animate-spin-slow bg-[conic-gradient(from_0deg,rgba(255,43,6,0.07),transparent_40%,rgba(0,0,0,0.06),transparent_70%)]" />
        <div className="noise absolute inset-0 opacity-[0.07] mix-blend-overlay" />
      </div>
      <header className="relative mx-auto mb-14 flex max-w-5xl flex-col items-center gap-6 text-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-red-500/20 bg-white/60 px-5 py-2 text-xs font-semibold tracking-wider text-red-600 shadow backdrop-blur">
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-600" /> LIVE BRAND SPACE
        </div>
        <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight relative">
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-red-600 via-black to-[#0F2451] bg-clip-text text-transparent animate-gradient-x">شركاؤنا الإستراتيجيون</span>
            <span className="absolute -inset-2 rounded-lg bg-gradient-to-r from-red-200/60 to-amber-200/40 blur-sm" />
          </span>
        </h1>
        <p className="max-w-3xl text-sm md:text-base leading-relaxed text-slate-600 font-medium">
          مساحة تفاعلية تُبرز قيمة الشراكات وتمنح كل راعٍ حضوراً بصرياً متناسقاً مع روح TEDx: \n ابتكار – إلهام – تأثير. هذه النسخة قابلة للتوسع بإضافات (تصنيفات، فلترة، حوار تفاصيل، إحصائيات تفاعل) في أي وقت.
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {categories.map(cat=>{
            const active = cat===activeFilter;
            return (
              <button key={cat} onClick={()=>setActiveFilter(cat)} className={`relative overflow-hidden rounded-full px-4 py-2 text-xs font-bold tracking-wider transition-all duration-300 ${active? 'text-white':'text-slate-600'} bg-gradient-to-r ${active? 'from-red-600 to-amber-500 shadow-lg shadow-red-500/30':'from-white to-slate-100 ring-1 ring-slate-300/60 hover:text-[#0F2451]'}`}> 
                <span className="relative z-10">{cat}</span>
              </button>
            )
          })}
        </nav>
      </header>
      <div ref={containerRef} className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((s, i) => (
          <SponsorCard key={s.name} data={s} index={i} onOpen={setModalData} />
        ))}
      </div>
      <footer className="mt-20 text-center text-xs text-slate-500 font-medium">
        نسخة تصميم تجريبية – يمكن تخصيص كل التفاصيل بناءً على الهوية النهائية.
      </footer>
      {/* مودال */}
      {modalData && (
        <div onClick={()=>setModalData(null)} className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-10 backdrop-blur-sm">          
          <div className="absolute inset-0 bg-black/40 animate-fade-in" />
          <div onClick={(e)=>e.stopPropagation()} className="relative w-full md:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-3xl md:rounded-3xl bg-white shadow-2xl ring-1 ring-black/10 animate-modal-in flex flex-col">
            <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-slate-200/70 bg-gradient-to-r from-white to-slate-50">
              <h3 className="text-xl font-extrabold bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent">{modalData.name}</h3>
              <button onClick={()=>setModalData(null)} className="icon-btn w-9 h-9 text-xs font-bold !rounded-full">×</button>
            </div>
            <div className="px-6 py-5 space-y-5 text-right text-slate-700 leading-relaxed">
              <div className="flex flex-wrap gap-4 items-center justify-end">
                <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 shadow-inner">
                  <Image src={placeholderLogo} alt={modalData.name} width={100} height={100} className="object-contain" />
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-300/60 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-600">الفئة: {modalData.category}</span>
              </div>
              <p className="whitespace-pre-line text-sm md:text-[15px] font-medium">{modalData.description}</p>
              <div className="flex flex-wrap items-center justify-end gap-2">
                {modalData.website && <a target="_blank" href={modalData.website} className="icon-btn !w-auto !px-4 !rounded-full text-[12px] font-bold gap-2"><FaGlobe /> موقع</a>}
                {modalData.facebook && <a target="_blank" href={modalData.facebook} className="icon-btn facebook !w-auto !px-4 !rounded-full text-[12px] font-bold gap-2"><FaFacebook /> فيسبوك</a>}
                {modalData.instagram && <a target="_blank" href={modalData.instagram} className="icon-btn instagram !w-auto !px-4 !rounded-full text-[12px] font-bold gap-2"><FaInstagram /> انستجرام</a>}
                {modalData.youtube && <a target="_blank" href={modalData.youtube} className="icon-btn youtube !w-auto !px-4 !rounded-full text-[12px] font-bold gap-2"><FaYoutube /> يوتيوب</a>}
                {modalData.phone && <a href={`tel:${modalData.phone}`} className="icon-btn !w-auto !px-4 !rounded-full text-[12px] font-bold gap-2"><FaPhone /> اتصال</a>}
              </div>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .reveal {opacity:0; transform:translateY(60px) scale(.94);}
        .reveal.show {opacity:1; transform:translateY(0) scale(1); transition:opacity 1s cubic-bezier(.19,1,.22,1) var(--d), transform 1.1s cubic-bezier(.19,1,.22,1) var(--d);}        
        .icon-btn { @apply relative overflow-hidden inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-white text-slate-600 shadow ring-1 ring-black/5 transition-all duration-300 hover:text-white hover:shadow-lg; }
        .icon-btn::before {content:""; position:absolute; inset:0; background:linear-gradient(135deg,#ff2b06,#ff8a05); opacity:0; transition:opacity .4s;}
        .icon-btn:hover::before {opacity:1;}
        .icon-btn > :global(svg){ position:relative; z-index:1; }
        .icon-btn.facebook { @apply bg-white; }
        .icon-btn.facebook:hover::before {background:linear-gradient(135deg,#0866ff,#3b82f6);}        
        .icon-btn.instagram { background:radial-gradient(circle at 30% 30%,#feda75,#d62976 40%,#962fbf 70%,#4f5bd5); color:#fff; }
        .icon-btn.instagram::before {display:none;}
        .icon-btn.youtube { @apply bg-white text-red-600; }
        .icon-btn.youtube:hover::before {background:linear-gradient(135deg,#ff0000,#ff4d4d);}        
        .icon-btn:hover { transform:translateY(-5px) rotate(-2deg); }
        .icon-btn:active { transform:scale(.92); }
        @media (hover:none){ .icon-btn:hover{transform:none;} }
        .animate-gradient-x { animation:gradientX 8s linear infinite; }
        @keyframes gradientX { 0%{background-position:0% 50%;} 100%{background-position:200% 50%;} }
        .animate-spin-slow { animation:spin 45s linear infinite; }
        @keyframes spin { to { transform:rotate(360deg);} }
        .noise { background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='.4'/%3E%3C/svg%3E"); mix-blend-mode:overlay; }
  .animate-fade-in {animation:fadeIn .6s ease forwards;}
  .animate-modal-in {animation:modalIn .65s cubic-bezier(.16,1,.3,1);}
  @keyframes fadeIn { from {opacity:0;} to {opacity:1;} }
  @keyframes modalIn { from { opacity:0; transform:translateY(40px) scale(.96);} to {opacity:1; transform:translateY(0) scale(1);} }
  .line-clamp-5 { display:-webkit-box; -webkit-line-clamp:5; -webkit-box-orient:vertical; overflow:hidden; }
      `}</style>
    </main>
  );
}
