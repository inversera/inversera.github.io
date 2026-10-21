import siteData from "../../data/data.json";
import { ArrowRight } from "lucide-react";

type StoryAction = {
  label: string;
  href: string;
  icon?: string;
  variant?: "primary" | "secondary";
};

type OurStoryData = {
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
  paragraphs: string[];
  actions: StoryAction[];
};

type PageData = {
  sections?: OurStoryData[];
  home?: {
    sections?: OurStoryData[];
  };
  ourStory?: OurStoryData;
};

const pageData = siteData as PageData;

const sectionData =
  pageData.ourStory ??
  pageData.sections?.find((section) => section.id === "our-story") ??
  pageData.home?.sections?.find((section) => section.id === "our-story");

export default function OurStory() {
  if (!sectionData) return null;

  const action = sectionData.actions?.[0];

  return (
    <section
      id="our-story"
      aria-labelledby="our-story-heading"
      className="w-full overflow-hidden bg-white py-4"
    >
      <div className="container">
        <div className="grid min-w-0 grid-cols-1 items-center gap-5 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-6">
          {/* Story introduction */}
          <div className="min-w-0">
            <p className="eyebrow mb-2">{sectionData.eyebrow}</p>

            <h2
              id="our-story-heading"
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

            {sectionData.paragraphs[0] && (
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base">
                {sectionData.paragraphs[0]}
              </p>
            )}
          </div>

          {/* Divider */}
          <div
            aria-hidden="true"
            className="hidden h-full min-h-20 w-px bg-cyan-500 md:block"
          />

          {/* Story continuation and CTA */}
          <div className="min-w-0">
            {sectionData.paragraphs[1] && (
              <p className="text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base">
                {sectionData.paragraphs[1]}
              </p>
            )}

            {action && (
              <div className="mt-4">
                <a
                  href={action.href}
                  className={`btn inline-flex items-center justify-center gap-2 ${
                    action.variant === "primary"
                      ? "btn-primary"
                      : "btn-secondary"
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
          </div>
        </div>
      </div>
    </section>
  );
}
