import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import profileImg from "@/assets/profile.jpeg";

const ROLES = [
  "Full Stack Web Developer",
  "React.js Specialist",
  "UI/UX Enthusiast",
  "Problem Solver",
];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 65);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(174 72% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(174 72% 50%) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full bg-primary/8 blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/40 to-[hsl(190,80%,60%)]/40 blur-md scale-110" />
            <img
              src={profileImg}
              alt="M. Aayan Qasim"
              className="relative w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-2 border-primary/40 shadow-2xl"
            />
            <span
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-background shadow"
              title="Available for work"
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-primary font-mono text-sm tracking-[0.3em] uppercase mb-3"
        >
          👋 Hello, I'm
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-4"
        >
          M. Aayan <span className="text-gradient">Qasim</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xl md:text-2xl text-muted-foreground font-light mb-3 h-9 flex items-center justify-center"
        >
          <span className="text-primary/80 font-mono">{displayed}</span>
          <span className="ml-0.5 w-0.5 h-6 bg-primary animate-pulse inline-block" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="text-muted-foreground max-w-xl mx-auto mb-10 text-base md:text-lg leading-relaxed"
        >
          Building responsive, high-performance web applications with clean code and great user
          experiences. Based in{" "}
          <span className="text-foreground font-medium">Islamabad, Pakistan</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <a
            href="/Aayan_Qasim.pdf"
            download
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
          >
            <Download size={18} />
            Download CV
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-primary/40 text-primary font-semibold hover:bg-primary/10 transition-all hover:-translate-y-0.5"
          >
            <Mail size={18} />
            Hire Me
          </a>
        </motion.div>

        {/* Scroll Arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <a
            href="#about"
            className="text-muted-foreground hover:text-primary transition-colors animate-bounce block"
          >
            <ArrowDown size={24} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
