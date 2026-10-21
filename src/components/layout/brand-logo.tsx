import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

type BrandLogoProps = {
  className?: string;
  /** Render a larger mark for hero or footer placements when needed. */
  size?: "sm" | "md" | "lg";
  priority?: boolean;
};

const logoSizes = {
  sm: { mark: 32, text: "1.45rem" },
  md: { mark: 42, text: "1.8rem" },
  lg: { mark: 52, text: "2.2rem" },
} as const;

/**
 * InversEra brand mark + accessible text wordmark.
 *
 * Place the square brand symbol at /public/logo.svg.
 * This is a Server Component and requires no client-side JavaScript.
 */
export default function BrandLogo({
  className = "",
  size = "md",
  priority = false,
}: BrandLogoProps) {
  const dimensions = logoSizes[size];

  const wordmarkStyle: CSSProperties = {
    color: "var(--color-navy)",
    fontFamily: "var(--font-heading)",
    fontSize: dimensions.text,
    fontWeight: 800,
    letterSpacing: "-0.055em",
    lineHeight: 1,
    whiteSpace: "nowrap",
  };

  return (
    <Link
      href="/"
      aria-label="InversEra home"
      className={`inline-flex w-fit items-center gap-2.5 no-underline ${className}`.trim()}
    >
      <Image
        src="/ie.svg"
        alt=""
        aria-hidden="true"
        width={dimensions.mark}
        height={dimensions.mark}
        priority={priority}
        className="shrink-0 object-contain"
        sizes={`${dimensions.mark}px`}
      />

      <span style={wordmarkStyle} aria-hidden="true">
        invers<span className="text-accent">Era</span>
      </span>
      <span className="sr-only">InversEra</span>
    </Link>
  );
}
