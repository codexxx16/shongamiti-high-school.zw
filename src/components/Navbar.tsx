import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GraduationCap } from "lucide-react";
import schoolLogo from "@/assets/school-logo.jpg";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Academics", href: "#academics" },
  { name: "Sports", href: "#sports" },
  { name: "Rules", href: "#rules" },
  { name: "Staff", href: "#staff" },
  { name: "Contact", href: "#footer" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-secondary/95 backdrop-blur-md shadow-elevated py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src={schoolLogo}
                alt="Shongamiti High School Logo"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-primary shadow-gold"
              />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-secondary-foreground font-display text-lg md:text-xl font-bold leading-tight">
                Shongamiti High
              </h1>
              <p className="text-primary text-xs font-medium tracking-wider">
                Striving For Excellence
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative px-4 py-2 text-secondary-foreground/80 hover:text-primary 
                           font-medium text-sm transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary 
                               transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </motion.a>
            ))}
            <motion.a
              href="#enrollment"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="ml-4 btn-gold text-sm"
            >
              Enroll Now
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-secondary-foreground hover:text-primary transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-secondary/98 backdrop-blur-lg border-t border-primary/20"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setIsOpen(false)}
                  className="block text-secondary-foreground hover:text-primary 
                           font-medium text-lg transition-colors py-2 border-b border-primary/10"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#enrollment"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={() => setIsOpen(false)}
                className="block btn-gold text-center mt-4"
              >
                Enroll Now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
