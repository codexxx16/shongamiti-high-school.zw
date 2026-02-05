import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Bus, Building2, BookMarked, Phone } from "lucide-react";

const achievements = [
  {
    icon: Bus,
    title: "School Bus",
    description: "A modern 75-seater bus for safe student transportation across the district.",
    highlight: "75 Seater Capacity",
  },
  {
    icon: Building2,
    title: "School Hall",
    description: "State-of-the-art assembly hall for events, performances, and gatherings.",
    highlight: "Multi-Purpose Facility",
  },
  {
    icon: BookMarked,
    title: "New Classroom Blocks",
    description: "Two recently constructed classroom blocks with modern learning facilities.",
    highlight: "2 New Blocks",
  },
];

export const Achievements = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="py-20 md:py-32 bg-muted/30 relative">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Growth & Development
          </span>
          <h2 className="section-title mt-3 mb-6">
            Recent <span className="text-gradient-gold">Developments</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Continuous investment in infrastructure to enhance the learning experience.
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {achievements.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="card-elevated p-6 text-center group hover:shadow-gold 
                       hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 
                            flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-10 h-10 text-primary" />
              </div>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm 
                             font-semibold rounded-full mb-4">
                {item.highlight}
              </span>
              <h3 className="text-xl font-display font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Fees Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="card-elevated p-6 md:p-8 text-center border-2 border-dashed border-primary/30">
            <Phone className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-display font-semibold mb-2">School Fees Inquiry</h3>
            <p className="text-muted-foreground mb-4">
              Fee structures vary by level and form. For accurate and current fee information, 
              please contact our school clerk directly.
            </p>
            <a
              href="https://wa.me/27746084190"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Contact School Clerk
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
