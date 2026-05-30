import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "../data/profile";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = profile.navLinks.map((l) => document.getElementById(l.id));
      const scrollPos = window.scrollY + 120;
      const atBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 10;
      // If at page bottom, highlight last section
      if (atBottom && sections[sections.length - 1]) {
        setActiveSection(profile.navLinks[sections.length - 1].id);
        return;
      }
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(profile.navLinks[i].id);
          return;
        }
      }
      setActiveSection("");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            <span className="gradient-text">{profile.name}</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {profile.navLinks.map((link, i) => (
              <button
                key={link.id}
                onClick={() => handleClick(link.id)}
                className={`px-3 py-2 text-sm rounded-lg transition-all duration-300 ${
                  activeSection === link.id
                    ? "text-teal bg-teal/10"
                    : "text-slate hover:text-teal hover:bg-navy-lighter/50"
                }`}
              >
                <span className="text-teal mr-1 text-xs font-mono">0{i + 1}.</span>
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-slate hover:text-teal hover:bg-navy-lighter/50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-[28rem]" : "max-h-0"
        }`}
      >
        <div className="glass px-6 py-4 space-y-1 border-t border-white/5">
          {profile.navLinks.map((link, i) => (
            <button
              key={link.id}
              onClick={() => handleClick(link.id)}
              className="block w-full text-left px-4 py-3 rounded-lg text-sm text-slate hover:text-teal hover:bg-navy-lighter/30 transition-all"
            >
              <span className="text-teal mr-2 text-xs font-mono">0{i + 1}.</span>
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
