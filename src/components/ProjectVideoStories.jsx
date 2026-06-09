import { motion } from 'framer-motion'
import ProjectVerticalVideo from './ProjectVerticalVideo'
import { premiumEase, useMotionSettings } from '../utils/motion'

export default function ProjectVideoStories({ items, label = 'Видеоистории' }) {
  const { prefersReducedMotion } = useMotionSettings()

  const itemVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 8 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: premiumEase },
        },
      }

  const stagger = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
      }

  if (!items?.length) return null

  return (
    <motion.div
      className="project-video-stories"
      initial="hidden"
      animate="visible"
      variants={stagger}
    >
      <motion.p className="project-detail-panel__section-label" variants={itemVariants}>
        {label}
      </motion.p>
      <div className="project-video-stories__viewport">
        <div className="project-video-stories__fade project-video-stories__fade--left" aria-hidden="true" />
        <div className="project-video-stories__fade project-video-stories__fade--right" aria-hidden="true" />
        <div className="project-video-stories__track">
          {items.map((item) => (
            <motion.div
              key={item.title}
              className="project-video-stories__slide"
              variants={itemVariants}
            >
              <ProjectVerticalVideo
                src={item.src}
                title={item.title}
                description={item.description}
                mediaFit={item.mediaFit ?? 'cover'}
                mediaPosition={item.mediaPosition ?? 'center'}
                poster={item.poster}
                variant="story"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
