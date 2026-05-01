"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { FaBriefcase, FaUsers, FaTrophy, FaCertificate } from "react-icons/fa"

const experiences = [
  {
    title: "Project-Based Data Analyst",
    company: "Karma Ops",
    period: "2024",
    description:
      "Worked with data analysis and reporting. Used Python data libraries for generating insights and visualizations.",
    type: "work",
    icon: FaBriefcase,
  },
  {
    title: "Active Member & Organizer",
    company: "ASCOL IT Club",
    period: "2023 - Present",
    description:
      "Organized ASCOL Hackfest 2024. Worked on sponsorships, partnerships, and event coordination.",
    type: "leadership",
    icon: FaUsers,
  },
]

const achievements = [
  {
    title: "Certificate of Appreciation",
    issuer: "Amrit Science Campus",
    description: "For organizing ASCOL Hackfest 2024",
    icon: FaCertificate,
  },
  {
    title: "Technical Event Leadership",
    issuer: "ASCOL IT Club",
    description: "Led multiple technical workshops and events",
    icon: FaTrophy,
  },
  {
    title: "Web Development Projects",
    issuer: "Self-Initiated",
    description: "Successfully delivered multiple web projects",
    icon: FaBriefcase,
  },
  {
    title: "Data Analytics Journey",
    issuer: "Continuous Learning",
    description: "Mastered Python data libraries and ML basics",
    icon: FaCertificate,
  },
]

export function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="experience" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Experience & <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            My professional journey and accomplishments
          </p>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Experience Timeline */}
            <div>
              <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
                <FaBriefcase className="text-primary" />
                Experience
              </h3>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

                <div className="space-y-8">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={exp.title}
                      initial={{ opacity: 0, x: -30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      className="relative pl-16"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-4 top-2 w-4 h-4 rounded-full bg-primary border-4 border-background" />

                      <div className="glass rounded-2xl p-6">
                        <div className="flex items-center gap-2 text-primary text-sm font-mono mb-2">
                          {exp.period}
                        </div>
                        <h4 className="text-lg font-semibold text-foreground mb-1">
                          {exp.title}
                        </h4>
                        <p className="text-accent text-sm mb-3">{exp.company}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Achievements Grid */}
            <div>
              <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
                <FaTrophy className="text-accent" />
                Achievements
              </h3>

              <div className="grid gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="glass rounded-xl p-5 flex items-start gap-4 cursor-default"
                  >
                    <div className="p-3 rounded-lg bg-accent/10 text-accent">
                      <achievement.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {achievement.title}
                      </h4>
                      <p className="text-primary text-sm">{achievement.issuer}</p>
                      <p className="text-muted-foreground text-sm mt-1">
                        {achievement.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
