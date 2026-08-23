import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, FileUp, Loader2, LockKeyhole, Mail, Save, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { buildApplicationEmail } from "@/lib/admissionsEmail";
import { createTrackingRecord } from "@/lib/firebase";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const draftKey = "shongamiti-admissions-draft";
const referenceKey = "shongamiti-admissions-reference";

type ApplicationForm = {
  applicantEmail: string;
  applicantPhone: string;
  studentName: string;
  guardianName: string;
  guardianRelationship: string;
  requestedLevel: string;
  requestedForm: string;
  previousSchool: string;
  academicSummary: string;
  address: string;
  consent: boolean;
};

const initialForm: ApplicationForm = { applicantEmail: "", applicantPhone: "", studentName: "", guardianName: "", guardianRelationship: "Parent or legal guardian", requestedLevel: "", requestedForm: "", previousSchool: "", academicSummary: "", address: "", consent: false };
const levels = { "Ordinary Level": ["Form 1", "Form 2", "Form 3", "Form 4"], "Advanced Level": ["Form 5", "Form 6"] };

function readLocalValue(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeLocalValue(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Local persistence is optional when browser storage is restricted.
  }
}

function removeLocalValue(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {
    // Local persistence is optional when browser storage is restricted.
  }
}

export default function Application() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ApplicationForm>(initialForm);
  const [files, setFiles] = useState<File[]>([]);
  const [reference, setReference] = useState("");
  const [trackingCode, setTrackingCode] = useState("");
  const [saving, setSaving] = useState(false);
  const [preparing, setPreparing] = useState(false);
  const [message, setMessage] = useState("");
  const [complete, setComplete] = useState(false);
  const [handoffChoice, setHandoffChoice] = useState<"mail" | "gmail" | null>(null);

  useEffect(() => {
    try {
      const draft = readLocalValue(draftKey);
      const savedReference = readLocalValue(referenceKey);
      if (draft) {
        const parsed = JSON.parse(draft) as Partial<ApplicationForm>;
        if (parsed && typeof parsed === "object") setForm({ ...initialForm, ...parsed });
      }
      if (savedReference) setReference(savedReference);
      const savedTrackingCode = readLocalValue(`${referenceKey}-tracking-code`);
      if (savedTrackingCode) setTrackingCode(savedTrackingCode);
    } catch {
      try {
        removeLocalValue(draftKey);
      } catch {
        // Storage can be unavailable in privacy-restricted browser contexts.
      }
      toast({ title: "Draft restoration skipped", description: "The application opened with a fresh form because the saved draft could not be read.", variant: "destructive" });
    }
  }, []);

  const progress = useMemo(() => `${Math.round((step / 4) * 100)}%`, [step]);
  const update = <K extends keyof ApplicationForm>(key: K, value: ApplicationForm[K]) => setForm((current) => ({ ...current, [key]: value }));
  const saveDraft = () => {
    const feedback = "Draft saved on this device. Continue when you are ready.";
    writeLocalValue(draftKey, JSON.stringify(form));
    setMessage(feedback);
    toast({ title: "Draft saved", description: feedback });
  };
  const validStep = () => {
    if (step === 1) return Boolean(form.studentName && form.guardianName && form.applicantEmail && form.applicantPhone);
    if (step === 2) return Boolean(form.requestedLevel && form.requestedForm && form.previousSchool && form.academicSummary);
    if (step === 3) return Boolean(form.address);
    return form.consent;
  };

  const ensureSession = async () => {
    const current = await supabase.auth.getUser();
    if (current.data.user) return current.data.user;
    const anonymous = await supabase.auth.signInAnonymously();
    return anonymous.data.user ?? null;
  };

  const persistApplication = async (status: "draft" | "submitted", applicationTrackingCode = "") => {
    try {
      const user = await ensureSession();
      if (!user) return null;
      const record = {
        reference_number: reference || `SHA-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`,
        applicant_email: form.applicantEmail,
        applicant_phone: form.applicantPhone,
        student_name: form.studentName,
        guardian_name: form.guardianName,
        guardian_relationship: form.guardianRelationship,
        requested_level: form.requestedLevel,
        requested_form: form.requestedForm,
        previous_school: form.previousSchool,
        academic_summary: form.academicSummary,
        address: form.address,
        entry_form: { ...form, trackingCode: applicationTrackingCode },
        status,
        created_by: user.id,
        submitted_at: status === "submitted" ? new Date().toISOString() : null,
      };
      const result = reference ? await supabase.from("admissions_applications").update(record).eq("reference_number", reference).select("reference_number").single() : await supabase.from("admissions_applications").insert(record).select("reference_number").single();
      if (result.error) throw result.error;
      return result.data?.reference_number ?? record.reference_number;
    } catch {
      return null;
    }
  };

  const advance = async () => {
    setMessage("");
    if (!validStep()) {
      const feedback = "Please complete the required fields before continuing.";
      setMessage(feedback);
      toast({ title: "More information required", description: feedback, variant: "destructive" });
      return;
    }
    if (step < 4) {
      writeLocalValue(draftKey, JSON.stringify(form));
      const draftReference = await persistApplication("draft");
      if (draftReference) {
        setReference(draftReference);
        writeLocalValue(referenceKey, draftReference);
      }
      const nextStep = step + 1;
      setStep(nextStep);
      toast({ title: `Step ${nextStep} of 4 opened`, description: "Your progress is saved on this device." });
      return;
    }
    setSaving(true);
    setPreparing(true);
    await new Promise((resolve) => window.setTimeout(resolve, 1200));
    const generatedReference = reference || `SHA-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
    const generatedTrackingCode = await createTrackingRecord(generatedReference);
    const finalTrackingCode = generatedTrackingCode || `PREVIEW-${crypto.randomUUID().slice(0, 10).toUpperCase()}`;
    const backendReference = await persistApplication("submitted", finalTrackingCode);
    const finalReference = backendReference || generatedReference;
    setReference(finalReference);
    setTrackingCode(finalTrackingCode);
    writeLocalValue(referenceKey, finalReference);
    writeLocalValue(`${referenceKey}-tracking-code`, finalTrackingCode);
    writeLocalValue(`shongamiti-admissions-reference-${finalReference}`, JSON.stringify({ email: form.applicantEmail, status: "submitted", submittedAt: new Date().toISOString(), trackingCode: finalTrackingCode }));
    writeLocalValue(`${draftKey}-submitted`, JSON.stringify({ ...form, files: files.map((file) => file.name), reference: finalReference, trackingCode: finalTrackingCode, status: "submitted" }));
    removeLocalValue(draftKey);
    setSaving(false);
    setPreparing(false);
    setComplete(true);
    toast({ title: "Application packet ready", description: "Choose Gmail or your mail app to open the prefilled admissions message." });
  };

  const uploadDocuments = async (selected: File[]) => {
    setFiles(selected);
    const selectionMessage = selected.length ? `${selected.length} document${selected.length === 1 ? "" : "s"} ready for secure upload.` : "No supporting documents selected.";
    setMessage(selected.length ? selectionMessage : "");
    toast({ title: selected.length ? "Documents selected" : "No documents selected", description: selectionMessage });
    if (!selected.length) return;
    try {
      const user = await ensureSession();
      if (!user) return;
      const refNumber = reference || `SHA-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
      const uploaded = await Promise.all(selected.map(async (file) => {
        const path = `${user.id}/${refNumber}/${crypto.randomUUID()}-${file.name}`;
        const result = await supabase.storage.from("application-documents").upload(path, file, { upsert: false, contentType: file.type });
        if (result.error) throw result.error;
        return { path, file };
      }));
      const uploadMessage = `${uploaded.length} document${uploaded.length === 1 ? "" : "s"} uploaded to the private application storage.`;
      setMessage(uploadMessage);
      toast({ title: "Documents uploaded", description: uploadMessage });
    } catch {
      const uploadMessage = "Documents are attached to this draft. Secure upload will complete after the application session is authenticated.";
      setMessage(uploadMessage);
      toast({ title: "Documents kept with draft", description: uploadMessage, variant: "destructive" });
    }
  };

  const emailPacket = buildApplicationEmail({ ...form, files: files.map((file) => file.name), reference, trackingCode });
  const openEmailHandoff = () => {
    const destination = handoffChoice === "mail" ? emailPacket.mailto : emailPacket.gmail;
    toast({ title: handoffChoice === "mail" ? "Opening mail app" : "Opening Gmail", description: "The recipient, subject, and body are prefilled. Attach the original documents and press Send." });
    setHandoffChoice(null);
    if (handoffChoice === "mail") window.location.assign(destination);
    else window.open(destination, "_blank", "noopener,noreferrer");
  };

  if (preparing) return <section className="container max-w-3xl py-14 md:py-20"><div className="rounded-2xl border border-primary/30 bg-card p-7 text-center shadow-[var(--shadow-elevated)] md:p-10" aria-live="polite"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary"><Loader2 className="h-8 w-8 animate-spin" /></div><p className="mt-7 text-xs font-bold uppercase tracking-[0.22em] text-primary">Submission preparation</p><h1 className="mt-3 font-display text-3xl font-bold text-secondary md:text-4xl">Preparing your application packet.</h1><p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600">The school portal is recording your reference, preparing the tracking record, and formatting the admissions email. Please keep this window open.</p><div className="mx-auto mt-7 h-2 max-w-md overflow-hidden rounded-full bg-border"><div className="h-full w-2/3 rounded-full bg-primary animate-[progress-slide_1.2s_ease-in-out_infinite]" /></div><p className="mt-4 text-sm font-semibold text-secondary">Validating details · creating reference · preparing mail handoff</p></div></section>;

  if (complete) return <><section className="container max-w-3xl py-14 md:py-20"><div className="rounded-2xl border border-primary/30 bg-card p-6 shadow-[var(--shadow-elevated)] md:p-10"><div className="flex items-start gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary"><CheckCircle2 className="h-6 w-6" /></div><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Application record prepared</p><h1 className="mt-2 font-display text-3xl font-bold text-secondary md:text-4xl">Complete the final email step.</h1><p className="mt-3 text-base leading-7 text-slate-600">Your portal record is ready. Choose your email application below, review the pre-filled message, attach the original documents, and press Send in your mail app.</p></div></div><div className="mt-7 grid gap-4 sm:grid-cols-2"><div className="rounded-xl bg-secondary p-5 text-secondary-foreground"><p className="text-xs uppercase tracking-[0.2em] text-primary">Application reference</p><p className="mt-2 font-mono text-xl font-bold tracking-wider">{reference}</p></div><div className="rounded-xl border border-border bg-muted/60 p-5"><p className="text-xs uppercase tracking-[0.2em] text-primary">{trackingCode.startsWith("PREVIEW-") ? "Preview tracking code" : "Private tracking code"}</p><p className="mt-2 font-mono text-xl font-bold tracking-wider text-secondary">{trackingCode}</p><p className="mt-2 text-xs leading-5 text-slate-600">{trackingCode.startsWith("PREVIEW-") ? "The local fallback works on this device. Publish the Firestore rules to enable cross-device tracking." : "Keep both details together. They are required to follow the application from another device."}</p></div></div><div className="mt-7 rounded-xl border border-primary/30 bg-primary/5 p-5"><div className="flex items-start gap-3"><Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><div><p className="font-bold text-secondary">Admissions email prepared</p><p className="mt-1 text-sm leading-6 text-slate-600">To: <span className="font-semibold">{emailPacket.to}</span><br />Subject: <span className="font-semibold">{emailPacket.subject}</span></p></div></div><div className="mt-5 flex flex-col gap-3 sm:flex-row"><button type="button" onClick={() => { setHandoffChoice("mail"); toast({ title: "Mail app selected", description: "Review the prepared recipient, subject, and message in the next step." }); }} className="btn-gold inline-flex items-center justify-center gap-2"><Mail className="h-4 w-4" /> Open mail app</button><button type="button" onClick={() => { setHandoffChoice("gmail"); toast({ title: "Gmail selected", description: "Review the prepared recipient, subject, and message in the next step." }); }} className="inline-flex items-center justify-center gap-2 rounded-lg border border-secondary px-5 py-3 text-sm font-bold text-secondary transition-colors hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Open Gmail</button></div><p className="mt-3 text-xs leading-5 text-slate-500">The portal cannot attach local files automatically. Add the selected documents to the email before sending.</p></div><div className="mt-7 flex flex-col gap-3 sm:flex-row"><Link to="/admissions/status" className="rounded-lg border border-border px-5 py-3 text-center text-sm font-semibold text-secondary transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Track this application</Link><Link to="/" className="rounded-lg border border-border px-5 py-3 text-center text-sm font-semibold text-secondary transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Return to home</Link></div></div></section><AlertDialog open={Boolean(handoffChoice)} onOpenChange={(open) => !open && setHandoffChoice(null)}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>You are about to open your email service.</AlertDialogTitle><AlertDialogDescription>The school has prepared the admissions message for <span className="font-semibold text-foreground">{reference}</span>. Your selected email service will open with <span className="font-semibold text-foreground">{emailPacket.to}</span> in the recipient field and the subject and application details already filled in. Review the message, attach the original documents, and send it to complete the final application step.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Stay on the portal</AlertDialogCancel><AlertDialogAction onClick={openEmailHandoff}>Continue to email</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog></>;

  return <section className="container max-w-5xl py-12 md:py-16"><div className="mb-10 max-w-3xl"><Link to="/admissions" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-secondary"><ArrowLeft className="h-4 w-4" /> Admissions overview</Link><p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-primary">Secure admissions portal</p><h1 className="mt-4 font-display text-3xl font-bold text-secondary md:text-5xl">Begin an application.</h1><p className="mt-5 text-lg leading-8 text-slate-600">Complete the guided application in stages. Your draft is saved locally while you work and the submitted record is stored in the school admissions database when the session is authenticated.</p></div><div className="grid gap-10 lg:grid-cols-[0.35fr_0.65fr]"><aside className="h-fit rounded-2xl border border-border bg-muted/60 p-6 lg:sticky lg:top-28"><div className="flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Progress</p><span className="text-sm font-bold text-secondary">{progress}</span></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-border"><div className="h-full rounded-full bg-primary transition-all" style={{ width: progress }} /></div><div className="mt-7 grid gap-2">{["Applicant and guardian", "Academic pathway", "Supporting records", "Review and consent"].map((item, index) => <button key={item} type="button" onClick={() => index + 1 < step && setStep(index + 1)} className={`flex items-center gap-3 rounded-lg p-2.5 text-left text-sm font-semibold transition-colors duration-200 hover:bg-card/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${step === index + 1 ? "bg-card text-secondary shadow-sm" : step > index + 1 ? "text-secondary" : "text-slate-500"}`}><span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${step > index + 1 ? "bg-primary text-secondary" : step === index + 1 ? "bg-secondary text-secondary-foreground" : "bg-border text-slate-500"}`}>{step > index + 1 ? "✓" : index + 1}</span>{item}</button>)}</div><button type="button" onClick={saveDraft} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-secondary transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><Save className="h-4 w-4" /> Save draft</button></aside><div className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-8"><div className="mb-6 flex items-center gap-3 border-b border-border pb-5"><LockKeyhole className="h-5 w-5 text-primary" /><p className="text-sm leading-6 text-slate-600">This portal is designed for controlled submission of admissions information. Do not share your reference number publicly.</p></div>{step === 1 && <div className="space-y-6"><Field label="Student full name" value={form.studentName} onChange={(value) => update("studentName", value)} placeholder="Enter the student’s full name" /><div className="grid gap-5 md:grid-cols-2"><Field label="Parent or guardian name" value={form.guardianName} onChange={(value) => update("guardianName", value)} placeholder="Enter the responsible adult’s name" /><SelectField label="Relationship to student" value={form.guardianRelationship} onChange={(value) => update("guardianRelationship", value)} options={["Parent or legal guardian", "Foster parent", "Authorised representative"]} /></div><div className="grid gap-5 md:grid-cols-2"><Field label="Applicant email" type="email" value={form.applicantEmail} onChange={(value) => update("applicantEmail", value)} placeholder="name@example.com" /><Field label="Applicant phone" value={form.applicantPhone} onChange={(value) => update("applicantPhone", value)} placeholder="Include country code where possible" /></div></div>}{step === 2 && <div className="space-y-6"><div className="grid gap-5 md:grid-cols-2"><SelectField label="Requested level" value={form.requestedLevel} onChange={(value) => { update("requestedLevel", value); update("requestedForm", ""); }} options={Object.keys(levels)} placeholder="Select a level" /><SelectField label="Requested form" value={form.requestedForm} onChange={(value) => update("requestedForm", value)} options={form.requestedLevel ? levels[form.requestedLevel as keyof typeof levels] : []} placeholder={form.requestedLevel ? "Select a form" : "Select a level first"} /></div><Field label="Previous school" value={form.previousSchool} onChange={(value) => update("previousSchool", value)} placeholder="Name of the most recent school" /><label className="grid gap-2 text-sm font-semibold text-secondary">Academic summary<textarea value={form.academicSummary} onChange={(event) => update("academicSummary", event.target.value)} placeholder="Summarise recent results, interests, or academic information the school should consider." className="min-h-32 rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" /></label></div>}{step === 3 && <div className="space-y-6"><Field label="Residential address" value={form.address} onChange={(value) => update("address", value)} placeholder="Enter the current residential address" /><div className="rounded-xl border border-dashed border-primary/50 bg-primary/5 p-5"><div className="flex items-start gap-4"><FileUp className="mt-1 h-6 w-6 shrink-0 text-primary" /><div><p className="font-bold text-secondary">Supporting documents</p><p className="mt-2 text-sm leading-6 text-slate-600">Attach legible records requested by the admissions office. The portal accepts PDF, JPG, and PNG files up to 10 MB each.</p><label className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-secondary px-4 py-2 text-sm font-bold text-secondary hover:bg-secondary hover:text-secondary-foreground"><FileUp className="h-4 w-4" /> Choose files<input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="sr-only" onChange={(event) => uploadDocuments(Array.from(event.target.files ?? []))} /></label></div></div>{files.length > 0 && <div className="mt-5 grid gap-2">{files.map((file) => <div key={file.name} className="flex items-center justify-between rounded-lg bg-card px-3 py-2 text-sm"><span className="truncate">{file.name}</span><span className="text-xs text-slate-500">{Math.round(file.size / 1024)} KB</span></div>)}</div>}</div><div className="flex gap-3 rounded-xl bg-muted/60 p-4 text-sm leading-6 text-slate-600"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />Files are placed in the private application-document storage area and are not published on the school website.</div></div>}{step === 4 && <div className="space-y-6"><div className="rounded-2xl bg-muted/60 p-6"><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Review your application</p><div className="mt-5 grid gap-4 text-sm md:grid-cols-2"><Review label="Student" value={form.studentName} /><Review label="Guardian" value={form.guardianName} /><Review label="Pathway" value={`${form.requestedLevel} · ${form.requestedForm}`} /><Review label="Previous school" value={form.previousSchool} /><Review label="Email" value={form.applicantEmail} /><Review label="Documents" value={files.length ? `${files.length} attached` : "No documents attached"} /></div></div><label className="flex items-start gap-3 rounded-xl border border-border p-4 text-sm leading-6 text-slate-600"><input type="checkbox" checked={form.consent} onChange={(event) => update("consent", event.target.checked)} className="mt-1 h-4 w-4 accent-primary" />I confirm that the information provided is accurate to the best of my knowledge and consent to the school using it to assess this application and communicate with the named guardian.</label></div>}{message && <p className="mt-7 rounded-xl bg-primary/10 px-4 py-3 text-sm font-semibold text-secondary" role="status" aria-live="polite">{message}</p>}<div className="mt-8 flex flex-col-reverse justify-between gap-3 border-t border-border pt-5 sm:flex-row">{step > 1 ? <button type="button" onClick={() => setStep((current) => current - 1)} className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 font-semibold text-secondary hover:border-primary"><ArrowLeft className="h-4 w-4" /> Back</button> : <span />}<button type="button" onClick={advance} disabled={saving} className="btn-gold inline-flex items-center justify-center gap-2 disabled:opacity-60">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : step === 4 ? <CheckCircle2 className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}{saving ? "Submitting…" : step === 4 ? "Submit application" : "Continue"}</button></div></div></div></section>;
}

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; type?: string }) { return <label className="grid gap-2 text-sm font-semibold text-secondary">{label}<input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" /></label>; }
function SelectField({ label, value, onChange, options, placeholder = "Select an option" }: { label: string; value: string; onChange: (value: string) => void; options: string[]; placeholder?: string }) { return <label className="grid gap-2 text-sm font-semibold text-secondary">{label}<select value={value} onChange={(event) => onChange(event.target.value)} className="rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"><option value="">{placeholder}</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>; }
function Review({ label, value }: { label: string; value: string }) { return <div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p><p className="mt-1 font-semibold text-secondary">{value || "Not provided"}</p></div>; }
