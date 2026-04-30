import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading.jsx";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const ContactInfo = ({ icon, label, value, href }) => (
  <a
    href={href || "#"}
    target={href ? "_blank" : undefined}
    rel="noopener noreferrer"
    className="flex items-center gap-4 group"
  >
    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/20 transition-colors">
      {icon}
    </div>
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-foreground group-hover:text-primary transition-colors">{value}</p>
    </div>
  </a>
);

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      toast({
        title: "Message sent! ✅",
        description: "Thank you! You'll receive a confirmation email shortly.",
      });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast({
        title: "Failed to send ❌",
        description: err.message || "Please try again or contact directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading title="Get In Touch" subtitle="Let's work together" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-muted-foreground leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities.
              
            </p>

            <div className="space-y-4">
              <ContactInfo
                icon={<Phone size={18} />}
                label="Phone / WhatsApp"
                value="0307-5177781"
                href="https://wa.me/923075177781"
              />
              <ContactInfo
                icon={<Mail size={18} />}
                label="Email"
                value="qasimaayan92@gmail.com"
                href="mailto:qasimaayan92@gmail.com"
              />
              <ContactInfo
                icon={<MapPin size={18} />}
                label="Location"
                value="Islamabad, Pakistan"
              />
              <ContactInfo
                icon={<Github size={18} />}
                label="GitHub"
                value="github.com/Aayan-Qasim"
                href="https://github.com/Aayan-Qasim"
              />
              <ContactInfo
                icon={<Linkedin size={18} />}
                label="LinkedIn"
                value="linkedin.com/in/aayan-qasim"
                href="https://www.linkedin.com/in/aayan-qasim-9b426138b/"
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <input
              type="text"
              required
              maxLength={100}
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
            />
            <input
              type="email"
              required
              maxLength={255}
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
            />
            <textarea
              required
              maxLength={1000}
              rows={5}
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition resize-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              <Send size={18} />
              {loading ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;