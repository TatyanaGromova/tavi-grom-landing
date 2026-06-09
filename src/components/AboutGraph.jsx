import { motion, useInView } from 'framer-motion'
import { useEffect, useId, useRef, useState } from 'react'
import { useMotionSettings } from '../utils/motion'

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return isDesktop
}

export const aboutRoles = [
  'Креатор нейросетевых проектов',
  'Специалист по промптам',
  'Нейродизайнер',
  'Вайбкодер',
  'Автор визуальных концепций',
  'Создатель цифровых продуктов',
]

/* viewBox 320×300 — одна вертикальная волнистая линия + 6 ответвлений к плашкам */
const DESKTOP_STEM = [
  'M 26 8',
  'C 28 13, 24 15, 26 18',
  'C 24 38, 28 53, 26 63',
  'C 24 83, 28 98, 26 108',
  'C 28 123, 24 138, 26 153',
  'C 24 173, 28 188, 26 198',
  'C 28 218, 24 233, 26 243',
  'C 24 252, 28 258, 26 262',
].join(' ')

const DESKTOP_BRANCHES = [
  'M 26 18 C 48 14, 92 20, 136 18',
  'M 26 63 C 62 58, 118 68, 190 63',
  'M 26 108 C 42 112, 82 104, 120 108',
  'M 26 153 C 72 148, 142 158, 210 153',
  'M 26 198 C 46 204, 88 192, 126 198',
  'M 26 243 C 64 238, 118 248, 181 243',
]

const MOBILE_STEM = [
  'M 20 6',
  'C 21 9, 19 10, 20 12',
  'C 19 32, 21 47, 20 60',
  'C 19 80, 21 95, 20 108',
  'C 21 123, 19 138, 20 156',
  'C 19 176, 21 191, 20 204',
  'C 21 224, 19 239, 20 252',
  'C 19 258, 21 261, 20 264',
].join(' ')

const MOBILE_BRANCHES = [
  'M 20 12 C 34 10, 48 14, 59 12',
  'M 20 60 C 40 56, 58 64, 80 60',
  'M 20 108 C 30 112, 40 104, 48 108',
  'M 20 156 C 44 152, 64 160, 84 156',
  'M 20 204 C 30 208, 42 200, 52 204',
  'M 20 252 C 40 248, 58 256, 73 252',
]

const STEM_DURATION = 1.05
const BRANCH_BASE = 0.9
const BRANCH_STAGGER = 0.1
const BRANCH_DURATION = 0.72
const BADGE_BASE = BRANCH_BASE + DESKTOP_BRANCHES.length * BRANCH_STAGGER + 0.15
const BADGE_STAGGER = 0.08

const pathTransition = (duration, delay = 0) => ({
  pathLength: { duration, ease: [0.42, 0, 0.2, 1], delay },
  opacity: { duration: 0.3, delay },
})

function AboutGraphLines({ mobile, animate, prefersReducedMotion }) {
  const gradientId = useId()
  const stem = mobile ? MOBILE_STEM : DESKTOP_STEM
  const branches = mobile ? MOBILE_BRANCHES : DESKTOP_BRANCHES
  const [shimmer, setShimmer] = useState(false)

  const stemVariants = prefersReducedMotion
    ? { hidden: { opacity: 0.75 }, visible: { opacity: 0.75 } }
    : {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
          pathLength: 1,
          opacity: 1,
          transition: pathTransition(STEM_DURATION),
        },
      }

  const branchVariants = prefersReducedMotion
    ? { hidden: { opacity: 0.6 }, visible: { opacity: 0.6 } }
    : {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i) => ({
          pathLength: 1,
          opacity: 1,
          transition: pathTransition(BRANCH_DURATION, BRANCH_BASE + i * BRANCH_STAGGER),
        }),
      }

  const handleBranchDone = (index) => {
    if (index === branches.length - 1 && !prefersReducedMotion) {
      setShimmer(true)
    }
  }

  const strokeProps = {
    stroke: `url(#${gradientId})`,
    fill: 'none',
    vectorEffect: 'non-scaling-stroke',
    strokeLinejoin: 'round',
  }

  return (
    <svg
      className={`about-graph__svg${shimmer ? ' about-graph__svg--shimmer' : ''}`}
      viewBox={mobile ? '0 0 180 300' : '0 0 320 300'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5c1824" stopOpacity="0.88" />
          <stop offset="50%" stopColor="#8c2634" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#a83444" stopOpacity="0.58" />
        </linearGradient>
      </defs>

      <motion.path
        d={stem}
        pathLength="1"
        strokeWidth={mobile ? 1.1 : 1.25}
        strokeLinecap="round"
        className="about-graph__path about-graph__path--stem"
        variants={stemVariants}
        initial="hidden"
        animate={animate}
        {...strokeProps}
      />

      {branches.map((path, index) => (
        <motion.path
          key={path}
          d={path}
          pathLength="1"
          strokeWidth={mobile ? 1 : 1.15}
          strokeLinecap="round"
          className="about-graph__path about-graph__path--branch"
          custom={index}
          variants={branchVariants}
          initial="hidden"
          animate={animate}
          onAnimationComplete={() => handleBranchDone(index)}
          {...strokeProps}
        />
      ))}
    </svg>
  )
}

function AboutBadge({ label, index, animate, prefersReducedMotion }) {
  const variants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, scale: 0.97, y: 6 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: {
            duration: 0.48,
            ease: [0.22, 1, 0.36, 1],
            delay: BADGE_BASE + index * BADGE_STAGGER,
          },
        },
      }

  return (
    <motion.li
      className={`about-graph__badge about-graph__badge--${index + 1}`}
      variants={variants}
      initial="hidden"
      animate={animate}
      whileHover={prefersReducedMotion ? {} : { y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 26 }}
    >
      <span className="about-graph__badge-index" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="about-graph__badge-label">{label}</span>
    </motion.li>
  )
}

export default function AboutGraph() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.25 })
  const isDesktop = useIsDesktop()
  const { prefersReducedMotion } = useMotionSettings()
  const animate = isInView ? 'visible' : 'hidden'

  return (
    <div ref={ref} className="about-graph" aria-label="Роли и направления">
      <div className="about-graph__canvas">
        <div className="about-graph__lines about-graph__lines--desktop" aria-hidden="true">
          <AboutGraphLines
            mobile={false}
            animate={isDesktop ? animate : 'hidden'}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>
        <div className="about-graph__lines about-graph__lines--mobile" aria-hidden="true">
          <AboutGraphLines
            mobile
            animate={!isDesktop ? animate : 'hidden'}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>

        <ul className="about-graph__badges">
          {aboutRoles.map((role, index) => (
            <AboutBadge
              key={role}
              label={role}
              index={index}
              animate={animate}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}
