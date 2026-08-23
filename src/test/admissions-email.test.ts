import { admissionsEmail, buildApplicationEmail } from "@/lib/admissionsEmail";

describe("admissions email handoff", () => {
  it("targets the school inbox and pre-fills both mail destinations", () => {
    const packet = buildApplicationEmail({
      applicantEmail: "guardian@example.com",
      applicantPhone: "+263 78 000 0000",
      studentName: "Test Applicant",
      guardianName: "Test Guardian",
      guardianRelationship: "Parent or legal guardian",
      requestedLevel: "Ordinary Level",
      requestedForm: "Form 1",
      previousSchool: "Test Primary School",
      academicSummary: "Strong academic record.",
      address: "Chivi, Zimbabwe",
      files: ["birth-certificate.pdf"],
      reference: "SHA-2026-TEST01",
      trackingCode: "TESTTRACKING1234",
    });

    expect(packet.to).toBe(admissionsEmail);
    expect(packet.mailto).toContain(`mailto:${admissionsEmail}?subject=`);
    expect(packet.gmail).toContain(`to=${encodeURIComponent(admissionsEmail)}`);
    expect(packet.mailto).toContain(`subject=${encodeURIComponent(packet.subject)}`);
    expect(packet.gmail).toContain(`su=${encodeURIComponent(packet.subject)}`);
    expect(decodeURIComponent(packet.body)).toContain("Please attach the supporting records listed above before sending this email.");
  });
});
