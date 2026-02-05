import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { User, Award, BookOpen, Trophy } from "lucide-react";

const staffMembers = [
  {
    name: "Mr. Svosvera Andrew",
    role: "Headmaster",
    subjects: "School Administration",
    activity: "Leadership & Governance",
    isHeadmaster: true,
  },
  {
    name: "Mr. Muza",
    role: "Senior Teacher",
    subjects: "O'Level Mathematics",
    activity: "Sports Master",
    isHeadmaster: false,
  },
  {
    name: "Mr. Muzira",
    role: "Senior Teacher",
    subjects: "Sciences / Physics",
    activity: "Chess Trainer",
    isHeadmaster: false,
  },
  {
    name: "Mr. Musara",
    role: "Senior Teacher",
    subjects: "English Language",
    activity: "Soccer Trainer",
    isHeadmaster: false,
  },
  {
    name: "Mr. Mboma",
    role: "Teacher",
    subjects: "English Language & Literature",
    activity: "Debate Club",
    isHeadmaster: false,
  },
  {
    name: "Mr. Mafa",
    role: "Teacher",
    subjects: "Business Studies",
    activity: "Women's Soccer Trainer",
    isHeadmaster: false,
  },
];

export const Staff = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="staff" className="py-20 md:py-32 bg-background relative">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Our Team
          </span>
          <h2 className="section-title mt-3 mb-6">
            Meet Our <span className="text-gradient-gold">Staff</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Dedicated educators committed to nurturing the next generation of leaders.
          </p>
        </motion.div>

        {/* Headmaster Featured Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="card-elevated p-8 relative overflow-hidden group">
            {/* Gold accent */}
            <div className="absolute top-0 left-0 right-0 h-2 gold-gradient" />
            
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary to-primary/60 
                              flex items-center justify-center shadow-gold">
                  <User className="w-14 h-14 text-primary-foreground" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-secondary 
                              flex items-center justify-center border-4 border-card">
                  <Award className="w-5 h-5 text-secondary-foreground" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-display font-bold text-foreground mb-1">
                  Mr. Svosvera Andrew
                </h3>
                <p className="text-primary font-semibold mb-3">Headmaster</p>
                <p className="text-muted-foreground">
                  Leading Shongamiti High School with vision, integrity, and an unwavering 
                  commitment to academic excellence and student development.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staffMembers.filter(s => !s.isHeadmaster).map((staff, index) => (
            <motion.div
              key={staff.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="card-elevated p-6 group hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center 
                              group-hover:bg-primary/10 transition-colors duration-300">
                  <User className="w-7 h-7 text-muted-foreground group-hover:text-primary 
                                 transition-colors duration-300" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-1 
                               group-hover:text-primary transition-colors">
                    {staff.name}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-3">{staff.role}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen className="w-4 h-4 text-primary/70" />
                      <span>{staff.subjects}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Trophy className="w-4 h-4 text-primary/70" />
                      <span>{staff.activity}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Staff Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            And many more dedicated teachers and support staff...
          </p>
        </motion.div>
      </div>
    </section>
  );
};
