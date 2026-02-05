import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { BookOpen, GraduationCap, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";

const ordinaryLevelSubjects = [
  "Mathematics", "English Language", "Shona", "Science", "Geography", 
  "History", "Commerce", "Accounts", "Agriculture", "Computer Science",
  "Physical Education", "Religious Studies", "Art", "Music"
];

const advancedLevelSubjects = [
  "Mathematics", "Physics", "Chemistry", "Biology", "Geography",
  "History", "Economics", "Business Studies", "Accounting", "Computer Science",
  "English Literature", "Divinity"
];

const performanceData = [
  { year: "2024", level: "O'Level", subjects: "Mathematics, English, Science", passRate: 92 },
  { year: "2024", level: "A'Level", subjects: "Sciences", passRate: 88 },
  { year: "2023", level: "O'Level", subjects: "Mathematics, English, Science", passRate: 90 },
  { year: "2023", level: "A'Level", subjects: "Arts & Commercials", passRate: 85 },
];

export const Academics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedLevel, setExpandedLevel] = useState<string | null>("ordinary");

  return (
    <section id="academics" className="py-20 md:py-32 bg-muted/30 relative">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Academic Excellence
          </span>
          <h2 className="section-title mt-3 mb-6">
            Our <span className="text-gradient-gold">Curriculum</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Comprehensive ZIMSEC curriculum from Ordinary to Advanced Level, 
            preparing students for university and beyond.
          </p>
        </motion.div>

        {/* Performance Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card-elevated p-6 md:p-8 mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-display font-semibold">ZIMSEC Performance Records</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 px-4 text-muted-foreground font-medium">Year</th>
                  <th className="py-3 px-4 text-muted-foreground font-medium">Level</th>
                  <th className="py-3 px-4 text-muted-foreground font-medium">Subject Combination</th>
                  <th className="py-3 px-4 text-muted-foreground font-medium">Pass Rate</th>
                </tr>
              </thead>
              <tbody>
                {performanceData.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-4 px-4 font-medium">{row.year}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        row.level === "A'Level" 
                          ? "bg-primary/20 text-primary" 
                          : "bg-secondary/20 text-secondary"
                      }`}>
                        {row.level}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{row.subjects}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${row.passRate}%` } : {}}
                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                            className="h-full bg-primary rounded-full"
                          />
                        </div>
                        <span className="font-semibold text-primary">{row.passRate}%</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ordinary Level */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card-elevated overflow-hidden"
          >
            <button
              onClick={() => setExpandedLevel(expandedLevel === "ordinary" ? null : "ordinary")}
              className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-display font-semibold">Ordinary Level</h3>
                  <p className="text-sm text-muted-foreground">Form 1 - Form 4</p>
                </div>
              </div>
              {expandedLevel === "ordinary" ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
            {expandedLevel === "ordinary" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-6 pb-6"
              >
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                  {ordinaryLevelSubjects.map((subject, index) => (
                    <motion.span
                      key={subject}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.03 }}
                      className="px-3 py-1.5 bg-muted rounded-lg text-sm text-foreground 
                               hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                    >
                      {subject}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Advanced Level */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="card-elevated overflow-hidden"
          >
            <button
              onClick={() => setExpandedLevel(expandedLevel === "advanced" ? null : "advanced")}
              className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-display font-semibold">Advanced Level</h3>
                  <p className="text-sm text-muted-foreground">Form 5 - Form 6</p>
                </div>
              </div>
              {expandedLevel === "advanced" ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
            {expandedLevel === "advanced" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-6 pb-6"
              >
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                  {advancedLevelSubjects.map((subject, index) => (
                    <motion.span
                      key={subject}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.03 }}
                      className="px-3 py-1.5 bg-primary/10 rounded-lg text-sm text-primary 
                               hover:bg-primary/20 transition-colors cursor-default font-medium"
                    >
                      {subject}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
