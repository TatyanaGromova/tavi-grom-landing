import { useReducedMotion } from 'framer-motion'

/** Срабатывает, когда ~25% элемента в зоне видимости — надёжнее на мобильных, чем отрицательный margin */
export const sectionViewport = { once: true, amount: 0.25 }

/** Для отдельных карточек в колонке — чуть позже, чтобы анимация была заметна при скролле */
export const itemViewport = { once: true, amount: 0.35 }

export function useMotionSettings() {
  const prefersReducedMotion = useReducedMotion()

  return {
    prefersReducedMotion,
    fadeUp: prefersReducedMotion
      ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
      : {
          hidden: { opacity: 0, y: 32 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
        },
    fadeIn: prefersReducedMotion
      ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
      : {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.5 } },
        },
    stagger: prefersReducedMotion ? 0 : 0.1,
    duration: prefersReducedMotion ? 0.01 : undefined,
  }
}

export function scrollToSection(id) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
