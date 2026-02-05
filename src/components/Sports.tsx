import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Users, Timer, Star } from "lucide-react";

const sports = [
  {
    name: "Basketball",
    icon: "🏀",
    description: "Competitive basketball teams for both boys and girls, participating in inter-school tournaments.",
    color: "from-orange-500 to-red-500",
  },
  {
    name: "Soccer",
    icon: "⚽",
    description: "Premier football program with dedicated coaching staff and regular league matches.",
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "Chess",
    icon: "♟️",
    description: "Strategic minds program developing critical thinking through competitive chess.",
    color: "from-slate-600 to-slate-800",
  },
  {
    name: "Athletics",
    icon: "🏃",
    description: "Track and field excellence with training in sprints, long distance, and field events.",
    color: "from-blue-500 to-indigo-600",
  },
];

export const Sports = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sports" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
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
            Sports & Athletics
          </span>
          <h2 className="section-title mt-3 mb-6">
            Building <span className="text-gradient-gold">Champions</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Excellence extends beyond the classroom. Our sports programs develop 
            teamwork, discipline, and physical fitness.
          </p>
        </motion.div>

        {/* Sports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sports.map((sport, index) => (
            <motion.div
              key={sport.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <div className="card-elevated h-full p-6 relative overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${sport.color} opacity-0 
                              group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="text-5xl mb-4 inline-block"
                >
                  {sport.icon}
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-primary 
                             transition-colors duration-300">
                  {sport.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {sport.description}
                </p>

                {/* Bottom accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${sport.color} 
                              transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
        >
          {[
            { icon: Trophy, label: "Championships", value: "15+" },
            { icon: Users, label: "Athletes", value: "200+" },
            { icon: Timer, label: "Training Hours/Week", value: "20" },
            { icon: Star, label: "Regional Titles", value: "8" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="bg-secondary/5 rounded-xl p-6 text-center group hover:bg-primary/10 
                       transition-colors duration-300"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 
                                   transition-transform duration-300" />
              <div className="text-2xl font-display font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
