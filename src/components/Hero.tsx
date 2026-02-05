import { motion } from "framer-motion";
import { MapPin, BookOpen, Award, ArrowDown } from "lucide-react";
import schoolLogo from "@/assets/school-logo.jpg";

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 hero-gradient">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] 
                       border border-primary/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] 
                       border border-primary/5 rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl animate-pulse-slow" />
              <img
                src={schoolLogo}
                alt="Shongamiti High School"
                className="relative w-28 h-28 md:w-36 md:h-36 rounded-full object-cover 
                         border-4 border-primary shadow-gold"
              />
            </div>
          </motion.div>

          {/* School Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold 
                     text-secondary-foreground mb-4 tracking-tight text-shadow"
          >
            Shongamiti{" "}
            <span className="text-gradient-gold">High School</span>
          </motion.h1>

          {/* Motto */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl lg:text-3xl text-primary font-display italic mb-6"
          >
            "Striving For Excellence"
          </motion.p>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center gap-2 text-secondary-foreground/70 mb-10"
          >
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-lg">Masvingo, Chivi District, Zimbabwe</span>
          </motion.div>

          {/* Quick Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-3xl mb-12"
          >
            <div className="glass-effect rounded-xl p-5 text-center group hover:bg-primary/20 transition-all duration-300">
              <BookOpen className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-secondary-foreground font-semibold mb-1">Ordinary Level</h3>
              <p className="text-secondary-foreground/60 text-sm">Form 1 - Form 4</p>
            </div>
            <div className="glass-effect rounded-xl p-5 text-center group hover:bg-primary/20 transition-all duration-300">
              <Award className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-secondary-foreground font-semibold mb-1">Advanced Level</h3>
              <p className="text-secondary-foreground/60 text-sm">Form 5 - Form 6</p>
            </div>
            <div className="glass-effect rounded-xl p-5 text-center group hover:bg-primary/20 transition-all duration-300">
              <Award className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-secondary-foreground font-semibold mb-1">Merit-Based Classes</h3>
              <p className="text-secondary-foreground/60 text-sm">West • East • North • South • Central</p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="#enrollment" className="btn-gold text-lg px-8 py-4">
              Apply for Enrollment
            </a>
            <a
              href="#about"
              className="btn-navy text-lg px-8 py-4 border-2 border-primary/30 hover:border-primary"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-secondary-foreground/50"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};
