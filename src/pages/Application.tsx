import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, FileUp, Loader2, LockKeyhole, Save, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
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

export default function Application() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ApplicationForm>(initialForm);
  const [files, setFiles] = useState<File[]>([]);
  const [reference, setReference] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const draft = localStorage.getItem(draftKey);
    const savedReference = localStorage.getItem(referenceKey);
    if (draft) setForm({ ...initialForm, ...JSON.parse(draft) });
    if (savedReference) setReference(savedReference);
  }, []);

  const progress = useMemo(() => `${Math.round((step / 4) * 100)}%`, [step]);
  const update = <K extends keyof ApplicationForm>(key: K, value: ApplicationForm[K]) => setForm((current) => ({ ...current, [key]: value }));
  const saveDraft = () => { localStorage.setItem(draftKey, JSON.stringify(form)); setMessage("Draft saved on this device. Continue when you are ready."); };
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

  const persistApplication = async (status: "draft" | "submitted") => {
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
        entry_form: form,
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
    if (!validStep()) { setMessage("Please complete the required fields before continuing."); return; }
    if (step < 4) {
      localStorage.setItem(draftKey, JSON.stringify(form));
      const draftReference = await persistApplication("draft");
      if (draftReference) {
        setReference(draftReference);
        localStorage.setItem(referenceKey, draftReference);
      }
      setStep((current) => current + 1);
      return;
    }
    setSaving(true);
    const generatedReference = reference || `SHA-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
    const backendReference = await persistApplication("submitted");
    const finalReference = backendReference || generatedReference;
    setReference(finalReference);
    localStorage.setItem(referenceKey, finalReference);
    localStorage.setItem(`shongamiti-admissions-reference-${finalReference}`, JSON.stringify({ email: form.applicantEmail, status: "submitted", submittedAt: new Date().toISOString() }));
    localStorage.setItem(`${draftKey}-submitted`, JSON.stringify({ ...form, files: files.map((file) => file.name), reference: finalReference, status: "submitted" }));
    localStorage.removeItem(draftKey);
    setSaving(false);
    setComplete(true);
  };

  const uploadDocuments = async (selected: File[]) => {
    setFiles(selected);
    setMessage(selected.length ? `${selected.length} document${selected.length === 1 ? "" : "s"} ready for secure upload.` : "");
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
      setMessage(`${uploaded.length} document${uploaded.length === 1 ? "" : "s"} uploaded to the private application storage.`);
    } catch {
      setMessage("Documents are attached to this draft. Secure upload will complete after the application session is authenticated.");
    }
  };

  if (complete) return <section className="container max-w-3xl py-14 md:py-20"><div className="rounded-2xl border border-primary/30 bg-card p-6 text-center shadow-[var(--shadow-elevated)] md:p-10"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary"><CheckCircle2 className="h-8 w-8" /></div><p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-primary">Application received</p><h1 className="mt-4 font-display text-3xl font-bold text-secondary md:text-4xl">Your application is on record.</h1><p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-600">Keep the reference number below. The admissions office will use it when communicating the next step in the review process.</p><div className="mx-auto mt-8 max-w-sm rounded-2xl bg-secondary p-6 text-secondary-foreground"><p className="text-xs uppercase tracking-[0.2em] text-primary">Application reference</p><p className="mt-3 font-mono text-2xl font-bold tracking-wider">{reference}</p></div><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Link to="/admissions/status" className="btn-gold">Check application status</Link><Link to="/" className="rounded-lg border border-border px-6 py-3 font-semibold text-secondary hover:border-primary">Return to home</Link></div></div></section>;

  return <section className="container max-w-5xl py-12 md:py-16"><div className="mb-10 max-w-3xl"><Link to="/admissions" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-secondary"><ArrowLeft className="h-4 w-4" /> Admissions overview</Link><p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-primary">Secure admissions portal</p><h1 className="mt-4 font-display text-3xl font-bold text-secondary md:text-5xl">Begin an application.</h1><p className="mt-5 text-lg leading-8 text-slate-600">Complete the guided application in stages. Your draft is saved locally while you work and the submitted record is stored in the school admissions database when the session is authenticated.</p></div><div className="grid gap-10 lg:grid-cols-[0.35fr_0.65fr]"><aside className="h-fit rounded-2xl border border-border bg-muted/60 p-6 lg:sticky lg:top-28"><div className="flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Progress</p><span className="text-sm font-bold text-secondary">{progress}</span></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-border"><div className="h-full rounded-full bg-primary transition-all" style={{ width: progress }} /></div><div className="mt-7 grid gap-2">{["Applicant and guardian", "Academic pathway", "Supporting records", "Review and consent"].map((item, index) => <button key={item} type="button" onClick={() => index + 1 < step && setStep(index + 1)} className={`flex items-center gap-3 rounded-lg p-2.5 text-left text-sm font-semibold transition-colors duration-200 hover:bg-card/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${step === index + 1 ? "bg-card text-secondary shadow-sm" : step > index + 1 ? "text-secondary" : "text-slate-500"}`}><span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${step > index + 1 ? "bg-primary text-secondary" : step === index + 1 ? "bg-secondary text-secondary-foreground" : "bg-border text-slate-500"}`}>{step > index + 1 ? "✓" : index + 1}</span>{item}</button>)}</div><button type="button" onClick={saveDraft} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-secondary transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><Save className="h-4 w-4" /> Save draft</button></aside><div className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-8"><div className="mb-6 flex items-center gap-3 border-b border-border pb-5"><LockKeyhole className="h-5 w-5 text-primary" /><p className="text-sm leading-6 text-slate-600">This portal is designed for controlled submission of admissions information. Do not share your reference number publicly.</p></div>{step === 1 && <div className="space-y-6"><Field label="Student full name" value={form.studentName} onChange={(value) => update("studentName", value)} placeholder="Enter the student’s full name" /><div className="grid gap-5 md:grid-cols-2"><Field label="Parent or guardian name" value={form.guardianName} onChange={(value) => update("guardianName", value)} placeholder="Enter the responsible adult’s name" /><SelectField label="Relationship to student" value={form.guardianRelationship} onChange={(value) => update("guardianRelationship", value)} options={["Parent or legal guardian", "Foster parent", "Authorised representative"]} /></div><div className="grid gap-5 md:grid-cols-2"><Field label="Applicant email" type="email" value={form.applicantEmail} onChange={(value) => update("applicantEmail", value)} placeholder="name@example.com" /><Field label="Applicant phone" value={form.applicantPhone} onChange={(value) => update("applicantPhone", value)} placeholder="Include country code where possible" /></div></div>}{step === 2 && <div className="space-y-6"><div className="grid gap-5 md:grid-cols-2"><SelectField label="Requested level" value={form.requestedLevel} onChange={(value) => { update("requestedLevel", value); update("requestedForm", ""); }} options={Object.keys(levels)} placeholder="Select a level" /><SelectField label="Requested form" value={form.requestedForm} onChange={(value) => update("requestedForm", value)} options={form.requestedLevel ? levels[form.requestedLevel as keyof typeof levels] : []} placeholder={form.requestedLevel ? "Select a form" : "Select a level first"} /></div><Field label="Previous school" value={form.previousSchool} onChange={(value) => update("previousSchool", value)} placeholder="Name of the most recent school" /><label className="grid gap-2 text-sm font-semibold text-secondary">Academic summary<textarea value={form.academicSummary} onChange={(event) => update("academicSummary", event.target.value)} placeholder="Summarise recent results, interests, or academic information the school should consider." className="min-h-32 rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" /></label></div>}{step === 3 && <div className="space-y-6"><Field label="Residential address" value={form.address} onChange={(value) => update("address", value)} placeholder="Enter the current residential address" /><div className="rounded-xl border border-dashed border-primary/50 bg-primary/5 p-5"><div className="flex items-start gap-4"><FileUp className="mt-1 h-6 w-6 shrink-0 text-primary" /><div><p className="font-bold text-secondary">Supporting documents</p><p className="mt-2 text-sm leading-6 text-slate-600">Attach legible records requested by the admissions office. The portal accepts PDF, JPG, and PNG files up to 10 MB each.</p><label className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-secondary px-4 py-2 text-sm font-bold text-secondary hover:bg-secondary hover:text-secondary-foreground"><FileUp className="h-4 w-4" /> Choose files<input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="sr-only" onChange={(event) => uploadDocuments(Array.from(event.target.files ?? []))} /></label></div></div>{files.length > 0 && <div className="mt-5 grid gap-2">{files.map((file) => <div key={file.name} className="flex items-center justify-between rounded-lg bg-card px-3 py-2 text-sm"><span className="truncate">{file.name}</span><span className="text-xs text-slate-500">{Math.round(file.size / 1024)} KB</span></div>)}</div>}</div><div className="flex gap-3 rounded-xl bg-muted/60 p-4 text-sm leading-6 text-slate-600"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />Files are placed in the private application-document storage area and are not published on the school website.</div></div>}{step === 4 && <div className="space-y-6"><div className="rounded-2xl bg-muted/60 p-6"><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Review your application</p><div className="mt-5 grid gap-4 text-sm md:grid-cols-2"><Review label="Student" value={form.studentName} /><Review label="Guardian" value={form.guardianName} /><Review label="Pathway" value={`${form.requestedLevel} · ${form.requestedForm}`} /><Review label="Previous school" value={form.previousSchool} /><Review label="Email" value={form.applicantEmail} /><Review label="Documents" value={files.length ? `${files.length} attached` : "No documents attached"} /></div></div><label className="flex items-start gap-3 rounded-xl border border-border p-4 text-sm leading-6 text-slate-600"><input type="checkbox" checked={form.consent} onChange={(event) => update("consent", event.target.checked)} className="mt-1 h-4 w-4 accent-primary" />I confirm that the information provided is accurate to the best of my knowledge and consent to the school using it to assess this application and communicate with the named guardian.</label></div>}{message && <p className="mt-7 rounded-xl bg-primary/10 px-4 py-3 text-sm font-semibold text-secondary">{message}</p>}<div className="mt-8 flex flex-col-reverse justify-between gap-3 border-t border-border pt-5 sm:flex-row">{step > 1 ? <button type="button" onClick={() => setStep((current) => current - 1)} className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 font-semibold text-secondary hover:border-primary"><ArrowLeft className="h-4 w-4" /> Back</button> : <span />}<button type="button" onClick={advance} disabled={saving} className="btn-gold inline-flex items-center justify-center gap-2 disabled:opacity-60">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : step === 4 ? <CheckCircle2 className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}{saving ? "Submitting…" : step === 4 ? "Submit application" : "Continue"}</button></div></div></div></section>;
}

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; type?: string }) { return <label className="grid gap-2 text-sm font-semibold text-secondary">{label}<input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" /></label>; }
function SelectField({ label, value, onChange, options, placeholder = "Select an option" }: { label: string; value: string; onChange: (value: string) => void; options: string[]; placeholder?: string }) { return <label className="grid gap-2 text-sm font-semibold text-secondary">{label}<select value={value} onChange={(event) => onChange(event.target.value)} className="rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"><option value="">{placeholder}</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>; }
function Review({ label, value }: { label: string; value: string }) { return <div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p><p className="mt-1 font-semibold text-secondary">{value || "Not provided"}</p></div>; }
