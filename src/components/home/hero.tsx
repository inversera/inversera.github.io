import Image from "next/image";
import siteData from "../../data/data.json";
import {
  ArrowRight,
  CheckCircle2,
  Cloud,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";

type HeroAction = {
  label: string;
  href: string;
  icon?: string;
  variant?: "primary" | "secondary";
};

type HeroHighlight = {
  title: string;
  icon: string;
};

type HeroPart = {
  text: string;
  highlight: boolean;
};

type HeroData = {
  id: string;
  name: string;
  eyebrow: string;
  heading: {
    text: string;
    parts: HeroPart[];
  };
  description: string;
  actions: HeroAction[];
  highlights: HeroHighlight[];
};

type PageDataShape = {
  sections?: HeroData[];
  home?: { sections?: HeroData[] };
  hero?: HeroData;
};

const pageData = siteData as PageDataShape;

const heroData =
  pageData.hero ??
  pageData.sections?.find((section) => section.id === "hero") ??
  pageData.home?.sections?.find((section) => section.id === "hero");

function HighlightIcon({ name }: { name: string }) {
  const props = {
    size: 30,
    strokeWidth: 2,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "settings":
      return <Settings {...props} />;
    case "users":
      return <Users {...props} />;
    case "cloud":
      return <Cloud {...props} />;
    case "shield-check":
      return <ShieldCheck {...props} />;
    default:
      return <CheckCircle2 {...props} />;
  }
}

export default function Hero() {
  if (!heroData) return null;

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="home-section overflow-hidden bg-gradient-to-br from-white via-sky-50 to-cyan-50"
    >
      <div className="home-section__inner">
        <div className="home-split home-split--hero">
          <div className="home-split__content">
            <p className="eyebrow mb-3">{heroData.eyebrow}</p>

            <h1
              id="hero-title"
              className="heading-1 max-w-none text-balance text-[clamp(2rem,3.6vw,3.5rem)] leading-[1.06] tracking-tight"
            >
              {heroData.heading.parts.map((part, index) => (
                <span
                  key={`${part.text}-${index}`}
                  className={`block ${part.highlight ? "text-accent" : ""}`}
                >
                  {part.text}
                </span>
              ))}
            </h1>

            <p className="mt-4 mb-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {heroData.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 max-[380px]:flex-col max-[380px]:items-stretch">
              {heroData.actions.map((action) => (
                <a
                  key={`${action.label}-${action.href}`}
                  href={action.href}
                  className={`btn inline-flex items-center justify-center gap-2 max-[380px]:w-full ${
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
              ))}
            </div>
          </div>

          <div
            className="home-split__visual relative aspect-[1.5/1] overflow-hidden"
            aria-hidden="true"
          >
            <Image
              src="/home/hero.webp"
              alt=""
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 52vw"
              className="object-contain object-center"
            />
          </div>
        </div>

        <div
          aria-label="Our strengths"
          className="grid grid-cols-2 gap-y-3 border-t border-slate-200/80 py-4 sm:grid-cols-4 sm:gap-y-0 sm:py-5"
        >
          {heroData.highlights.map((highlight, index) => (
            <div
              key={highlight.title}
              className={`flex min-w-0 items-center gap-2.5 px-2 sm:px-3 lg:px-4 ${
                index === 0 ? "pl-0" : "border-l border-slate-200/80"
              } ${index === 2 ? "max-sm:border-l-0 max-sm:pl-0" : ""}`}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-teal-600 sm:size-11">
                <HighlightIcon name={highlight.icon} />
              </span>

              <p className="text-xs leading-snug font-bold text-[#123B73] sm:text-sm">
                {highlight.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
