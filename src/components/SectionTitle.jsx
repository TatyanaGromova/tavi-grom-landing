import { motion } from 'framer-motion'
import { useMotionSettings } from '../utils/motion'

export default function SectionTitle({ title, subtitle, id }) {
  const { fadeUp } = useMotionSettings()

  return (
    <motion.div
      id={id}
      className="mb-12 sm:mb-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
    >
      <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-milk tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-soft-gray max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="mt-6 h-px w-16 bg-gradient-to-r from-lavender/60 to-transparent" />
    </motion.div>
  )
}
