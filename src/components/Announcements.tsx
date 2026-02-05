import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Bell, MessageCircle, Clock, ArrowRight } from "lucide-react";

export const Announcements = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="announcements" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] 
                     bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Stay Updated
          </span>
          <h2 className="section-title mt-3 mb-6">
            <span className="text-gradient-gold">Announcements</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Coming Soon Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card-elevated p-8 md:p-12 text-center mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 
                        flex items-center justify-center"
            >
              <Bell className="w-10 h-10 text-primary" />
            </motion.div>
            
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold">Coming Soon</span>
            </div>
            
            <h3 className="text-2xl font-display font-bold mb-4">
              Announcements Feature
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Stay tuned! We're building a comprehensive announcements system to keep 
              parents and students informed about school events, news, and important updates.
            </p>

            {/* Progress indicator */}
            <div className="w-full max-w-xs mx-auto mb-8">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Development Progress</span>
                <span>Coming Soon</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "60%" } : {}}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full gold-gradient rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* WhatsApp Community Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <p className="text-muted-foreground mb-4">
              In the meantime, join our WhatsApp community for updates:
            </p>
            <a
              href="https://wa.me/263782404426"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 bg-primary hover:bg-primary/90 
                       text-primary-foreground font-semibold rounded-xl transition-all duration-300 
                       hover:scale-105 hover:shadow-lg group"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Join WhatsApp Community</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
