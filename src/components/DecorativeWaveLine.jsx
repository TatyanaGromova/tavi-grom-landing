import { motion } from 'framer-motion'
import { useId, useState } from 'react'

const WAVE_PATH = 'M 7 1.5 C 10.5 16, 3.5 31, 7 46 S 3.5 76, 7 90.5 S 10.5 96, 7 98.5'

export const decorativeWaveLineVariants = (prefersReducedMotion) =>
  prefersReducedMotion
    ? { hidden: { opacity: 0.7 }, visible: { opacity: 0.7 } }
    : {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
          pathLength: 1,
          opacity: 1,
          transition: {
            pathLength: {
              duration: 0.95,
              ease: [0.42, 0, 0.2, 1],
            },
            opacity: { duration: 0.35 },
          },
        },
      }

export default function DecorativeWaveLine({ prefersReducedMotion = false }) {
  const gradientId = useId()
  const [shimmer, setShimmer] = useState(false)

  return (
    <svg
      className="assemble-wave-line"
      viewBox="0 0 14 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5c1824" stopOpacity="0.85" />
          <stop offset="42%" stopColor="#8c2634" stopOpacity="0.9" />
          <stop offset="78%" stopColor="#a83444" stopOpacity="0.82" />
          <stop offset="100%" stopColor="#c04a52" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      <motion.path
        d={WAVE_PATH}
        pathLength="1"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.25"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        variants={decorativeWaveLineVariants(prefersReducedMotion)}
        className={`assemble-wave-line__path${shimmer ? ' assemble-wave-line__path--shimmer' : ''}`}
        onAnimationComplete={() => {
          if (!prefersReducedMotion) setShimmer(true)
        }}
      />
    </svg>
  )
}
