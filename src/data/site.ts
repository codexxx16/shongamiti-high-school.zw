import type { LucideIcon } from "lucide-react";
import {
  Archive,
  Award,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ClipboardCheck,
  FileText,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Library,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

export type PortalCard = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  eyebrow?: string;
};

export type PortalPageData = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: Array<{
    title: string;
    body: string;
    items?: string[];
  }>;
  cards?: PortalCard[];
};

export const portalNavigation = [
  { label: "School", href: "/school" },
  { label: "Academics", href: "/academics" },
  { label: "Admissions", href: "/admissions" },
  { label: "Student life", href: "/student-life" },
  { label: "Information centre", href: "/information-centre" },
];

export const homepageCards: PortalCard[] = [
  {
    title: "School leadership",
    description: "Meet the people responsible for the school’s direction, standards, and student experience.",
    href: "/school/leadership",
    icon: Landmark,
    eyebrow: "Governance",
  },
  {
    title: "Academic pathways",
    description: "Explore Ordinary and Advanced Level pathways, subject combinations, and assessment support.",
    href: "/academics",
    icon: BookOpen,
    eyebrow: "Learning",
  },
  {
    title: "Admissions portal",
    description: "Understand entry requirements, prepare your documents, and submit an application online.",
    href: "/admissions/apply",
    icon: ClipboardCheck,
    eyebrow: "Apply",
  },
  {
    title: "Student life",
    description: "See how sport, houses, societies, guidance, and student leadership shape school life.",
    href: "/student-life",
    icon: Users,
    eyebrow: "Community",
  },
  {
    title: "Documents and policies",
    description: "Find circulars, policies, forms, calendars, and official school information in one place.",
    href: "/information-centre/documents",
    icon: Archive,
    eyebrow: "Reference",
  },
  {
    title: "Announcements",
    description: "Keep up with school notices, term dates, events, and important community updates.",
    href: "/information-centre/announcements",
    icon: Megaphone,
    eyebrow: "Updates",
  },
];

