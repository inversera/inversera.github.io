import siteData from "../../data/data.json";

type FooterLink = { label: string; href: string };
type FooterGroup = { title: string; links: FooterLink[] };
type FooterData = {
  brand: string;
  description: string;
  navigationGroups: FooterGroup[];
  legalLinks: FooterLink[];
  copyright: string;
};
type SiteDataShape = { footer?: FooterData };

const data = siteData as SiteDataShape;
const footerData = data.footer;

const footerStyles = `
  .inversera-footer { color: rgb(255 255 255 / 82%); background: var(--color-navy-deep); }
  .inversera-footer__main {
    display: grid;
    grid-template-columns: minmax(15rem, 1.35fr) repeat(3, minmax(0, 1fr));
    gap: clamp(2rem, 4vw, 4rem);
    padding-block: clamp(3rem, 6vw, 4.5rem);
  }
  .inversera-footer__brand {
    display: inline-flex; align-items: center; margin-bottom: 1rem;
    color: #fff; font-family: var(--font-heading); font-size: 1.7rem;
    font-weight: 800; letter-spacing: -0.055em; line-height: 1; text-decoration: none;
  }
  .inversera-footer__brand-accent { color: #26c5d0; }
  .inversera-footer__description {
    max-width: 19rem; margin: 0; color: rgb(255 255 255 / 72%);
    font-size: 0.925rem; line-height: 1.75;
  }
  .inversera-footer__group-title {
    margin: 0 0 1rem; color: #fff; font-size: 0.9rem;
    font-weight: 800; letter-spacing: 0.025em;
  }
  .inversera-footer__links { display: grid; gap: 0.7rem; margin: 0; padding: 0; list-style: none; }
  .inversera-footer__link {
    display: inline-flex; align-items: center; width: fit-content;
    color: rgb(255 255 255 / 72%); font-size: 0.85rem; line-height: 1.55;
    text-decoration: none; transition: color 160ms ease;
  }
  .inversera-footer__link:hover { color: #45d4dc; }
  .inversera-footer__link:focus-visible {
    border-radius: 0.2rem; outline: 3px solid rgb(38 197 208 / 65%); outline-offset: 3px;
  }
  .inversera-footer__bottom {
    display: flex; align-items: center; justify-content: space-between;
    gap: 1rem 2rem; padding-block: 1.2rem; border-top: 1px solid rgb(255 255 255 / 15%);
  }
  .inversera-footer__copyright { margin: 0; color: rgb(255 255 255 / 62%); font-size: 0.8rem; }
  .inversera-footer__legal { display: flex; flex-wrap: wrap; gap: 0.75rem 1.5rem; }
  .inversera-footer__legal .inversera-footer__link { font-size: 0.8rem; }
  @media (max-width: 900px) {
    .inversera-footer__main { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 2.5rem; }
    .inversera-footer__brand-column { grid-column: 1 / -1; }
  }
  @media (max-width: 560px) {
    .inversera-footer__main { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 2rem 1.25rem; }
    .inversera-footer__brand-column { grid-column: 1 / -1; }
    .inversera-footer__bottom { align-items: flex-start; flex-direction: column; }
  }
  @media (prefers-reduced-motion: reduce) { .inversera-footer__link { transition: none; } }
`;

/** Responsive, data-driven footer. This is a Server Component. */
export default function Footer() {
  if (!footerData) return null;

  const copyright = footerData.copyright.replace(
    "{year}",
    String(new Date().getFullYear()),
  );

  return (
    <>
      <style>{footerStyles}</style>
      <footer className="inversera-footer">
        <div className="container inversera-footer__main">
          <div className="inversera-footer__brand-column">
            <a
              className="inversera-footer__brand"
              href="/"
              aria-label={`${footerData.brand} home`}
            >
              <span>
                invers
                <span className="inversera-footer__brand-accent">Era</span>
              </span>
            </a>
            <p className="inversera-footer__description">
              {footerData.description}
            </p>
          </div>

          {footerData.navigationGroups.map((group) => (
            <nav
              key={group.title}
              aria-label={`${group.title} footer navigation`}
            >
              <h2 className="inversera-footer__group-title">{group.title}</h2>
              <ul className="inversera-footer__links">
                {group.links.map((link) => (
                  <li key={`${link.label}-${link.href}`}>
                    <a className="inversera-footer__link" href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="container inversera-footer__bottom">
          <p className="inversera-footer__copyright">{copyright}</p>
          <nav
            aria-label="Legal navigation"
            className="inversera-footer__legal"
          >
            {footerData.legalLinks.map((link) => (
              <a
                className="inversera-footer__link"
                key={`${link.label}-${link.href}`}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}
