"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type SponsorGameProps = {
  name: string;
  prizes: string[];
  description?: string;
  logo?: string;
};

export default function SponsorGameCard({
  name,
  prizes,
  description,
  logo,
}: SponsorGameProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<
    "instructions" | "form" | "wheel" | "done"
  >("instructions");
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  const [player, setPlayer] = useState({ name: "", phone: "", email: "" });
  const audioRef = useRef<HTMLAudioElement>(null);


  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!player.name || !player.phone) return alert("املأ بياناتك كاملة");
    setStep("wheel");
    audioRef.current?.play();
  };

  const spin = () => {
    if (spinning) return;
    setSpinning(true);

    const randomIndex = Math.floor(Math.random() * prizes.length);
    const slice = 360 / prizes.length;
    const newRotation = 360 * 5 + randomIndex * slice + slice / 2;

    setRotation(newRotation);

    setTimeout(() => {
      setResult(prizes[randomIndex]);
      setSpinning(false);
      localStorage.setItem("played", "true");
    }, 5000);
  };

  return (
    <div className="text-center sponsor-card">
      {logo && (
        <Image
          src={logo}
          alt={name}
          width={100}
          height={64}
          className="object-contain h-16 mx-auto mb-3"
        />
      )}
      <h2 className="text-lg font-bold">{name}</h2>
      <p>{description}</p>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 mt-2 font-bold text-white transition bg-red-600 rounded-lg hover:bg-red-700"
      >
        إلعب الآن
      </button>

      {open && (
        <div className="modal">
          <div className="modal-content">
            {/* تعليمات */}
            {step === "instructions" && (
              <div>
                <h3 className="mb-4 text-2xl font-extrabold text-red-600">
                  📜 التعليمات
                </h3>
                <p className="text-gray-300">
                  هتلعب مرة واحدة بس. لازم تدخل بياناتك قبل اللعب.
                </p>
                <button
                  onClick={() => setStep("form")}
                  className="btn-primary"
                >
                  ابدأ اللعب
                </button>
              </div>
            )}

            {/* فورم */}
            {step === "form" && (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <h3 className="mb-4 text-2xl font-extrabold text-red-600">
                  📝 سجل بياناتك
                </h3>
                <input
                  type="text"
                  placeholder="الاسم"
                  value={player.name}
                  onChange={(e) =>
                    setPlayer({ ...player, name: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="رقم الموبايل"
                  value={player.phone}
                  onChange={(e) =>
                    setPlayer({ ...player, phone: e.target.value })
                  }
                  required
                />
                <input
                  type="email"
                  placeholder="الإيميل"
                  value={player.email}
                  onChange={(e) =>
                    setPlayer({ ...player, email: e.target.value })
                  }
                />
                <button type="submit" className="w-full btn-primary">
                  سجل وادخل اللعبة
                </button>
              </form>
            )}

            {/* عجلة */}
            {step === "wheel" && (
              <div>
                <div className="wheel-wrapper">
                  <svg
                    width="350"
                    height="350"
                    viewBox="0 0 300 300"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transition: spinning ? "transform 5s ease-out" : "none",
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
                            fill={i % 2 === 0 ? "#E62B1E" : "#222"}
                            stroke="#fff"
                            strokeWidth="2"
                          />
                          <text
                            x="150"
                            y="150"
                            transform={`rotate(${
                              (i * 360) / prizes.length +
                              360 / prizes.length / 2
                            },150,150) translate(70,-10)`}
                            textAnchor="middle"
                            fontSize="12"
                            fill="#fff"
                          >
                            {prize}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                  <div className="pointer">⬆</div>
                </div>
                <button
                  onClick={spin}
                  disabled={spinning || result !== null}
                  className="btn-primary"
                >
                  {spinning ? "⏳ بتلف..." : "لف العجلة"}
                </button>
                {result && (
                  <p className="mt-4 font-bold text-red-500 result">
                    🎉 مبروك يا {player.name}! كسبت: {result}
                  </p>
                )}
              </div>
            )}

            {/* لعب قبل كده */}
            {step === "done" && (
              <div>
                <h3 className="mb-2 text-xl font-bold text-red-600">
                  ❌ انت لعبت قبل كده
                </h3>
                <p className="text-gray-300">شكراً لمشاركتك!</p>
              </div>
            )}

            <button className="close" onClick={() => setOpen(false)}>
              ✖
            </button>
          </div>

          {/* موسيقى */}
          <audio ref={audioRef} loop>
            <source src="/sounds/game-music.mp3" type="audio/mpeg" />
          </audio>
        </div>
      )}

      <style jsx>{`
        .modal {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          animation: fadeIn 0.4s ease-in-out;
        }
        .modal-content {
          background: #111;
          border-radius: 20px;
          padding: 30px;
          text-align: center;
          color: white;
          max-width: 420px;
          width: 90%;
          position: relative;
          animation: scaleIn 0.3s ease;
        }
        .btn-primary {
          margin-top: 15px;
          padding: 12px 20px;
          color: #fff;
          background: #e62b1e;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: bold;
          font-size: 16px;
          transition: background 0.2s ease;
        }
        .btn-primary:hover {
          background: #b71c1c;
        }
        form input {
          display: block;
          width: 100%;
          margin: 8px 0;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #333;
          background: #000;
          color: white;
        }
        form input:focus {
          border-color: #e62b1e;
          outline: none;
        }
        .wheel-wrapper {
          position: relative;
          margin: 20px auto;
          width: 350px;
          height: 350px;
        }
        .pointer {
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 28px;
          font-weight: bold;
          color: #e62b1e;
        }
        .close {
          position: absolute;
          top: 12px;
          right: 15px;
          background: transparent;
          border: none;
          font-size: 22px;
          color: #888;
          cursor: pointer;
        }
        .close:hover {
          color: #fff;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0.8;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
