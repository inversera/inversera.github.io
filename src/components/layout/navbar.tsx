import siteData from "../../data/data.json";

type NavigationItem = {
  label: string;
  href: string;
};

type SiteDataShape = {
  site?: {
    navigation?: NavigationItem[];
  };
};

const data = siteData as SiteDataShape;
const navigation = data.site?.navigation ?? [];

const navbarStyles = `
  .inversera-nav {
    min-width: 0;
    width: 100%;
  }

  .inversera-nav__list {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(1rem, 2.4vw, 2.15rem);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .inversera-nav__link {
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
    color: var(--color-navy);
    font-size: 0.8125rem;
    font-weight: 700;
    line-height: 1.25;
    text-decoration: none;
    white-space: nowrap;
    transition: color 160ms ease;
  }

  .inversera-nav__link:hover {
    color: var(--color-teal-dark);
  }

  .inversera-nav__link:focus-visible {
    border-radius: 0.25rem;
    outline: 3px solid rgb(10 166 181 / 55%);
    outline-offset: 3px;
  }

  @media (max-width: 767px) {
    .inversera-nav {
      overflow-x: auto;
      overscroll-behavior-inline: contain;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
    }

    .inversera-nav::-webkit-scrollbar {
      display: none;
    }

    .inversera-nav__list {
      width: max-content;
      min-width: 100%;
      justify-content: flex-start;
      gap: 1.25rem;
      padding: 0.15rem 0.1rem;
    }

    .inversera-nav__link {
      min-height: 2.5rem;
      font-size: 0.8125rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .inversera-nav__link {
      transition: none;
    }
  }
`;

/**
 * Responsive, data-driven InversEra navigation links.
 *
 * The logo and CTA intentionally live in Header so the header can arrange
 * those elements independently at different breakpoints.
 */
export default function Navbar() {
  if (navigation.length === 0) {
    return null;
  }

  return (
    <>
      <style>{navbarStyles}</style>
      <nav className="inversera-nav" aria-label="Main navigation">
        <ul className="inversera-nav__list">
          {navigation.map((item) => (
            <li key={`${item.label}-${item.href}`}>
              <a className="inversera-nav__link" href={item.href}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
