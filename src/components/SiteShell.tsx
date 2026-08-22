import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import schoolLogo from "@/assets/school-logo.jpg";
import { portalNavigation } from "@/data/site";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `inline-flex items-center gap-2 border-b-2 px-3 py-2 text-sm font-semibold transition-colors ${
    isActive ? "border-primary text-secondary" : "border-transparent text-slate-600 hover:border-primary/50 hover:text-secondary"
  }`;

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isAdmissions = location.pathname.startsWith("/admissions");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="bg-secondary text-secondary-foreground">
        <div className="container flex min-h-9 items-center justify-between gap-4 text-xs font-medium tracking-wide">
          <span>Masvingo Province · Chivi District · Zimbabwe</span>
          <span className="hidden sm:inline">Established for learning, character, and service</span>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 shadow-sm backdrop-blur">
        <div className="container flex min-h-[76px] items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <img src={schoolLogo} alt="Shongamiti High School crest" className="h-11 w-11 rounded-full border-2 border-primary object-cover" />
            <div>
              <p className="font-display text-lg font-bold leading-none text-secondary">Shongamiti High School</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Striving for excellence</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            <NavLink to="/" end className={linkClass}>Home</NavLink>
            {portalNavigation.map((item) => (
              <NavLink key={item.href} to={item.href} className={linkClass}>{item.label}</NavLink>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <Link to="/staff" className="text-sm font-semibold text-slate-600 hover:text-secondary">Staff portal</Link>
            <Link to="/admissions/apply" className="btn-gold inline-flex items-center gap-2 px-4 py-2 text-sm">
              Apply online <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <button type="button" className="rounded-lg border border-border p-2 text-secondary lg:hidden" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen((value) => !value)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {open && (
          <div className="border-t border-border bg-card lg:hidden">
            <nav className="container grid gap-1 py-4" aria-label="Mobile navigation">
              <NavLink to="/" end className={linkClass} onClick={() => setOpen(false)}>Home</NavLink>
              {portalNavigation.map((item) => (
                <NavLink key={item.href} to={item.href} className={linkClass} onClick={() => setOpen(false)}>{item.label}</NavLink>
              ))}
              <NavLink to="/staff" className={linkClass} onClick={() => setOpen(false)}>Staff portal</NavLink>
              <Link to="/admissions/apply" className={`btn-gold mt-3 justify-center ${isAdmissions ? "ring-2 ring-primary/30" : ""}`} onClick={() => setOpen(false)}>Apply online</Link>
            </nav>
          </div>
        )}
      </header>
      <main>{children}</main>
      <footer className="border-t border-secondary/20 bg-secondary text-secondary-foreground">
        <div className="container grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-bold">Shongamiti High School</p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-secondary-foreground/75">A formal information and admissions platform for students, families, staff, and the wider school community.</p>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-primary">Striving for excellence</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Explore</p>
            <div className="mt-4 grid gap-3 text-sm text-secondary-foreground/80">
              <Link to="/school" className="hover:text-primary">The school</Link>
              <Link to="/academics" className="hover:text-primary">Academic life</Link>
              <Link to="/student-life" className="hover:text-primary">Student life</Link>
              <Link to="/information-centre" className="hover:text-primary">Information centre</Link>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Admissions</p>
            <div className="mt-4 grid gap-3 text-sm text-secondary-foreground/80">
              <Link to="/admissions" className="hover:text-primary">Admissions overview</Link>
              <Link to="/admissions/requirements" className="hover:text-primary">Entry requirements</Link>
              <Link to="/admissions/documents" className="hover:text-primary">Document requirements</Link>
              <Link to="/admissions/status" className="hover:text-primary">Application status</Link>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Contact</p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-secondary-foreground/80">
              <p>Admissions office<br />Monday–Friday, 08:00–16:00</p>
              <a href="mailto:admissions@shongamiti-high-school.zw" className="block hover:text-primary">admissions@shongamiti-high-school.zw</a>
              <a href="tel:+263782404426" className="block hover:text-primary">+263 78 240 4426</a>
            </div>
          </div>
        </div>
        <div className="border-t border-secondary-foreground/10">
          <div className="container flex flex-col justify-between gap-3 py-5 text-xs text-secondary-foreground/60 sm:flex-row">
            <span>© 2026 Shongamiti High School. Official school information portal.</span>
            <span>Privacy · Safeguarding · Accessibility</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
