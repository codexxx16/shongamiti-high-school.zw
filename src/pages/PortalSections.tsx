import { FileText, GraduationCap, Link as LinkIcon, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { PortalPage } from "@/components/PortalPage";
import { portalPages, type PortalPageData } from "@/data/site";

export function SchoolPage() { return <PortalPage data={portalPages.school} />; }
export function AcademicsPage() { return <PortalPage data={portalPages.academics} />; }
export function AdmissionsPage() { return <PortalPage data={portalPages.admissions} />; }
export function StudentLifePage() { return <PortalPage data={portalPages["student-life"]} />; }
export function InformationCentrePage() { return <PortalPage data={portalPages["information-centre"]} />; }

const detailPages: Record<string, PortalPageData> = {
  leadership: {
    eyebrow: "School / Leadership",
    title: "Leadership that makes standards visible.",
    intro: "Effective school leadership connects policy with daily practice. This page will introduce the people, responsibilities, and reporting structures that support the school community.",
    sections: [{ title: "The headmaster’s office", body: "The headmaster provides institutional direction, protects the learning environment, and works with staff, students, families, and the governing community to sustain the school’s standards." }, { title: "Senior leadership", body: "Senior leaders coordinate academic, pastoral, operational, and student-life responsibilities. Official names, roles, office hours, and contact routes will be maintained here by the school." }, { title: "Governance and accountability", body: "Good governance depends on clear responsibilities, appropriate records, and transparent communication. Published policies and official notices provide the formal reference point for the school community." }],
  },
  staff: {
    eyebrow: "School / Staff directory",
    title: "The people who make learning possible.",
    intro: "A staff directory helps students and families identify the right person for an academic, pastoral, admissions, or operational question.",
    sections: [{ title: "Academic staff", body: "Academic staff plan learning, teach subject knowledge, assess progress, and support students in developing independent study habits. Department profiles and official contacts will be added as approved." }, { title: "Student support", body: "Support staff help students navigate wellbeing, guidance, activities, and day-to-day school life. The directory will clearly distinguish confidential support routes from general enquiries." }, { title: "Contacting the school", body: "Families should use the appropriate office contact and include enough context for a timely response. The school will publish office hours and escalation routes with the directory." }],
  },
  history: {
    eyebrow: "School / History and heritage",
    title: "A living record of the Shongamiti story.",
    intro: "Institutional memory helps a school understand what it has inherited, what it has achieved, and what it is responsible for carrying forward.",
    sections: [{ title: "Foundations", body: "This page will document the school’s origins, early community relationships, and the educational purpose that shaped its formation once the official historical record is approved." }, { title: "Milestones", body: "Important academic, cultural, sporting, and community milestones will be presented by year with supporting records wherever available." }, { title: "Alumni and community memory", body: "Former students, staff, and community partners contribute to the school’s heritage. A future alumni section can preserve these accounts responsibly and with permission." }],
  },
  curriculum: {
    eyebrow: "Academics / Curriculum",
    title: "A curriculum organised for depth, progression, and purpose.",
    intro: "Curriculum information should help families understand the sequence of learning, the role of assessment, and the support available to students.",
    sections: [{ title: "Curriculum principles", body: "The curriculum balances breadth, subject knowledge, practical application, and the development of communication, reasoning, and study skills." }, { title: "Departments and subjects", body: "Department pages will explain the subjects offered, typical learning activities, assessment expectations, and the staff contacts who can answer detailed questions." }, { title: "Academic support", body: "Students benefit from clear revision routines, feedback, structured interventions, and communication between school and home. Support information will be published with each programme." }],
  },
  combinations: {
    eyebrow: "Academics / Subject combinations",
    title: "Make subject choices with a clear sense of direction.",
    intro: "Subject choices matter because they shape the way students study and the options they can pursue after school. Families should use this guide alongside advice from the academic office.",
    sections: [{ title: "Ordinary Level choices", body: "Ordinary Level students develop a broad academic foundation. The official subject list and combination guidance should be confirmed with the school before final selection." }, { title: "Advanced Level choices", body: "Advanced Level combinations require attention to student strengths, interests, workload, and future study plans. Academic counselling is an important part of the decision." }, { title: "Review and guidance", body: "Subject combinations may be subject to staffing, timetable, and enrolment considerations. The school will publish the current approved combinations and the date they were last reviewed." }],
  },
  results: {
    eyebrow: "Academics / Examination results",
    title: "Academic performance with context and responsibility.",
    intro: "Results are most useful when they are accurate, dated, and explained in context. This page provides the structure for publishing approved school performance records.",
    sections: [{ title: "Official records", body: "Only school-approved summaries should be published. Each record should identify its academic year, cohort, examination context, and responsible office." }, { title: "Understanding progress", body: "A result is one part of a student’s academic journey. Families should also consider attendance, effort, subject choices, feedback, and the support available for continued improvement." }, { title: "Further information", body: "For questions about individual student records, families should contact the school directly rather than using a public information page." }],
  },
  requirements: {
    eyebrow: "Admissions / Entry requirements",
    title: "Prepare carefully before you begin.",
    intro: "A clear admissions process reduces uncertainty for families and helps the school review each application consistently.",
    sections: [{ title: "Applicant information", body: "Applicants should prepare accurate student details, guardian contact information, previous school information, and the level and form being requested." }, { title: "Academic evidence", body: "Previous results or school records may be requested to help the school understand the student’s academic background and determine the appropriate review pathway." }, { title: "Availability and review", body: "Submitting an application does not by itself guarantee a place. The admissions office reviews applications against the school’s published process and available capacity." }],
  },
  documents: {
    eyebrow: "Admissions / Document requirements",
    title: "A clear record of the documents the school may request.",
    intro: "The exact document list should be approved by the school and updated whenever the admissions process changes.",
    sections: [{ title: "Identity and family records", body: "The admissions office may request identity, birth, guardian, or related records. Applicants should submit only the documents requested through the official application process." }, { title: "Academic and transfer records", body: "Previous results, transfer letters, or school records may be used to support placement and review. The portal will record document type, filename, and verification status." }, { title: "Secure upload guidance", body: "Uploaded documents should be legible, current, and relevant. Families should not email sensitive records to unofficial addresses or share application files through public links." }],
  },
  sports: {
    eyebrow: "Student life / Sports",
    title: "Sport as a school of discipline and teamwork.",
    intro: "Sport gives students structured opportunities to pursue fitness, teamwork, resilience, leadership, and healthy competition.",
    sections: [{ title: "Participation", body: "The school will publish available sports, participation expectations, training schedules, and the process for joining teams as the programme is confirmed." }, { title: "Competition and conduct", body: "Competitive sport is guided by preparation, fair play, respect for officials and opponents, and responsible representation of the school." }, { title: "Student development", body: "The value of sport includes the habits students develop away from competition: consistency, communication, accountability, and recovery." }],
  },
  guidance: {
    eyebrow: "Student life / Guidance and counselling",
    title: "Support for the whole student.",
    intro: "Students need clear, respectful routes to support when academic, personal, social, or future-planning questions arise.",
    sections: [{ title: "Pastoral care", body: "Pastoral care connects classroom relationships, student welfare, communication with families, and the everyday practices that help learners feel known and supported." }, { title: "Confidential support", body: "The school will publish the appropriate confidential contact routes and safeguarding guidance. Students should speak to a trusted adult when they feel unsafe or overwhelmed." }, { title: "Future planning", body: "Guidance also includes subject choices, examination preparation, further study, work, and the practical skills needed to make informed decisions." }],
  },
  "student-leadership": {
    eyebrow: "Student life / Student leadership",
    title: "Leadership learned through service.",
    intro: "Student leadership creates structured opportunities for learners to listen, organise, represent others, and contribute to the school community.",
    sections: [{ title: "Representation", body: "Student representatives provide an organised channel for learner perspectives and help communicate agreed information across the school." }, { title: "Responsibilities", body: "Leadership roles require reliability, respectful conduct, preparation, and a willingness to serve rather than simply to hold a title." }, { title: "Community contribution", body: "Student leaders can support events, peer initiatives, service activities, and the culture of belonging that strengthens school life." }],
  },
  announcements: {
    eyebrow: "Information centre / Announcements",
    title: "The latest official notices from the school.",
    intro: "Announcements should be dated, clear, and actionable. This page provides a formal home for school notices rather than relying on scattered informal channels.",
    sections: [{ title: "Current notices", body: "No new notices have been published in this preview environment. Approved school announcements will appear here with their publication date and responsible office." }, { title: "Calendar and deadlines", body: "Term dates, examinations, meetings, events, and deadlines should be published with enough context for families to plan responsibly." }, { title: "Archive", body: "Older notices will remain available by academic year and category so families can consult the record without confusing past information with current guidance." }],
  },
  policies: {
    eyebrow: "Information centre / Policies",
    title: "Clear standards for a safe and effective school community.",
    intro: "Policies communicate the standards, responsibilities, and procedures that guide the school’s work.",
    sections: [{ title: "Published policy record", body: "The school will publish approved policies with version dates, responsible offices, and review information. Draft or superseded documents should not be presented as current policy." }, { title: "Student conduct", body: "Conduct expectations should be clear, consistently applied, and communicated in language students and families can understand." }, { title: "Safeguarding and complaints", body: "Safeguarding and complaints information must be easy to find and connected to a clear, accountable process for raising concerns." }],
  },
};

export function TopicPage({ topic }: { topic: string }) {
  const data = detailPages[topic] ?? detailPages.curriculum;
  return <PortalPage data={data} />;
}

export function TopicDirectory({ title, intro, links }: { title: string; intro: string; links: Array<{ label: string; href: string; icon: typeof FileText }> }) {
  return <section className="container py-20 md:py-28"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Information directory</p><h1 className="mt-4 font-display text-5xl font-bold text-secondary">{title}</h1><p className="mt-6 text-lg leading-8 text-slate-600">{intro}</p></div><div className="mt-12 grid gap-5 md:grid-cols-3">{links.map(({ label, href, icon: Icon }) => <Link key={href} to={href} className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"><Icon className="h-6 w-6 text-primary" /><h2 className="mt-6 font-display text-2xl font-bold text-secondary">{label}</h2><p className="mt-3 text-sm leading-7 text-slate-600">Read the official overview and practical guidance.</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-secondary">Open route <LinkIcon className="h-4 w-4" /></span></Link>)}</div></section>;
}

export function AboutDirectory() { return <TopicDirectory title="The school" intro="Explore the institution, its leadership, its heritage, and the people responsible for making school life work." links={[{ label: "Leadership and governance", href: "/school/leadership", icon: Users }, { label: "Staff directory", href: "/school/staff", icon: GraduationCap }, { label: "History and heritage", href: "/school/history", icon: FileText }]} />; }
export function AcademicDirectory() { return <TopicDirectory title="Academic life" intro="Move from the curriculum overview into pathways, subject combinations, and approved examination information." links={[{ label: "Curriculum", href: "/academics/curriculum", icon: GraduationCap }, { label: "Subject combinations", href: "/academics/subject-combinations", icon: FileText }, { label: "Examination results", href: "/academics/results", icon: ShieldCheck }]} />; }
export function AdmissionsDirectory() { return <TopicDirectory title="Admissions" intro="Understand entry requirements, prepare your records, and move into the guided online application." links={[{ label: "Entry requirements", href: "/admissions/requirements", icon: ShieldCheck }, { label: "Document requirements", href: "/admissions/documents", icon: FileText }, { label: "Apply online", href: "/admissions/apply", icon: GraduationCap }]} />; }
