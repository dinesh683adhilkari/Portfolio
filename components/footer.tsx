"use client"

import { motion } from "framer-motion"
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp, FaHeart } from "react-icons/fa"

const socialLinks = [
  { icon: FaGithub, href: "https://github.com/dinesh16adh", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/dinesh-adhikari16", label: "LinkedIn" },
  { icon: FaEnvelope, href: "mailto:dinesh683adhikari@gmail.com", label: "Email" },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="py-12 relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold gradient-text mb-2">Dinesh Adhikari</h3>
            <p className="text-muted-foreground text-sm">
              Building the future, one line of code at a time.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                className="p-3 rounded-lg glass hover:bg-primary/10 transition-colors"
                aria-label={social.label}
              >
                <social.icon size={20} className="text-muted-foreground hover:text-primary" />
              </motion.a>
            ))}
          </div>

          {/* Scroll to Top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-lg glass hover:bg-primary/10 transition-colors"
            aria-label="Scroll to top"
          >
            <FaArrowUp size={20} className="text-muted-foreground hover:text-primary" />
          </motion.button>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
            © {new Date().getFullYear()} Dinesh Adhikari. Made with
            <FaHeart className="text-red-500 animate-pulse" size={14} />
            in Nepal
          </p>
        </div>
      </div>
    </footer>
  )
}
