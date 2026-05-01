"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"

const projects = [
  {
    title: "Local Artisan Marketplace",
    description:
      "A React.js-based e-commerce platform supporting local artisans and promoting sustainable shopping experiences.",
    features: [
      "Product listings",
      "Shopping cart",
      "Authentication",
      "Category-based routing",
      "Responsive UI",
    ],
    tech: ["React.js", "CSS", "JavaScript"],
    github: "#",
    demo: "#",
    gradient: "from-primary to-accent",
  },
  {
    title: "Quote Generator App",
    description:
      "A responsive quote generator built with category filtering, dark/light mode, randomization, and font size controls.",
    features: [
      "Category filtering",
      "Dark/Light mode",
      "Randomization",
      "Font controls",
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    github: "#",
    demo: "#",
    gradient: "from-accent to-primary",
  },
  {
    title: "Kag Tihar Celebration Website",
    description:
      "An animated React website created for Kag Tihar festival celebrations with engaging visual effects and animations.",
    features: [
      "Festival animations",
      "Visual effects",
      "Interactive UI",
      "Cultural theme",
    ],
    tech: ["React.js", "Framer Motion", "CSS"],
    github: "#",
    demo: "#",
    gradient: "from-primary via-accent to-primary",
  },
  {
    title: "Sorry Animation Website",
    description:
      "A fully animated interactive apology-themed website featuring floating stars, hover animations, and popup effects.",
    features: [
      "Floating animations",
      "Hover effects",
      "Popup interactions",
      "Creative design",
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    github: "#",
    demo: "#",
    gradient: "from-accent to-primary",
  },
]

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Some of my recent work and side projects
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass rounded-2xl overflow-hidden group"
              >
                {/* Project Header with Gradient */}
                <div
                  className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white/90 group-hover:scale-110 transition-transform">
                      {project.title.split(" ")[0]}
                    </span>
                  </div>
                  {/* Floating elements */}
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10"
                  />
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="absolute bottom-4 left-4 w-6 h-6 rounded-full bg-white/10"
                  />
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 rounded-md bg-secondary text-xs text-muted-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <FaGithub size={18} />
                      <span className="text-sm">Code</span>
                    </a>
                    <a
                      href={project.demo}
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <FaExternalLinkAlt size={16} />
                      <span className="text-sm">Live Demo</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
