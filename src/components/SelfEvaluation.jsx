import { Quote } from "lucide-react";
import { profile } from "../data/profile";
import useScrollReveal from "../hooks/useScrollReveal";

export default function SelfEvaluation() {
  const ref = useScrollReveal();

  return (
    <div className="max-w-3xl mx-auto">
      <div
        ref={ref}
        className="reveal-scale relative bg-navy-light rounded-2xl p-8 sm:p-10 border border-white/5 overflow-hidden"
      >
        {/* Decorative gradient */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal/0 via-teal/50 to-teal/0"></div>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal/5 rounded-full blur-3xl"></div>

        <Quote size={48} className="text-teal/10 absolute top-6 left-6" />
        <p className="relative z-10 text-slate-light text-lg leading-relaxed text-center italic">
          {profile.selfEvaluation.content}
        </p>
      </div>
    </div>
  );
}
