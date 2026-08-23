import { useEffect, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut as signOutFirebase } from "firebase/auth";
import { ArrowUpRight, CheckCircle2, ClipboardCheck, FileText, Loader2, LogIn, LogOut, ShieldCheck, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { demoApplications, staffDashboardStats } from "@/data/site";
import { firebaseAuth, updateTrackingRecord } from "@/lib/firebase";
import { toast } from "@/hooks/use-toast";
import { supabase, type ApplicationStatus } from "@/lib/supabase";

export default function StaffPortal() {
  const [email, setEmail] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [staff, setStaff] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [applications, setApplications] = useState(demoApplications);
  const [firebaseReady, setFirebaseReady] = useState(false);

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setSignedIn(true);
        const profile = await supabase.from("staff_profiles").select("id, role").eq("id", data.session.user.id).maybeSingle();
        setStaff(Boolean(profile.data));
        const remote = await supabase.from("admissions_applications").select("reference_number, student_name, requested_level, status, updated_at").order("updated_at", { ascending: false }).limit(20);
        if (remote.data?.length) setApplications(remote.data.map((item) => ({ reference: item.reference_number, student: item.student_name, level: item.requested_level, status: item.status.replaceAll("_", " "), date: new Date(item.updated_at).toLocaleDateString() })));
      }
      setLoading(false);
    };
    loadSession();
  }, []);

  useEffect(() => onAuthStateChanged(firebaseAuth, (user) => {
    setFirebaseReady(user?.email?.toLowerCase() === "charlesstentacion@gmail.com");
  }), []);

  const enableLiveSync = async () => {
    setMessage("");
    try {
      const result = await signInWithPopup(firebaseAuth, new GoogleAuthProvider());
      if (result.user.email?.toLowerCase() !== "charlesstentacion@gmail.com") {
        await signOutFirebase(firebaseAuth);
        setFirebaseReady(false);
        const feedback = "Live status sync is restricted to the approved school administrator account.";
        setMessage(feedback);
        toast({ title: "Live sync unavailable", description: feedback, variant: "destructive" });
        return;
      }
      setFirebaseReady(true);
      const feedback = "Live applicant status sync is enabled for this staff session.";
      setMessage(feedback);
      toast({ title: "Live sync enabled", description: feedback });
    } catch {
      const feedback = "Google staff verification was cancelled or could not be completed. The admissions review session remains available.";
      setMessage(feedback);
      toast({ title: "Google verification not completed", description: feedback, variant: "destructive" });
    }
  };

  const signIn = async () => {
    if (!email) {
      const feedback = "Enter the approved staff email address before requesting a sign-in link.";
      setMessage(feedback);
      toast({ title: "Staff email required", description: feedback, variant: "destructive" });
      return;
    }
    setLoading(true);
    setMessage("");
    const result = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin + "/staff" } });
    const feedback = result.error ? "The staff sign-in link could not be sent. Check the address or contact the system administrator." : "A secure sign-in link has been sent to the staff email address.";
    setMessage(feedback);
    toast({ title: result.error ? "Sign-in link not sent" : "Sign-in link sent", description: feedback, variant: result.error ? "destructive" : "default" });
    setLoading(false);
  };
  const signOut = async () => {
    await supabase.auth.signOut();
    await signOutFirebase(firebaseAuth);
    setFirebaseReady(false);
    setSignedIn(false);
    setStaff(false);
    toast({ title: "Signed out", description: "The staff workspace is closed." });
  };
  const updateApplicationStatus = async (reference: string, status: string) => {
    const nextStatus = status.toLowerCase().replaceAll(" ", "_") as ApplicationStatus;
    const current = await supabase.from("admissions_applications").select("id, status, entry_form").eq("reference_number", reference).maybeSingle();
    if (current.data) {
      const updated = await supabase.from("admissions_applications").update({ status: nextStatus, updated_at: new Date().toISOString() }).eq("id", current.data.id);
      const user = await supabase.auth.getUser();
      if (!updated.error && user.data.user) await supabase.from("application_audit_log").insert({ application_id: current.data.id, actor_id: user.data.user.id, action: "status_updated", from_status: current.data.status, to_status: nextStatus });
      const trackingCode = (current.data.entry_form as { trackingCode?: string } | null)?.trackingCode ?? "";
      if (!updated.error && trackingCode && firebaseReady) await updateTrackingRecord(trackingCode, nextStatus);
    }
    setApplications((currentItems) => currentItems.map((item) => item.reference === reference ? { ...item, status } : item));
    const feedback = firebaseReady ? `Status updated for ${reference} and synchronized to the applicant tracker.` : `Status updated for ${reference}. Enable live status sync to update the applicant tracker.`;
    setMessage(feedback);
    toast({ title: "Application status updated", description: feedback });
  };

  if (loading) return <section className="container flex min-h-[520px] items-center justify-center"><Loader2 className="h-7 w-7 animate-spin text-primary" /></section>;
  if (!signedIn) return <section className="container max-w-5xl py-14 md:py-20"><div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Staff portal</p><h1 className="mt-4 font-display text-2xl font-bold text-secondary md:text-4xl">A controlled workspace for school operations.</h1><p className="mt-6 text-lg leading-8 text-slate-600">Admissions staff will use this area to review applications, verify documents, record decisions, and preserve an auditable history of changes.</p><div className="mt-8 grid gap-3 text-sm font-semibold text-secondary"><div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-primary" />Role-based access controls</div><div className="flex items-center gap-3"><FileText className="h-5 w-5 text-primary" />Private applicant documents</div><div className="flex items-center gap-3"><ClipboardCheck className="h-5 w-5 text-primary" />Status and review workflow</div></div></div><div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-elevated)] md:p-8"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-secondary"><LogIn className="h-5 w-5" /></div><h2 className="mt-7 font-display text-2xl font-bold text-secondary">Staff sign in</h2><p className="mt-3 text-sm leading-7 text-slate-600">Use your approved staff email. A secure sign-in link will be sent to that address.</p><label className="mt-7 grid gap-2 text-sm font-semibold text-secondary">Staff email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="staff@shongamiti-high-school.zw" className="rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" /></label><button type="button" onClick={signIn} className="btn-gold mt-5 inline-flex w-full items-center justify-center gap-2">Send secure link <ArrowUpRight className="h-4 w-4" /></button>{message && <p className="mt-5 rounded-xl bg-primary/10 px-4 py-3 text-sm leading-6 text-secondary">{message}</p>}</div></div></section>;
  if (!staff) return <section className="container max-w-2xl py-20 text-center md:py-28"><UserRound className="mx-auto h-10 w-10 text-primary" /><h1 className="mt-6 font-display text-4xl font-bold text-secondary">Staff access is not assigned.</h1><p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-600">Your account is authenticated, but it has not been added to the school staff directory. Ask an administrator to assign an admissions or editorial role.</p><button type="button" onClick={signOut} className="mt-8 rounded-lg border border-border px-5 py-3 font-semibold text-secondary hover:border-primary">Sign out</button></section>;

  return <section className="container py-12 md:py-20"><div className="flex flex-col justify-between gap-5 border-b border-border pb-8 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Authenticated workspace</p><h1 className="mt-3 font-display text-2xl font-bold text-secondary md:text-4xl">Admissions review.</h1><p className="mt-4 text-base leading-7 text-slate-600">Review records, verify documents, and keep every decision traceable.</p></div><button type="button" onClick={signOut} className="inline-flex items-center gap-2 self-start rounded-lg border border-border px-4 py-2 text-sm font-semibold text-secondary hover:border-primary"><LogOut className="h-4 w-4" /> Sign out</button></div><div className="mb-8 flex flex-col justify-between gap-4 rounded-xl border border-primary/30 bg-primary/5 p-4 sm:flex-row sm:items-center"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Applicant tracker</p><p className="mt-1 text-sm leading-6 text-slate-600">{firebaseReady ? "The approved Google identity is ready to synchronize staff decisions to applicant tracking records." : "Enable the approved Google identity before changing a status that applicants need to see from another device."}</p></div>{firebaseReady ? <span className="inline-flex items-center gap-2 text-sm font-bold text-secondary"><CheckCircle2 className="h-4 w-4 text-primary" />Live sync ready</span> : <button type="button" onClick={enableLiveSync} className="inline-flex items-center justify-center gap-2 rounded-lg border border-secondary px-4 py-2 text-sm font-bold text-secondary transition-colors hover:bg-secondary hover:text-secondary-foreground"><ShieldCheck className="h-4 w-4" />Enable live sync</button>}</div><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{staffDashboardStats.map((stat) => { const Icon = stat.icon; return <div key={stat.label} className="rounded-xl border border-border bg-card p-4 shadow-sm"><div className="flex items-center justify-between"><Icon className="h-5 w-5 text-primary" /><span className="font-display text-2xl font-bold text-secondary">{stat.value}</span></div><p className="mt-5 font-semibold text-secondary">{stat.label}</p><p className="mt-1 text-xs leading-5 text-slate-500">{stat.detail}</p></div>; })}</div><div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]"><div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"><div className="flex items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Application queue</p><h2 className="mt-2 font-display text-2xl font-bold text-secondary">Recent records</h2></div><Link to="/admissions" className="text-sm font-bold text-secondary hover:text-primary">Applicant guidance <ArrowUpRight className="inline h-4 w-4" /></Link></div><div className="mt-7 overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm"><thead className="border-b border-border text-xs uppercase tracking-wider text-slate-500"><tr><th className="pb-3 pr-4">Reference</th><th className="pb-3 pr-4">Applicant</th><th className="pb-3 pr-4">Level</th><th className="pb-3 pr-4">Status</th><th className="pb-3">Action</th></tr></thead><tbody>{applications.map((item) => <tr key={item.reference} className="border-b border-border/70"><td className="py-4 pr-4 font-mono text-xs font-bold text-secondary">{item.reference}</td><td className="py-4 pr-4 font-semibold text-secondary">{item.student}</td><td className="py-4 pr-4 text-slate-600">{item.level}</td><td className="py-4 pr-4"><span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-bold capitalize text-secondary">{item.status}</span></td><td className="py-4"><select value={item.status} onChange={(event) => void updateApplicationStatus(item.reference, event.target.value)} className="rounded-lg border border-input bg-background px-2 py-1.5 text-xs font-semibold"><option>Submitted</option><option>Under review</option><option>Approved</option><option>Rejected</option></select></td></tr>)}</tbody></table></div></div><div className="rounded-xl bg-secondary p-6 text-secondary-foreground shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Review discipline</p><h2 className="mt-3 font-display text-3xl font-bold">Every decision leaves a record.</h2><p className="mt-5 text-sm leading-7 text-secondary-foreground/75">Application status changes, document checks, correction requests, and staff notes are designed to be recorded in the audit history for accountability.</p><div className="mt-8 space-y-4 text-sm"><div className="flex gap-3 border-t border-secondary-foreground/15 pt-4"><CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />Verify the application record</div><div className="flex gap-3 border-t border-secondary-foreground/15 pt-4"><CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />Check required documents</div><div className="flex gap-3 border-t border-secondary-foreground/15 pt-4"><CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />Record the next status and note</div></div></div></div></section>;
}
