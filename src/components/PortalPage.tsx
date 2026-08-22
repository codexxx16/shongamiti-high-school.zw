import { ArrowUpRight, CheckCircle2, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { PortalPageData } from "@/data/site";

export function PortalPage({ data }: { data: PortalPageData }) {
  return (
    <div>
      <section className="hero-gradient relative overflow-hidden text-secondary-foreground">
        <div className="absolute -right-24 top-16 h-72 w-72 rounded-full border border-primary/20 bg-primary/10 blur-3xl" />
        <div className="container relative grid gap-12 py-20 md:grid-cols-[1.2fr_0.8fr] md:items-end md:py-28">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-primary">{data.eyebrow}</p>
            <h1 className="max-w-4xl font-display text-4xl font-bold leading-[1.08] md:text-6xl">{data.title}</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-secondary-foreground/75 md:text-lg">{data.intro}</p>
          </div>
          <div className="border-l border-primary/30 pl-6 md:mb-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Official school portal</p>
            <p className="mt-4 text-sm leading-7 text-secondary-foreground/70">Read the overview, follow the related routes, and use the practical links to move from information to action.</p>
          </div>
        </div>
      </section>
      <div className="border-b border-border bg-card">
        <div className="container flex flex-wrap items-center gap-2 py-3 text-xs font-semibold text-slate-500">
          <Link to="/" className="hover:text-secondary">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-secondary">{data.eyebrow}</span>
        </div>
      </div>
      <section className="container grid gap-14 py-16 md:grid-cols-[0.72fr_1.28fr] md:py-24">
        <aside className="h-fit md:sticky md:top-28">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">In this section</p>
          <div className="mt-5 grid gap-2 border-l border-border pl-5 text-sm font-semibold text-slate-600">
            {data.sections.map((section) => <a key={section.title} href={`#${section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="transition-colors hover:text-secondary">{section.title}</a>)}
          </div>
          <Link to={data.eyebrow === "Admissions" ? "/admissions/apply" : "/information-centre/documents"} className="btn-gold mt-8 inline-flex items-center gap-2 text-sm">
            {data.eyebrow === "Admissions" ? "Start an application" : "Visit the document centre"}<ArrowUpRight className="h-4 w-4" />
          </Link>
        </aside>
        <div className="space-y-12">
          {data.sections.map((section) => {
            const id = section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            return (
              <article key={section.title} id={id} className="scroll-mt-28 border-b border-border pb-12 last:border-0">
                <h2 className="font-display text-3xl font-bold text-secondary md:text-4xl">{section.title}</h2>
                <p className="mt-5 text-base leading-8 text-slate-600">{section.body}</p>
                {section.items && <div className="mt-6 grid gap-3 sm:grid-cols-2">{section.items.map((item) => <div key={item} className="flex items-start gap-3 rounded-xl bg-muted/60 p-4 text-sm leading-6 text-slate-700"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{item}</div>)}</div>}
              </article>
            );
          })}
        </div>
      </section>
      {data.cards && <section className="bg-muted/60 py-16 md:py-20"><div className="container"><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Continue exploring</p><div className="mt-6 grid gap-5 md:grid-cols-3">{data.cards.map((card) => { const Icon = card.icon; return <Link key={card.title} to={card.href} className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"><div className="flex items-start justify-between gap-4"><span className="rounded-xl bg-primary/15 p-3 text-secondary"><Icon className="h-5 w-5" /></span><ArrowUpRight className="h-5 w-5 text-slate-400 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-secondary" /></div><h3 className="mt-8 font-display text-2xl font-bold text-secondary">{card.title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{card.description}</p></Link>; })}</div></div></section>}
    </div>
  );
}