export const portalPages: Record<string, PortalPageData> = {
  school: {
    eyebrow: "The school",
    title: "A disciplined environment for purposeful learning.",
    intro: "Shongamiti High School is building a school culture where academic progress, personal responsibility, and service to the wider community are treated as connected responsibilities.",
    sections: [
      {
        title: "Our direction",
        body: "The school’s long-term direction is centred on rigorous teaching, a respectful learning environment, and the development of young people who can contribute with confidence. This platform is designed to make that direction visible through transparent information about the school’s people, programmes, expectations, and opportunities.",
        items: ["High expectations supported by practical guidance", "A culture of respect, responsibility, and service", "Clear communication with families and guardians"],
      },
      {
        title: "Vision and values",
        body: "Our values provide a common language for decisions in the classroom, on the field, and in the wider community. The school expects every member of the community to pursue excellence with integrity and to recognise that achievement includes character, effort, and contribution.",
        items: ["Excellence in scholarship and conduct", "Integrity in work, relationships, and leadership", "Respect for people, place, and opportunity"],
      },
      {
        title: "History and heritage",
        body: "The school’s heritage is carried through its people, traditions, achievements, and relationship with the community around it. This section will continue to grow as official milestones, archival photographs, alumni accounts, and institutional records are prepared for publication.",
      },
    ],
    cards: [
      { title: "Leadership and governance", description: "Understand the responsibilities of the headmaster, senior leadership, and governing structures.", href: "/school/leadership", icon: Landmark },
      { title: "Staff directory", description: "Find the academic and support professionals who guide day-to-day school life.", href: "/school/staff", icon: Users },
      { title: "History and heritage", description: "Explore institutional milestones and the traditions that shape the school’s identity.", href: "/school/history", icon: Award },
    ],
  },
  academics: {
    eyebrow: "Academic life",
    title: "A coherent pathway from foundational learning to advanced study.",
    intro: "The academic programme is organised to help students understand what they are learning, why it matters, and how their choices influence future opportunities.",
    sections: [
      {
        title: "Curriculum and teaching",
        body: "Teaching and learning should give students a secure foundation in core subjects while also encouraging questioning, application, and independent study. Curriculum information on this site will be maintained by academic departments and updated as subject offerings change.",
        items: ["Core literacy, numeracy, science, and humanities learning", "Practical application through projects, laboratories, and fieldwork", "Academic support, revision guidance, and structured study habits"],
      },
      {
        title: "Ordinary Level",
        body: "Ordinary Level learners develop breadth across the curriculum while building the knowledge, habits, and confidence needed for national examinations and future study. Families should use the subject combination guidance and admissions office contacts when planning a student’s programme.",
        items: ["Form 1 to Form 4 academic progression", "Subject selection and examination preparation", "Continuous feedback and targeted academic support"],
      },
      {
        title: "Advanced Level",
        body: "Advanced Level study requires sustained commitment, deeper subject knowledge, and a clear sense of academic purpose. Students are supported in developing the independence needed for higher education, professional pathways, and responsible citizenship.",
        items: ["Form 5 to Form 6 specialisation", "Subject combinations aligned to student goals", "Guidance on examination preparation and further study"],
      },
      {
        title: "Assessment and results",
        body: "Assessment information should help students and families understand progress, identify areas for improvement, and plan the next stage of learning. Official result summaries and school-approved performance records will be published through the information centre when available.",
      },
    ],
    cards: [
      { title: "Curriculum guide", description: "Read the principles, subjects, and support structures that organise learning at the school.", href: "/academics/curriculum", icon: Library },
      { title: "Subject combinations", description: "Review the pathways available at Ordinary and Advanced Level before making a choice.", href: "/academics/subject-combinations", icon: BookOpen },
      { title: "Examination results", description: "Access approved academic performance records and explanatory context.", href: "/academics/results", icon: Award },
    ],
  },
  admissions: {
    eyebrow: "Admissions",
    title: "A clear, accountable route into the Shongamiti community.",
    intro: "The admissions portal is designed to help families understand the process before they begin, prepare the required information, and receive a clear record of their application.",
    sections: [
      {
        title: "Entry requirements",
        body: "Entry requirements vary by level and available places. Applicants should review the published guidance carefully and contact the admissions office if a document, result, or circumstance requires clarification.",
        items: ["Completed application information", "Previous school and academic records", "Guardian contact and consent information", "Required identity and supporting documents"],
      },
      {
        title: "Application process",
        body: "The online application is organised as a guided sequence. Applicants can save their progress, return to a draft, review their information, and submit only when the record is complete. After submission, the school can review the application and communicate next steps using its defined workflow.",
        items: ["Prepare information and supporting documents", "Complete the guided application", "Review and submit for consideration", "Track status using the application reference number"],
      },
      {
        title: "Fees and financial information",
        body: "Official fee schedules, payment instructions, and financial policies should be published only after approval by the school administration. This portal provides the structure for those documents without inventing amounts or commitments.",
      },
      {
        title: "A careful approach to student information",
        body: "Application records and uploaded documents are handled through restricted systems. Families should submit information only through the official portal, confirm that their contact details are correct, and retain their application reference number for future correspondence.",
      },
    ],
    cards: [
      { title: "Entry requirements", description: "Read the information families should prepare before beginning an application.", href: "/admissions/requirements", icon: ShieldCheck },
      { title: "Document requirements", description: "Review the categories of records that may be requested during the admissions process.", href: "/admissions/documents", icon: FileText },
      { title: "Apply online", description: "Start a guided application, save progress, and receive a reference number.", href: "/admissions/apply", icon: ClipboardCheck },
    ],
  },
  "student-life": {
    eyebrow: "Student life",
    title: "Learning continues through belonging, discipline, and contribution.",
    intro: "A strong student experience gives learners meaningful ways to participate, lead, compete, create, and receive support beyond the formal curriculum.",
    sections: [
      {
        title: "Sport and physical development",
        body: "Sport develops teamwork, resilience, discipline, and healthy routines. The school’s sports programme provides structured opportunities for participation and competition while recognising that every learner should have a place in the community.",
        items: ["Football and basketball programmes", "Athletics and fitness development", "Teamwork, discipline, and fair play"],
      },
      {
        title: "Houses, clubs, and societies",
        body: "Houses and societies create smaller communities within the school. They give students opportunities to build relationships, practise leadership, develop interests, and contribute to school events.",
        items: ["Student-led activities and service", "Academic, cultural, and creative societies", "House competitions and community events"],
      },
      {
        title: "Guidance and counselling",
        body: "Students should know where to turn when they need support with academic decisions, relationships, wellbeing, or future planning. The school’s support structures will be documented here with appropriate contact routes and safeguarding information.",
      },
      {
        title: "Student leadership",
        body: "Leadership is developed through responsibility, listening, and service. Student representatives help strengthen communication between learners, staff, and the wider school community.",
      },
    ],
    cards: [
      { title: "Sports and athletics", description: "Explore participation, training, competitions, and the role of sport in school life.", href: "/student-life/sports", icon: Sparkles },
      { title: "Guidance and counselling", description: "Find the support principles and routes available to students and families.", href: "/student-life/guidance", icon: HeartHandshake },
      { title: "Student leadership", description: "Understand how learners contribute to school decision-making and community life.", href: "/student-life/leadership", icon: Users },
    ],
  },
  "information-centre": {
    eyebrow: "Information centre",
    title: "The official reference point for families and the school community.",
    intro: "The information centre brings together notices, documents, dates, policies, and approved records so families can find practical information without depending on informal channels.",
    sections: [
      {
        title: "Announcements and notices",
        body: "Announcements should be dated, clearly titled, and written so that a family can understand the action required. Older notices remain useful when they are archived with the term or year they belong to.",
        items: ["Term notices and office updates", "Examination and assessment communications", "Event and community announcements"],
      },
      {
        title: "Documents and circulars",
        body: "The document centre is intended for official school publications, including prospectuses, circulars, forms, calendars, and approved guidance. Each document should display its publication date and the office responsible for maintaining it.",
        items: ["Prospectus and admissions guidance", "School calendar and term information", "Parent and guardian circulars", "Downloadable forms and notices"],
      },
      {
        title: "Policies and accountability",
        body: "Policies help families understand the standards and procedures that support a safe, fair, and effective school environment. Published policies should be approved, versioned, and reviewed on a defined schedule.",
      },
    ],
    cards: [
      { title: "Announcements", description: "Read the latest official notices and dated updates from the school.", href: "/information-centre/announcements", icon: Megaphone },
      { title: "Documents", description: "Browse the document library for forms, circulars, calendars, and guidance.", href: "/information-centre/documents", icon: FileText },
      { title: "Policies", description: "Review the standards and procedures that guide the school community.", href: "/information-centre/policies", icon: ShieldCheck },
    ],
  },
};

