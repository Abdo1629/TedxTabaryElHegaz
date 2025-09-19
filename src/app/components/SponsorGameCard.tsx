"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

type SponsorGameProps = {
  name: string;
  prizes: string[];
  description?: string;
  logo?: string;
  cta?: { label: string; url: string };
  colors?: {
    primary: string;
    secondary: string;
  };
};

type Player = { name: string; phone: string; email: string };

export default function SponsorGameCard({
  name,
  prizes,
  description,
  logo,
  cta,
  colors = { primary: "#E62B1E", secondary: "#222" },
}: SponsorGameProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<
    "instructions" | "form" | "wheel" | "done"
  >("instructions");
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  // Mount flag to safely use "document" and portal on the client only
  const [mounted, setMounted] = useState(false);
  const [player, setPlayer] = useState<Player>({ name: "", phone: "", email: "" });
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string }>({});
  const [touched, setTouched] = useState<{ name: boolean; phone: boolean; email: boolean }>({ name: false, phone: false, email: false });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<keyof Player | null>(null);
  const [phoneDisplay, setPhoneDisplay] = useState("");
  const summaryRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const spinAudioRef = useRef<HTMLAudioElement>(null);
  const winAudioRef = useRef<HTMLAudioElement>(null);
  // confetti canvas + control refs
  const confettiRef = useRef<HTMLCanvasElement>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiActiveRef = useRef(false);
  const confettiRafRef = useRef<number | null>(null);

  // ensure portal is available on client and lock page scroll while modal is open
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const body = document.body;
    if (open) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
    return () => {
      body.style.overflow = "";
    };
  }, [open, mounted]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const digitsOnly = /^\d+$/;

  const validatePlayer = (p: Player) => {
    const nextErrors: { name?: string; phone?: string; email?: string } = {};
    const nameTrimmed = p.name.trim();
    const nameNoSpaces = nameTrimmed.replace(/\s+/g, "");
    const phoneTrimmed = p.phone.trim();
    const emailTrimmed = p.email.trim().toLowerCase();

    if (!nameTrimmed) nextErrors.name = "الاسم مطلوب";
    else if (nameNoSpaces.length < 6) nextErrors.name = "الاسم يجب أن يكون 6 حروف على الأقل";
    else if (/\d/.test(nameTrimmed)) nextErrors.name = "الأسماء عادةً لا تحتوي على أرقام — من فضلك احذف الأرقام";

    if (!phoneTrimmed) nextErrors.phone = "رقم الموبايل مطلوب";
    else if (!digitsOnly.test(phoneTrimmed)) nextErrors.phone = "رقم الموبايل يجب أن يحتوي على أرقام فقط";
    else if (phoneTrimmed.length < 8 || phoneTrimmed.length > 15) nextErrors.phone = "رقم الموبايل يجب أن يكون بين 8 و 15 رقم";

    if (!emailTrimmed) nextErrors.email = "البريد الإلكتروني مطلوب";
    else if (!emailRegex.test(emailTrimmed)) nextErrors.email = "صيغة البريد الإلكتروني غير صحيحة";

    return nextErrors;
  };

  const isFormValid = (p: Player) => Object.keys(validatePlayer(p)).length === 0;

  const isValidNow = (key: keyof Player) => {
    if (key === 'name') return !!player.name.trim() && !validatePlayer(player).name;
    if (key === 'phone') return !!player.phone.trim() && !validatePlayer(player).phone;
    if (key === 'email') return !!player.email.trim() && !validatePlayer(player).email;
    return false;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const currentErrors = validatePlayer(player);
    setErrors(currentErrors);
    if (Object.keys(currentErrors).length > 0) {
      // focus first invalid field
      if (summaryRef.current) {
        summaryRef.current.focus();
      }
      if (currentErrors.name) nameRef.current?.focus();
      else if (currentErrors.phone) phoneRef.current?.focus();
      else if (currentErrors.email) emailRef.current?.focus();
      return;
    }
    setStep("wheel");
  };

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    // تشغيل صوت الدوران
    if (spinAudioRef.current) {
      spinAudioRef.current.currentTime = 0;
      spinAudioRef.current.play();
    }

    // اختيار الجائزة الفائزة
    const winnerIndex = Math.floor(Math.random() * prizes.length);

    // حساب بسيط: كل قطاع = 360 درجة ÷ عدد الجوائز
    const segmentAngle = 360 / prizes.length;

    // العجلة تبدأ من اليمين (0°) والمؤشر فوق (-90°)
    // القطاع 0 من 0° إلى segmentAngle
    // القطاع 1 من segmentAngle إلى 2*segmentAngle
    // مركز القطاع i يكون عند: i * segmentAngle + segmentAngle/2

    // لكن احنا عايزين نجعل القطاع يصل للمؤشر اللي عند -90°
    // فالعجلة تدور عكس عقارب الساعة بحيث مركز القطاع يروح لفوق
    const segmentCenter = winnerIndex * segmentAngle + (segmentAngle / 2);
    const rotationNeeded = 270 - segmentCenter; // 270° = -90° في النظام الموجب

    // نحسب الزاوية المطلوبة بالنسبة للحالة الحالية بدقة
    const desiredMod = ((rotationNeeded % 360) + 360) % 360; // الزاوية المطلوبة (0..359)
    const currentMod = ((rotation % 360) + 360) % 360;       // الزاوية الحالية (0..359)
    const delta = ((desiredMod - currentMod) % 360 + 360) % 360; // فرق موجب لضبط الوقوف

    // دورات إضافية للتأثير البصري
    const extraSpins = 1800; // 5 دورات
    const finalRotation = rotation + extraSpins + delta;

    setRotation(finalRotation);

    setTimeout(() => {
      setResult(prizes[winnerIndex]);
      setSpinning(false);
      // trigger confetti (render then animate via effect)
      setShowConfetti(true);

      // إيقاف صوت الدوران وتشغيل صوت الفوز
      if (spinAudioRef.current) {
        spinAudioRef.current.pause();
      }
      if (winAudioRef.current) {
        winAudioRef.current.currentTime = 0;
        winAudioRef.current.play();
      }

      // fire-and-forget log to Google Sheets (server re-validates as well)
      try {
        fetch("/api/spin-log", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sponsor: name,
            prize: prizes[winnerIndex],
            player: {
              name: player.name.trim(),
              phone: player.phone.trim(),
              email: player.email.trim().toLowerCase(),
            },
            time: new Date().toISOString(),
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
          }),
        }).catch(() => { });
      } catch { }
    }, 4000);
  };

  // lightweight confetti implementation (no deps)
  const runConfetti = () => {
    const canvas = confettiRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // size to modal content box
    const container = canvas.parentElement as HTMLElement | null;
    const rect = container?.getBoundingClientRect();
    const width = Math.floor(rect?.width || 480);
    const height = Math.floor(rect?.height || 600);
    canvas.width = width;
    canvas.height = height;

    const colors = ['#FFD700', '#FF5F5F', '#4CAF50', '#2196F3', '#9C27B0', '#FF9800'];
    const pieces = Array.from({ length: 120 }, () => ({
      x: Math.random() * width,
      y: -20 - Math.random() * 80,
      w: 6 + Math.random() * 6,
      h: 8 + Math.random() * 10,
      r: Math.random() * Math.PI,
      v: 1.5 + Math.random() * 2.5,
      s: (Math.random() - 0.5) * 2,
      c: colors[Math.floor(Math.random() * colors.length)],
    }));

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      pieces.forEach(p => {
        p.y += p.v;
        p.x += p.s;
        p.r += 0.03;
        if (p.y > height + 20) {
          p.y = -10;
          p.x = Math.random() * width;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if (confettiActiveRef.current) {
        confettiRafRef.current = requestAnimationFrame(animate);
      } else {
        if (confettiRafRef.current) cancelAnimationFrame(confettiRafRef.current);
        ctx.clearRect(0, 0, width, height);
      }
    };
    confettiActiveRef.current = true;
    confettiRafRef.current = requestAnimationFrame(animate);
  };

  // run confetti after canvas is mounted; keep running until showConfetti=false
  useEffect(() => {
    if (showConfetti) {
      confettiActiveRef.current = true;
      const id = requestAnimationFrame(() => runConfetti());
      return () => cancelAnimationFrame(id);
    } else {
      confettiActiveRef.current = false;
      if (confettiRafRef.current) {
        cancelAnimationFrame(confettiRafRef.current);
        confettiRafRef.current = null;
      }
    }
  }, [showConfetti]);

  return (
    <div className="text-center sponsor-card">
      <h2 className="text-lg font-bold">{name}</h2>
      <p>{description}</p>
      <button
        onClick={() => setOpen(true)}
        className="game-trigger-btn"
      >
        🎰 إلعب الآن
      </button>
      {mounted && open && createPortal(
        <div className="modal">
          <div className="modal-content">
            {/* تعليمات */}
            {step === "instructions" && (
              <div>
                <h3 className="mb-2 text-lg font-bold text-red-600">
                  📜 التعليمات
                </h3>
                <p className="text-sm text-gray-300">
                  هتلعب مرة واحدة بس. لازم تدخل بياناتك قبل اللعب.
                </p>
                <button
                  onClick={() => {
                    setStep("form");
                    setErrors({});
                    setTouched({ name: false, phone: false, email: false });
                    setSubmitted(false);
                    setFocused(null);
                    // initialize phone display formatting
                    const digits = player.phone.replace(/\D/g, "");
                    const formatGroups = (ds: string) => {
                      if (!ds) return "";
                      if (ds.length >= 10) return ds.replace(/(\d{2})(\d{2})(\d{4})(\d{0,4})/, (_,a,b,c,d)=>[a,b,c,d].filter(Boolean).join(' '));
                      if (ds.length > 6) return ds.replace(/(\d{3})(\d{0,3})(\d{0,4})/, (_,a,b,c)=>[a,b,c].filter(Boolean).join(' '));
                      if (ds.length > 3) return ds.replace(/(\d{3})(\d{0,3})/, (_,a,b)=>[a,b].filter(Boolean).join(' '));
                      return ds;
                    };
                    setPhoneDisplay(formatGroups(digits));
                  }}
                  className="start-game-btn"
                >
                  🚀 ابدأ اللعب
                </button>
              </div>
            )}

            {/* فورم */}
            {step === "form" && (
              <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
                <h3 className="mb-2 text-lg font-bold text-red-600">
                  📝 سجل بياناتك
                </h3>
                {/* Error summary shown after submit if any */}
                {(submitted && Object.keys(errors).length > 0) && (
                  <div
                    ref={summaryRef}
                    tabIndex={-1}
                    role="alert"
                    aria-live="polite"
                    className="error-summary"
                  >
                    <strong>راجِع الحقول التالية:</strong>
                    <ul>
                      {errors.name && <li>الاسم: {errors.name}</li>}
                      {errors.phone && <li>رقم الموبايل: {errors.phone}</li>}
                      {errors.email && <li>البريد الإلكتروني: {errors.email}</li>}
                    </ul>
                  </div>
                )}
                <input
                  type="text"
                  placeholder="الاسم"
                  value={player.name}
                  ref={nameRef}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setTouched((t)=>({ ...t, name: true }))}
                  onChange={(e) => {
                    const val = e.target.value;
                    const next = { ...player, name: val };
                    setPlayer(next);
                    // recompute errors from scratch so cleared fields remove old errors
                    setErrors(validatePlayer(next));
                  }}
                  aria-invalid={!!errors.name && (touched.name || submitted)}
                  aria-describedby="name-error"
                  className={isValidNow('name') && (touched.name || submitted) ? 'valid' : ''}
                />
                {/* Hint for name */}
                {focused === 'name' && !(errors.name && (touched.name || submitted)) && (
                  <div className="field-hint" aria-live="polite">اكتب اسمك الكامل (مثال: عمر السيد). يُفضل بدون أرقام.</div>
                )}
                {(errors.name && (touched.name || submitted)) && (
                  <div id="name-error" className="field-error">{errors.name}</div>
                )}
                <input
                  type="tel"
                  placeholder="رقم الموبايل"
                  value={phoneDisplay}
                  ref={phoneRef}
                  inputMode="numeric"
                  pattern="^\\d{8,15}$"
                  onFocus={() => setFocused('phone')}
                  onBlur={() => setTouched((t)=>({ ...t, phone: true }))}
                  onChange={(e) => {
                    const raw = e.target.value;
                    const digits = raw.replace(/\D/g, "");
                    const formatGroups = (ds: string) => {
                      if (!ds) return "";
                      // simple grouping: +XX XX XXXX XXXX when >= 10 digits
                      if (ds.length >= 10) return ds.replace(/(\d{2})(\d{2})(\d{4})(\d{0,4})/, (_,a,b,c,d)=>[a,b,c,d].filter(Boolean).join(' '));
                      if (ds.length > 6) return ds.replace(/(\d{3})(\d{0,3})(\d{0,4})/, (_,a,b,c)=>[a,b,c].filter(Boolean).join(' '));
                      if (ds.length > 3) return ds.replace(/(\d{3})(\d{0,3})/, (_,a,b)=>[a,b].filter(Boolean).join(' '));
                      return ds;
                    };
                    setPhoneDisplay(formatGroups(digits));
                    const next = { ...player, phone: digits };
                    setPlayer(next);
                    setErrors(validatePlayer(next));
                  }}
                  aria-invalid={!!errors.phone && (touched.phone || submitted)}
                  aria-describedby="phone-error"
                  className={isValidNow('phone') && (touched.phone || submitted) ? 'valid' : ''}
                />
                {focused === 'phone' && !(errors.phone && (touched.phone || submitted)) && (
                  <div className="field-hint" aria-live="polite">يفضل تضمين كود الدولة. مثال: +20 10 1234 5678</div>
                )}
                {(errors.phone && (touched.phone || submitted)) && (
                  <div id="phone-error" className="field-error">{errors.phone}</div>
                )}
                <input
                  type="email"
                  placeholder="الإيميل"
                  value={player.email}
                  ref={emailRef}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setTouched((t)=>({ ...t, email: true }))}
                  onChange={(e) => {
                    const val = e.target.value;
                    const next = { ...player, email: val };
                    setPlayer(next);
                    setErrors(validatePlayer(next));
                  }}
                  aria-invalid={!!errors.email && (touched.email || submitted)}
                  aria-describedby="email-error"
                  required
                  className={isValidNow('email') && (touched.email || submitted) ? 'valid' : ''}
                />
                {/* Email suggestion */}
                {(() => {
                  const v = player.email.trim().toLowerCase();
                  const suggestMap: Record<string, string> = {
                    'gamil.com': 'gmail.com', 'gmial.com': 'gmail.com', 'gmai.com': 'gmail.com', 'gmail.con': 'gmail.com',
                    'hotmial.com': 'hotmail.com', 'hotmal.com': 'hotmail.com',
                    'yaho.com': 'yahoo.com', 'yahooo.com': 'yahoo.com',
                    'outlok.com': 'outlook.com', 'outllok.com': 'outlook.com'
                  };
                  const idx = v.indexOf('@');
                  if (idx > 0) {
                    const local = v.slice(0, idx);
                    const domain = v.slice(idx + 1);
                    const fix = suggestMap[domain];
                    if (fix && (!errors.email || !(touched.email || submitted))) {
                      const fixed = `${local}@${fix}`;
                      return (
                        <div className="field-hint" aria-live="polite">
                          هل قصدت <button type="button" className="apply-suggestion" onClick={() => setPlayer(p=>({ ...p, email: fixed }))}>{fixed}</button>؟
                        </div>
                      );
                    }
                  }
                  return null;
                })()}
                {(errors.email && (touched.email || submitted)) && (
                  <div id="email-error" className="field-error">{errors.email}</div>
                )}
                {/* Success states */}
                {isValidNow('name') && (touched.name || submitted) && <div className="field-success" aria-live="polite">تمام — الاسم مضبوط ✓</div>}
                {isValidNow('phone') && (touched.phone || submitted) && <div className="field-success" aria-live="polite">تمام — الرقم شكله صحيح ✓</div>}
                {isValidNow('email') && (touched.email || submitted) && <div className="field-success" aria-live="polite">تمام — البريد الإلكتروني صحيح ✓</div>}
                <button type="submit" className="w-full submit-form-btn">
                  📝 سجل وادخل اللعبة
                </button>
              </form>
            )}

            {/* عجلة */}
            {step === "wheel" && (
              <div>
                <div className="wheel-wrapper">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 300 300"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transition: spinning ? "transform 4s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none",
                      filter: spinning ? "blur(0.5px)" : "none",
                    }}
                  >
                    {prizes.map((prize, i) => {
                      const slice = (2 * Math.PI) / prizes.length;
                      const x1 = 150 + 150 * Math.cos(i * slice);
                      const y1 = 150 + 150 * Math.sin(i * slice);
                      const x2 = 150 + 150 * Math.cos((i + 1) * slice);
                      const y2 = 150 + 150 * Math.sin((i + 1) * slice);

                      return (
                        <g key={i}>
                          <path
                            d={`M150,150 L${x1},${y1} A150,150 0 0,1 ${x2},${y2} Z`}
                            fill={i % 2 === 0 ? colors.primary : colors.secondary}
                            stroke="#fff"
                            strokeWidth="2"
                          />
                          {(() => {
                            const words = prize.split(' ');
                            if (words.length > 2 && prize.length > 15) {
                              // تقسيم النص على سطرين
                              const firstLine = words.slice(0, Math.ceil(words.length / 2)).join(' ');
                              const secondLine = words.slice(Math.ceil(words.length / 2)).join(' ');
                              return (
                                <g>
                                  <text
                                    x="150"
                                    y="150"
                                    transform={`rotate(${(i * 360) / prizes.length +
                                      360 / prizes.length / 2
                                      },150,150) translate(80,-8)`}
                                    textAnchor="middle"
                                    fontSize="16"
                                    fill="#FFFFFF"
                                    fontWeight="900"
                                    fontFamily="Arial Black, Arial, sans-serif"
                                    stroke="#000000"
                                    strokeWidth="1.2"
                                    paintOrder="stroke fill"
                                  >
                                    {firstLine}
                                  </text>
                                  <text
                                    x="150"
                                    y="150"
                                    transform={`rotate(${(i * 360) / prizes.length +
                                      360 / prizes.length / 2
                                      },150,150) translate(80,12)`}
                                    textAnchor="middle"
                                    fontSize="16"
                                    fill="#FFFFFF"
                                    fontWeight="900"
                                    fontFamily="Arial Black, Arial, sans-serif"
                                    stroke="#000000"
                                    strokeWidth="1.2"
                                    paintOrder="stroke fill"
                                  >
                                    {secondLine}
                                  </text>
                                </g>
                              );
                            } else {
                              // نص عادي على سطر واحد
                              return (
                                <text
                                  x="150"
                                  y="150"
                                  transform={`rotate(${(i * 360) / prizes.length +
                                    360 / prizes.length / 2
                                    },150,150) translate(80,4)`}
                                  textAnchor="middle"
                                  fontSize="18"
                                  fill="#FFFFFF"
                                  fontWeight="900"
                                  fontFamily="Arial Black, Arial, sans-serif"
                                  stroke="#000000"
                                  strokeWidth="1.5"
                                  paintOrder="stroke fill"
                                >
                                  {prize.length > 14 ? prize.substring(0, 12) + "..." : prize}
                                </text>
                              );
                            }
                          })()}
                        </g>
                      );
                    })}

                    {/* اللوجو في نص العجلة */}
                    {logo && (
                      <g>
                        <circle
                          cx="150"
                          cy="150"
                          r="35"
                          fill="rgba(255, 255, 255, 0.95)"
                          stroke="#333"
                          strokeWidth="3"
                        />
                        <foreignObject
                          x="125"
                          y="125"
                          width="50"
                          height="50"
                        >
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            height: '100%'
                          }}>
                            <img
                              src={logo}
                              alt={name}
                              style={{
                                width: '40px',
                                height: '40px',
                                objectFit: 'contain',
                                borderRadius: '8px'
                              }}
                            />
                          </div>
                        </foreignObject>
                      </g>
                    )}
                  </svg>
                  <div className="pointer">⬆</div>
                </div>
                <button
                  onClick={spin}
                  disabled={spinning}
                  className="spin-btn"
                >
                  {spinning ? "🎰 بتلف..." : "🎯 لف العجلة"}
                </button>
                {result && (
                  <div className="result-container">
                    <p className="result-text">
                      🎉 مبروك يا {player.name}!
                    </p>
                    <p className="prize-text">
                      كسبت: {result}
                    </p>
                    <div className="action-row">
                      {cta && (
                        <a
                          href={cta.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cta-btn"
                        >
                          {cta.label || "زور موقعنا"}
                        </a>
                      )}
                      <button
                        onClick={() => {
                          setResult(null);
                          setRotation(0);
                        }}
                        className="play-again-btn"
                      >
                        🔄 العب تاني
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <button className="close" onClick={() => { setOpen(false); setShowConfetti(false); }}>
              ✖
            </button>
            {/* Confetti overlay inside modal content */}
            {showConfetti && (
              <canvas ref={confettiRef} className="confetti-canvas" />
            )}
          </div>

          {/* أصوات اللعبة */}
          <audio ref={spinAudioRef} loop>
            <source src="/sounds/spin.mp3" type="audio/mpeg" />
          </audio>
          <audio ref={winAudioRef}>
            <source src="/sounds/winer.mp3" type="audio/mpeg" />
          </audio>
        </div>
        , document.body)}

      <style jsx>{`
        .game-trigger-btn {
          margin-top: 15px;
          padding: 15px 35px;
          color: white;
          background: #ff4757;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 700;
          font-size: 18px;
          font-family: 'Arial', sans-serif;
          transition: all 0.3s ease;
          box-shadow: 0 6px 20px rgba(255, 71, 87, 0.4);
          position: relative;
          overflow: hidden;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.1);
        }
        .game-trigger-btn:hover {
          background: #ff3742;
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(255, 71, 87, 0.5);
        }
        .game-trigger-btn:active {
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(255, 71, 87, 0.4);
        }
        
        .modal {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(10px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          animation: fadeIn 0.4s ease-in-out;
          padding: 20px;
          overflow-y: auto;
        }
        
        .modal-content {
          background: linear-gradient(145deg, #1a1a1a, #0f0f0f);
          border: 2px solid #333;
          border-radius: 20px;
          padding: 20px;
          text-align: center;
          color: white;
          max-width: 450px;
          max-height: 90vh;
          width: 90%;
          position: relative;
          animation: scaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          overflow-y: visible;
          margin: auto;
        }
        
        @media (min-width: 640px) {
          .modal-content {
            width: 85%;
            max-width: 480px;
            max-height: 92vh;
            padding: 25px;
          }
        }
        
        @media (min-width: 768px) {
          .modal-content {
            width: 80%;
            max-width: 500px;
            max-height: 95vh;
            padding: 30px;
          }
        }
        
        .start-game-btn {
          margin-top: 15px;
          padding: 10px 20px;
          color: #fff;
          background: linear-gradient(135deg, #4CAF50, #45a049);
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: bold;
          font-size: 14px;
          transition: all 0.3s ease;
          box-shadow: 0 3px 10px rgba(76, 175, 80, 0.3);
        }
        .start-game-btn:hover {
          background: linear-gradient(135deg, #45a049, #388e3c);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
        }
        
        .submit-form-btn {
          margin-top: 15px;
          padding: 12px 24px;
          color: #fff;
          background: linear-gradient(135deg, #2196F3, #1976D2);
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: bold;
          font-size: 14px;
          transition: all 0.3s ease;
          box-shadow: 0 3px 10px rgba(33, 150, 243, 0.3);
        }
        .submit-form-btn:hover {
          background: linear-gradient(135deg, #1976D2, #1565C0);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(33, 150, 243, 0.4);
        }
        
        .spin-btn {
          margin-top: 15px;
          padding: 12px 24px;
          color: #fff;
          background: linear-gradient(135deg, #FF9800, #F57C00);
          border: none;
          border-radius: 15px;
          cursor: pointer;
          font-weight: bold;
          font-size: 16px;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(255, 152, 0, 0.4);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .spin-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #F57C00, #E65100);
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(255, 152, 0, 0.5);
        }
        .spin-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .action-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          align-items: stretch;
          margin-top: 16px;
        }
        
        .play-again-btn {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          padding: 8px 12px;
          color: #eee;
          background: linear-gradient(135deg, #1f1f1f, #141414);
          border: 1px solid #2e2e2e;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 800;
          font-size: 13px;
          min-height: 34px;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
          text-decoration: none;
        }
        .play-again-btn:hover {
          background: linear-gradient(135deg, #262626, #1b1b1b);
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.45);
        }
        
        form input {
          display: block;
          width: 100%;
          margin: 6px 0;
          padding: 10px;
          border-radius: 8px;
          border: 2px solid #333;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          font-size: 13px;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }
        form input[aria-invalid="true"] {
          border-color: #ff3b3b;
          box-shadow: 0 0 0 3px rgba(255, 59, 59, 0.15);
        }
        form input.valid {
          border-color: #22c55e;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.15);
        }
        .field-hint {
          color: #c7c7c7;
          font-size: 12px;
          margin-top: -4px;
          margin-bottom: 6px;
          text-align: right;
        }
        .field-error {
          color: #ff6b6b;
          font-size: 12px;
          margin-top: -4px;
          margin-bottom: 6px;
          text-align: right;
        }
        .field-success {
          color: #86efac;
          font-size: 12px;
          margin-top: -2px;
          margin-bottom: 8px;
          text-align: right;
        }
        .error-summary {
          text-align:right;
          background: rgba(255,59,59,0.08);
          border: 1px solid rgba(255,59,59,0.35);
          border-radius: 8px;
          padding: 8px 10px;
          color: #ffd1d1;
          margin-bottom: 10px;
        }
        .apply-suggestion {
          color: #4ade80;
          background:none; border:none; padding:0 3px; cursor:pointer; text-decoration:underline;
        }
        
        @media (min-width: 480px) {
          form input {
            padding: 12px;
            font-size: 14px;
            margin: 8px 0;
          }
        }
        form input:focus {
          border-color: #e62b1e;
          background: rgba(0, 0, 0, 0.9);
          outline: none;
          box-shadow: 0 0 15px rgba(230, 43, 30, 0.3);
        }
        
        .wheel-wrapper {
          position: relative;
          margin: 15px auto;
          width: min(65vw, 260px);
          height: min(65vw, 260px);
          border-radius: 50%;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.1) 100%);
        }
        
        @media (min-width: 480px) {
          .wheel-wrapper {
            width: min(55vw, 290px);
            height: min(55vw, 290px);
            margin: 20px auto;
          }
        }
        
        @media (min-width: 768px) {
          .wheel-wrapper {
            width: 320px;
            height: 320px;
            margin: 25px auto;
          }
        }
        
        .pointer {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          font-size: clamp(20px, 6vw, 28px);
          font-weight: bold;
          color: #FFD700;
          text-shadow: 0 3px 15px rgba(255, 215, 0, 0.8);
          z-index: 10;
          filter: drop-shadow(0 0 10px #FFD700);
          animation: pointer-glow 2s ease-in-out infinite alternate;
        }
        
        @media (min-width: 768px) {
          .pointer {
            top: -18px;
            font-size: 30px;
          }
        }
        
        @keyframes pointer-glow {
          from {
            text-shadow: 0 3px 15px rgba(255, 215, 0, 0.8);
            filter: drop-shadow(0 0 10px #FFD700);
          }
          to {
            text-shadow: 0 3px 25px rgba(255, 215, 0, 1);
            filter: drop-shadow(0 0 20px #FFD700);
          }
        }
        
        .result-container {
          margin-top: 16px;
          padding: 16px 16px 18px;
          background: linear-gradient(145deg, #111, #0b0b0b);
          border-radius: 14px;
          border: 2px solid rgba(230, 43, 30, 0.75);
          box-shadow: 0 10px 30px rgba(0,0,0,0.45), 0 0 0 1px rgba(230,43,30,0.15) inset;
          position: relative;
          overflow: hidden;
          animation: bounceIn 0.6s ease;
        }
        .result-container:before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 6px;
          background: linear-gradient(90deg, #E62B1E, #ff5959);
        }

        .cta-btn {
          display:inline-flex;
          justify-content:space-around;
          align-items:center;
          width: 100%;
          padding: 6px 1px;
          color: #fff;
          background: linear-gradient(135deg, #E62B1E, #C62828);
          border: 1px solid rgba(230, 43, 30, 0.6);
          border-radius: 10px;
          font-weight: 900;
          letter-spacing: .2px;
          box-shadow: 0 8px 22px rgba(230, 43, 30, 0.35);
          transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
          text-decoration: none;
          font-size: 13px;
          min-height: 34px;
        }
        .cta-btn:hover { 
          transform: translateY(-2px); 
          box-shadow: 0 12px 28px rgba(230,43,30,.45);
          background: linear-gradient(135deg, #D32F2F, #B71C1C);
        }
        .cta-btn:focus-visible { outline: 3px solid rgba(230,43,30,0.35); outline-offset: 2px; border-color: rgba(230,43,30,0.85); }

        .confetti-canvas {
          position:absolute;
          inset:0;
          pointer-events:none;
          z-index: 20;
        }
        
        .result-text {
          font-size: clamp(14px, 4vw, 18px);
          font-weight: 900;
          margin-bottom: 8px;
          color: #ffffff;
          letter-spacing: .2px;
          text-shadow: 0 1px 2px rgba(0,0,0,.3);
        }
        
        .prize-text {
          font-size: clamp(16px, 5vw, 20px);
          font-weight: 900;
          color: #ffffff;
          margin-bottom: 12px;
          text-shadow: 0 2px 5px rgba(0, 0, 0, 0.35);
          word-wrap: break-word;
        }
        
        .close {
          position: absolute;
          top: 10px;
          right: 15px;
          background: transparent;
          border: none;
          font-size: 20px;
          color: #888;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .close:hover {
          color: #fff;
          transform: rotate(90deg);
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes bounceIn {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
          70% {
            transform: scale(0.9);
            opacity: 0.9;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
