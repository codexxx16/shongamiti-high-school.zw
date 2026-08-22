import { useState } from "react";
import { ArrowLeft, CheckCircle2, Clock3, Loader2, Search, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase, type ApplicationStatus as Status } from "@/lib/supabase";

const labels: Record<Status, string> = { draft: "Draft", submitted: "Submitted", under_review: "Under review", approved: "Approved", rejected: "Decision recorded" };

export default function ApplicationStatus() {
  const [reference, setReference] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<{ status: Status; submitted_at?: string | null } | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const lookup = async () => {
    setLoading(true); setMessage(""); setResult(null);
    const local = localStorage.getItem(referenceKey(reference));
    try {
      const remote = await supabase.rpc("lookup_application_status", { p_reference_number: reference.trim(), p_applicant_email: email.trim() });
      if (remote.data?.[0]) { setResult(remote.data[0]); setLoading(false); return; }
    } catch { /* Fall back to the local preview record below. */ }
    if (local) {
      const parsed = JSON.parse(local);
      if (parsed.email?.toLowerCase() === email.trim().toLowerCase() || !parsed.email) { setResult({ status: parsed.status ?? "submitted", submitted_at: parsed.submittedAt }); setLoading(false); return; }
    }
    setMessage("No matching application was found. Check the reference number and email address, then try again."); setLoading(false);
  };

  return <section className="container max-w-3xl py-20 md:py-28"><Link to="/admissions" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-secondary"><ArrowLeft className="h-4 w-4" /> Admissions overview</Link><div className="mt-8"><p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Application status</p><h1 className="mt-4 font-display text-5xl font-bold text-secondary">Follow your application.</h1><p className="mt-5 text-lg leading-8 text-slate-600">Enter the reference number issued after submission and the email address used in the application. Only a matching record returns a status.</p></div><div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-10"><div className="grid gap-5 md:grid-cols-2"><label className="grid gap-2 text-sm font-semibold text-secondary">Application reference<input value={reference} onChange={(event) => setReference(event.target.value)} placeholder="SHA-2026-XXXXXX" className="rounded-xl border border-input bg-background px-4 py-3 font-mono text-sm uppercase outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" /></label><label className="grid gap-2 text-sm font-semibold text-secondary">Applicant email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" className="rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" /></label></div><button type="button" onClick={lookup} disabled={loading || !reference || !email} className="btn-gold mt-7 inline-flex items-center gap-2 disabled:opacity-60">{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}{loading ? "Checking…" : "Check status"}</button>{message && <div className="mt-7 flex gap-3 rounded-xl bg-destructive/10 p-4 text-sm leading-6 text-slate-700"><ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />{message}</div>}{result && <div className="mt-8 rounded-2xl border border-primary/30 bg-primary/5 p-6"><div className="flex items-center gap-3"><CheckCircle2 className="h-6 w-6 text-primary" /><p className="font-display text-2xl font-bold text-secondary">{labels[result.status]}</p></div><div className="mt-6 grid gap-4 border-t border-primary/20 pt-5 text-sm md:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Reference</p><p className="mt-1 font-mono font-bold text-secondary">{reference.toUpperCase()}</p></div><div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Last recorded</p><p className="mt-1 flex items-center gap-2 font-semibold text-secondary"><Clock3 className="h-4 w-4 text-primary" />{result.submitted_at ? new Date(result.submitted_at).toLocaleDateString() : "Current review record"}</p></div></div></div>}</div></section>;
}

function referenceKey(reference: string) { return `${"shongamiti-admissions-reference"}-${reference.trim().toUpperCase()}`; }
