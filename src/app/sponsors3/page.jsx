"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Custom SVG Icons for better control
const FacebookIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const LinkedinIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const WhatsappIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.437 3.488"/>
  </svg>
);

const YoutubeIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const GlobeIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

// بيانات الرعاة (يمكن نقلها لاحقاً إلى ملف JSON مستقل)
const sponsors = [
  // الترتيب المطلوب أولاً
  { name: "QR Tag", tier: "استراتيجي", logo: "/images/Real-Sponsors/QR%20Tag.jpg", description: `شركة متخصصة في تقديم حلول QR وNFC مبتكرة لمشاركة المعلومات والروابط والملفات بسهولة فائقة، بدون الحاجة إلى تطبيقات معقدة أو بطاقات ورقية. رؤيتهم أن يكونوا الخيار الأول للأفراد والشركات في الشرق الأوسط للتواصل الرقمي بطرق عصرية وصديقة للبيئة. منتجاتهم تشمل KeyTag NFC، كروت أعمال ذكية، وحلول مخصصة للشركات.`, url: "https://www.qrtagapp.com", social: { website: "https://www.qrtagapp.com", facebook: "https://www.facebook.com/share/1BAXVmK4rs/?mibextid=wwXIfr" } },
  { name: "Qudraat", tier: "ذهبي", logo: "/images/Real-Sponsors/Qudraat.jpg", description: `قدرات ليست مجرد شركة بل منصة تبدأ من سؤال "من أنا؟" وتساعد الشباب على استكشاف إمكانياتهم وتنمية مهاراتهم في مجالات متعددة. رؤيتنا: أن يكون الشباب قادرًا على مواكبة سوق العمل بمهارات حقيقية. نرى في الشباب بذرة تحتاج الثقة والعلم والفرص.`, url: "https://qudraat.com", social: { website: "https://qudraat.com", facebook: "https://www.facebook.com/share/1EL9kryogf/?mibextid=wwXIfr" } },
  { name: "LinkOut", tier: "ذهبي", logo: "/images/Real-Sponsors/LinkOut.jpg", description: `شركة ناشئة مصرية متخصصة في تقديم حلول ذكية وسريعة لمشاركة المعلومات عبر QR وNFC. بتركز على ربط الأفراد والشركات مع بعض بشكل عصري وسهل.`, url: "https://linkout.odoo.com", social: { website: "https://linkout.odoo.com", facebook: "https://www.facebook.com/LinkOut20" } },
  { name: "English Capsules", tier: "ذهبي", logo: "/images/Real-Sponsors/English%20Capsules.jpg", description: `المؤسسة التعليمية الرائدة منذ 2015، ساهمت في تمكين أكثر من 100,000 طالب من تطوير مهاراتهم اللغوية والمهنية.`, url: "http://englishcapsules.com", social: { website: "http://englishcapsules.com", facebook: "https://www.facebook.com/English.Capsules" } },
  { name: "Special Courses Academy", tier: "داعم", logo: "/images/Real-Sponsors/Special%20Courses%20Academy.jpg", description: `أكاديمية تقدم كورسات لغات ومهنية بأسلوب عملي يوصل الطلبة والخريجين لسوق العمل (لغات – جرافيك – برمجة – موارد بشرية – مهارات شخصية).`, url: "https://specialcourse.io", social: { website: "https://specialcourse.io", facebook: "https://www.facebook.com/share/1BFAzfznZe/", instagram: "https://www.instagram.com/specialcourse_?igsh=bjRuZmNwY2tyMGE0", youtube: "https://youtube.com/@special-course?si=mqhtSy6qX59dfcT1", whatsapp: "https://wa.me/201556289284" } },
  { name: "Apple Mechanic", tier: "فضي", logo: "/images/Real-Sponsors/Apple%20Mechanic.jpg", description: `Apple Mechanic هو مركز رائد ومتخصص في صيانة أجهزة أبل وأندرويد، تأسس عام 2010 لخدمة من يبحث عن الثقة والإتقان. خدمنا أكثر من 15,000 عميل ودرّبنا أكثر من 1,000 طالب. رؤيتنا أن نصبح المرجع الأول في مصر والشرق الأوسط لصيانة أجهزة أبل وتدريب الفنيين المحترفين. مهمتنا تقديم صيانة موثوقة وبرامج تدريب متخصصة. قيمنا: الثقة – الإتقان – الأمانة – المعرفة قوة – الابتكار.`, url: "https://www.facebook.com/AppleMechanic.eg", social: { facebook: "https://www.facebook.com/AppleMechanic.eg" } },
  // باقي الرعاة
  { name: "Elavate Holding", tier: "استراتيجي", logo: "/sponsors/elavate.png", description: `إيلافيت هولدنغ هي شركة متخصصة في تقديم حلول إدارة المشاريع، وتقديم نتائج بامتياز، بالإضافة إلى كونها مركز اتصال رئيسي متخصص في خدمة العملاء، التسويق عبر الهاتف والاستشارات التجارية. نحن ملتزمون بتزويد عملائنا بخدمات استثنائية من خلال توظيف أفضل الكفاءات وتبني أحدث الأساليب.`, url: "https://example.com" },
  { name: "Rehla Travel", tier: "داعم", logo: "/sponsors/rehla.png", description: `شركة سياحة تقدم تجارب سفر مميزة للشباب والعائلات، بخطط منظمة وأسعار مناسبة.`, url: "https://example.com" },
  { name: "Covix Care", tier: "فضي", logo: "/sponsors/covix-care.png", description: `علامة سعودية مبتكرة في العناية الشخصية والصحية، بمنتجات فعّالة وآمنة تركز على النظافة والعناية بالبشرة.`, url: "https://example.com" },
  { name: "Tseppas", tier: "داعم", logo: "/sponsors/tseppas.png", description: `اسم عريق في عالم الحلويات الشرقية والغربية، يجمع بين الجودة والطعم المميز.`, url: "https://example.com" },
];

