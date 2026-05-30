import useScrollReveal from "../hooks/useScrollReveal";

export default function SectionWrapper({ id, title, subtitle, children, className = "" }) {
  const ref = useScrollReveal();

  return (
    <section id={id} className={`py-24 px-6 lg:px-8 ${className}`}>
      <div ref={ref} className="reveal max-w-5xl mx-auto">
        {title && (
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white-soft mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-slate text-lg max-w-lg mx-auto">{subtitle}</p>
            )}
            <div className="section-divider mx-auto mt-6"></div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
