"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SponsorGameCard from "./components/SponsorGameCard";

// بيانات الرعاة (يمكن نقلها لاحقاً إلى ملف JSON مستقل)
const sponsors = [
  // الترتيب المطلوب أولاً
  { name: "Special Courses Academy", tier: "ذهبي", logo: "/images/Real-Sponsors/Special%20Courses%20Academy.jpg", description: `أكاديمية تقدم كورسات لغات ومهنية بأسلوب عملي يوصل الطلبة والخريجين لسوق العمل (لغات – جرافيك – برمجة – موارد بشرية – مهارات شخصية).`, url: "https://specialcourse.io", social: { website: "https://specialcourse.io", facebook: "https://www.facebook.com/share/1BFAzfznZe/", instagram: "https://www.instagram.com/specialcourse_?igsh=bjRuZmNwY2tyMGE0", youtube: "https://youtube.com/@special-course?si=mqhtSy6qX59dfcT1", whatsapp: "https://wa.me/201556289284" } },
  { name: "Digital Knights Academy", tier: "بلاتينيوم", logo: "/images/Real-Sponsors/digital.jpg",game:<SponsorGameCard />, description: `Digital Knights Academy هي مؤسسة تعليمية متخصصة في إعداد وتأهيل الشباب لسوق العمل في مجالات التكنولوجيا الحديثة والبرمجة. تأسست الأكاديمية عام 2023 بهدف سد الفجوة بين الدراسة الأكاديمية والمهارات المطلوبة فعليًا في بيئة العمل.تقدم الأكاديمية برامج تدريبية عملية في مجالات مثل Web Development، Flutter، Cyber Security، UI/UX، Artificial Intelligence وغيرها، إلى جانب شهادات معتمدة وفرص تدريب داخل كبرى الشركات. من خلال رؤيتها ورسالتها، تسعى Digital Knights Academy إلى تمكين جيل جديد من المبرمجين ورواد التكنولوجيا القادرين على المنافسة محليًا وعالميًا.`, social: { website: "https://digitalknightacadmey.com/", facebook: "https://www.facebook.com/profile.php?id=61565603534961", whatsapp: "https://wa.me/+20 10 22893997" } },
  { name: "Qudraat", tier: "استراتيجي", logo: "/images/Real-Sponsors/Qudraat.jpg", description: `قدرات ليست مجرد شركة بل منصة تبدأ من سؤال "من أنا؟" وتساعد الشباب على استكشاف إمكانياتهم وتنمية مهاراتهم في مجالات متعددة. رؤيتنا: أن يكون الشباب قادرًا على مواكبة سوق العمل بمهارات حقيقية. نرى في الشباب بذرة تحتاج الثقة والعلم والفرص.`, url: "https://qudraat.com", social: { website: "https://qudraat.com", facebook: "https://www.facebook.com/share/1EL9kryogf/?mibextid=wwXIfr" } },
  { name: "QR Tag", tier: "ذهبي", logo: "/images/Real-Sponsors/QR%20Tag.jpg", description: `شركة متخصصة في تقديم حلول QR وNFC مبتكرة لمشاركة المعلومات والروابط والملفات بسهولة فائقة، بدون الحاجة إلى تطبيقات معقدة أو بطاقات ورقية. رؤيتهم أن يكونوا الخيار الأول للأفراد والشركات في الشرق الأوسط للتواصل الرقمي بطرق عصرية وصديقة للبيئة. منتجاتهم تشمل KeyTag NFC، كروت أعمال ذكية، وحلول مخصصة للشركات.`, url: "https://www.qrtagapp.com", social: { website: "https://www.qrtagapp.com", facebook: "https://www.facebook.com/share/1BAXVmK4rs/?mibextid=wwXIfr" } },
  { name: "Tseppas", tier: "داعم", logo: "/images/tseppas.png", description: `اسم عريق في عالم الحلويات الشرقية والغربية، يجمع بين الجودة والطعم المميز.`, social: {website: "https://tseppas.com", facebook: "https://www.facebook.com/TseppasMGEgypt/"} },
  { name: "LinkOut", tier: "داعم", logo: "/images/Real-Sponsors/LinkOut.jpg", description: `شركة ناشئة مصرية متخصصة في تقديم حلول ذكية وسريعة لمشاركة المعلومات عبر QR وNFC. بتركز على ربط الأفراد والشركات مع بعض بشكل عصري وسهل.`, url: "https://linkout.odoo.com", social: { website: "https://linkout.odoo.com", facebook: "https://www.facebook.com/LinkOut20" } },
  { name: "English Capsules", tier: "داعم", logo: "/images/Real-Sponsors/English%20Capsules.jpg", description: `المؤسسة التعليمية الرائدة منذ 2015، ساهمت في تمكين أكثر من 100,000 طالب من تطوير مهاراتهم اللغوية والمهنية.`, url: "http://englishcapsules.com", social: { website: "http://englishcapsules.com", facebook: "https://www.facebook.com/English.Capsules" } },
  { name: "Apple Mechanic", tier: "داعم", logo: "/images/Real-Sponsors/Apple%20Mechanic.jpg", description: `Apple Mechanic هو مركز رائد ومتخصص في صيانة أجهزة أبل وأندرويد، تأسس عام 2010 لخدمة من يبحث عن الثقة والإتقان. خدمنا أكثر من 15,000 عميل ودرّبنا أكثر من 1,000 طالب. رؤيتنا أن نصبح المرجع الأول في مصر والشرق الأوسط لصيانة أجهزة أبل وتدريب الفنيين المحترفين. مهمتنا تقديم صيانة موثوقة وبرامج تدريب متخصصة. قيمنا: الثقة – الإتقان – الأمانة – المعرفة قوة – الابتكار.`, url: "https://www.facebook.com/AppleMechanic.eg", social: { facebook: "https://www.facebook.com/AppleMechanic.eg" } },
  // باقي الرعاة
  { name: "Elavate Holding", tier: "ذهبي", logo: "/sponsors/elavate.png", description: `إيلافيت هولدنغ هي شركة متخصصة في تقديم حلول إدارة المشاريع، وتقديم نتائج بامتياز، بالإضافة إلى كونها مركز اتصال رئيسي متخصص في خدمة العملاء، التسويق عبر الهاتف والاستشارات التجارية. نحن ملتزمون بتزويد عملائنا بخدمات استثنائية من خلال توظيف أفضل الكفاءات وتبني أحدث الأساليب.`, url: "https://elavate.com", social: { linkedin: "https://www.linkedin.com/company/elevateholding" } },
  { name: "Covix Care", tier: "ذهبي", logo: "/images/CovixCare.png", description: `علامة سعودية مبتكرة في العناية الشخصية والصحية، بمنتجات فعّالة وآمنة تركز على النظافة والعناية بالبشرة.`, social: { website: "http://englishcapsules.com", facebook: "https://www.facebook.com/English.Capsules" }},
];