const tierMeta = {
  استراتيجي: { gradient: 'linear-gradient(90deg,#ff2d2d,#ff8d4d)', ring: 'rgba(255,60,60,0.55)' },
  ذهبي: { gradient: 'linear-gradient(90deg,#ffb347,#ffd452)', ring: 'rgba(255,184,77,0.55)' },
  فضي: { gradient: 'linear-gradient(90deg,#cfd2d6,#f1f3f5)', ring: 'rgba(180,185,190,0.55)' },
  داعم: { gradient: 'linear-gradient(90deg,#656d78,#9aa1ab)', ring: 'rgba(120,128,138,0.55)' },
};

export default function SponsorsPage() {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState([]);
  const [activeTier, setActiveTier] = useState('الكل');
  const [q, setQ] = useState('');

  // Helper: escape regex special chars
  const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Split Arabic / mixed text into readable sentence-like chunks
  const getDescChunks = (text) => {
    if (!text) return [];
    const unified = text.replace(/\s+/g, ' ').trim();
    // Split by Arabic comma "،" OR end punctuation (. ! ؟) followed by space
    let raw = unified.split(/(?<=\.|!|؟)\s+|،\s*/);
    raw = raw.map(c => c.trim()).filter(Boolean);
    // Merge very short trailing fragments with previous to avoid tiny lines
    const merged = [];
    raw.forEach(seg => {
      if (merged.length && seg.length < 18) {
        merged[merged.length - 1] = merged[merged.length - 1] + '، ' + seg;
      } else {
        merged.push(seg);
      }
    });
    return merged;
  };

  // Highlight numbers and sponsor name inside a chunk -> returns React nodes array
  const renderChunk = (chunk, sponsorName) => {
    const parts = [];
    const nameRegex = new RegExp(`(${escapeRegExp(sponsorName)})`, 'gi');
    // First split by sponsor name to highlight it, then within each segment highlight numbers
    const nameSplit = chunk.split(nameRegex).filter(Boolean);
    nameSplit.forEach((segment, i) => {
      if (segment.toLowerCase() === sponsorName.toLowerCase()) {
        parts.push(<span key={i + '-name'} className="highlight-name">{segment}</span>);
      } else {
        // Split numbers (including 1,000 style) and percentages
        const numSplit = segment.split(/(\b\d[\d,.٪%]*\b)/).filter(Boolean);
        numSplit.forEach((p, j) => {
          if (/^\d[\d,.٪%]*$/.test(p)) {
            parts.push(<span key={i + '-n-' + j} className="num-frag">{p}</span>);
          } else {
            parts.push(<span key={i + '-t-' + j}>{p}</span>);
          }
        });
      }
    });
    return parts;
  };

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll('.sponsor-card') || [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-index'));
            setVisible((v) => (v.includes(idx) ? v : [...v, idx]));
          }
        });
      },
      { threshold: 0.2 }
    );
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <main dir="rtl" className="sponsors-page-wrapper">
      <div className="inner">
        <div className="page-head">
          <span className="section-title arabic-content main-title">شركاؤنا في النجاح</span>
          <p className="arabic-content intro-text">رحلةً نصنعها معاً – دعمُهم يمنح الأفكارَ فرصةً للحياة.</p>
        </div>
        <div className="controls-bar arabic-content">
          <div className="filters">
            {['الكل', 'استراتيجي', 'ذهبي', 'فضي', 'داعم'].map(t => (
              <button key={t} onClick={() => setActiveTier(t)} className={`filter-pill ${activeTier === t ? 'on' : ''}`}>{t}</button>
            ))}
          </div>
          <div className="search-wrap">
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="ابحث عن راعٍ" className="search-input" aria-label="بحث" />
          </div>
          <div className="stat">المعروض: {sponsors.filter(s=> (activeTier==='الكل'|| s.tier===activeTier) && s.name.toLowerCase().includes(q.toLowerCase())).length}</div>
        </div>
        <div ref={containerRef} className="sponsors-grid">
          {sponsors
            .filter(s => (activeTier === 'الكل' || s.tier === activeTier))
            .filter(s => s.name.toLowerCase().includes(q.toLowerCase()))
            .map((sponsor, index) => {
            const isVisible = visible.includes(index);
            return (
              <div
                key={sponsor.name + index}
                data-index={index}
                className={`sponsor-card ${isVisible ? 'visible' : ''}`}
                style={{ '--tier-ring': tierMeta[sponsor.tier]?.ring || 'rgba(0,0,0,0.25)' }}
              >
                <div className="accent-bar" />
                <div className="header-row arabic-content">
                  <h2 className="sponsor-name">{sponsor.name}</h2>
                  <span className="badge tier" style={{ background: tierMeta[sponsor.tier]?.gradient }}>{sponsor.tier}</span>
                  <span className="badge order-badge">#{index + 1}</span>
                </div>
                <div className="logo-box">
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    fill
                    className="logo-img"
                    sizes="(max-width:768px) 140px, 200px"
                  />
                </div>
                <div className="link-row">
                  {/* Social icons row with perfect styling */}
                  {sponsor.social && (
                    <div className="social-icons" role="list" aria-label="روابط التواصل الاجتماعي">
                      {sponsor.social.facebook && (
                        <Link className="social-icon facebook" href={sponsor.social.facebook} target="_blank" rel="noopener noreferrer" aria-label={`فيسبوك ${sponsor.name}`} title={`فيسبوك ${sponsor.name}`} style={{ '--social-index': 0 }}>
                          <FacebookIcon size={28} />
                        </Link>
                      )}
                      {sponsor.social.instagram && (
                        <Link className="social-icon instagram" href={sponsor.social.instagram} target="_blank" rel="noopener noreferrer" aria-label={`إنستجرام ${sponsor.name}`} title={`إنستجرام ${sponsor.name}`} style={{ '--social-index': 1 }}>
                          <InstagramIcon size={28} />
                        </Link>
                      )}
                      {sponsor.social.linkedin && (
                        <Link className="social-icon linkedin" href={sponsor.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`لينكدإن ${sponsor.name}`} title={`لينكدإن ${sponsor.name}`} style={{ '--social-index': 2 }}>
                          <LinkedinIcon size={28} />
                        </Link>
                      )}
                      {sponsor.social.youtube && (
                        <Link className="social-icon youtube" href={sponsor.social.youtube} target="_blank" rel="noopener noreferrer" aria-label={`يوتيوب ${sponsor.name}`} title={`يوتيوب ${sponsor.name}`} style={{ '--social-index': 3 }}>
                          <YoutubeIcon size={28} />
                        </Link>
                      )}
                      {sponsor.social.whatsapp && (
                        <Link className="social-icon whatsapp" href={sponsor.social.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={`واتساب ${sponsor.name}`} title={`واتساب ${sponsor.name}`} style={{ '--social-index': 4 }}>
                          <WhatsappIcon size={28} />
                        </Link>
                      )}
                      {(sponsor.social.website || sponsor.url) && (
                        <Link className="social-icon website" href={sponsor.social.website || sponsor.url} target="_blank" rel="noopener noreferrer" aria-label={`موقع ${sponsor.name}`} title={`موقع ${sponsor.name}`} style={{ '--social-index': 5 }}>
                          <GlobeIcon size={28} />
                        </Link>
                      )}
                    </div>
                  )}
                  {sponsor.url && (
                    <Link href={sponsor.url} target="_blank" rel="noopener noreferrer" className="sponsor-link">
                      الموقع الرسمي
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17 17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </Link>
                  )}
                </div>
                <div className="desc-row sponsor-desc arabic-content">
                  {getDescChunks(sponsor.description).map((chunk, i) => (
                    <p className="desc-chunk" style={{ '--i': i }} key={i}>
                      {renderChunk(chunk, sponsor.name)}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="thanks arabic-content">بدعم هؤلاء الشركاء نستمر في إيصال الأفكار الملهمة.</div>
      </div>
      <style jsx>{`
        .sponsors-page-wrapper {width:100%; min-height:100vh; background:#f0f0f0; padding:20px 0 90px;}
        .inner {max-width:1250px; margin:0 auto; padding:0 1.25rem;}
  .page-head {background:#ffffff; padding:34px 34px 46px; border-radius:26px; border:2px solid #f2f2f2; box-shadow:0 4px 18px -6px rgba(0,0,0,0.08);}        
  .main-title {display:block; font-size:2.45rem !important; position:relative; margin-bottom:10px; font-weight:800; color:#ff2d2d; letter-spacing:.5px;}
  .main-title:after {content:""; position:absolute; right:50%; transform:translateX(50%); bottom:-18px; width:180px; height:7px; background:linear-gradient(90deg,#ff2d2d,#ff5959); border-radius:5px; box-shadow:0 4px 18px -6px rgba(255,45,45,0.55);} 
  .intro-text {margin-top:26px; color:#555; font-size:14px; text-align:center;}
  .controls-bar {margin-top:40px; display:flex; flex-wrap:wrap; gap:20px; align-items:center; justify-content:space-between; background:#fff; padding:20px 26px; border:2px solid #ececec; border-radius:22px; box-shadow:0 4px 16px -6px rgba(0,0,0,0.08); position:relative; overflow:hidden;}
  .controls-bar:before {content:""; position:absolute; inset:0; background:radial-gradient(circle at 85% 15%,rgba(255,45,45,0.12),transparent 60%); pointer-events:none;}
  .filters {display:flex; gap:12px; flex-wrap:wrap;}
  .filter-pill {cursor:pointer; background:#f5f5f5; border:1px solid #e5e5e5; color:#444; padding:9px 18px; border-radius:40px; font-size:13.5px; font-weight:600; letter-spacing:.3px; position:relative; transition:background .35s, color .35s, box-shadow .35s, transform .35s;}
  .filter-pill.on {background:#ff2d2d; color:#fff; box-shadow:0 8px 24px -8px rgba(255,45,45,0.55);} 
  .filter-pill:not(.on):hover {background:#fff; color:#111; box-shadow:0 8px 20px -10px rgba(0,0,0,0.15);}
  .filter-pill:active {transform:translateY(2px);}        
  .search-wrap {flex:1; min-width:200px; display:flex; justify-content:flex-end;}
  .search-input {width:240px; max-width:100%; background:#fcfcfc; border:2px solid #e6e6e6; border-radius:14px; padding:10px 16px; font-size:14px; font-weight:500; outline:none; transition:border-color .35s, box-shadow .35s; direction:rtl;}
  .search-input:focus {border-color:#ff3a3a; box-shadow:0 0 0 4px rgba(255,60,60,0.15); background:#fff;}
  .stat {font-size:12.5px; color:#666; font-weight:600; background:#f7f7f7; padding:8px 14px; border-radius:14px; border:1px solid #e4e4e4;}
  .sponsors-grid {display:flex; flex-direction:column; gap:46px; margin-top:38px;}
  .sponsor-card {position:relative; display:grid; grid-template-columns:200px 1fr; grid-template-areas: "image header" "image desc" "image link"; column-gap:56px; row-gap:30px; background:#ffffff; border:2px solid #e9e9e9; border-radius:34px; padding:54px 62px; box-shadow:0 10px 34px -10px rgba(0,0,0,0.18); overflow:hidden; isolation:isolate; transform:translate3d(0,50px,0) rotateX(6deg); opacity:0; transition:opacity .85s ease, transform .95s cubic-bezier(.77,.04,.16,1), border-color .45s ease, box-shadow .45s ease; align-items:start; perspective:1200px; backdrop-filter:blur(2px);}
        .sponsor-card:before {content:""; position:absolute; inset:0; background:repeating-linear-gradient(45deg,rgba(255,51,51,0.05),rgba(255,51,51,0.05) 10px,transparent 10px,transparent 20px); opacity:0; transition:opacity .55s ease; pointer-events:none;}
    .sponsor-card.visible {transform:translate3d(0,0,0) rotateX(0deg); opacity:1;}
    .sponsor-card:hover {border-color:#ff3333; box-shadow:0 18px 46px -12px rgba(0,0,0,0.35);}
        .sponsor-card:hover:before {opacity:1;}
  .accent-bar {position:absolute; inset:0; pointer-events:none;}
  .accent-bar:before {content:""; position:absolute; top:0; right:0; height:6px; width:0%; background:linear-gradient(90deg,#ff2424,#ff5f5f); border-radius:0 0 0 12px; box-shadow:0 4px 14px -6px rgba(255,50,50,0.6); transition:width 1s cubic-bezier(.77,.04,.16,1);}
  .accent-bar:after {content:""; position:absolute; top:-140%; right:0; width:160%; height:400%; background:repeating-linear-gradient(45deg,rgba(255,60,60,0.055),rgba(255,60,60,0.055) 14px,transparent 14px,transparent 28px); opacity:0; transition:opacity .9s ease .15s;}
  .sponsor-card.visible .accent-bar:before {width:100%;}
  .sponsor-card.visible .accent-bar:after {opacity:1;}
  .logo-box {grid-area:image; position:relative; width:200px; height:200px; background:linear-gradient(145deg,#ffffff 0%,#fafafa 60%,#fff 100%); border:1px solid #e6e6e6; border-radius:32px; display:flex; align-items:center; justify-content:center; box-shadow:0 10px 28px -12px rgba(0,0,0,0.22), 0 0 0 0 var(--tier-ring); overflow:hidden; transition:box-shadow .6s ease, transform .6s ease;}
  .logo-box:after {content:""; position:absolute; inset:0; background:radial-gradient(circle at 75% 20%,rgba(255,45,45,0.08),transparent 60%); pointer-events:none;}
  .sponsor-card.visible .logo-box {box-shadow:0 10px 28px -12px rgba(0,0,0,0.22), 0 0 0 8px var(--tier-ring);}        
  .sponsor-card:hover .logo-box {transform:translateY(-6px) rotateX(8deg);}
  .logo-img {object-fit:contain; padding:26px; filter:drop-shadow(0 4px 10px rgba(0,0,0,0.06)); transition:transform .8s cubic-bezier(.77,.04,.16,1);}        
  .sponsor-card:hover .logo-img {transform:scale(1.05);} 
  .header-row {grid-area:header; display:flex; align-items:center; gap:18px; flex-wrap:wrap; justify-content:flex-start;}
  .sponsor-name {margin:0; font-size:2.1rem; font-weight:800; color:#121212; position:relative; letter-spacing:.4px;}
  .sponsor-name:after {content:""; position:absolute; bottom:-12px; right:0; width:120px; height:6px; border-radius:4px; background:linear-gradient(90deg,#ff2d2d,#ff5858); box-shadow:0 3px 12px -4px rgba(255,45,45,0.55);}        
  .badge {background:#000; color:#fff; font-size:13px; padding:8px 16px; border-radius:40px; font-weight:600; letter-spacing:.5px; box-shadow:0 3px 10px rgba(0,0,0,0.25); position:relative; overflow:hidden;}
  .badge.tier {display:inline-flex; align-items:center; gap:4px; box-shadow:0 6px 18px -6px rgba(0,0,0,0.3); font-size:12.5px;}
  .badge.order-badge {background:#141414; font-size:11.5px; padding:6px 12px; opacity:.75;}
  .desc-row {grid-area:desc; display:flex; flex-direction:column; gap:12px;}
  .sponsor-desc {margin:0; font-size:15px; line-height:1.78; color:#222; font-weight:500;}
  .sponsor-desc p {margin:0; position:relative; padding-right:18px;}
  .sponsor-desc p:before {content:""; position:absolute; top:10px; right:0; width:10px; height:10px; background:linear-gradient(135deg,#ff2d2d,#ff6767); border-radius:3px; box-shadow:0 0 0 3px rgba(255,45,45,0.15); transform:rotate(45deg); opacity:.85;}
  .desc-chunk {opacity:0; transform:translateY(14px); animation:descFade .8s cubic-bezier(.77,.04,.16,1) forwards; animation-delay:calc(var(--i) * 110ms + 120ms);}  
  @keyframes descFade {to {opacity:1; transform:translateY(0);} }
  @keyframes socialIconEntry {
    0% { 
      opacity: 0; 
      transform: translateY(30px) scale(0.6) rotateZ(-20deg); 
    }
    50% { 
      transform: translateY(-8px) scale(1.1) rotateZ(5deg); 
    }
    100% { 
      opacity: 1; 
      transform: translateY(0) scale(1) rotateZ(0deg); 
    }
  }
  @keyframes socialIconPulse {
    0%, 100% { 
      box-shadow: 0 15px 40px -10px rgba(255, 26, 26, 0.7), 
                  0 10px 30px -8px rgba(0, 0, 0, 0.3); 
    }
    50% { 
      box-shadow: 0 20px 50px -10px rgba(255, 26, 26, 0.9), 
                  0 15px 35px -8px rgba(0, 0, 0, 0.4); 
    }
  }
  .highlight-name {background:linear-gradient(90deg,#ffe5e5,#ffffff); padding:2px 6px 3px; border-radius:10px; font-weight:700; color:#ff2222; box-shadow:0 1px 4px -1px rgba(255,45,45,0.25) inset; margin:0 4px; white-space:nowrap;}
  .num-frag {color:#ff2d2d; font-weight:700; padding:0 3px; position:relative;}
  .num-frag:after {content:""; position:absolute; inset:auto 0 -2px 0; height:3px; background:linear-gradient(90deg,#ff2d2d,#ff5e5e); border-radius:2px; opacity:.55;}
  .link-row {grid-area:link; display:flex; align-items:center; gap:18px; flex-wrap:wrap; position:relative; padding-top:16px; margin-top:4px;}
  .link-row:before {content:""; position:absolute; top:0; right:0; left:0; height:2px; background:linear-gradient(90deg, rgba(255,45,45,0), rgba(255,45,45,0.15), rgba(255,45,45,0)); border-radius:1px;}
  /* Social icons - TEDx Brand Identity with Stunning Design */
  .sponsors-page-wrapper .social-icons { 
    display: flex !important; 
    gap: 20px !important; 
    align-items: center !important; 
    padding: 15px 0 !important;
    justify-content: flex-start !important;
    flex-wrap: wrap !important;
    margin-top: 5px !important;
  }
  .sponsors-page-wrapper .social-icon { 
    width: 64px !important; 
    height: 64px !important; 
    border-radius: 50% !important; 
    background: linear-gradient(145deg, #ff1a1a 0%, #ff3333 30%, #ff4d4d 60%, #ff1a1a 100%) !important;
    color: #ffffff !important; 
    display: inline-flex !important; 
    align-items: center !important; 
    justify-content: center !important; 
    box-shadow: 0 15px 40px -10px rgba(255, 26, 26, 0.7), 
                0 10px 30px -8px rgba(0, 0, 0, 0.3),
                inset 0 3px 6px rgba(255, 255, 255, 0.3) !important; 
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.6) !important; 
    text-decoration: none !important; 
    font-size: 28px !important;
    border: 5px solid rgba(255, 255, 255, 0.4) !important;
    position: relative !important;
    overflow: hidden !important;
    cursor: pointer !important;
    transform-style: preserve-3d !important;
    animation: socialIconEntry 1s ease-out forwards !important;
    animation-delay: calc(var(--social-index, 0) * 0.2s) !important;
    opacity: 0 !important;
  }
  
  /* Glowing effect before element */
  .sponsors-page-wrapper .social-icon::before {
    content: "" !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    background: linear-gradient(45deg, 
      rgba(255, 255, 255, 0.1) 0%, 
      rgba(255, 255, 255, 0.2) 50%, 
      rgba(255, 255, 255, 0.1) 100%) !important;
    border-radius: 50% !important;
    opacity: 0 !important;
    transition: opacity 0.3s ease !important;
  }
  
  /* Link states */
  .sponsors-page-wrapper .social-icon:link, 
  .sponsors-page-wrapper .social-icon:visited { 
    color: #ffffff !important; 
    text-decoration: none !important; 
    background: linear-gradient(145deg, #ff2d2d 0%, #ff4747 30%, #ff5e5e 60%, #ff2d2d 100%) !important;
  }
  
  /* Hover effect */
  .sponsors-page-wrapper .social-icon:hover { 
    transform: translateY(-12px) scale(1.2) rotateZ(-8deg) !important;
    box-shadow: 0 30px 60px -15px rgba(255, 26, 26, 0.8), 
                0 25px 50px -12px rgba(0, 0, 0, 0.4),
                inset 0 4px 8px rgba(255, 255, 255, 0.5) !important;
    border-color: rgba(255, 255, 255, 0.8) !important;
    filter: brightness(1.15) !important;
    background: linear-gradient(145deg, #ff0000 0%, #ff2222 30%, #ff3333 60%, #ff0000 100%) !important;
  }
  
  .sponsors-page-wrapper .social-icon:hover::before {
    opacity: 1 !important;
  }
  
  .sponsors-page-wrapper .social-icon:active { 
    transform: translateY(-4px) scale(1.05) !important; 
    transition: all 0.15s ease !important;
  }
  
  .sponsors-page-wrapper .social-icon:focus-visible { 
    outline: 4px solid rgba(255, 255, 255, 0.8) !important; 
    outline-offset: 4px !important; 
  }
  
  /* Brand specific hover effects */
  .sponsors-page-wrapper .social-icon.facebook:hover { 
    background: linear-gradient(145deg, #1877F2 0%, #42a5f5 50%, #1565C0 100%) !important;
    box-shadow: 0 20px 40px -8px rgba(24, 119, 242, 0.6), 
                0 15px 30px -5px rgba(0, 0, 0, 0.3) !important;
  }
  
  .sponsors-page-wrapper .social-icon.instagram:hover { 
    background: linear-gradient(145deg, #E4405F 0%, #F56040 25%, #FFDC80 50%, #C13584 75%, #833AB4 100%) !important;
    box-shadow: 0 20px 40px -8px rgba(228, 64, 95, 0.6), 
                0 15px 30px -5px rgba(0, 0, 0, 0.3) !important;
  }
  
  .sponsors-page-wrapper .social-icon.linkedin:hover { 
    background: linear-gradient(145deg, #0A66C2 0%, #378fe6 50%, #004182 100%) !important;
    box-shadow: 0 20px 40px -8px rgba(10, 102, 194, 0.6), 
                0 15px 30px -5px rgba(0, 0, 0, 0.3) !important;
  }
  
  .sponsors-page-wrapper .social-icon.whatsapp:hover { 
    background: linear-gradient(145deg, #25D366 0%, #4fce5d 50%, #1ea652 100%) !important;
    box-shadow: 0 20px 40px -8px rgba(37, 211, 102, 0.6), 
                0 15px 30px -5px rgba(0, 0, 0, 0.3) !important;
  }
  
  .sponsors-page-wrapper .social-icon.youtube:hover { 
    background: linear-gradient(145deg, #FF0000 0%, #ff4444 50%, #cc0000 100%) !important;
    box-shadow: 0 20px 40px -8px rgba(255, 0, 0, 0.6), 
                0 15px 30px -5px rgba(0, 0, 0, 0.3) !important;
  }
  
  .sponsors-page-wrapper .social-icon.website:hover { 
    background: linear-gradient(145deg, #2c2c2c 0%, #4a4a4a 50%, #1a1a1a 100%) !important;
    box-shadow: 0 20px 40px -8px rgba(44, 44, 44, 0.6), 
                0 15px 30px -5px rgba(0, 0, 0, 0.3) !important;
  }
  
  /* Icon styling */
  .sponsors-page-wrapper .social-icon svg {
    width: 32px !important;
    height: 32px !important;
    color: inherit !important;
    fill: currentColor !important;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5)) !important;
    transition: transform 0.5s ease !important;
    z-index: 2 !important;
    position: relative !important;
  }
  
  .sponsors-page-wrapper .social-icon:hover svg {
    transform: scale(1.3) rotate(15deg) !important;
    filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.6)) brightness(1.2) !important;
  }  /* Sponsor link styling matching social icons */
  .sponsors-page-wrapper .sponsor-link {
    display: inline-flex !important; 
    gap: 12px !important; 
    align-items: center !important; 
    background: linear-gradient(145deg, #ff2d2d 0%, #ff4747 30%, #ff5e5e 60%, #ff2d2d 100%) !important; 
    color: #ffffff !important; 
    text-decoration: none !important; 
    font-size: 16px !important; 
    font-weight: 600 !important;
    padding: 16px 28px !important; 
    border-radius: 50px !important; 
    box-shadow: 0 10px 30px -5px rgba(255, 45, 45, 0.5), 
                0 6px 20px -3px rgba(0, 0, 0, 0.2),
                inset 0 1px 2px rgba(255, 255, 255, 0.2) !important; 
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
    border: 3px solid rgba(255, 255, 255, 0.2) !important;
    position: relative !important;
    overflow: hidden !important;
  }
  
  .sponsors-page-wrapper .sponsor-link::before {
    content: "" !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    background: linear-gradient(45deg, 
      rgba(255, 255, 255, 0.1) 0%, 
      rgba(255, 255, 255, 0.2) 50%, 
      rgba(255, 255, 255, 0.1) 100%) !important;
    border-radius: 50px !important;
    opacity: 0 !important;
    transition: opacity 0.3s ease !important;
  }
  
  .sponsors-page-wrapper .sponsor-link:link, 
  .sponsors-page-wrapper .sponsor-link:visited { 
    color: #ffffff !important; 
    text-decoration: none !important; 
    background: linear-gradient(145deg, #ff2d2d 0%, #ff4747 30%, #ff5e5e 60%, #ff2d2d 100%) !important;
  }
  
  .sponsors-page-wrapper .sponsor-link:hover { 
    background: linear-gradient(145deg, #ff4747 0%, #ff6b6b 30%, #ff5555 60%, #ff4747 100%) !important; 
    transform: translateY(-6px) scale(1.05) !important; 
    box-shadow: 0 20px 40px -8px rgba(255, 55, 55, 0.6), 
                0 15px 30px -5px rgba(0, 0, 0, 0.3),
                inset 0 2px 4px rgba(255, 255, 255, 0.3) !important;
    border-color: rgba(255, 255, 255, 0.4) !important;
  }
  
  .sponsors-page-wrapper .sponsor-link:hover::before {
    opacity: 1 !important;
  }
  
  .sponsors-page-wrapper .sponsor-link svg { 
    color: inherit !important; 
    transition: transform 0.3s ease !important;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3)) !important;
    width: 20px !important;
    height: 20px !important;
  }
  
  .sponsors-page-wrapper .sponsor-link:hover svg { 
    transform: translateX(4px) scale(1.1) !important;
  }
  
  /* Mobile responsiveness */
  @media (max-width:560px){ 
    .sponsors-page-wrapper .social-icon{ 
      width: 60px !important; 
      height: 60px !important; 
      font-size: 26px !important;
    } 
    .sponsors-page-wrapper .social-icon svg {
      width: 30px !important;
      height: 30px !important;
    }
    .sponsors-page-wrapper .social-icons {
      gap: 20px !important;
      justify-content: center !important;
    }
    .sponsors-page-wrapper .sponsor-link {
      font-size: 15px !important;
      padding: 14px 24px !important;
    }
  }
  /* Enhanced icon styling */
  .sponsors-page-wrapper .social-icon svg {
    width:22px !important;
    height:22px !important;
    color:inherit !important;
    fill:currentColor !important;
    pointer-events:none !important;
    filter:drop-shadow(0 1px 2px rgba(0,0,0,0.2)) !important;
    z-index:2 !important;
    position:relative !important;
  }
  .sponsors-page-wrapper .sponsor-link {
    display:inline-flex !important; 
    gap:10px !important; 
    align-items:center !important; 
    background:linear-gradient(135deg, #ff2d2d 0%, #ff5e5e 50%, #ff4747 100%) !important; 
    color:#fff !important; 
    text-decoration:none !important; 
    font-size:15px !important; 
    padding:14px 26px !important; 
    border-radius:50px !important; 
    font-weight:600 !important; 
    box-shadow:0 8px 25px -8px rgba(255,45,45,0.4), 0 2px 8px -2px rgba(0,0,0,0.15) !important; 
    transition:all .35s cubic-bezier(.34,.8,.65,1) !important;
    border:2px solid rgba(255,255,255,0.15) !important;
    position:relative !important;
    overflow:hidden !important;
  }
  .sponsors-page-wrapper .sponsor-link:before {
    content:"" !important;
    position:absolute !important;
    top:0 !important;
    left:0 !important;
    right:0 !important;
    bottom:0 !important;
    background:linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05)) !important;
    border-radius:50px !important;
    pointer-events:none !important;
  }
  .sponsors-page-wrapper .sponsor-link:link, 
  .sponsors-page-wrapper .sponsor-link:visited, 
  .sponsors-page-wrapper .sponsor-link:any-link { 
    color:#fff !important; 
    text-decoration:none !important; 
    background:linear-gradient(135deg, #ff2d2d 0%, #ff5e5e 50%, #ff4747 100%) !important;
  }
  .sponsors-page-wrapper .sponsor-link:hover { 
    background:linear-gradient(135deg, #ff4747 0%, #ff6b6b 50%, #ff5555 100%) !important; 
    transform:translateY(-3px) scale(1.02) !important; 
    box-shadow:0 15px 35px -10px rgba(255,55,55,0.6), 0 8px 20px -5px rgba(0,0,0,0.25) !important; 
  }
  .sponsors-page-wrapper .sponsor-link svg { 
    color:inherit !important; 
    transition:transform .35s ease !important;
    filter:drop-shadow(0 1px 2px rgba(0,0,0,0.2)) !important;
  }
  .sponsors-page-wrapper .sponsor-link:hover svg { 
    transform:translateX(2px) !important;
  }
  @media (max-width:560px){ 
    .sponsors-page-wrapper .social-icon{ 
      width:44px !important; 
      height:44px !important; 
      font-size:20px !important;
      gap:14px !important;
    } 
    .sponsors-page-wrapper .social-icon:link, 
    .sponsors-page-wrapper .social-icon:visited { 
      background:linear-gradient(135deg, #ff2d2d 0%, #ff5e5e 50%, #ff4747 100%) !important;
      color:#fff !important; 
    }
    .sponsors-page-wrapper .social-icon svg {
      width:20px !important;
      height:20px !important;
    }
    .sponsors-page-wrapper .social-icons {
      gap:14px !important;
    }
    .sponsors-page-wrapper .sponsor-link {
      font-size:14px !important;
      padding:12px 22px !important;
    }
  }
  .sponsor-link:link, .sponsor-link:visited { color:#fff; text-decoration:none; }
  .sponsor-link:hover {background:#ff4747; transform:translateY(-4px); box-shadow:0 14px 32px -10px rgba(255,55,55,0.55);}
        .thanks {margin-top:70px; text-align:center; color:#666; font-size:13px;}
  @media (max-width:1250px){.sponsor-card {padding:50px 56px; column-gap:52px;} }
  @media (max-width:1100px){.sponsor-card {padding:48px 50px; column-gap:48px;} }
  @media (max-width:1000px){.sponsor-card {padding:46px 46px; column-gap:42px;} .sponsor-name{font-size:2rem;} }
  @media (max-width:900px){.sponsor-card {padding:44px 42px; column-gap:38px;} }
  @media (max-width:860px){.sponsor-card {grid-template-columns:1fr; grid-template-areas:"header" "image" "link" "desc"; padding:42px 36px; row-gap:28px; text-align:center; transform:translate3d(0,60px,0) rotateX(10deg);} .logo-box{margin:0 auto;} .header-row{justify-content:center;} .sponsor-name:after {right:50%; transform:translateX(50%);} .link-row{justify-content:center;} .desc-row{align-items:center;} }
  @media (max-width:600px){.controls-bar {flex-direction:column; align-items:stretch;} .search-wrap{justify-content:stretch;} .search-input{width:100%;} }
  @media (max-width:560px){.sponsor-card {padding:34px 26px; row-gap:24px;} .logo-box{width:170px; height:170px;} .logo-img{padding:24px;} .sponsor-name{font-size:1.85rem;} .sponsor-name:after {width:100px; bottom:-10px; height:5px;} .sponsor-desc {font-size:14px;} }
      `}</style>
    </main>
  );
}
