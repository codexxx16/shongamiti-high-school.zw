import { useState } from "react";
import { ArrowLeft, CheckCircle2, Clock3, Loader2, Search, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { lookupTrackingRecord, type TrackingRecord } from "@/lib/firebase";
import { type ApplicationStatus as Status } from "@/lib/supabase";

const labels: Record<Status, string> = { draft: "Draft", submitted: "Submitted", under_review: "Under review", approved: "Approved", rejected: "Decision recorded" };
const referenceKey = "shongamiti-admissions-reference";

export default function ApplicationStatus() {
  const [reference, setReference] = useState("");
  const [trackingCode, setTrackingCode] = useState("");
  const [result, setResult] = useState<TrackingRecord | { status: Status; submittedAt: string | null } | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const lookup = async () => {
    setLoading(true);
    setMessage("");
    setResult(null);
    const normalizedReference = reference.trim().toUpperCase();
    const normalizedCode = trackingCode.trim().toUpperCase();
    const remote = await lookupTrackingRecord(normalizedReference, normalizedCode);
    if (remote) {
      setResult(remote);
      setLoading(false);
      return;
    }

    try {
      const local = localStorage.getItem(`${referenceKey}-${normalizedReference}`);
      if (local) {
        const parsed = JSON.parse(local) as { status?: Status; submittedAt?: string; trackingCode?: string };
        if (parsed.trackingCode === normalizedCode) {
          setResult({ status: parsed.status ?? "submitted", submittedAt: parsed.submittedAt ?? null });
          setLoading(false);
          return;
        }
      }
    } catch {
      // Keep the same user-facing response for missing or unavailable records.
    }
    setMessage("No matching application was found. Confirm the reference number and private tracking code, then try again.");
    setLoading(false);
  };

  const lastRecorded = result && ("updatedAt" in result ? result.updatedAt : result.submittedAt);
  return <section className="container max-w-3xl py-14 md:py-20"><Link to="/admissions" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><ArrowLeft className="h-4 w-4" /> Admissions overview</Link><div className="mt-8"><p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Application status</p><h1 className="mt-4 font-display text-3xl font-bold text-secondary md:text-4xl">Follow your application.</h1><p className="mt-4 text-base leading-7 text-slate-600">Enter the reference number and private tracking code issued after submission. This pair is designed to let you check the record from another device without exposing the student’s application details.</p></div><div className="mt-10 rounded-2xl border border-border bg-card p-5 shadow-sm md:p-8"><div className="grid gap-5 md:grid-cols-2"><label className="grid gap-2 text-sm font-semibold text-secondary">Application reference<input value={reference} onChange={(event) => setReference(event.target.value)} placeholder="SHA-2026-XXXXXX" className="rounded-xl border border-input bg-background px-4 py-3 font-mono text-sm uppercase outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" /></label><label className="grid gap-2 text-sm font-semibold text-secondary">Private tracking code<input value={trackingCode} onChange={(event) => setTrackingCode(event.target.value)} placeholder="16-character code" className="rounded-xl border border-input bg-background px-4 py-3 font-mono text-sm uppercase outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" /></label></div><p className="mt-4 text-xs leading-5 text-slate-500">Keep the tracking code private. It is intentionally separate from the public application reference.</p><button type="button" onClick={lookup} disabled={loading || !reference.trim() || !trackingCode.trim()} className="btn-gold mt-7 inline-flex items-center gap-2 transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-60">{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}{loading ? "Checking secure record…" : "Check status"}</button>{loading && <div className="mt-6 rounded-xl bg-primary/10 px-4 py-3 text-sm font-semibold text-secondary" aria-live="polite">Looking up the latest recorded status. Please keep this page open.</div>}{message && <div className="mt-7 flex gap-3 rounded-xl bg-destructive/10 p-4 text-sm leading-6 text-slate-700" role="alert"><ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />{message}</div>}{result && <div className="mt-8 rounded-xl border border-primary/30 bg-primary/5 p-5" aria-live="polite"><div className="flex items-center gap-3"><CheckCircle2 className="h-6 w-6 text-primary" /><p className="font-display text-2xl font-bold text-secondary">{labels[result.status]}</p></div><div className="mt-6 grid gap-4 border-t border-primary/20 pt-5 text-sm md:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Reference</p><p className="mt-1 font-mono font-bold text-secondary">{reference.toUpperCase()}</p></div><div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Last recorded</p><p className="mt-1 flex items-center gap-2 font-semibold text-secondary"><Clock3 className="h-4 w-4 text-primary" />{lastRecorded ? new Date(lastRecorded).toLocaleDateString() : "Current review record"}</p></div></div><p className="mt-5 border-t border-primary/20 pt-4 text-sm leading-6 text-slate-600">The admissions office updates the record as review progresses. Keep this reference and tracking code for future checks.</p></div>}</div></section>;
}
