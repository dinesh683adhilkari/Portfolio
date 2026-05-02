"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaPython,
  FaPhp,
  FaDatabase,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa"
import {
  SiTailwindcss,
  SiDjango,
  SiCplusplus,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiNetlify,
} from "react-icons/si"
import { VscCode } from "react-icons/vsc"
import { TbChartBar } from "react-icons/tb"

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML", icon: FaHtml5, level: 90 },
      { name: "CSS", icon: FaCss3Alt, level: 85 },
      { name: "JavaScript", icon: FaJs, level: 85 },
      { name: "React.js", icon: FaReact, level: 80 },
      { name: "Tailwind CSS", icon: SiTailwindcss, level: 85 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Python", icon: FaPython, level: 85 },
      { name: "Django", icon: SiDjango, level: 75 },
      { name: "PHP", icon: FaPhp, level: 70 },
      { name: "SQL", icon: FaDatabase, level: 80 },
    ],
  },
  {
    title: "Programming Languages",
    skills: [
      { name: "C", icon: SiCplusplus, level: 80 },
      { name: "C++", icon: SiCplusplus, level: 75 },
      { name: "Python", icon: FaPython, level: 85 },
      { name: "JavaScript", icon: FaJs, level: 85 },
    ],
  },
  {
    title: "Data Analytics & ML",
    skills: [
      { name: "Pandas", icon: SiPandas, level: 75 },
      { name: "NumPy", icon: SiNumpy, level: 75 },
      { name: "Matplotlib", icon: TbChartBar, level: 70 },
      { name: "Scikit-learn", icon: SiScikitlearn, level: 65 },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", icon: FaGitAlt, level: 85 },
      { name: "GitHub", icon: FaGithub, level: 90 },
      { name: "VS Code", icon: VscCode, level: 90 },
      { name: "Netlify", icon: SiNetlify, level: 80 },
    ],
  },
]

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [stackedCategories, setStackedCategories] = useState(skillCategories)

  const handleCardClick = (clickedIndex: number) => {
    setStackedCategories((prev) => {
      const next = [...prev]
      const [selected] = next.splice(clickedIndex, 1)
      next.push(selected)
      return next
    })
  }

  return (
    <section id="skills" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Technologies and tools I work with
          </p>

          <div className="relative mx-auto max-w-3xl h-[460px]">
            {stackedCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: categoryIndex * 12,
                        x: categoryIndex * 8,
                        scale: 1 - categoryIndex * 0.01,
                      }
                    : {}
                }
                transition={{ duration: 0.35, delay: categoryIndex * 0.06 }}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.99 }}
                className="glass rounded-[2rem] p-6 absolute left-0 right-0 cursor-pointer shadow-2xl border border-white/10"
                style={{
                  zIndex: stackedCategories.length - categoryIndex,
                  top: categoryIndex * 12,
                }}
                onClick={() => handleCardClick(categoryIndex)}
              >
                <h3 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {category.title}
                </h3>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.3,
                        delay: categoryIndex * 0.05 + skillIndex * 0.05,
                      }}
                      className="group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <skill.icon
                            className="text-primary group-hover:scale-110 transition-transform"
                            size={20}
                          />
                          <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{
                            duration: 1,
                            delay: categoryIndex * 0.05 + skillIndex * 0.05,
                          }}
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
