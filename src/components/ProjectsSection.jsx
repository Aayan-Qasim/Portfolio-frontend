import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading.jsx";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Personal Portfolio",
    desc: "Yeh portfolio website — React, Tailwind CSS, aur Framer Motion se bana. AI chatbot aur WhatsApp button bhi include hai.",
    techs: ["React", "Tailwind CSS", "Framer Motion", "Node.js"],
    github: "https://github.com/Aayan-Qasim",
    live: "#",
  },
  {
    title: "Weather App",
    desc: "Real-time weather application jo OpenWeatherMap API se data fetch karti hai. City search, temperature, humidity, aur conditions show karta hai.",
    techs: ["JavaScript", "REST API", "CSS3", "HTML5"],
    github: "https://github.com/Aayan-Qasim",
    live: "#",
  },
  {
    title: "Task Manager",
    desc: "CRUD task management app with local storage — add, edit, delete, aur filter tasks. Priority levels aur due dates bhi support karta hai.",
    techs: ["React", "JavaScript", "Bootstrap", "LocalStorage"],
    github: "https://github.com/Aayan-Qasim",
    live: "#",
  },
];

const ProjectsSection = () => (
  <section id="projects" className="section-padding bg-card/30">
    <div className="container mx-auto">
      <SectionHeading title="Projects" subtitle="Some things I've built" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-6 flex flex-col hover:border-primary/30 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <ExternalLink size={20} />
              </div>
              <div className="flex gap-3">
                {p.live !== "#" && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Live Demo"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
              {p.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 flex-1">{p.desc}</p>
            <div className="flex flex-wrap gap-2">
              {p.techs.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono px-2.5 py-1 rounded-full bg-primary/10 text-primary"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
