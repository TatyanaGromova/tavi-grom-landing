import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionTitle from './SectionTitle'
import { skillGroups } from '../data/skills'
import { useMotionSettings } from '../utils/motion'

const skillChain = ['Смысл', 'Образ', 'Структура', 'Прототип', 'Публикация']

function SkillsChainPanel({ className = '' }) {
  const { fadeUp } = useMotionSettings()

  return (
    <motion.div
      className={`relative ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
    >
      <div className="relative rounded-3xl glass-panel p-8 sm:p-10 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-48 h-48 rounded-full bg-accent-warm/[0.08] blur-[60px] pointer-events-none"
          aria-hidden="true"
        />

        <h3 className="font-heading text-xl sm:text-2xl font-semibold text-milk mb-3">
          Навыки работают вместе
        </h3>
        <p className="text-sm sm:text-base text-soft-gray leading-relaxed mb-8 max-w-sm">
          Визуал, промпты, интерфейс, сценарий и упаковка соединяются в одну систему — поэтому проект выглядит цельно.
        </p>

        <div className="relative">
          <div className="hidden sm:flex items-center justify-between gap-1">
            {skillChain.map((step, i) => (
              <div key={step} className="flex items-center flex-1 min-w-0">
                <div className="flex flex-col items-center flex-1 min-w-0">
                  <span className="skill-chain-node">{i + 1}</span>
                  <span className="mt-2 text-[11px] sm:text-xs text-milk/90 text-center leading-tight font-medium">
                    {step}
                  </span>
                </div>
                {i < skillChain.length - 1 && (
                  <div className="skill-chain-line flex-shrink-0 mx-0.5" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>

          <div className="sm:hidden space-y-0">
            {skillChain.map((step, i) => (
              <div key={step} className="flex items-stretch gap-4">
                <div className="flex flex-col items-center">
                  <span className="skill-chain-node">{i + 1}</span>
                  {i < skillChain.length - 1 && (
                    <div className="w-px flex-1 min-h-6 bg-gradient-to-b from-accent/40 to-accent/10 my-1" />
                  )}
                </div>
                <div className="pb-5 pt-1">
                  <span className="text-sm font-medium text-milk">{step}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/8">
          <p className="text-xs tracking-[0.12em] uppercase text-lavender/55 text-center">
            От смысла к публикации — одна линия
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [openId, setOpenId] = useState(skillGroups[0].id)
  const { fadeUp, stagger } = useMotionSettings()

  return (
    <section id="skills" className="section-padding section-alt">
      <div className="container-wide">
        <SectionTitle title="Навыки" />

        <div className="grid lg:grid-cols-2 gap-4 lg:gap-8">
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
                className="glass-panel rounded-2xl p-6 hover:border-accent/20 transition-all duration-300"
                variants={fadeUp}
              >
                <h3 className="font-heading text-lg font-semibold text-milk mb-4">
                  {group.title}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="px-3 py-1.5 text-sm text-soft-gray bg-bg-elevated/50 rounded-lg border border-white/10 hover:border-accent/20 transition-colors"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

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

          <SkillsChainPanel className="hidden lg:block" />
        </div>

        <SkillsChainPanel className="lg:hidden mt-6" />
      </div>
    </section>
  )
}
