import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { profile } from "../data/profile";

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const dots = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((dot, i) => {
        dot.x += dot.vx;
        dot.y += dot.vy;
        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(100, 255, 218, 0.15)";
        ctx.fill();

        // Connect nearby dots
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[j].x - dot.x;
          const dy = dots[j].y - dot.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(100, 255, 218, ${0.06 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        }
      });
      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleCta = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollDown = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated dot background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(17,34,64,0.4),transparent_70%)] z-[1]"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-teal/5 rounded-full blur-[120px] z-[1]"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] z-[1]"></div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-teal font-mono text-lg sm:text-xl mb-6 tracking-widest animate-[fadeIn_1s_ease-out]">
          你好，我是
        </p>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-[fadeInUp_0.8s_ease-out]">
          <span className="gradient-text">{profile.name}</span>
        </h1>

        <p className="text-slate-light text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed animate-[fadeInUp_0.8s_ease-out_0.15s]">
          {profile.hero.tagline}
        </p>

        <div className="flex items-center justify-center gap-4 animate-[fadeInUp_0.8s_ease-out_0.3s]">
          <button
            onClick={handleCta}
            className="group relative px-8 py-3.5 border-2 border-teal/30 text-teal font-medium rounded-lg overflow-hidden transition-all hover:border-teal"
          >
            <span className="relative z-10 group-hover:text-navy transition-colors duration-300">
              {profile.hero.cta}
            </span>
            <div className="absolute inset-0 bg-teal scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-slate hover:text-teal transition-colors animate-[float_3s_ease-in-out_infinite]"
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
}
