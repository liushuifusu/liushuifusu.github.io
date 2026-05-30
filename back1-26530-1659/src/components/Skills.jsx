import { useEffect, useRef, useState } from "react";
import { profile } from "../data/profile";

function SkillBar({ skill, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="card-hover bg-navy-light rounded-xl p-5 border border-white/5 group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-medium text-white-soft text-sm">{skill.name}</span>
        <span className="text-xs text-teal font-mono">{skill.level}%</span>
      </div>
      <div className="w-full h-2 bg-navy rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal to-blue-500 transition-all duration-[1200ms] ease-out"
          style={{ width: visible ? `${skill.level}%` : "0%" }}
        ></div>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {profile.skills.map((skill, i) => (
        <SkillBar key={skill.name} skill={skill} index={i} />
      ))}
    </div>
  );
}
