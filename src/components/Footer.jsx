import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-8 px-4">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} M. Aayan Qasim. All rights reserved.
      </p>
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/Aayan-Qasim"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label="GitHub"
        >
          <Github size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/aayan-qasim-9b426138b/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin size={20} />
        </a>
        <a
          href="mailto:aayanqasim@email.com"
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label="Email"
        >
          <Mail size={20} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
