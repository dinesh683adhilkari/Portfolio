"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"
import { webProjects } from "./projects/web"
import { dataProjects } from "./projects/data"

const projectSections = [
  { title: "Web Projects", projects: webProjects },
  { title: "Data Projects", projects: dataProjects },
]

const renderProjectCard = (project: any, index: number, isInView: boolean) => (
  <motion.div
    key={project.title}
    initial={{ opacity: 0, y: 30 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -10 }}
    className="glass rounded-2xl overflow-hidden group"
  >
    <div className="h-48 relative overflow-hidden group">
      <img
        src={project.thumbnail}
        alt={`${project.title} thumbnail`}
        className="h-full w-full object-cover group-hover:scale-110 transition-all duration-500 brightness-75 group-hover:brightness-100"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      {/* Title text overlay removed */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm"
      />
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute bottom-4 left-4 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm"
      />
    </div>

    <div className="p-6">
      <h3 className="text-xl font-semibold mb-3 text-foreground">
        {project.title}
      </h3>
      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.features.map((feature: string) => (
          <span
            key={feature}
            className="px-2 py-1 rounded-md bg-secondary text-xs text-muted-foreground"
          >
            {feature}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((tech: string) => (
          <span
            key={tech}
            className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
          >
            {tech}
          </span>
        ))}
      </div>

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
)

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

          <div className="space-y-16">
            {projectSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-2xl font-semibold mb-6">{section.title}</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {section.projects.map((project, index) =>
                    renderProjectCard(project, index, isInView),
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
