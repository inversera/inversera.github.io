import siteData from "../../data/data.json";
import {
  Search,
  FileText,
  Settings,
  ChartNoAxesCombined,
  ArrowRight,
} from "lucide-react";

type ApproachStep = {
  number: string;
  title: string;
  description: string;
  icon: string;
  href: string;
};

type TextPart = {
  text: string;
  highlight: boolean;
};

type ApproachData = {
  id: string;
  name: string;
  eyebrow: string;
  heading: {
    text: string;
    parts: TextPart[];
  };
  description: string;
  steps: ApproachStep[];
};

type PageData = {
  ourApproach?: ApproachData;
  sections?: ApproachData[];
  home?: {
    sections?: ApproachData[];
  };
};

const pageData = siteData as PageData;

const approachData =
  pageData.ourApproach ??
  pageData.sections?.find((section) => section.id === "our-approach") ??
  pageData.home?.sections?.find((section) => section.id === "our-approach");

function StepIcon({ name }: { name: string }) {
  const props = {
    size: 30,
    strokeWidth: 2,
    "aria-hidden": true as const,
    focusable: false as const,
  };

  switch (name) {
    case "search":
      return <Search {...props} />;
    case "file-text":
      return <FileText {...props} />;
    case "settings":
      return <Settings {...props} />;
    case "chart-no-axes-combined":
      return <ChartNoAxesCombined {...props} />;
    default:
      return <ArrowRight {...props} />;
  }
}

export default function OurApproach() {
  if (!approachData) return null;

  return (
    <section
      id="our-approach"
      aria-labelledby="our-approach-heading"
      className="home-section overflow-hidden bg-white"
    >
      <div className="home-section__inner">
        <header className="mb-7 sm:mb-9">
          <p className="eyebrow mb-2">{approachData.eyebrow}</p>

          <h2
            id="our-approach-heading"
            className="heading-2 max-w-none text-balance"
          >
            {approachData.heading.parts.map((part, index) => (
              <span
                key={`${part.text}-${index}`}
                className={part.highlight ? "text-accent" : ""}
              >
                {part.text}
              </span>
            ))}
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base">
            {approachData.description}
          </p>
        </header>

        <ol className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {approachData.steps.map((step, index) => (
            <li key={step.number} className="relative min-w-0">
              {/* Connector between steps on desktop */}
              {index < approachData.steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute top-7 right-[-1.1rem] z-0 hidden w-8 items-center text-sky-400 lg:flex"
                >
                  <span className="h-px flex-1 bg-sky-200" />
                  <ArrowRight size={17} strokeWidth={1.8} />
                </div>
              )}

              <a
                href={step.href}
                className="group relative z-10 flex h-full min-w-0 flex-col rounded-xl border border-transparent p-1 transition-colors hover:border-sky-100 focus-visible:rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                aria-label={`${step.number}: ${step.title}. ${step.description}`}
              >
                <div className="mb-3 flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-sky-100 to-cyan-100 text-sky-600 transition-colors group-hover:from-cyan-100 group-hover:to-teal-100 group-hover:text-teal-600">
                  <StepIcon name={step.icon} />
                </div>

                <span className="text-sm font-bold tracking-wide text-[var(--color-navy)]">
                  {step.number}
                </span>

                <h3 className="mt-0.5 text-lg leading-snug font-bold text-[var(--color-navy)]">
                  {step.title}
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {step.description}
                </p>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
