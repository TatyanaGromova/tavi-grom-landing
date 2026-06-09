import { motion } from 'framer-motion'
import { useMotionSettings } from '../utils/motion'

export const aboutRoles = [
  'Креатор нейросетевых проектов',
  'Специалист по промптам',
  'Нейродизайнер',
  'Вайбкодер',
  'Автор визуальных концепций',
  'Создатель цифровых продуктов',
]

const desktopLayout = [
  { top: '4%', left: '58%', rotate: 2 },
  { top: '18%', left: '72%', rotate: -1 },
  { top: '34%', left: '48%', rotate: 1.5 },
  { top: '48%', left: '68%', rotate: -2 },
  { top: '62%', left: '38%', rotate: -1.5 },
  { top: '76%', left: '62%', rotate: 2.5 },
]

function RoleLeaf({ label, index, style, className = '' }) {
  const { fadeUp, prefersReducedMotion } = useMotionSettings()

  return (
    <motion.li
      className={`about-role-leaf ${className}`}
      style={style}
      variants={fadeUp}
      whileHover={prefersReducedMotion ? {} : { scale: 1.02, y: -2 }}
      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
    >
      <span className="about-role-leaf__index" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="about-role-leaf__label">{label}</span>
    </motion.li>
  )
}

function BranchSvg({ className = '' }) {
  return (
    <svg
      className={`about-role-tree__svg ${className}`}
      viewBox="0 0 520 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="aboutBranchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(168, 52, 68, 0.75)" />
          <stop offset="100%" stopColor="rgba(120, 32, 48, 0.55)" />
        </linearGradient>
        <filter id="aboutBranchGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        className="about-branch-line"
        d="M 56 8 L 56 248"
        stroke="url(#aboutBranchGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        filter="url(#aboutBranchGlow)"
      />
      <path
        className="about-branch-line"
        d="M 56 52 Q 130 38 220 48"
        stroke="url(#aboutBranchGrad)"
        strokeWidth="1.25"
        strokeLinecap="round"
        filter="url(#aboutBranchGlow)"
      />
      <path
        className="about-branch-line"
        d="M 56 108 Q 145 92 280 118"
        stroke="url(#aboutBranchGrad)"
        strokeWidth="1.25"
        strokeLinecap="round"
        filter="url(#aboutBranchGlow)"
      />
      <path
        className="about-branch-line"
        d="M 56 168 Q 120 188 240 210"
        stroke="url(#aboutBranchGrad)"
        strokeWidth="1.25"
        strokeLinecap="round"
        filter="url(#aboutBranchGlow)"
      />
      <circle cx="56" cy="8" r="3" fill="rgba(168, 52, 68, 0.7)" />
      <circle cx="56" cy="248" r="2.5" fill="rgba(140, 42, 58, 0.5)" />
    </svg>
  )
}

export function AboutRoleBranchDesktop() {
  const { stagger } = useMotionSettings()

  return (
    <motion.div
      className="about-role-tree about-role-tree--desktop hidden lg:block"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      transition={{ staggerChildren: stagger }}
      aria-label="Роли и направления"
    >
      <BranchSvg />
      <ul className="about-role-tree__leaves">
        {aboutRoles.map((role, index) => {
          const pos = desktopLayout[index]
          return (
            <RoleLeaf
              key={role}
              label={role}
              index={index}
              style={{
                top: pos.top,
                left: pos.left,
                transform: `rotate(${pos.rotate}deg)`,
              }}
            />
          )
        })}
      </ul>
    </motion.div>
  )
}

export function AboutRoleBranchMobile() {
  const { stagger } = useMotionSettings()

  return (
    <motion.div
      className="about-role-tree about-role-tree--mobile lg:hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      transition={{ staggerChildren: stagger }}
      aria-label="Роли и направления"
    >
      <div className="about-role-tree__mobile-stem" aria-hidden="true" />
      <ul className="about-role-tree__mobile-leaves">
        {aboutRoles.map((role, index) => (
          <RoleLeaf
            key={role}
            label={role}
            index={index}
            className={index % 2 === 0 ? 'about-role-leaf--shift-right' : ''}
            style={{
              transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)`,
            }}
          />
        ))}
      </ul>
    </motion.div>
  )
}
