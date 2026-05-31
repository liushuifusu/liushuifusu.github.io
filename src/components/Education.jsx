import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { GraduationCap, Calendar, BookOpen } from "lucide-react";
import { profile } from "../data/profile";
import useScrollReveal from "../hooks/useScrollReveal";

function EduItem({ edu }) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className="reveal relative pl-8 border-l-2 border-teal/20 pb-6 last:pb-0"
    >
      <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-teal border-2 border-navy shadow-[0_0_12px_rgba(100,255,218,0.4)]"></div>
      <div className="card-hover bg-navy-light rounded-xl p-6 border border-white/5">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <GraduationCap size={18} className="text-teal" />
              <h3 className="text-lg font-semibold text-white-soft">{edu.school}</h3>
            </div>
            <p className="text-slate text-sm mt-0.5">{edu.degree} · {edu.major}</p>
          </div>
          <span className="text-sm text-slate bg-navy px-3 py-1 rounded-full border border-white/5 flex items-center gap-1.5">
            <Calendar size={12} />
            {edu.period}
          </span>
        </div>
        {edu.gpa && edu.gpa !== "请填写" && (
          <p className="text-sm text-slate-light mb-2">
            <span className="text-slate">GPA：</span>{edu.gpa}
          </p>
        )}
        {edu.details.length > 0 && (
          <ul className="space-y-1">
            {edu.details.map((d, j) => (
              <li key={j} className="text-sm text-slate flex items-start gap-2">
                <span className="text-teal mt-1.5 w-1.5 h-1.5 rounded-full bg-teal shrink-0"></span>
                {d}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
/* ── Single draggable sphere ── */
function CourseSphere({ courses, radius, sphereSize }) {
  const spanRefs = useRef([]);
  const draggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0.3, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const animRef = useRef(null);
  const baseRef = useRef([]);
  const readyRef = useRef(false);

  // Compute base positions (stable)
  const basePositions = useMemo(() => {
    const n = courses.length;
    if (n === 0) return [];
    const pts = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const ny = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - ny * ny);
      const theta = phi * i;
      pts.push({
        x: Math.cos(theta) * r * radius,
        y: ny * radius,
        z: Math.sin(theta) * r * radius,
      });
    }
    return pts;
  }, [courses.length, radius]);

  baseRef.current = basePositions;

  // Apply styles to DOM refs directly (no React state in animation loop)
  const applyToDOM = useCallback(() => {
    if (!readyRef.current) return;
    const base = baseRef.current;
    if (!base || base.length === 0) return;
    const { x: rotX, y: rotY } = rotationRef.current;
    const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
    const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
    const items = base.map((p, i) => {
      const x1 = p.x * cosY + p.z * sinY;
      const z1 = -p.x * sinY + p.z * cosY;
      const y1 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;
      return { x: x1, y: y1, z: z2, index: i };
    });
    items.sort((a, b) => a.z - b.z);
    const zMin = -radius, zMax = radius;
    const els = spanRefs.current;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const el = els[item.index];
      if (!el) continue;
      const t = (item.z - zMin) / (zMax - zMin);
      el.style.zIndex = Math.round(t * 100);
      el.style.opacity = (0.35 + t * 0.65).toString();
      el.style.transform = `translate(${item.x}px, ${item.y}px) translate(-50%, -50%) scale(${0.7 + t * 0.4})`;
    }
  }, [radius]);

  // Mark ready after first paint
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      readyRef.current = true;
      applyToDOM();
    });
    return () => cancelAnimationFrame(frame);
  }, []); // eslint-disable-line

  // Animation loop
  useEffect(() => {
    const animate = () => {
      const v = velocityRef.current;
      const hasV = Math.abs(v.x) > 0.005 || Math.abs(v.y) > 0.005;
      if (!draggingRef.current && hasV) {
        rotationRef.current.y += v.x;
        rotationRef.current.x += v.y;
        v.x *= 0.95;
        v.y *= 0.95;
      } else if (!draggingRef.current && !hasV) {
        rotationRef.current.y += 0.0008;
      }
      if (!draggingRef.current) applyToDOM();
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []); // eslint-disable-line

  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    draggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
    velocityRef.current = { x: 0, y: 0 };
    e.preventDefault();
  }, []);

  useEffect(() => {
    const move = (e) => {
      if (!draggingRef.current) return;
      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;
      rotationRef.current.y += dx * 0.005;
      rotationRef.current.x -= dy * 0.005;
      velocityRef.current = { x: dx * 0.005, y: dy * 0.005 };
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
      applyToDOM();
    };
    const up = () => { draggingRef.current = false; };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, []); // eslint-disable-line

  return (
    <div
      onMouseDown={handleMouseDown}
      className="relative cursor-grab active:cursor-grabbing"
      style={{ width: sphereSize, height: sphereSize }}
    >
      {courses.map((course, i) => (
        <span
          key={course}
          ref={el => { spanRefs.current[i] = el; }}
          className="absolute left-1/2 top-1/2 px-2.5 py-1 text-xs whitespace-nowrap rounded-lg border select-none"
          style={{
            zIndex: 0,
            opacity: 0,
            transform: "translate(-50%, -50%)",
            color: "rgb(168, 178, 209)",
            background: "rgba(17, 34, 64, 0.9)",
            borderColor: "rgba(100, 255, 218, 0.2)",
            pointerEvents: "none",
          }}
        >
          {course}
        </span>
      ))}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(100,255,218,0.1), transparent 70%)" }}
      ></div>
    </div>
  );
}

/* ── Three spheres section ── */
function CourseSection() {
  const containerRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); obs.unobserve(el); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const groups = profile.about.courseGroups;

  return (
    <div ref={containerRef} className="select-none"
      style={{ opacity: revealed ? 1 : 0, transition: "opacity 0.8s ease-out" }}
    >
      <div className="flex items-center gap-2 mb-6">
        <BookOpen size={18} className="text-teal" />
        <h3 className="text-lg font-semibold text-white-soft">主修课程</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 justify-items-center">
        {groups.map((group, idx) => (
          <div key={group.name}
            className={`flex flex-col items-center px-6 py-4 w-full
              ${idx > 0 ? "border-l border-white/5 lg:border-l" : ""}
              ${idx === 0 ? "" : "mt-8 lg:mt-0"}
            `}
          >
            <CourseSphere
              courses={group.courses}
              radius={group.courses.length <= 3 ? 110 : group.courses.length <= 5 ? 130 : 145}
              sphereSize={340}
            />
            <p className="text-sm text-teal font-medium tracking-wide mt-3">{group.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Education() {
  return (
    <div className="space-y-12">
      <div className="space-y-6">
        {profile.education.map((edu, i) => (
          <EduItem key={i} edu={edu} />
        ))}
      </div>

<CourseSection />
    </div>
  );
}
