import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { sectionViewport, useMotionSettings } from '../utils/motion'

const pillVariants = (prefersReducedMotion) =>
  prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 10 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }

const panelTransition = (prefersReducedMotion) => ({
  duration: prefersReducedMotion ? 0.01 : 0.32,
  ease: [0.22, 1, 0.36, 1],
})

export default function ServiceExtraGroup({ items }) {
  const [openId, setOpenId] = useState(null)
  const { prefersReducedMotion } = useMotionSettings()

  const groupVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 14 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
            staggerChildren: 0.07,
            delayChildren: 0.08,
          },
        },
      }

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <motion.div
      className="service-extra"
      variants={groupVariants}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
    >
      <p className="service-extra__label">Ещё могу помочь с:</p>
      <ul className="service-extra__list">
        {items.map((item) => {
          const isOpen = openId === item.id
          const buttonId = `service-extra-btn-${item.id}`
          const panelId = `service-extra-desc-${item.id}`

          return (
            <motion.li
              key={item.id}
              className={`service-extra__item${isOpen ? ' service-extra__item--open' : ''}`}
              variants={pillVariants(prefersReducedMotion)}
            >
              <button
                id={buttonId}
                type="button"
                className={`service-extra__trigger${isOpen ? ' service-extra__trigger--open' : ''}`}
                onClick={() => handleToggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className="service-extra__trigger-label">{item.title}</span>
                <span className="service-extra__indicator" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="service-extra__panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={panelTransition(prefersReducedMotion)}
                  >
                    <p className="service-extra__desc">{item.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          )
        })}
      </ul>
    </motion.div>
  )
}