const tierMeta = {
  استراتيجي: { gradient: 'linear-gradient(90deg,#ff2d2d,#ff8d4d)', ring: 'rgba(255,60,60,0.55)' },
  بلاتينيوم: { gradient: 'linear-gradient(90deg,#ff2d2d,#ff8d4d)', ring: 'rgba(255,60,60,0.55)' },
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
            {['الكل', 'استراتيجي', 'بلاتينيوم', 'ذهبي', 'فضي', 'داعم'].map(t => (
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
                  {/* Simple buttons instead of complex icons */}
                  {sponsor.social && (
                    <div className="social-buttons">
                      {(sponsor.game) && (
                        <a 
                          href={sponsor.game} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="social-btn website-btn"
                          aria-label={`لعبة ${sponsor.name}`}
                        >
                          العب الان
                        </a>
                      )}
                      {(sponsor.social.website || sponsor.url) && (
                        <a 
                          href={sponsor.social.website || sponsor.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="social-btn website-btn"
                          aria-label={`موقع ${sponsor.name}`}
                        >
                          الموقع
                        </a>
                      )}
                      {sponsor.social.facebook && (
                        <a 
                          href={sponsor.social.facebook} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="social-btn facebook-btn"
                          aria-label={`فيسبوك ${sponsor.name}`}
                        >
                          فيسبوك
                        </a>
                      )}
                      {(sponsor.social.youtube) && (
                        <a 
                          href={sponsor.social.youtube} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="social-btn youtube-btn"
                          aria-label={`يوتيوب ${sponsor.name}`}
                        >
                          يوتيوب
                        </a>
                      )}
                      {(sponsor.social.whatsapp) && (
                        <a 
                          href={sponsor.social.whatsapp} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="social-btn whatsapp-btn"
                          aria-label={`واتساب ${sponsor.name}`}
                        >
                          واتساب
                        </a>
                      )}
                      {(sponsor.social.instagram) && (
                        <a 
                          href={sponsor.social.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="social-btn instagram-btn"
                          aria-label={`إنستجرام ${sponsor.name}`}
                        >
                          إنستجرام
                        </a>
                      )}
                      {(sponsor.social.linkedin) && (
                        <a 
                          href={sponsor.social.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="social-btn linkedin-btn"
                          aria-label={`لينكد إن ${sponsor.name}`}
                        >
                          لينكد إن
                        </a>
                      )}
                    </div>
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
  
  /* Simple Social Buttons */
  .social-buttons {
    display: flex !important;
    gap: 12px !important;
    align-items: center !important;
    margin-top: 10px !important;
  }
  
  .social-btn {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 10px 20px !important;
    border-radius: 8px !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    text-decoration: none !important;
    transition: all 0.3s ease !important;
    border: none !important;
    cursor: pointer !important;
  }
  
  .website-btn {
    background: linear-gradient(135deg, #c0c0c0 0%, #e5e5e5 50%, #d1d5db 100%) !important;
    color: #374151 !important;
    border: 1px solid #9ca3af !important;
  }
  
  .website-btn:hover {
    background: linear-gradient(135deg, #a8a8a8 0%, #d1d5db 50%, #b5b9c4 100%) !important;
    color: #1f2937 !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
  }
  
  .facebook-btn {
    background-color: #1877f2 !important;
    color: white !important;
  }
  
  .facebook-btn:hover {
    background-color: #166fe5 !important;
    transform: translateY(-2px) !important;
  }
  
  .youtube-btn {
    background-color: #ff0000 !important;
    color: white !important;
  }
  
  .youtube-btn:hover {
    background-color: #dc2626 !important;
    transform: translateY(-2px) !important;
  }
  
  .whatsapp-btn {
    background-color: #25d366 !important;
    color: white !important;
  }
  
  .whatsapp-btn:hover {
    background-color: #1fb854 !important;
    transform: translateY(-2px) !important;
  }
  
  .instagram-btn {
    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%) !important;
    color: white !important;
  }
  
  .instagram-btn:hover {
    background: linear-gradient(45deg, #e8842b 0%, #de5930 25%, #d41f37 50%, #c41b5a 75%, #b4127e 100%) !important;
    transform: translateY(-2px) !important;
  }
  
  .linkedin-btn {
    background-color: #0077b5 !important;
    color: white !important;
  }
  
  .linkedin-btn:hover {
    background-color: #005885 !important;
    transform: translateY(-2px) !important;
  }
  
  /* Mobile responsiveness */
  @media (max-width:560px){ 
    .social-buttons {
      gap: 10px !important;
    }
    .social-btn {
      padding: 8px 16px !important;
      font-size: 13px !important;
    }
  }
        .thanks {margin-top:70px; text-align:center; color:#666; font-size:13px;}
  @media (max-width:1250px){.sponsor-card {padding:50px 56px; column-gap:52px;} }
  @media (max-width:1100px){.sponsor-card {padding:48px 50px; column-gap:48px;} }
  @media (max-width:1000px){.sponsor-card {padding:46px 46px; column-gap:42px;} .sponsor-name{font-size:2rem;} }
  @media (max-width:900px){.sponsor-card {padding:44px 42px; column-gap:38px;} }
  @media (max-width:860px){
    .sponsor-card {
      grid-template-columns:1fr; 
      grid-template-areas:"header" "image" "link" "desc"; 
      padding:42px 36px; 
      row-gap:28px; 
      text-align:center; 
      transform:translate3d(0,60px,0) rotateX(10deg);
    } 
    .logo-box{margin:0 auto;} 
    .header-row{justify-content:center;} 
    .sponsor-name:after {right:50%; transform:translateX(50%);} 
    .link-row{justify-content:center;} 
    .desc-row{align-items:center;} 
  }
  @media (max-width:768px){
    .inner {padding:0 1rem;}
    .page-head {padding:28px 24px 36px; border-radius:20px;}
    .main-title {font-size:2.2rem !important;}
    .main-title:after {width:160px; height:6px;}
    .intro-text {font-size:13px;}
    .controls-bar {
      flex-direction:column; 
      align-items:stretch; 
      padding:18px 22px; 
      gap:16px;
    }
    .filters {
      justify-content:center;
    }
    .filter-pill {
      padding:8px 16px;
      font-size:13px;
    }
    .search-wrap{
      justify-content:stretch;
    } 
    .search-input{
      width:100%;
      padding:10px 14px;
    } 
    .stat {
      text-align:center;
      font-size:12px;
    }
    .sponsors-grid {
      gap:36px;
      margin-top:32px;
    }
  }
  @media (max-width:600px){
    .sponsor-card {
      padding:32px 22px; 
      row-gap:22px;
    } 
    .logo-box{
      width:160px; 
      height:160px;
    } 
    .logo-img{
      padding:22px;
    } 
    .sponsor-name{
      font-size:1.7rem;
    } 
    .sponsor-name:after {
      width:90px; 
      bottom:-8px; 
      height:4px;
    } 
    .sponsor-desc {
      font-size:14px;
      line-height:1.7;
    }
    .badge.tier {
      font-size:11.5px;
      padding:7px 14px;
    }
    .badge.order-badge {
      font-size:10.5px;
      padding:5px 10px;
    }
    .social-btn {
      padding: 8px 14px !important;
      font-size: 12px !important;
    }
  }
  @media (max-width:480px){
    .inner {padding:0 0.75rem;}
    .page-head {padding:24px 20px 30px; border-radius:16px;}
    .main-title {font-size:1.9rem !important;}
    .main-title:after {width:140px; height:5px;}
    .intro-text {font-size:12px;}
    .controls-bar {padding:16px 18px;}
    .filter-pill {
      padding:7px 14px;
      font-size:12px;
    }
    .search-input {
      padding:9px 12px;
      font-size:13px;
    }
    .sponsor-card {
      padding:26px 18px;
      row-gap:20px;
      border-radius:24px;
    }
    .logo-box {
      width:140px;
      height:140px;
      border-radius:24px;
    }
    .logo-img {
      padding:20px;
    }
    .sponsor-name {
      font-size:1.5rem;
    }
    .sponsor-name:after {
      width:80px;
      bottom:-6px;
      height:3px;
    }
    .sponsor-desc {
      font-size:13px;
      line-height:1.65;
    }
    .badge.tier {
      font-size:10.5px;
      padding:6px 12px;
    }
    .badge.order-badge {
      font-size:9.5px;
      padding:4px 8px;
    }
    .social-buttons {
      gap: 8px !important;
      flex-wrap: wrap !important;
    }
    .social-btn {
      padding: 7px 12px !important;
      font-size: 11px !important;
    }
    .thanks {
      margin-top:50px;
      font-size:12px;
      padding:0 10px;
    }
  }
  @media (max-width:360px){
    .sponsor-card {
      padding:22px 16px;
      row-gap:18px;
    }
    .logo-box {
      width:120px;
      height:120px;
    }
    .logo-img {
      padding:18px;
    }
    .sponsor-name {
      font-size:1.35rem;
    }
    .sponsor-name:after {
      width:70px;
    }
    .sponsor-desc {
      font-size:12px;
    }
    .social-btn {
      padding: 6px 10px !important;
      font-size: 10px !important;
    }
  }
      `}</style>
    </main>
  );
}
