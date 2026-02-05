import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, User, Users, BookOpen, GraduationCap, Shirt } from "lucide-react";

const levels = ["Ordinary Level (Form 1-4)", "Advanced Level (Form 5-6)"];
const forms = {
  "Ordinary Level (Form 1-4)": ["Form 1", "Form 2", "Form 3", "Form 4"],
  "Advanced Level (Form 5-6)": ["Form 5", "Form 6"],
};
const grades = ["A", "B", "C", "D", "E", "U"];

const ordinarySubjects = [
  "Mathematics", "English", "Shona", "Science", "Geography", 
  "History", "Commerce", "Accounts", "Agriculture", "Computer Science"
];

const advancedSubjects = [
  "Mathematics", "Physics", "Chemistry", "Biology", "Geography",
  "History", "Economics", "Business Studies", "Accounting"
];

export const Enrollment = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({
    level: "",
    form: "",
    studentName: "",
    parentName: "",
    subjects: [] as { name: string; grade: string }[],
    uniform: "",
  });

  const [showClassModal, setShowClassModal] = useState(false);
  const [suggestedClass, setSuggestedClass] = useState("");

  const handleSubjectChange = (subject: string, grade: string) => {
    const existing = formData.subjects.find(s => s.name === subject);
    if (existing) {
      setFormData({
        ...formData,
        subjects: formData.subjects.map(s => 
          s.name === subject ? { ...s, grade } : s
        ),
      });
    } else {
      setFormData({
        ...formData,
        subjects: [...formData.subjects, { name: subject, grade }],
      });
    }
  };

  const calculateClass = () => {
    const gradePoints: { [key: string]: number } = { A: 5, B: 4, C: 3, D: 2, E: 1, U: 0 };
    const avgPoints = formData.subjects.reduce((acc, s) => acc + gradePoints[s.grade], 0) / 
                     Math.max(formData.subjects.length, 1);
    
    if (avgPoints >= 4.5) return "West (Top Class)";
    if (avgPoints >= 3.5) return "East";
    if (avgPoints >= 2.5) return "North";
    if (avgPoints >= 1.5) return "South";
    return "Central";
  };

  const handleCheckClass = () => {
    if (formData.subjects.length >= 3) {
      setSuggestedClass(calculateClass());
      setShowClassModal(true);
    }
  };

  const handleSubmit = () => {
    const message = encodeURIComponent(
      `🎓 SHONGAMITI HIGH SCHOOL ENROLLMENT\n\n` +
      `📚 Level: ${formData.level}\n` +
      `📖 Form: ${formData.form}\n` +
      `👤 Student: ${formData.studentName}\n` +
      `👨‍👩‍👧 Parent: ${formData.parentName}\n` +
      `📊 Subjects & Grades:\n${formData.subjects.map(s => `   • ${s.name}: ${s.grade}`).join('\n')}\n` +
      `👔 Uniform: ${formData.uniform}\n` +
      `🏫 Suggested Class: ${calculateClass()}\n\n` +
      `I would like to apply for enrollment at Shongamiti High School.`
    );
    window.open(`https://wa.me/263782404426?text=${message}`, '_blank');
  };

  const currentSubjects = formData.level.includes("Advanced") ? advancedSubjects : ordinarySubjects;

  return (
    <section id="enrollment" className="py-20 md:py-32 bg-background relative">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Join Our Family
          </span>
          <h2 className="section-title mt-3 mb-6">
            Student <span className="text-gradient-gold">Enrollment</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Begin your journey at Shongamiti High School. Fill out the form below 
            and our clerk will guide you through the enrollment process.
          </p>
        </motion.div>

        {/* Enrollment Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="card-elevated p-6 md:p-8">
            <div className="space-y-6">
              {/* Level Selection */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-3">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  Select Level
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {levels.map((level) => (
                    <button
                      key={level}
                      onClick={() => setFormData({ ...formData, level, form: "", subjects: [] })}
                      className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                        formData.level === level
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="font-medium">{level}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Selection */}
              {formData.level && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <label className="flex items-center gap-2 text-sm font-medium mb-3">
                    <BookOpen className="w-4 h-4 text-primary" />
                    Select Form
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {forms[formData.level as keyof typeof forms].map((form) => (
                      <button
                        key={form}
                        onClick={() => setFormData({ ...formData, form })}
                        className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                          formData.form === form
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        {form}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Student & Parent Names */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2">
                    <User className="w-4 h-4 text-primary" />
                    Student Name(s)
                  </label>
                  <input
                    type="text"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="Full name"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background 
                             focus:border-primary focus:ring-2 focus:ring-primary/20 
                             transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2">
                    <Users className="w-4 h-4 text-primary" />
                    Parent/Guardian Name(s)
                  </label>
                  <input
                    type="text"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="Full name"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background 
                             focus:border-primary focus:ring-2 focus:ring-primary/20 
                             transition-all outline-none"
                  />
                </div>
              </div>

              {/* Subjects & Grades */}
              {formData.level && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <label className="flex items-center gap-2 text-sm font-medium mb-3">
                    <BookOpen className="w-4 h-4 text-primary" />
                    Subjects & Previous Grades (select at least 3)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto 
                                p-2 border border-border rounded-lg">
                    {currentSubjects.map((subject) => (
                      <div key={subject} className="flex items-center gap-2">
                        <span className="flex-1 text-sm">{subject}</span>
                        <select
                          value={formData.subjects.find(s => s.name === subject)?.grade || ""}
                          onChange={(e) => handleSubjectChange(subject, e.target.value)}
                          className="px-3 py-1.5 rounded border border-border bg-background 
                                   text-sm focus:border-primary outline-none"
                        >
                          <option value="">-</option>
                          {grades.map((grade) => (
                            <option key={grade} value={grade}>{grade}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                  
                  {formData.subjects.length >= 3 && (
                    <button
                      onClick={handleCheckClass}
                      className="mt-3 text-sm text-primary hover:underline"
                    >
                      Check probable class placement →
                    </button>
                  )}
                </motion.div>
              )}

              {/* Uniform Selection */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-3">
                  <Shirt className="w-4 h-4 text-primary" />
                  Uniform Preference
                </label>
                <select
                  value={formData.uniform}
                  onChange={(e) => setFormData({ ...formData, uniform: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background 
                           focus:border-primary focus:ring-2 focus:ring-primary/20 
                           transition-all outline-none"
                >
                  <option value="">Select uniform type</option>
                  <option value="O-Level Boys">O'Level Boys Uniform</option>
                  <option value="O-Level Girls">O'Level Girls Uniform</option>
                  <option value="A-Level Boys">A'Level Boys Uniform</option>
                  <option value="A-Level Girls">A'Level Girls Uniform</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!formData.level || !formData.form || !formData.studentName || 
                         !formData.parentName || formData.subjects.length < 3}
                className="w-full btn-gold py-4 text-lg flex items-center justify-center gap-2 
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                Apply via WhatsApp
              </button>
            </div>
          </div>
        </motion.div>

        {/* Class Suggestion Modal */}
        {showClassModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setShowClassModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-card rounded-2xl p-6 md:p-8 max-w-md w-full shadow-elevated"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 
                              flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-display font-bold mb-2">Probable Class Placement</h3>
                <p className="text-muted-foreground mb-4">
                  Based on your grades, you would likely be placed in:
                </p>
                <div className="px-6 py-4 bg-primary/10 rounded-xl mb-6">
                  <span className="text-2xl font-display font-bold text-primary">
                    {suggestedClass}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Final placement is determined by the school administration.
                </p>
                <button
                  onClick={() => setShowClassModal(false)}
                  className="btn-gold w-full"
                >
                  Got it!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
