import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, AlertTriangle, Clock, Smartphone, Scissors, Heart, MapPin } from "lucide-react";

const rules = [
  {
    icon: Smartphone,
    number: 1,
    rule: "No cellphones on school premises.",
    severity: "strict",
  },
  {
    icon: Scissors,
    number: 2,
    rule: "No makeup, powders, or cosmetics are permitted.",
    severity: "moderate",
  },
  {
    icon: Scissors,
    number: 3,
    rule: "All students must maintain clean-shaven heads (bald).",
    severity: "strict",
  },
  {
    icon: Clock,
    number: 4,
    rule: "Students must arrive by 6:30 AM. School closes at 4:00 PM, with optional teacher-supervised study until 6:00 PM.",
    severity: "moderate",
  },
  {
    icon: Heart,
    number: 5,
    rule: "Romantic relationships between students and teachers are strictly prohibited. Violations result in expulsion for both parties.",
    severity: "critical",
  },
  {
    icon: MapPin,
    number: 6,
    rule: "Students are prohibited from visiting Shongamiti Shopping Center during school days. Limited visits are permitted on weekends only.",
    severity: "moderate",
  },
];

const getSeverityStyles = (severity: string) => {
  switch (severity) {
    case "critical":
      return "border-destructive/30 bg-destructive/5";
    case "strict":
      return "border-primary/30 bg-primary/5";
    default:
      return "border-border bg-card";
  }
};

export const Rules = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="rules" className="py-20 md:py-32 bg-muted/30 relative">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Code of Conduct
          </span>
          <h2 className="section-title mt-3 mb-6">
            School <span className="text-gradient-gold">Regulations</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Discipline is the foundation of excellence. Our rules ensure a safe, 
            focused, and respectful learning environment for all students.
          </p>
        </motion.div>

        {/* Principal's Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="card-elevated p-6 md:p-8 border-l-4 border-l-primary">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold mb-2">
                  Message from the Headmaster
                </h3>
                <p className="text-muted-foreground italic">
                  "At Shongamiti High School, we believe that discipline is not a restriction 
                  but a pathway to success. These rules have been carefully established to 
                  create an environment where every student can thrive academically and 
                  personally. Adherence to these guidelines is non-negotiable."
                </p>
                <p className="text-primary font-semibold mt-3">— Mr. Svosvera Andrew, Headmaster</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Rules Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="card-elevated overflow-hidden"
        >
          <div className="p-4 md:p-6 bg-secondary">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-secondary-foreground" />
              <h3 className="text-lg font-display font-semibold text-secondary-foreground">
                School Rules & Regulations
              </h3>
            </div>
          </div>

          <div className="divide-y divide-border">
            {rules.map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className={`p-4 md:p-6 flex items-start gap-4 hover:bg-muted/50 
                          transition-colors ${getSeverityStyles(item.severity)}`}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 
                              flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-primary font-bold text-lg font-display">
                      Rule {item.number}
                    </span>
                    {item.severity === "critical" && (
                      <span className="px-2 py-0.5 bg-destructive/20 text-destructive 
                                     text-xs font-semibold rounded-full uppercase">
                        Critical
                      </span>
                    )}
                    {item.severity === "strict" && (
                      <span className="px-2 py-0.5 bg-primary/20 text-primary 
                                     text-xs font-semibold rounded-full uppercase">
                        Strict
                      </span>
                    )}
                  </div>
                  <p className="text-foreground leading-relaxed">{item.rule}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-muted-foreground text-sm mt-8"
        >
          Violation of school rules may result in disciplinary action, including suspension or expulsion.
        </motion.p>
      </div>
    </section>
  );
};
