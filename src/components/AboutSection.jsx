import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading.jsx";
import { Code2, Rocket, Users, Lightbulb } from "lucide-react";

const strengths = [
  { icon: Code2, label: "Clean Code", desc: "Writing maintainable, well-structured code" },
  { icon: Rocket, label: "Performance", desc: "Optimizing for speed and efficiency" },
  { icon: Users, label: "UI/UX Focus", desc: "Building user-friendly interfaces" },
  { icon: Lightbulb, label: "Problem Solver", desc: "Debugging and creative solutions" },
];

const AboutSection = () => (
  <section id="about" className="section-padding">
    <div className="container mx-auto">
      <SectionHeading title="About Me" subtitle="A brief introduction" />

      <div className="max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg text-muted-foreground leading-relaxed text-center mb-12"
        >
          Motivated and detail-oriented Web Developer with a strong foundation in front-end and back-end technologies.
          I specialize in building responsive, user-friendly, and high-performance web applications using HTML, CSS,
          JavaScript, React, and modern web tools — continuously learning and growing in a dynamic development environment.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {strengths.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-6 text-center hover:border-primary/30 transition-colors group"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                <s.icon size={24} />
              </div>
              <h3 className="font-semibold mb-1">{s.label}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;