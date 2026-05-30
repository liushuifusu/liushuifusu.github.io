import { Mail, MessageCircle, Phone } from "lucide-react";
import { profile } from "../data/profile";
import useScrollReveal from "../hooks/useScrollReveal";

function GithubIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

const iconMap = {
  email: Mail,
  wechat: MessageCircle,
  github: GithubIcon,
  linkedin: GithubIcon,
  phone: Phone,
};

const labelMap = {
  email: "邮箱",
  wechat: "微信",
  github: "GitHub",
  linkedin: "LinkedIn",
  phone: "手机",
};

export default function Contact() {
  const ref = useScrollReveal();
  const entries = Object.entries(profile.contact).filter(
    ([, value]) => value && !value.includes("请填写")
  );

  return (
    <div ref={ref} className="reveal max-w-2xl mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {entries.map(([key, value], i) => {
          const Icon = iconMap[key];

          return (
            <a
              key={key}
              href={
                key === "email"
                  ? `mailto:${value}`
                  : key === "github" || key === "linkedin"
                    ? value
                    : undefined
              }
              target={key === "github" || key === "linkedin" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="card-hover flex items-center gap-3 p-4 rounded-xl bg-navy-light border border-white/5 group"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-10 h-10 rounded-lg bg-teal/5 flex items-center justify-center group-hover:bg-teal/10 transition-colors">
                <Icon size={20} className="text-teal" />
              </div>
              <div>
                <p className="text-xs text-slate">{labelMap[key]}</p>
                <p className="text-sm font-medium text-white-soft break-all">{value}</p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
