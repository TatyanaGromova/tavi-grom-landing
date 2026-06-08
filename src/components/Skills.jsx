import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionTitle from './SectionTitle'
import { skillGroups } from '../data/skills'
import { useMotionSettings } from '../utils/motion'

export default function Skills() {
  const [openId, setOpenId] = useState(skillGroups[0].id)
  const { fadeUp, stagger } = useMotionSettings()

  return (
    <section id="skills" className="section-padding">
      <div className="container-wide">
        <SectionTitle title="Навыки" />

        <div className="grid lg:grid-cols-2 gap-4 lg:gap-5">
          {/* Desktop: all cards visible */}
          <motion.div
            className="hidden lg:grid lg:grid-cols-1 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: stagger }}
          >
            {skillGroups.map((group) => (
              <motion.div
                key={group.id}
                className="glass-panel rounded-2xl p-6 hover:bg-bg-elevated/60 transition-colors duration-300"
                variants={fadeUp}
              >
                <h3 className="font-heading text-lg font-semibold text-milk mb-4">
                  {group.title}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="px-3 py-1.5 text-sm text-soft-gray bg-bg-elevated/50 rounded-lg border border-white/10"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile/Tablet: accordion */}
          <motion.div
            className="lg:hidden space-y-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {skillGroups.map((group) => {
              const isOpen = openId === group.id
              return (
                <div key={group.id} className="glass-panel rounded-2xl overflow-hidden">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between p-5 text-left"
                    onClick={() => setOpenId(isOpen ? null : group.id)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-heading text-base font-semibold text-milk">
                      {group.title}
                    </span>
                    <motion.span
                      className="text-lavender text-xl"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="flex flex-wrap gap-2 px-5 pb-5">
                          {group.items.map((item) => (
                            <li
                              key={item}
                              className="px-3 py-1.5 text-sm text-soft-gray bg-bg-elevated/50 rounded-lg border border-white/10"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </motion.div>

          {/* Desktop right decorative panel */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 rounded-3xl glass-panel" />
              <motion.div
                className="absolute top-8 left-8 right-8 bottom-8 rounded-2xl border border-lavender/20"
                animate={{ rotate: [0, 1, 0, -1, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <p className="font-heading text-2xl font-bold text-milk/80 mb-2">
                  5 направлений
                </p>
                <p className="text-sm text-soft-gray leading-relaxed">
                  От визуального мышления до контента и упаковки — навыки собраны в единую систему
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
