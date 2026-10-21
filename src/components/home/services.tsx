import siteData from "../../data/data.json";
import { ArrowRight, Cloud, Code2, ShieldCheck, Users } from "lucide-react";

type ServiceCard = {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  linkLabel: string;
  linkIcon?: string;
};

type TextPart = {
  text: string;
  highlight: boolean;
};

type ServicesData = {
  id: string;
  name: string;
  eyebrow: string;
  heading: {
    text: string;
    parts: TextPart[];
  };
  description: string;
  cards: ServiceCard[];
};

type PageData = {
  services?: ServicesData;
  sections?: ServicesData[];
  home?: {
    sections?: ServicesData[];
  };
};

const pageData = siteData as PageData;

const servicesData =
  pageData.services ??
  pageData.sections?.find((section) => section.id === "services") ??
  pageData.home?.sections?.find((section) => section.id === "services");

function ServiceIcon({ name }: { name: string }) {
  const props = {
    size: 34,
    strokeWidth: 2.2,
    "aria-hidden": true as const,
    focusable: false as const,
  };

  switch (name) {
    case "users":
      return <Users {...props} />;
    case "cloud":
      return <Cloud {...props} />;
    case "code":
      return <Code2 {...props} />;
    case "shield-check":
      return <ShieldCheck {...props} />;
    default:
      return <ArrowRight {...props} />;
  }
}

export default function Services() {
  if (!servicesData) return null;

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="home-section overflow-hidden bg-white"
    >
      <div className="home-section__inner">
        <header className="mb-5 sm:mb-6">
          <p className="eyebrow mb-2">{servicesData.eyebrow}</p>

          <div className="grid grid-cols-1 items-end gap-3 lg:grid-cols-[minmax(0,1.35fr)_minmax(16rem,0.8fr)] lg:gap-8">
            <h2
              id="services-heading"
              className="heading-2 max-w-none text-balance"
            >
              {servicesData.heading.parts.map((part, index) => (
                <span
                  key={`${part.text}-${index}`}
                  className={part.highlight ? "text-accent" : ""}
                >
                  {part.text}
                </span>
              ))}
            </h2>

            <p className="max-w-xl text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base lg:justify-self-end">
              {servicesData.description}
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {servicesData.cards.map((service) => (
            <article
              key={service.id}
              id={service.id}
              className="group flex min-w-0 flex-col rounded-xl border border-sky-100/80 bg-gradient-to-br from-sky-50 to-cyan-50/50 p-5 transition-shadow duration-200 hover:shadow-md sm:p-5"
            >
              <div
                className="mb-4 flex size-12 items-center justify-center rounded-xl bg-white text-teal-600 shadow-sm ring-1 ring-sky-100"
                aria-hidden="true"
              >
                <ServiceIcon name={service.icon} />
              </div>

              <h3 className="text-lg leading-snug font-bold tracking-tight text-[var(--color-navy)]">
                {service.title}
              </h3>

              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {service.description}
              </p>

              <a
                href={service.href}
                className="mt-5 inline-flex min-h-10 items-center gap-2 self-start text-sm font-semibold text-[var(--color-navy)] transition-colors hover:text-teal-600 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600"
                aria-label={service.linkLabel}
              >
                <span>{service.linkLabel}</span>

                {service.linkIcon === "arrow-right" && (
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    focusable="false"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                )}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
