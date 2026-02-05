import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Shield, Target, Users, Check } from "lucide-react";

const reasons = [
  {
    icon: GraduationCap,
    title: "Proven Academic Excellence",
    description: "Consistently high ZIMSEC pass rates across both Ordinary and Advanced Levels.",
    highlights: ["95%+ O'Level Pass Rate", "Top A'Level Results", "University Placement Success"],
  },
  {
    icon: Shield,
    title: "Strong Discipline Culture",
    description: "Our structured environment ensures focused learning and character development.",
    highlights: ["Safe Learning Environment", "Respectful Community", "Zero Tolerance for Misconduct"],
  },
  {
    icon: Target,
    title: "Mission-Driven Education",
    description: "Every decision we make is guided by our commitment to student success.",
    highlights: ["Holistic Development", "Future-Ready Skills", "Value-Based Education"],
  },
  {
    icon: Users,
    title: "Experienced Faculty",
    description: "Dedicated teachers with years of experience in Zimbabwean education.",
    highlights: ["Qualified Educators", "Personalized Attention", "Continuous Development"],
  },
];

export const WhyChoose = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-32 bg-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", 
                      backgroundSize: "40px 40px" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Why Shongamiti?
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold 
                       text-secondary-foreground mt-3 mb-6">
            Choose <span className="text-gradient-gold">Excellence</span>
          </h2>
          <p className="text-lg md:text-xl text-secondary-foreground/70 max-w-2xl mx-auto">
            Join a community dedicated to academic achievement, 
            personal growth, and preparing students for brighter futures.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="bg-secondary-foreground/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 
                       border border-secondary-foreground/10 hover:border-primary/50 
                       transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center 
                              flex-shrink-0 group-hover:bg-primary/30 group-hover:scale-110 
                              transition-all duration-300">
                  <reason.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-display font-semibold text-secondary-foreground mb-2 
                               group-hover:text-primary transition-colors">
                    {reason.title}
                  </h3>
                  <p className="text-secondary-foreground/70 mb-4">
                    {reason.description}
                  </p>
                  <ul className="space-y-2">
                    {reason.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-2 text-sm text-secondary-foreground/80">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a href="#enrollment" className="btn-gold text-lg px-10 py-4 inline-flex items-center gap-2">
            Begin Your Journey
            <GraduationCap className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
