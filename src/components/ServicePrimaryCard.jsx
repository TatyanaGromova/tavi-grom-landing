import { motion } from 'framer-motion'
import ServiceAccentLine from './ServiceAccentLine'
import { itemViewport, useMotionSettings } from '../utils/motion'

const contentVariants = (prefersReducedMotion) =>
  prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 8 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
        },
      }

export default function ServicePrimaryCard({ index, title, description, offsetClass = '' }) {
  const { prefersReducedMotion } = useMotionSettings()

  const cardVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            staggerChildren: 0.06,
            delayChildren: 0.05,
          },
        },
      }

  return (
    <motion.article
      className={`service-primary-card group ${offsetClass}`}
      initial="hidden"
      whileInView="visible"
      viewport={itemViewport}
      variants={cardVariants}
      whileHover={prefersReducedMotion ? {} : { y: -5 }}
      transition={{ type: 'spring', stiffness: 380, damping: 26 }}
    >
      <ServiceAccentLine prefersReducedMotion={prefersReducedMotion} />
      <motion.div className="service-primary-card__body" variants={contentVariants(prefersReducedMotion)}>
        <span className="service-primary-card__index" aria-hidden="true">
          {String(index).padStart(2, '0')}
        </span>
        <h3 className="service-primary-card__title">{title}</h3>
        <p className="service-primary-card__desc">{description}</p>
      </motion.div>
    </motion.article>
  )
}
