"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { FaCode, FaLaptopCode, FaCalendarAlt, FaGithub } from "react-icons/fa"

const stats = [
  { icon: FaCode, value: "10+", label: "Projects Completed" },
  { icon: FaLaptopCode, value: "15+", label: "Technologies Learned" },
  { icon: FaCalendarAlt, value: "5+", label: "Events Organized" },
  { icon: FaGithub, value: "100+", label: "GitHub Contributions" },
]

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Get to know more about my journey in tech
          </p>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* About Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="glass rounded-2xl p-6">
                <p className="text-muted-foreground leading-relaxed">
                  I am a <span className="text-primary font-medium">BSc.CSIT student</span> at 
                  Amrit Science Campus (ASCOL), Kathmandu. I am passionate about software 
                  development, problem-solving, data analytics, and modern web technologies.
                </p>
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-foreground">Technical Expertise</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I have experience working with <span className="text-primary">Python</span>, 
                  <span className="text-accent"> Django</span>, <span className="text-primary">React.js</span>, 
                  <span className="text-accent"> JavaScript</span>, <span className="text-primary">PHP</span>, 
                  <span className="text-accent"> SQL</span>, <span className="text-primary">C/C++</span>, and 
                  Machine Learning libraries like <span className="text-accent">Pandas</span>, 
                  <span className="text-primary"> NumPy</span>, <span className="text-accent">Matplotlib</span>, 
                  and <span className="text-primary">Scikit-learn</span>.
                </p>
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-foreground">Beyond Coding</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I am detail-oriented, collaborative, and eager to learn. I have been actively 
                  involved in organizing technical events like <span className="text-primary">ASCOL 
                  Hackfest 2024</span> through ASCOL IT Club, where I worked on sponsorships, 
                  partnerships, and event coordination.
                </p>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass rounded-2xl p-6 text-center group cursor-default"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                    <stat.icon className="text-primary" size={24} />
                  </div>
                  <h3 className="text-3xl font-bold gradient-text mb-2">{stat.value}</h3>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
