import Image from "next/image";
import siteData from "../../data/data.json";

type ChallengeCard = {
  id: string;
  title: string;
  description: string;
  icon: string;
  visualDescription: string;
  supportingLabels?: {
    text: string;
    icon: string;
  }[];
};

type TextPart = {
  text: string;
  highlight: boolean;
};

type ChallengesData = {
  id: string;
  name: string;
  eyebrow: string;
  heading: {
    text: string;
    parts: TextPart[];
  };
  description: string;
  cards: ChallengeCard[];
};

type PageData = {
  challenges?: ChallengesData;
  sections?: ChallengesData[];
  home?: {
    sections?: ChallengesData[];
  };
};

const pageData = siteData as PageData;

const challengesData =
  pageData.challenges ??
  pageData.sections?.find((section) => section.id === "challenges") ??
  pageData.home?.sections?.find((section) => section.id === "challenges");

// Keep these files in /public/home/challenges/
const challengeImages: Record<string, string> = {
  "reliable-talent": "/home/challenges/reliable-talent.webp",
  "it-costs": "/home/challenges/it-costs.webp",
  "project-delays": "/home/challenges/project-delays.webp",
  "technology-change": "/home/challenges/technology-change.webp",
};

export default function Challenges() {
  if (!challengesData) return null;

  return (
    <section
      id="challenges"
      aria-labelledby="challenges-heading"
      className="home-section overflow-hidden bg-white"
    >
      <div className="home-section__inner">
        <header className="mb-5 sm:mb-6">
          <p className="eyebrow mb-2">{challengesData.eyebrow}</p>

          <h2
            id="challenges-heading"
            className="heading-2 max-w-none text-balance"
          >
            {challengesData.heading.parts.map((part, index) => (
              <span
                key={`${part.text}-${index}`}
                className={part.highlight ? "text-accent" : ""}
              >
                {part.text}
              </span>
            ))}
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base">
            {challengesData.description}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {challengesData.cards.map((card) => {
            const imageSrc = challengeImages[card.id];

            return (
              <article
                key={card.id}
                className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-sky-100/80 bg-gradient-to-br from-sky-50/80 to-cyan-50/40 transition-shadow duration-200 hover:shadow-md"
              >
                {imageSrc ? (
                  <div className="relative aspect-[1.75/1.5] w-full overflow-hidden">
                    <Image
                      src={imageSrc}
                      alt={card.visualDescription}
                      width={600}
                      height={440}
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                      className="h-full w-full object-contain object-center"
                    />
                  </div>
                ) : null}

                <div className="flex flex-1 flex-col p-4 pt-2 sm:p-4">
                  <h3 className="text-base leading-snug font-bold tracking-tight text-[var(--color-navy)]">
                    {card.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                    {card.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
