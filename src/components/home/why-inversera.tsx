"use client";

import Image from "next/image";
import siteData from "../../data/data.json";
import {
  ArrowRight,
  ChartNoAxesColumnIncreasing,
  Gem,
  Lightbulb,
  Users,
} from "lucide-react";

type TextPart = {
  text: string;
  highlight: boolean;
};

type Action = {
  label: string;
  href: string;
  icon?: string;
  variant?: string;
};

type WhyCard = {
  title: string;
  description: string;
  icon: string;
  href: string;
};

type WhyInversEraData = {
  id: string;
  name: string;
  eyebrow: string;
  heading: {
    text: string;
    parts: TextPart[];
  };
  description: string;
  actions: Action[];
  cards: WhyCard[];
  visual: {
    type: string;
    description: string;
  };
};

type PageData = {
  sections?: WhyInversEraData[];
  home?: {
    sections?: WhyInversEraData[];
  };
  whyInversEra?: WhyInversEraData;
};

const pageData = siteData as PageData;

const sectionData =
  pageData.whyInversEra ??
  pageData.sections?.find((section) => section.id === "why-inversera") ??
  pageData.home?.sections?.find((section) => section.id === "why-inversera");

const VISUAL_IMAGE = "/home/why-inversera.webp";

function FeatureIcon({ name }: { name: string }) {
  const props = {
    size: 25,
    strokeWidth: 2,
    "aria-hidden": true as const,
    focusable: false as const,
  };

  switch (name) {
    case "users":
      return <Users {...props} />;
    case "gem":
      return <Gem {...props} />;
    case "lightbulb":
      return <Lightbulb {...props} />;
    case "chart-no-axes-column-increasing":
      return <ChartNoAxesColumnIncreasing {...props} />;
    default:
      return <Users {...props} />;
  }
}

export default function WhyInversEra() {
  if (!sectionData) return null;

  const action = sectionData.actions?.[0];

  return (
    <section
      id="why-inversera"
      aria-labelledby="why-inversera-heading"
      className="w-full overflow-hidden bg-[#062b52] text-white"
    >
      {/* 
        The shared container controls the section width.
        Keep the image and content inside it so this section
        aligns with the other homepage sections.
      */}
      <div className="container">
        <div className="relative isolate grid min-w-0 grid-cols-1 items-center gap-8 py-10 sm:py-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10 lg:py-14">
          {/* Background visual */}
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            aria-hidden="true"
          >
            <Image
              src={VISUAL_IMAGE}
              alt=""
              fill
              sizes="(max-width: 1023px) 100vw, 70vw"
              className="object-cover object-center opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#062b52] via-[#062b52]/90 to-[#062b52]/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#062b52]/70 via-transparent to-[#062b52]/15" />
          </div>

          {/* Heading and CTA */}
          <div className="relative z-10 min-w-0">
            <p className="eyebrow mb-3 text-white/80">{sectionData.eyebrow}</p>

            <h2
              id="why-inversera-heading"
              className="heading-2 max-w-[20ch] text-balance text-white"
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

            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              {sectionData.description}
            </p>

            {action && (
              <div className="mt-6">
                <a
                  href={action.href}
                  className="btn inline-flex items-center justify-center gap-2 border border-cyan-400 bg-transparent text-white transition-colors hover:bg-cyan-400/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
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

          {/* Feature cards */}
          <div className="relative z-10 grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 lg:self-end">
            {sectionData.cards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                className="group flex min-w-0 flex-col rounded-xl border border-cyan-300/30 bg-[#07345e]/75 p-4 text-white shadow-sm backdrop-blur-sm transition-colors hover:border-cyan-300/70 hover:bg-[#0a416e]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              >
                <span className="mb-3 flex size-10 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
                  <FeatureIcon name={card.icon} />
                </span>

                <h3 className="text-sm leading-snug font-bold text-white">
                  {card.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-white/75">
                  {card.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
