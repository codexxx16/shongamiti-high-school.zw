export const admissionsEmail = "admissions@shongamiti-high-school.zw";

export type ApplicationEmailData = {
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
  files: string[];
  reference: string;
  trackingCode: string;
};

export function buildApplicationEmail(data: ApplicationEmailData) {
  const subject = `Shongamiti High School application ${data.reference}`;
  const body = [
    "SHONGAMITI HIGH SCHOOL",
    "ONLINE ADMISSIONS APPLICATION",
    "",
    `Application reference: ${data.reference}`,
    `Private tracking code: ${data.trackingCode || "Will be issued by the portal"}`,
    "",
    "APPLICANT DETAILS",
    `Student full name: ${data.studentName}`,
    `Requested level: ${data.requestedLevel}`,
    `Requested form: ${data.requestedForm}`,
    `Previous school: ${data.previousSchool}`,
    `Academic summary: ${data.academicSummary}`,
    "",
    "GUARDIAN DETAILS",
    `Parent or guardian: ${data.guardianName}`,
    `Relationship: ${data.guardianRelationship}`,
    `Applicant email: ${data.applicantEmail}`,
    `Applicant phone: ${data.applicantPhone}`,
    `Residential address: ${data.address}`,
    "",
    "SUPPORTING RECORDS",
    data.files.length ? data.files.map((file, index) => `${index + 1}. ${file}`).join("\n") : "No files selected in the portal.",
    "",
    "DECLARATION",
    "The applicant confirms that the information supplied through the Shongamiti High School admissions portal is accurate and may be used by the school to assess this application and communicate with the named guardian.",
    "",
    "Please attach the supporting records listed above before sending this email.",
  ].join("\n");
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  return {
    subject,
    body,
    mailto: `mailto:${admissionsEmail}?subject=${encodedSubject}&body=${encodedBody}`,
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(admissionsEmail)}&su=${encodedSubject}&body=${encodedBody}`,
  };
}
