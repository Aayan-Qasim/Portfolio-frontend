import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading.jsx";

const categories = [
  {
    title: "Front-End",
    skills: [
      { name: "HTML5 & CSS3", level: 90 },
      { name: "JavaScript (ES6+)", level: 85 },
      { name: "React.js", level: 80 },
      // { name: "Tailwind CSS", level: 85 },
      { name: "Bootstrap", level: 75 },
      { name: "Responsive Design", level: 90 },
    ],
  },
  {
    title: "Back-End & Database",
    skills: [
      { name: "Node.js", level: 50 },
      { name: "Express.js", level: 45 },
      { name: "REST APIs", level: 55 },
      { name: "MongoDB", level: 40 },
      { name: "MySQL", level: 40 },
    ],
  },
  {
    title: "Tools & Other",
    skills: [
      { name: "Git & GitHub", level: 80 },
      { name: "VS Code", level: 90 },
      { name: "NPM", level: 75 },
      { name: "Browser DevTools", level: 85 },
      { name: "Debugging", level: 80 },
      { name: "UI/UX Best Practices", level: 75 },
    ],
  },
];

const SkillsSection = () => (
  <section id="skills" className="section-padding bg-card/30">
    <div className="container mx-auto">
      <SectionHeading title="Skills" subtitle="Technologies I work with" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {categories.map((cat, ci) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: ci * 0.15 }}
            className="glass rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-primary mb-6">{cat.title}</h3>
            <div className="space-y-5">
              {cat.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-foreground">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-[hsl(190,80%,60%)]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
