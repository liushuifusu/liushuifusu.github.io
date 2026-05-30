import { profile } from "../data/profile";
import useScrollReveal from "../hooks/useScrollReveal";

export default function ProjectSummary() {
  const ref = useScrollReveal();

  return (
    <div className="max-w-3xl mx-auto">
      <div
        ref={ref}
        className="reveal-scale relative bg-navy-light rounded-2xl p-8 sm:p-10 border border-white/5 gradient-border"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal via-blue-500 to-teal rounded-t-2xl"></div>
        <div className="absolute -top-3 left-8 bg-navy-light px-3 py-1 rounded-full border border-teal/20">
          <span className="text-xs text-teal font-mono tracking-wider">OVERVIEW</span>
        </div>
        <p className="text-slate-light leading-relaxed text-justify mt-2">
          {profile.projectSummary}
        </p>
      </div>
    </div>
  );
}
