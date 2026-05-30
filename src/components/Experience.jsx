import { Building2 } from "lucide-react";
import { profile } from "../data/profile";
import useScrollReveal from "../hooks/useScrollReveal";

export default function Experience() {
  return (
    <div className="space-y-8">
      {profile.experiences.map((exp, i) => {
        const ref = useScrollReveal();

        return (
          <div
            key={i}
            ref={ref}
            className="reveal relative pl-8 border-l-2 border-teal/20 pb-8 last:pb-0"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            {/* Timeline dot */}
            <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-teal border-2 border-navy shadow-[0_0_12px_rgba(100,255,218,0.4)] z-10"></div>

            <div className="card-hover bg-navy-light rounded-xl p-6 border border-white/5">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Building2 size={18} className="text-teal shrink-0" />
                    <h3 className="text-lg font-semibold text-white-soft">{exp.role}</h3>
                  </div>
                  <p className="text-slate text-sm mt-0.5">{exp.org}</p>
                </div>
                <span className="text-xs text-slate bg-navy px-3 py-1 rounded-full border border-white/5 shrink-0">
                  {exp.period}
                </span>
              </div>
              <p className="text-slate text-sm leading-relaxed">{exp.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
