import Image from "next/image";
import siteData from "../../data/data.json";
import { ArrowRight } from "lucide-react";

type TextPart = {
  text: string;
  highlight: boolean;
};

type Action = {
  label: string;
  href: string;
  icon?: string;
  variant?: "primary" | "secondary";
};

type ComparisonItem = {
  text: string;
  icon: string;
};

type ProactiveItData = {
  id: string;
  name: string;
  eyebrow: string;
  heading: {
    text: string;
    parts: TextPart[];
  };
  description: string;
  actions: Action[];
  comparison: {
    reactive: {
      title: string;
      issues: ComparisonItem[];
      summary: string;
    };
    proactive: {
      title: string;
      benefits: ComparisonItem[];
    };
  };
};

type PageData = {
  sections?: ProactiveItData[];
  home?: { sections?: ProactiveItData[] };
  proactiveIt?: ProactiveItData;
};

const pageData = siteData as PageData;

const sectionData =
  pageData.proactiveIt ??
  pageData.sections?.find((section) => section.id === "proactive-it") ??
  pageData.home?.sections?.find((section) => section.id === "proactive-it");

export default function ProactiveIt() {
  if (!sectionData) return null;

  const action = sectionData.actions?.[0];

  return (
    <section
      id="proactive-it"
      aria-labelledby="proactive-it-heading"
      className="home-section overflow-hidden bg-white"
    >
      <div className="home-section__inner">
        <div className="home-split home-split--proactive">
          <div className="home-split__content">
            <p className="eyebrow mb-3">{sectionData.eyebrow}</p>

            <h2
              id="proactive-it-heading"
              className="heading-2 max-w-none text-balance"
            >
              {sectionData.heading.parts.map((part, index) => (
                <span key={`${part.text}-${index}`}>
                  {index > 0 ? " " : ""}
                  {part.highlight ? (
                    <span className="text-accent">{part.text}</span>
                  ) : (
                    part.text
                  )}
                </span>
              ))}
            </h2>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--color-text-muted)] sm:text-[1.02rem]">
              {sectionData.description}
            </p>

            {action && (
              <div className="mt-6">
                <a
                  href={action.href}
                  className={`btn inline-flex items-center justify-center gap-2 ${
                    action.variant === "secondary"
                      ? "btn-secondary"
                      : "btn-primary"
                  }`}
                >
                  {action.label}
                  {action.icon === "arrow-right" && (
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      focusable="false"
                    />
                  )}
                </a>
              </div>
            )}

            {/* Text alternative for the visual on small screens */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:hidden">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-bold text-[var(--color-navy)]">
                  {sectionData.comparison.reactive.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {sectionData.comparison.reactive.summary}
                </p>
              </div>

              <div className="rounded-xl border border-teal-100 bg-teal-50/70 p-4">
                <h3 className="text-sm font-bold text-[var(--color-navy)]">
                  {sectionData.comparison.proactive.title}
                </h3>

                <ul className="mt-2 space-y-1.5">
                  {sectionData.comparison.proactive.benefits.map((benefit) => (
                    <li
                      key={benefit.text}
                      className="flex items-start gap-2 text-sm leading-snug text-[var(--color-navy)]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1 inline-block size-2 shrink-0 rounded-full bg-emerald-500"
                      />
                      {benefit.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="home-split__visual">
            <Image
              src="/home/proactive-it.webp"
              alt="Illustration comparing reactive IT problems with proactive monitoring, prevention, business continuity, and peace of mind"
              width={1200}
              height={760}
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 59vw"
              className="block h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
