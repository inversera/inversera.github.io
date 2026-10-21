import Navbar from "./navbar";
import BrandLogo from "./brand-logo";

export default function Header() {
  return (
    <header className="border-b border-slate-100 bg-white">
      <div className="container flex min-h-16 items-center justify-between gap-6">
        <BrandLogo size="md" priority />

        <div className="hidden flex-1 md:block">
          <Navbar />
        </div>

        <a href="/contact" className="btn btn-primary">
          Let&apos;s Talk <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className="px-5 md:hidden">
        <Navbar />
      </div>
    </header>
  );
}
