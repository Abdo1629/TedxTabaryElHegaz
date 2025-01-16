"use client";
import { useRef, useEffect, useState } from "react";

const FireEffect = () => {
  const canvasRef = useRef(null);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = 150;

    let particles = [];
    let animationFrame;
    
    // بعد 5 ثواني، تبدأ النيران في الانخفاض تدريجياً
    setTimeout(() => setIsFading(true), 5000);

    function createParticle() {
      return {
        x: Math.random() * canvas.width,
        y: canvas.height,
        size: Math.random() * 8 + 2,
        speedY: Math.random() * 2 + 1,
        color: ["red", "white", "green", "black"][Math.floor(Math.random() * 4)],
        alpha: 1,
      };
    }

    function updateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // عندما تكون النيران مشتعلة، نستمر في إضافة الجسيمات
      if (!isFading && particles.length < 100) {
        particles.push(createParticle());
      }

      particles.forEach((p, i) => {
        p.y -= p.speedY;
        p.alpha -= isFading ? 0.03 : 0.02; // اجعلها تتلاشى أسرع عند بدء الإطفاء

        ctx.fillStyle = `rgba(${p.color === "red" ? "255,0,0" :
                              p.color === "white" ? "255,255,255" :
                              p.color === "green" ? "0,255,0" :
                              "0,0,0"}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.alpha <= 0) {
          particles.splice(i, 1);
        }
      });

      // عند انتهاء الجسيمات بالكامل، أوقف الأنيميشن
      if (isFading && particles.length === 0) {
        cancelAnimationFrame(animationFrame);
        return;
      }

      animationFrame = requestAnimationFrame(updateParticles);
    }

    updateParticles();

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return <canvas ref={canvasRef} className="fire-canvas"></canvas>;
};

export default FireEffect;
