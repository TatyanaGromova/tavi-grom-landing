import { motion } from 'framer-motion'
import { useMotionSettings } from '../utils/motion'

export default function ServiceCard({ title, description, index = 0 }) {
  const { fadeUp, prefersReducedMotion } = useMotionSettings()
  const depth = index % 3

  return (
    <motion.article
      className={`group relative premium-card rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:shadow-[0_12px_48px_rgba(214,185,140,0.12)] hover:border-accent/25 ${
        depth === 1 ? 'lg:translate-y-2' : depth === 2 ? 'lg:-translate-y-1' : ''
      }`}
      variants={fadeUp}
      whileHover={prefersReducedMotion ? {} : { y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative">
        <span className="inline-block text-xs font-medium text-lavender/70 mb-3 tracking-wider">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="font-heading text-lg sm:text-xl font-semibold text-milk mb-3">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-soft-gray leading-relaxed">
          {description}
        </p>
      </div>
    </motion.article>
  )
}
