import { motion } from 'framer-motion'
import { sectionViewport, useMotionSettings } from '../utils/motion'

export default function SectionTitle({
  title,
  subtitle,
  id,
  entryOffset = 32,
  staggeredEntry = false,
  inheritAnimation = false,
}) {
  const { prefersReducedMotion } = useMotionSettings()

  const variants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: entryOffset },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
        },
      }

  const titleVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 18 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] },
        },
      }

  const subtitleVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 14 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
        },
      }

  const lineVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, scaleX: 0.4 },
        visible: {
          opacity: 1,
          scaleX: 1,
          transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
        },
      }

  const staggerContainer = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : inheritAnimation
      ? {
          hidden: { opacity: 0, y: 12 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
              staggerChildren: 0.1,
              delayChildren: 0.06,
            },
          },
        }
      : {
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.1, delayChildren: 0.02 },
          },
        }

  if (staggeredEntry) {
    return (
      <motion.div
        id={id}
        className="mb-12 sm:mb-16"
        variants={staggerContainer}
        initial={inheritAnimation ? undefined : 'hidden'}
        whileInView={inheritAnimation ? undefined : 'visible'}
        viewport={inheritAnimation ? undefined : sectionViewport}
      >
        <motion.h2
          className="font-heading text-3xl sm:text-4xl lg:text-[2.85rem] font-bold text-milk tracking-[-0.03em] leading-[1.15]"
          variants={titleVariants}
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            className="mt-4 text-base sm:text-lg text-soft-gray max-w-2xl leading-[1.7]"
            variants={subtitleVariants}
          >
            {subtitle}
          </motion.p>
        )}
        <motion.div
          className="mt-6 h-px w-20 origin-left bg-gradient-to-r from-lavender/50 via-powder/30 to-transparent"
          variants={lineVariants}
        />
      </motion.div>
    )
  }

  return (
    <motion.div
      id={id}
      className="mb-12 sm:mb-16"
      initial={inheritAnimation ? undefined : 'hidden'}
      whileInView={inheritAnimation ? undefined : 'visible'}
      viewport={inheritAnimation ? undefined : sectionViewport}
      variants={variants}
    >
      <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.85rem] font-bold text-milk tracking-[-0.03em] leading-[1.15]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-soft-gray max-w-2xl leading-[1.7]">
          {subtitle}
        </p>
      )}
      <div className="mt-6 h-px w-20 bg-gradient-to-r from-lavender/50 via-powder/30 to-transparent" />
    </motion.div>
  )
}
