import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SectionTitle from './SectionTitle'
import { processSteps } from '../data/process'
import { useMotionSettings } from '../utils/motion'

function ProcessStep({ step, index, total }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'start 0.4'],
  })
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1])
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1])
  const { prefersReducedMotion } = useMotionSettings()

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-6 sm:gap-8"
      style={prefersReducedMotion ? {} : { opacity, scale }}
    >
      <div className="flex flex-col items-center">
        <motion.div
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-panel flex items-center justify-center font-heading font-bold text-lavender text-sm sm:text-base z-10"
          whileInView={{ boxShadow: '0 0 24px rgba(196,181,216,0.3)' }}
          viewport={{ once: false, margin: '-100px' }}
        >
          {step.id}
        </motion.div>
        {index < total - 1 && (
          <div className="w-px flex-1 min-h-[60px] bg-gradient-to-b from-lavender/40 to-lavender/10 mt-2" />
        )}
      </div>

      <div className="pb-10 sm:pb-12 flex-1">
        <h3 className="font-heading text-lg sm:text-xl font-semibold text-milk mb-2">
          {step.title}
        </h3>
        <p className="text-sm sm:text-base text-soft-gray leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function Process() {
  return (
    <section id="process" className="section-padding bg-graphite-light/30">
      <div className="container-wide">
        <SectionTitle title="Как я работаю" />

        <div className="max-w-2xl mx-auto lg:mx-0 lg:max-w-3xl">
          {processSteps.map((step, index) => (
            <ProcessStep
              key={step.id}
              step={step}
              index={index}
              total={processSteps.length}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
