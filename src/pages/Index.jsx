import Navbar from "@/components/Navbar.jsx";
import HeroSection from "@/components/HeroSection.jsx";
import AboutSection from "@/components/AboutSection.jsx";
import SkillsSection from "@/components/SkillsSection.jsx";
import ExperienceSection from "@/components/ExperienceSection.jsx";
import ProjectsSection from "@/components/ProjectsSection.jsx";
import ContactSection from "@/components/ContactSection.jsx";
import Footer from "@/components/Footer.jsx";
import WhatsAppButton from "@/components/WhatsAppButton.jsx";
import AIChatWidget from "@/components/AIChatWidget.jsx";

const Index = () => (
  <main className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ExperienceSection />
    <ProjectsSection />
    <ContactSection />
    <Footer />
    <WhatsAppButton />
    <AIChatWidget />
  </main>
);

export default Index;
