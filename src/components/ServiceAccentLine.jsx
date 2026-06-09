import { motion } from 'framer-motion'
import { useId } from 'react'

const LINE_PATH = 'M 7 2 L 7 98'

export const serviceAccentLineVariants = (prefersReducedMotion) =>
  prefersReducedMotion
    ? { hidden: { opacity: 0.65 }, visible: { opacity: 0.65 } }
    : {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
          pathLength: 1,
          opacity: 1,
          transition: {
            pathLength: { duration: 0.85, ease: [0.42, 0, 0.2, 1] },
            opacity: { duration: 0.3 },
          },
        },
      }

export default function ServiceAccentLine({ prefersReducedMotion = false }) {
  const gradientId = useId()

  return (
    <svg
      className="service-accent-line"
      viewBox="0 0 14 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6e1e2a" stopOpacity="0.8" />
          <stop offset="45%" stopColor="#8c2634" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#a83444" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <motion.path
        d={LINE_PATH}
        pathLength="1"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        variants={serviceAccentLineVariants(prefersReducedMotion)}
        className="service-accent-line__path"
      />
    </svg>
  )
}
