import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading.jsx";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "SkyPulse Website",
    desc: "SkyPulse's official website — modern design, smooth animations, and fully responsive. Effectively presents brand identity and services.",
    techs: ["React", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/Aayan-Qasim",
    live: "#",
    image: "https://images.unsplash.com/photo-1504608524841-42584120d094?w=600&q=80", // sky/clouds placeholder
  },
  {
    title: "Sky Coaching LMS Portal",
    desc: "Learning Management System for Sky Coaching — students can enroll in courses, watch lectures, and track their progress in real time.",
    techs: ["React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/Aayan-Qasim",
    live: "#",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80", // e-learning placeholder
  },
  {
    title: "SM Networking",
    desc: "A social media networking platform — users can connect with each other, share posts, and send real-time messages.",
    techs: ["React", "Firebase", "Tailwind CSS", "WebSockets"],
    github: "https://github.com/Aayan-Qasim",
    live: "#",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80", // social media placeholder
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
            className="glass rounded-xl overflow-hidden flex flex-col hover:border-primary/30 transition-colors group"
          >
            {/* Project Image */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Card Content */}
            <div className="p-6 flex flex-col flex-1">
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
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;