import { profile } from "../data/profile";

export default function Skills() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {profile.skills.map((skill) => (
        <div
          key={skill.name}
          className="card-hover bg-navy-light rounded-xl p-5 border border-white/5 flex items-center justify-center"
        >
          <span className="font-medium text-white-soft text-base">{skill.name}</span>
        </div>
      ))}
    </div>
  );
}
