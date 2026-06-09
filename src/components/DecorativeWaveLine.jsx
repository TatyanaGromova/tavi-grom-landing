import { motion } from 'framer-motion'
import { useId, useState } from 'react'

const WAVE_PATH = 'M 7 1.5 C 10.5 16, 3.5 31, 7 46 S 3.5 76, 7 90.5 S 10.5 96, 7 98.5'

export default function DecorativeWaveLine({ index = 0, prefersReducedMotion = false }) {
  const gradientId = useId()
  const [shimmer, setShimmer] = useState(false)
  const drawDelay = prefersReducedMotion ? 0 : index * 0.14

  return (
    <motion.svg
      className="assemble-wave-line"
      viewBox="0 0 14 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
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
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.25"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        className={`assemble-wave-line__path${shimmer ? ' assemble-wave-line__path--shimmer' : ''}`}
        variants={
          prefersReducedMotion
            ? { hidden: { opacity: 0.7 }, visible: { opacity: 0.7 } }
            : {
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1,
                  opacity: 1,
                  transition: {
                    pathLength: {
                      duration: 1,
                      ease: [0.42, 0, 0.2, 1],
                      delay: drawDelay,
                    },
                    opacity: { duration: 0.35, delay: drawDelay },
                  },
                },
              }
        }
        onAnimationComplete={() => {
          if (!prefersReducedMotion) setShimmer(true)
        }}
      />
    </motion.svg>
  )
}
