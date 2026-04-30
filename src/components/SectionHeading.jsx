import { motion } from "framer-motion";

const SectionHeading = ({ title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center mb-14"
  >
    <p className="text-primary font-mono text-sm tracking-widest uppercase mb-2">{subtitle}</p>
    <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
    <div className="w-16 h-1 bg-gradient-to-r from-primary to-[hsl(190,80%,60%)] rounded-full mx-auto mt-4" />
  </motion.div>
);

export default SectionHeading;
