import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Eye, Heart, Lightbulb } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To provide quality education that develops well-rounded individuals capable of excelling academically and contributing positively to society.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To be the leading institution of academic excellence in Zimbabwe, nurturing future leaders with integrity, discipline, and knowledge.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description:
      "Excellence, Discipline, Integrity, Respect, and Community. These pillars guide every aspect of our educational journey.",
  },
  {
    icon: Lightbulb,
    title: "Our Approach",
    description:
      "Merit-based education with personalized attention, ensuring each student reaches their full potential through dedicated teaching.",
  },
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Discover Our Legacy
          </span>
          <h2 className="section-title mt-3 mb-6">
            About <span className="text-gradient-gold">Shongamiti</span>
          </h2>
          <p className="section-subtitle mx-auto">
            For decades, Shongamiti High School has been a beacon of educational 
            excellence in the Chivi District, transforming young minds into future leaders.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              Located in the heart of Masvingo Province, Shongamiti High School 
              stands as a testament to quality education in rural Zimbabwe. Our 
              institution combines traditional values with modern teaching 
              methodologies to prepare students for the challenges of tomorrow.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our merit-based class placement system—West, East, North, South, 
              and Central—ensures that every student is challenged appropriately 
              and given opportunities to excel. With West representing our highest 
              achievers, we motivate all students to strive for excellence.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="text-center">
                <span className="text-4xl font-display font-bold text-primary">95%</span>
                <p className="text-sm text-muted-foreground">Pass Rate</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <span className="text-4xl font-display font-bold text-primary">500+</span>
                <p className="text-sm text-muted-foreground">Students</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <span className="text-4xl font-display font-bold text-primary">50+</span>
                <p className="text-sm text-muted-foreground">Staff Members</p>
              </div>
            </div>
          </motion.div>

          {/* Image/Decorative Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-secondary 
                            rounded-3xl rotate-6 opacity-20" />
              <div className="absolute inset-0 bg-secondary rounded-3xl shadow-elevated 
                            flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/20 
                                flex items-center justify-center">
                    <Target className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-secondary-foreground mb-3">
                    Excellence Since Establishment
                  </h3>
                  <p className="text-secondary-foreground/70">
                    Shaping Zimbabwe's future, one student at a time
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="card-elevated p-6 group hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 
                            group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <value.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                {value.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
