import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading.jsx";
import { Briefcase, GraduationCap } from "lucide-react";

const TimelineItem = ({ side, icon, title, org, period, items, index }) => (
  <div className={`relative flex md:items-center mb-12 ${side === "right" ? "md:flex-row-reverse" : ""}`}>
    {/* Dot */}
    <div className="absolute left-4 md:left-1/2 w-8 h-8 -translate-x-1/2 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-primary z-10">
      {icon}
    </div>

    {/* Content */}
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
        side === "left" ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
      }`}
    >
      <div className="glass rounded-xl p-6">
        <span className="text-xs font-mono text-primary">{period}</span>
        <h3 className="text-lg font-semibold mt-1">{title}</h3>
        {org && <p className="text-sm text-muted-foreground">{org}</p>}
        {items.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {items.map((item, i) => (
              <li key={i} className="text-sm text-muted-foreground flex gap-2">
                <span className="text-primary mt-1.5 shrink-0 w-1 h-1 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  </div>
);

const ExperienceSection = () => (
  <section id="experience" className="section-padding">
    <div className="container mx-auto max-w-4xl">
      <SectionHeading title="Experience & Education" subtitle="My journey so far" />

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

        <TimelineItem
          side="left"
          icon={<Briefcase size={18} />}
          title="Internship — Web Developer"
          org="Sky Coaching Center"
          period="3 Months"
          items={[
            "Developed responsive websites using HTML, CSS, JavaScript, and React",
            "Built reusable components and managed state in React applications",
            "Integrated basic APIs and handled form validations",
            "Worked with Git & GitHub for version control",
            "Improved UI/UX based on feedback and best practices",
            "Gained hands-on experience in debugging and performance optimization",
          ]}
          index={0}
        />

        <TimelineItem
          side="right"
          icon={<GraduationCap size={18} />}
          title="F.A (Intermediate)"
          org=""
          period="2025 — 550 Marks"
          items={[]}
          index={1}
        />

        <TimelineItem
          side="left"
          icon={<GraduationCap size={18} />}
          title="Matriculation"
          org=""
          period="2023 — 663 Marks"
          items={[]}
          index={2}
        />
      </div>
    </div>
  </section>
);

export default ExperienceSection;