export const informationItems = [
  { title: "2026 admissions guidance", type: "Admissions document", date: "Published for review", icon: FileText },
  { title: "Term dates and school calendar", type: "Calendar", date: "Academic year reference", icon: CalendarDays },
  { title: "Parent and guardian circulars", type: "Circulars", date: "Official communication", icon: Megaphone },
  { title: "Student conduct and appearance", type: "Policy", date: "School standards", icon: ShieldCheck },
  { title: "Academic departments and subjects", type: "Academic guide", date: "Curriculum reference", icon: Library },
  { title: "School history and milestones", type: "Heritage record", date: "Institutional reference", icon: Building2 },
];

export const staffDashboardStats = [
  { label: "Applications received", value: "24", detail: "Across current intake periods", icon: ClipboardCheck },
  { label: "Awaiting review", value: "08", detail: "Records requiring staff attention", icon: FileText },
  { label: "Documents verified", value: "71", detail: "Uploaded records checked", icon: ShieldCheck },
  { label: "Published notices", value: "12", detail: "Information centre items", icon: Megaphone },
];

export const demoApplications = [
  { reference: "SHA-2026-8F2K9A", student: "Pending applicant record", level: "Ordinary Level", status: "Under review", date: "Awaiting staff action" },
  { reference: "SHA-2026-3M7Q1B", student: "Submitted applicant record", level: "Advanced Level", status: "Submitted", date: "Ready for verification" },
  { reference: "SHA-2026-5R4T8C", student: "Verified applicant record", level: "Ordinary Level", status: "Approved", date: "Decision recorded" },
];
