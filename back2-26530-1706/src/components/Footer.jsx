import { profile } from "../data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-slate text-sm font-mono tracking-wide">
          {profile.footer.copyright}
        </p>
        {profile.footer.icp && (
          <p className="text-slate/50 text-xs mt-2">{profile.footer.icp}</p>
        )}
      </div>
    </footer>
  );
}
