import { motion } from 'framer-motion'
import { useId, useState } from 'react'
import { useMotionSettings } from '../utils/motion'

export const aboutRoles = [
  'Креатор нейросетевых проектов',
  'Специалист по промптам',
  'Нейродизайнер',
  'Вайбкодер',
  'Автор визуальных концепций',
  'Создатель цифровых продуктов',
]

const DESKTOP_STEM =
  'M 24 8 C 27 52, 21 98, 24 142 C 21 188, 27 234, 24 278'

const DESKTOP_BRANCHES = [
  'M 24 42 C 36 40, 54 36, 68 42',
  'M 24 88 C 42 82, 64 86, 82 88',
  'M 24 134 C 30 138, 48 128, 62 134',
  'M 24 180 C 40 174, 70 182, 86 180',
  'M 24 226 C 28 232, 46 220, 58 226',
  'M 24 272 C 38 266, 66 274, 80 272',
]

const MOBILE_STEM = 'M 18 6 L 18 268'

const MOBILE_BRANCHES = [
  'M 18 44 Q 42 42 58 44',
  'M 18 92 Q 46 88 62 92',
  'M 18 140 Q 40 144 56 140',
  'M 18 188 Q 48 184 64 188',
  'M 18 236 Q 38 240 54 236',
  'M 18 272 Q 44 268 60 272',
]

const BADGE_OFFSETS_DESKTOP = [6, 20, 4, 16, 0, 12]
const BADGE_OFFSETS_MOBILE = [4, 10, 0, 8, 2, 6]

const STEM_DURATION = 1.1
const BRANCH_BASE_DELAY = 0.95
const BRANCH_STAGGER = 0.11
const BRANCH_DURATION = 0.75
const BADGE_BASE_DELAY = BRANCH_BASE_DELAY + DESKTOP_BRANCHES.length * BRANCH_STAGGER + 0.12
const BADGE_STAGGER = 0.07

function AboutGraphLines({ mobile = false, prefersReducedMotion = false, onComplete }) {
  const gradientId = useId()
  const stemPath = mobile ? MOBILE_STEM : DESKTOP_STEM
  const branches = mobile ? MOBILE_BRANCHES : DESKTOP_BRANCHES
  const [shimmer, setShimmer] = useState(false)

  const handleBranchComplete = (index) => {
    if (index === branches.length - 1 && !prefersReducedMotion) {
      setShimmer(true)
      onComplete?.()
    }
  }

  const stemVariants = prefersReducedMotion
    ? { hidden: { opacity: 0.75 }, visible: { opacity: 0.75 } }
    : {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
          pathLength: 1,
          opacity: 1,
          transition: {
            pathLength: { duration: STEM_DURATION, ease: [0.42, 0, 0.2, 1] },
            opacity: { duration: 0.35 },
          },
        },
      }

  const branchVariants = prefersReducedMotion
    ? { hidden: { opacity: 0.6 }, visible: { opacity: 0.6 } }
    : {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (index) => ({
          pathLength: 1,
          opacity: 1,
          transition: {
            pathLength: {
              duration: BRANCH_DURATION,
              ease: [0.42, 0, 0.2, 1],
              delay: BRANCH_BASE_DELAY + index * BRANCH_STAGGER,
            },
            opacity: {
              duration: 0.3,
              delay: BRANCH_BASE_DELAY + index * BRANCH_STAGGER,
            },
          },
        }),
      }

  return (
    <svg
      className={`about-graph__svg${shimmer ? ' about-graph__svg--shimmer' : ''}`}
      viewBox={mobile ? '0 0 72 280' : '0 0 96 286'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6e1e2a" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#8c2634" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#a83444" stopOpacity="0.65" />
        </linearGradient>
      </defs>

      <motion.path
        d={stemPath}
        stroke={`url(#${gradientId})`}
        strokeWidth={mobile ? 1.1 : 1.35}
        strokeLinecap="round"
        fill="none"
        vectorEffect="non-scaling-stroke"
        className="about-graph__path about-graph__path--stem"
        variants={stemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      />

      {branches.map((path, index) => (
        <motion.path
          key={path}
          d={path}
          stroke={`url(#${gradientId})`}
          strokeWidth={mobile ? 0.95 : 1.15}
          strokeLinecap="round"
          fill="none"
          vectorEffect="non-scaling-stroke"
          className="about-graph__path"
          custom={index}
          variants={branchVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          onAnimationComplete={() => handleBranchComplete(index)}
        />
      ))}
    </svg>
  )
}

function AboutBadge({ label, index, offset, prefersReducedMotion }) {
  const badgeVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x: -12 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            delay: BADGE_BASE_DELAY + index * BADGE_STAGGER,
          },
        },
      }

  return (
    <motion.li
      className="about-graph__badge"
      style={{ marginLeft: offset }}
      variants={badgeVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      whileHover={prefersReducedMotion ? {} : { y: -2, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 380, damping: 24 }}
    >
      <span className="about-graph__badge-index" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="about-graph__badge-label">{label}</span>
    </motion.li>
  )
}

export function AboutGraphDesktop() {
  const { prefersReducedMotion } = useMotionSettings()

  return (
    <div className="about-graph about-graph--desktop hidden lg:block" aria-label="Роли и направления">
      <div className="about-graph__lines">
        <AboutGraphLines prefersReducedMotion={prefersReducedMotion} />
      </div>
      <ul className="about-graph__badges">
        {aboutRoles.map((role, index) => (
          <AboutBadge
            key={role}
            label={role}
            index={index}
            offset={BADGE_OFFSETS_DESKTOP[index]}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </ul>
    </div>
  )
}

export function AboutGraphMobile() {
  const { prefersReducedMotion } = useMotionSettings()

  return (
    <div className="about-graph about-graph--mobile lg:hidden" aria-label="Роли и направления">
      <div className="about-graph__lines">
        <AboutGraphLines mobile prefersReducedMotion={prefersReducedMotion} />
      </div>
      <ul className="about-graph__badges">
        {aboutRoles.map((role, index) => (
          <AboutBadge
            key={role}
            label={role}
            index={index}
            offset={BADGE_OFFSETS_MOBILE[index]}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </ul>
    </div>
  )
}
