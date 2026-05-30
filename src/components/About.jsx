import { User, Award, Calendar, GraduationCap, Mail, MapPin, Phone, MessageCircle, Flag } from "lucide-react";
import { profile } from "../data/profile";
import useScrollReveal from "../hooks/useScrollReveal";

function GithubIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

const iconMap = {
  user: User,
  calendar: Calendar,
  school: GraduationCap,
  mail: Mail,
  "map-pin": MapPin,
  flag: Flag,
  phone: Phone,
  wechat: MessageCircle,
  github: GithubIcon,
};

export default function About() {
  const avatarRef = useScrollReveal();
  const infoRef = useScrollReveal({ threshold: 0.1 });
  const certRef = useScrollReveal();

  return (
    <div className="space-y-10">
      {/* Basic info */}
      <div className="grid md:grid-cols-3 gap-10">
        <div ref={avatarRef} className="reveal-left flex justify-center md:justify-end">
          <div className="relative group h-full">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal to-blue-500 opacity-30 blur-md group-hover:opacity-50 transition-opacity"></div>
            <div className="relative w-44 h-full min-h-44 rounded-2xl bg-navy-light border border-white/5 flex items-center justify-center overflow-hidden">
              {profile.about.avatar ? (
                <img src={profile.about.avatar} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                <User size={56} className="text-slate/40" />
              )}
            </div>
          </div>
        </div>

        <div ref={infoRef} className="reveal-right md:col-span-2 flex flex-col justify-center h-full">
          <h3 className="text-2xl font-bold text-white-soft mb-5">{profile.name}</h3>

          {/* Info grid with icons */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            {profile.about.items.map((item) => {
              const Icon = iconMap[item.icon] || User;
              return (
                <div key={item.label} className="flex items-center gap-2.5 text-sm group/item">
                  <div className="w-7 h-7 rounded-md bg-navy-light border border-white/5 flex items-center justify-center shrink-0 group-hover/item:border-teal/30 transition-colors">
                    <Icon size={14} className="text-slate group-hover/item:text-teal transition-colors" />
                  </div>
                  <div className="flex gap-1.5 min-w-0">
                    <span className="text-slate shrink-0">{item.label}</span>
                    <span className="text-slate-light truncate">{item.value}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {profile.about.intro !== "请在此处填写你的个人简介……" && (
            <p className="text-slate leading-relaxed">{profile.about.intro}</p>
          )}
        </div>
      </div>

      {/* Certificates */}
      <div ref={certRef} className="reveal">
        <div className="flex items-center gap-2 mb-4">
          <Award size={18} className="text-teal" />
          <h3 className="text-lg font-semibold text-white-soft">个人证书</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {profile.about.certificates.map((cert) => (
            <span
              key={cert}
              className="px-3 py-1.5 text-sm bg-teal/5 text-teal border border-teal/20 rounded-lg cursor-default"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
