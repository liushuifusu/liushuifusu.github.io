import { FolderGit2, FileText, Wrench, Star } from "lucide-react";
import { profile } from "../data/profile";

/* 技术标签颜色 */
const tagColors = [
  "text-teal bg-teal/5 border-teal/10",
  "text-blue-300 bg-blue-500/5 border-blue-500/10",
  "text-purple-300 bg-purple-500/5 border-purple-500/10",
];

function getTagColor(tech) {
  let hash = 0;
  for (let i = 0; i < tech.length; i++) {
    hash = ((hash << 5) - hash + tech.charCodeAt(i)) | 0;
  }
  return tagColors[Math.abs(hash) % tagColors.length];
}

function ProjectCard({ project }) {
  return (
    <div
      className="card-hover bg-navy-light rounded-xl border border-white/5 overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 sm:p-8 pb-0">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-teal/10 flex items-center justify-center shrink-0">
              <FolderGit2 size={18} className="text-teal" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white-soft">{project.name}</h3>
              <p className="text-sm text-slate mt-0.5">
                {project.role} · <span className="text-teal">{project.period}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {(project.tech || []).map((t) => (
            <span
              key={t}
              className={`px-2.5 py-1 text-xs font-medium rounded-full border ${getTagColor(t)}`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* 项目简介 */}
      <div className="px-6 sm:px-8 py-5 border-t border-white/5">
        <div className="flex items-center gap-2 mb-3">
          <FileText size={16} className="text-teal shrink-0" />
          <h4 className="text-sm font-semibold text-white-soft tracking-wide">项目简介</h4>
        </div>
        <p className="text-sm text-slate leading-relaxed">{project.intro}</p>
      </div>

      {/* 主要工作 */}
      <div className="px-6 sm:px-8 py-5 border-t border-white/5 bg-navy/30">
        <div className="flex items-center gap-2 mb-3">
          <Wrench size={16} className="text-blue-400 shrink-0" />
          <h4 className="text-sm font-semibold text-white-soft tracking-wide">主要工作</h4>
        </div>
        <ul className="space-y-1.5">
          {(project.work || []).map((item, j) => (
            <li key={j} className="text-sm text-slate flex items-start gap-2.5">
              <span className="text-blue-400 mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400/60 shrink-0"></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 项目成果 */}
      <div className="px-6 sm:px-8 py-5 border-t border-white/5">
        <div className="flex items-center gap-2 mb-3">
          <Star size={16} className="text-yellow-400 shrink-0" />
          <h4 className="text-sm font-semibold text-white-soft tracking-wide">项目成果</h4>
        </div>
        <ul className="space-y-1.5">
          {(project.results || []).map((item, j) => (
            <li key={j} className="text-sm text-slate flex items-start gap-2.5">
              <span className="text-yellow-400 mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-400/60 shrink-0"></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <div className="space-y-8">
      {(profile.projects || []).map((project, i) => (
        <ProjectCard key={i} project={project} />
      ))}
    </div>
  );
}
