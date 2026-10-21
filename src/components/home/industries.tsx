import siteData from "../../data/data.json";
import { Factory, Hospital, Landmark, Store } from "lucide-react";

type IndustryCard = {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
};

type IndustryData = {
  id: string;
  name: string;
  eyebrow: string;
  heading: {
    text: string;
    parts: {
      text: string;
      highlight: boolean;
    }[];
  };
  description: string;
  cards: IndustryCard[];
};

type PageData = {
  sections?: IndustryData[];
  home?: {
    sections?: IndustryData[];
  };
  industries?: IndustryData;
};

const pageData = siteData as PageData;

const sectionData =
  pageData.industries ??
  pageData.sections?.find((section) => section.id === "industries") ??
  pageData.home?.sections?.find((section) => section.id === "industries");

function IndustryIcon({ name }: { name: string }) {
  const props = {
    size: 32,
    strokeWidth: 2,
    "aria-hidden": true as const,
    focusable: false as const,
  };

  switch (name) {
    case "hospital":
      return <Hospital {...props} />;
    case "landmark":
      return <Landmark {...props} />;
    case "factory":
      return <Factory {...props} />;
    case "store":
      return <Store {...props} />;
    default:
      return <Factory {...props} />;
  }
}

export default function Industries() {
  if (!sectionData) return null;

  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="w-full overflow-hidden bg-white py-4"
    >
      <div className="container">
        {/* Section heading and description */}
        <div className="grid min-w-0 grid-cols-1 items-end gap-3 sm:gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="min-w-0">
            <p className="eyebrow mb-2">{sectionData.eyebrow}</p>

            <h2
              id="industries-heading"
              className="heading-2 max-w-[24ch] text-balance"
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
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base lg:justify-self-end">
            {sectionData.description}
          </p>
        </div>

        {/* Industry cards */}
        <div className="mt-4 grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {sectionData.cards.map((card) => (
            <a
              key={card.id}
              href={card.href}
              className="group flex min-w-0 items-start gap-3 rounded-xl border border-sky-100 bg-gradient-to-br from-sky-50 to-cyan-50/70 p-4 transition-colors hover:border-cyan-200 hover:from-sky-100 hover:to-cyan-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg text-[#087da5]">
                <IndustryIcon name={card.icon} />
              </span>

              <div className="min-w-0">
                <h3 className="text-sm leading-snug font-bold text-[var(--color-navy)]">
                  {card.title}
                </h3>

                <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-muted)] sm:text-sm">
                  {card.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
