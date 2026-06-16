import { profile } from "../data/profile";
import useScrollReveal from "../hooks/useScrollReveal";

function AwardItem({ award }) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className="reveal card-hover bg-navy-light rounded-xl p-5 border border-white/5"
    >
      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
        <h4 className="font-semibold text-white-soft text-sm sm:text-base">{award.title}</h4>
        <span className="text-xs text-slate bg-navy px-2.5 py-0.5 rounded-full border border-white/5 shrink-0">
          {award.date}
        </span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-medium text-teal bg-teal/10 px-2 py-0.5 rounded">
          {award.role}
        </span>
      </div>
      <p className="text-sm text-slate leading-relaxed">{award.description}</p>
    </div>
  );
}

export default function Awards() {
  return (
    <div className="space-y-4">
      {profile.awards.map((award, i) => (
        <AwardItem key={i} award={award} />
      ))}
    </div>
  );
}
