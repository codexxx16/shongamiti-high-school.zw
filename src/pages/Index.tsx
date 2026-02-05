import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Academics } from "@/components/Academics";
import { Sports } from "@/components/Sports";
import { Rules } from "@/components/Rules";
import { Staff } from "@/components/Staff";
import { WhyChoose } from "@/components/WhyChoose";
import { Achievements } from "@/components/Achievements";
import { Announcements } from "@/components/Announcements";
import { Enrollment } from "@/components/Enrollment";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Academics />
      <Sports />
      <Rules />
      <Staff />
      <WhyChoose />
      <Achievements />
      <Enrollment />
      <Announcements />
      <Footer />
    </div>
  );
};

export default Index;
