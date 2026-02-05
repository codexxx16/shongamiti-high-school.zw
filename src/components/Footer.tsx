import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Phone, ExternalLink, Heart } from "lucide-react";
import schoolLogo from "@/assets/school-logo.jpg";

export const Footer = () => {
  return (
    <footer id="footer" className="bg-secondary pt-16 pb-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", 
                      backgroundSize: "30px 30px" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={schoolLogo}
                alt="Shongamiti High School"
                className="w-12 h-12 rounded-full object-cover border-2 border-primary"
              />
              <div>
                <h3 className="text-secondary-foreground font-display font-bold text-lg">
                  Shongamiti High
                </h3>
                <p className="text-primary text-xs font-medium italic">
                  Striving For Excellence
                </p>
              </div>
            </div>
            <p className="text-secondary-foreground/70 text-sm leading-relaxed">
              Nurturing future leaders through quality education, discipline, 
              and a commitment to excellence in Chivi District, Zimbabwe.
            </p>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-secondary-foreground font-display font-semibold text-lg mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:ShongamitiHS@gmail.com"
                  className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary 
                           transition-colors text-sm group"
                >
                  <Mail className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  ShongamitiHS@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/27746084190"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary 
                           transition-colors text-sm group"
                >
                  <Phone className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  School Clerk (WhatsApp)
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Chivi+District+Masvingo+Zimbabwe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-secondary-foreground/70 hover:text-primary 
                           transition-colors text-sm group"
                >
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5 
                                   group-hover:scale-110 transition-transform" />
                  <span>Masvingo, Chivi District, Zimbabwe</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* School Hours Column */}
          <div>
            <h4 className="text-secondary-foreground font-display font-semibold text-lg mb-4">
              School Hours
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-secondary-foreground/70">
                <Clock className="w-4 h-4 text-primary" />
                <span>Entry: 6:30 AM</span>
              </li>
              <li className="flex items-center gap-3 text-secondary-foreground/70">
                <Clock className="w-4 h-4 text-primary" />
                <span>Classes Start: 7:00 AM</span>
              </li>
              <li className="flex items-center gap-3 text-secondary-foreground/70">
                <Clock className="w-4 h-4 text-primary" />
                <span>Periods: 35 min each</span>
              </li>
              <li className="flex items-center gap-3 text-secondary-foreground/70">
                <Clock className="w-4 h-4 text-primary" />
                <span>Break: 10:30 – 10:50 AM</span>
              </li>
              <li className="flex items-center gap-3 text-secondary-foreground/70">
                <Clock className="w-4 h-4 text-primary" />
                <span>Lunch: 1:10 – 2:10 PM</span>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-secondary-foreground font-display font-semibold text-lg mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {["About", "Academics", "Sports", "Rules", "Staff", "Enrollment"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-secondary-foreground/70 hover:text-primary transition-colors 
                             hover:pl-2 duration-300 block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-secondary-foreground/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-secondary-foreground/50 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Shongamiti High School. All rights reserved.
            </p>
            <p className="text-secondary-foreground/50 text-sm flex items-center gap-1">
              Built with <Heart className="w-4 h-4 text-destructive animate-pulse" /> for Education
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
