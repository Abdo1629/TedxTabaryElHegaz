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
      className="group relative reveal overflow-hidden rounded-3xl p-[2px] text-right shadow-lg shadow-black/10 transition-all duration-700 ease-out hover:-translate-y-3 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/60 before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-red-500/5 before:via-transparent before:to-amber-500/5 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100"
    >
      <span className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18] mix-blend-multiply bg-[radial-gradient(circle_at_30%_20%,#ff2b06_0%,transparent_60%)]" />
      <span className="pointer-events-none absolute -right-20 -top-24 h-52 w-52 rounded-full bg-gradient-to-br from-red-500/25 to-amber-400/10 blur-3xl group-hover:scale-150 group-hover:rotate-12 transition-all duration-1000 ease-out" />
      <span className="pointer-events-none absolute -left-20 -bottom-24 h-40 w-40 rounded-full bg-gradient-to-tr from-black/15 to-red-600/10 blur-2xl group-hover:scale-125 group-hover:-rotate-6 transition-all duration-800 ease-out" />
      <span className="relative flex h-full flex-col gap-4 rounded-3xl bg-white/95 p-6 backdrop-blur-md ring-1 ring-black/5 group-hover:bg-white/98 transition-all duration-500">
        <span className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 shadow-inner shadow-black/10 after:absolute after:inset-0 after:bg-[linear-gradient(to_bottom_right,rgba(255,255,255,.6),rgba(255,255,255,0))] after:opacity-60 group-hover:ring-red-500/20 group-hover:shadow-red-500/10 transition-all duration-500">
          <Image
            src={placeholderLogo}
            alt={data.name}
            width={140}
            height={140}
            className="object-contain transition-transform duration-[1200ms] ease-out group-hover:scale-110 group-hover:rotate-[5deg] group-hover:brightness-110"
          />
          <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/0 to-amber-500/0 group-hover:from-red-500/10 group-hover:to-amber-500/5 transition-all duration-700" />
        </span>
        <span className="flex flex-col flex-1">
          <span className="mb-1 inline-flex items-center gap-2 self-end rounded-full border border-slate-300/50 bg-white/70 px-3 py-[2px] text-[10px] font-semibold tracking-wider text-slate-500 group-hover:border-red-500/30 group-hover:bg-gradient-to-r group-hover:from-red-50 group-hover:to-amber-50 group-hover:text-red-600 transition-all duration-500">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse group-hover:animate-ping group-hover:bg-red-600" /> {data.category}
          </span>
          <h2 className="mb-3 text-2xl font-extrabold leading-snug tracking-tight group-hover:scale-105 transition-transform duration-500">
            <span className="bg-gradient-to-r from-[#0F2451] via-red-600 to-[#0F2451] bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-x group-hover:from-red-600 group-hover:via-amber-500 group-hover:to-red-700 group-hover:animate-gradient-x-fast">
              {data.name}
            </span>
          </h2>
          <p className="line-clamp-5 whitespace-pre-line leading-relaxed text-[13px] md:text-[15px] text-slate-700 font-medium selection:bg-red-500/60 selection:text-white group-hover:text-slate-800 transition-colors duration-300">
            {data.description}
          </p>
          <span className="mt-5 flex flex-wrap items-center justify-end gap-3 text-base">
            {data.website && (
              <span
                onClick={(e)=>{e.stopPropagation(); window.open(data.website,'_blank');}}
                className="icon-btn cursor-pointer group/icon" title="الموقع" aria-label="Website"
              >
                <FaGlobe className="group-hover/icon:animate-spin" />
              </span>
            )}
            {data.facebook && (
              <span
                onClick={(e)=>{e.stopPropagation(); window.open(data.facebook,'_blank');}}
                className="icon-btn facebook cursor-pointer group/icon" aria-label="Facebook"
              >
                <FaFacebook className="group-hover/icon:animate-bounce" />
              </span>
            )}
            {data.instagram && (
              <span
                onClick={(e)=>{e.stopPropagation(); window.open(data.instagram,'_blank');}}
                className="icon-btn instagram cursor-pointer group/icon" aria-label="Instagram"
              >
                <FaInstagram className="group-hover/icon:animate-pulse" />
              </span>
            )}
            {data.youtube && (
              <span
                onClick={(e)=>{e.stopPropagation(); window.open(data.youtube,'_blank');}}
                className="icon-btn youtube cursor-pointer group/icon" aria-label="YouTube"
              >
                <FaYoutube className="group-hover/icon:animate-bounce" />
              </span>
            )}
            {data.phone && (
              <a onClick={(e)=>e.stopPropagation()} href={`tel:${data.phone}`} className="icon-btn group/icon" aria-label="Phone">
                <FaPhone className="group-hover/icon:animate-ping" />
              </a>
            )}
            {!data.website && !data.facebook && !data.instagram && !data.youtube && !data.phone && (
              <span className="text-xs text-gray-400 flex items-center gap-1 group-hover:text-gray-500 transition-colors duration-300" title="قريباً">
                <FaLink className="opacity-40 group-hover:animate-pulse" /> قريباً
              </span>
            )}
          </span>
        </span>
        <span className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/5 group-hover:ring-red-500/40 group-hover:ring-2 transition-all duration-500" />
        <span className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <span className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
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
      {/* خلفية الهوية البصرية المحسنة */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,0,0,.12),transparent_60%),radial-gradient(circle_at_80%_40%,rgba(0,0,0,.10),transparent_55%),radial-gradient(circle_at_50%_85%,rgba(255,80,0,.15),transparent_65%),radial-gradient(circle_at_70%_70%,rgba(255,200,0,.08),transparent_50%)]" />
        <div className="absolute left-1/2 top-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2 animate-spin-slower bg-[conic-gradient(from_0deg,rgba(255,43,6,0.08),transparent_30%,rgba(0,0,0,0.06),transparent_60%,rgba(255,150,0,0.05),transparent_90%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,43,6,0.02)_49%,rgba(255,43,6,0.02)_51%,transparent_52%)] bg-[length:60px_60px] animate-slide-diagonal" />
        <div className="noise absolute inset-0 opacity-[0.07] mix-blend-overlay" />
        {/* تأثيرات إضافية للخلفية */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-500/5 to-amber-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-black/8 to-red-600/8 rounded-full blur-2xl animate-float-reverse" />
      </div>
      
      <header className="relative mx-auto mb-14 flex max-w-5xl flex-col items-center gap-6 text-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-red-500/20 bg-white/70 px-6 py-3 text-xs font-semibold tracking-wider text-red-600 shadow-lg backdrop-blur-md hover:bg-white/80 hover:border-red-500/30 hover:shadow-xl transition-all duration-500 group">
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-600 group-hover:animate-ping" /> 
          <span className="bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent font-bold">LIVE BRAND SPACE</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight relative group">
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-red-600 via-black to-[#0F2451] bg-[length:300%_100%] bg-clip-text text-transparent animate-gradient-x-slow group-hover:animate-gradient-x-fast">
              شركاؤنا الإستراتيجيون
            </span>
            <span className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-red-200/60 via-amber-200/40 to-red-200/60 blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse-slow" />
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </span>
        </h1>
        <p className="max-w-3xl text-sm md:text-base leading-relaxed text-slate-600 font-medium group hover:text-slate-800 transition-colors duration-300">
          مساحة تفاعلية تُبرز قيمة الشراكات وتمنح كل راعٍ حضوراً بصرياً متناسقاً مع روح TEDx: <br />
          <span className="font-bold bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent">ابتكار – إلهام – تأثير</span>. 
          هذه النسخة قابلة للتوسع بإضافات (تصنيفات، فلترة، حوار تفاصيل، إحصائيات تفاعل) في أي وقت.
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {categories.map((cat, i)=>{
            const active = cat===activeFilter;
            return (
              <button 
                key={cat} 
                onClick={()=>setActiveFilter(cat)} 
                style={{ ['--delay']: `${i * 100}ms` }}
                className={`relative overflow-hidden rounded-full px-5 py-3 text-xs font-bold tracking-wider transition-all duration-500 transform hover:scale-110 hover:-rotate-1 filter-btn ${active? 'text-white bg-gradient-to-r from-red-600 to-amber-500 shadow-lg shadow-red-500/30 ring-2 ring-red-500/20':'text-slate-600 bg-gradient-to-r from-white to-slate-100 ring-1 ring-slate-300/60 hover:text-[#0F2451] hover:shadow-md'}`}
              > 
                <span className="relative z-10">{cat}</span>
                {active && (
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-red-600 opacity-0 hover:opacity-20 transition-opacity duration-300" />
                )}
              </button>
            )
          })}
        </nav>
      </header>
      <div ref={containerRef} className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 relative">
        {/* شبكة تفاعلية مع تأثيرات بصرية */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,43,6,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,43,6,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-30" />
        {filtered.map((s, i) => (
          <SponsorCard key={s.name} data={s} index={i} onOpen={setModalData} />
        ))}
      </div>
      
      <footer className="mt-24 text-center relative">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              النظام يعمل بكفاءة
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <span className="text-lg">🚀</span>
              تم تحسين الأداء والتفاعل
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <span className="text-lg">✨</span>
              هوية بصرية متقدمة
            </div>
          </div>
          <p className="text-xs text-slate-500 font-medium bg-gradient-to-r from-slate-500 via-red-500 to-slate-500 bg-clip-text text-transparent">
            نسخة تصميم متقدمة – يمكن تخصيص كل التفاصيل بناءً على الهوية النهائية
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="text-xs text-slate-400">مع</span>
            <span className="text-red-500 text-lg animate-pulse">❤️</span>
            <span className="text-xs text-slate-400">من فريق TEDx</span>
          </div>
        </div>
      </footer>
      {/* مودال محسّن */}
      {modalData && (
        <div onClick={()=>setModalData(null)} className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-10 backdrop-blur-md bg-black/50">          
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-red-900/20 to-black/40 animate-fade-in" />
          <div onClick={(e)=>e.stopPropagation()} className="relative w-full md:max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-3xl md:rounded-3xl bg-white shadow-2xl ring-1 ring-black/10 animate-modal-in flex flex-col before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-red-500/5 before:to-amber-500/5 before:pointer-events-none">
            <div className="flex items-center justify-between gap-4 px-6 py-5 border-b border-slate-200/70 bg-gradient-to-r from-white via-red-50/30 to-white backdrop-blur relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,43,6,0.05),transparent)] animate-shimmer" />
              <h3 className="text-2xl font-extrabold bg-gradient-to-r from-red-600 via-amber-500 to-red-600 bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-x relative z-10">{modalData.name}</h3>
              <button onClick={()=>setModalData(null)} className="icon-btn w-10 h-10 text-sm font-bold !rounded-full hover:rotate-90 hover:scale-110 transition-all duration-300 group">
                <span className="relative z-10 group-hover:animate-pulse">×</span>
              </button>
            </div>
            <div className="px-6 py-6 space-y-6 text-right text-slate-700 leading-relaxed relative">
              <div className="flex flex-wrap gap-6 items-center justify-end">
                <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-white to-slate-50 ring-1 ring-black/5 shadow-xl shadow-black/5 group">
                  <Image src={placeholderLogo} alt={modalData.name} width={120} height={120} className="object-contain group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500/0 to-amber-500/0 group-hover:from-red-500/10 group-hover:to-amber-500/5 transition-all duration-500" />
                </div>
                <span className="inline-flex items-center gap-3 rounded-full border border-slate-300/60 bg-gradient-to-r from-slate-50 to-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm hover:shadow-md transition-all duration-300">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  الفئة: {modalData.category}
                </span>
              </div>
              <p className="whitespace-pre-line text-base md:text-lg font-medium leading-relaxed text-slate-800 selection:bg-red-500/20 selection:text-red-800">{modalData.description}</p>
              <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-100">
                {modalData.website && <a target="_blank" href={modalData.website} className="icon-btn !w-auto !px-6 !py-3 !rounded-full text-sm font-bold gap-3 hover:scale-105 transition-all duration-300 group"><FaGlobe className="group-hover:animate-spin" /> موقع</a>}
                {modalData.facebook && <a target="_blank" href={modalData.facebook} className="icon-btn facebook !w-auto !px-6 !py-3 !rounded-full text-sm font-bold gap-3 hover:scale-105 transition-all duration-300 group"><FaFacebook className="group-hover:animate-bounce" /> فيسبوك</a>}
                {modalData.instagram && <a target="_blank" href={modalData.instagram} className="icon-btn instagram !w-auto !px-6 !py-3 !rounded-full text-sm font-bold gap-3 hover:scale-105 transition-all duration-300 group"><FaInstagram className="group-hover:animate-pulse" /> انستجرام</a>}
                {modalData.youtube && <a target="_blank" href={modalData.youtube} className="icon-btn youtube !w-auto !px-6 !py-3 !rounded-full text-sm font-bold gap-3 hover:scale-105 transition-all duration-300 group"><FaYoutube className="group-hover:animate-bounce" /> يوتيوب</a>}
                {modalData.phone && <a href={`tel:${modalData.phone}`} className="icon-btn !w-auto !px-6 !py-3 !rounded-full text-sm font-bold gap-3 hover:scale-105 transition-all duration-300 group"><FaPhone className="group-hover:animate-ping" /> اتصال</a>}
              </div>
            </div>
            {/* تأثيرات إضافية للمودال */}
            <div className="absolute top-0 left-1/2 w-32 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent transform -translate-x-1/2" />
            <div className="absolute bottom-0 left-1/2 w-32 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent transform -translate-x-1/2" />
          </div>
        </div>
      )}
      <style jsx>{`
        .reveal {opacity:0; transform:translateY(60px) scale(.94) rotateX(5deg);}
        .reveal.show {opacity:1; transform:translateY(0) scale(1) rotateX(0deg); transition:opacity 1.2s cubic-bezier(.19,1,.22,1) var(--d), transform 1.3s cubic-bezier(.19,1,.22,1) var(--d);}        
        .icon-btn { @apply relative overflow-hidden inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-slate-100 via-white to-slate-100 text-slate-600 shadow-md ring-1 ring-black/5 transition-all duration-400 hover:text-white hover:shadow-xl hover:-translate-y-1 hover:scale-110; }
        .icon-btn::before {content:""; position:absolute; inset:0; background:linear-gradient(135deg,#ff2b06,#ff8a05); opacity:0; transition:opacity .5s ease-out, transform .5s ease-out; transform:scale(0.8);}
        .icon-btn:hover::before {opacity:1; transform:scale(1);}
        .icon-btn > :global(svg){ position:relative; z-index:1; transition:transform .3s ease; }
        .icon-btn:hover > :global(svg){ transform:scale(1.1); }
        .icon-btn.facebook { @apply bg-gradient-to-br from-white via-blue-50 to-white; }
        .icon-btn.facebook:hover::before {background:linear-gradient(135deg,#0866ff,#3b82f6);}        
        .icon-btn.instagram { background:radial-gradient(circle at 30% 30%,#feda75,#d62976 40%,#962fbf 70%,#4f5bd5); color:#fff; box-shadow: 0 8px 25px rgba(214, 41, 118, 0.3); }
        .icon-btn.instagram::before {display:none;}
        .icon-btn.instagram:hover { box-shadow: 0 12px 35px rgba(214, 41, 118, 0.4); transform:translateY(-2px) scale(1.1); }
        .icon-btn.youtube { @apply bg-gradient-to-br from-white via-red-50 to-white text-red-600; }
        .icon-btn.youtube:hover::before {background:linear-gradient(135deg,#ff0000,#ff4d4d);}        
        .icon-btn:hover { transform:translateY(-6px) rotate(-3deg) scale(1.05); }
        .icon-btn:active { transform:scale(.95) rotate(0deg); }
        @media (hover:none){ .icon-btn:hover{transform:none;} }
        
        /* Enhanced Animations */
        .animate-gradient-x { animation:gradientX 8s linear infinite; }
        .animate-gradient-x-fast { animation:gradientX 3s linear infinite; }
        .animate-gradient-x-slow { animation:gradientX 12s linear infinite; }
        @keyframes gradientX { 0%{background-position:0% 50%;} 100%{background-position:200% 50%;} }
        
        .animate-spin-slow { animation:spin 45s linear infinite; }
        .animate-spin-slower { animation:spin 60s linear infinite; }
        @keyframes spin { to { transform:rotate(360deg);} }
        
        .animate-pulse-slow { animation:pulseSlow 3s ease-in-out infinite; }
        @keyframes pulseSlow { 0%, 100% { opacity: 1; } 50% { opacity: .7; } }
        
        .animate-float { animation:float 6s ease-in-out infinite; }
        .animate-float-reverse { animation:floatReverse 8s ease-in-out infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(2deg); } }
        @keyframes floatReverse { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(20px) rotate(-2deg); } }
        
        .animate-slide-diagonal { animation:slideDiagonal 20s linear infinite; }
        @keyframes slideDiagonal { 0% { transform: translateX(-100%) translateY(-100%); } 100% { transform: translateX(100%) translateY(100%); } }
        
        .animate-shimmer { animation:shimmer 2s ease-in-out infinite; }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        
        .filter-btn { animation:filterButtonIn 0.6s cubic-bezier(.68,-0.55,.265,1.55) var(--delay) both; }
        @keyframes filterButtonIn { 0% { opacity:0; transform:translateY(20px) scale(0.8) rotate(-10deg); } 100% { opacity:1; transform:translateY(0) scale(1) rotate(0deg); } }
        
        .noise { background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E"); mix-blend-mode:overlay; }
        
        .animate-fade-in {animation:fadeIn .8s ease forwards;}
        .animate-modal-in {animation:modalIn .7s cubic-bezier(.16,1,.3,1);}
        @keyframes fadeIn { from {opacity:0; backdrop-filter:blur(0px);} to {opacity:1; backdrop-filter:blur(12px);} }
        @keyframes modalIn { 
          from { 
            opacity:0; 
            transform:translateY(60px) scale(.92) rotateX(10deg); 
            filter:blur(4px);
          } 
          to {
            opacity:1; 
            transform:translateY(0) scale(1) rotateX(0deg);
            filter:blur(0px);
          } 
        }
        
        .line-clamp-5 { display:-webkit-box; -webkit-line-clamp:5; -webkit-box-orient:vertical; overflow:hidden; }
        
        /* Improved responsive design */
        @media (max-width: 768px) {
          .reveal.show { transform:translateY(0) scale(1) rotateX(0deg); transition:opacity 1s cubic-bezier(.19,1,.22,1) var(--d), transform 1.1s cubic-bezier(.19,1,.22,1) var(--d); }
          .icon-btn:hover { transform:translateY(-3px) rotate(-1deg) scale(1.03); }
        }
        
        /* Enhanced hover effects for cards */
        @media (hover: hover) {
          .group:hover .animate-pulse { animation-duration: 0.5s; }
          .group:hover .animate-gradient-x { animation-duration: 2s; }
        }
      `}</style>
    </main>
  );
}
