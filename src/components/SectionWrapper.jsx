import { ChevronDown } from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";

export default function SectionWrapper({ id, title, subtitle, children, nextId, fullScreen = true, className = "" }) {
  const ref = useScrollReveal();

  const scrollNext = () => {
    if (nextId) {
      document.getElementById(nextId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id={id} className={`${fullScreen ? "min-h-screen" : ""} flex flex-col justify-center py-20 px-6 lg:px-8 relative ${className}`}>
      <div ref={ref} className="reveal max-w-5xl mx-auto w-full">
        {title && (
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white-soft mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-slate text-lg max-w-lg mx-auto">{subtitle}</p>
            )}
            <div className="section-divider mx-auto mt-6"></div>
          </div>
        )}
        {children}
      </div>

      {nextId && (
        <button
          onClick={scrollNext}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate hover:text-teal transition-colors animate-[float_3s_ease-in-out_infinite] z-10"
          aria-label="下一页"
        >
          <ChevronDown size={28} />
        </button>
      )}
    </section>
  );
}
