import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PlaceholderMedia from './PlaceholderMedia'
import ProjectPreviewVideo from './ProjectPreviewVideo'
import VideoCard from './VideoCard'
import { fadeUpPremium, premiumEase, useMotionSettings } from '../utils/motion'

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

const detailBlocks = [
  { key: 'task', title: 'Задача' },
  { key: 'work', title: 'Что сделано' },
  { key: 'result', title: 'Результат' },
]

const contentItem = (prefersReducedMotion, y = 12) =>
  prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: premiumEase },
        },
      }

const galleryItem = (prefersReducedMotion) =>
  prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 10, scale: 0.98 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.5, ease: premiumEase },
        },
      }

function ProjectHeroMedia({ project }) {
  if (project.previewVideo) {
    return (
      <ProjectPreviewVideo
        src={project.previewVideo}
        fallbackSrc={project.previewVideoFallback}
        alt={project.alt}
        aspectRatio="aspect-[16/10]"
        className="rounded-xl overflow-hidden"
        objectPosition={project.objectPosition}
      />
    )
  }

  if (project.video) {
    return (
      <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
        <video
          src={project.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: project.objectPosition }}
          aria-label={project.alt}
        />
      </div>
    )
  }

  return (
    <PlaceholderMedia
      src={project.image}
      alt={project.alt}
      caption="Здесь будет изображение проекта"
      aspectRatio="aspect-[16/10]"
      className="rounded-xl overflow-hidden"
      objectPosition={project.objectPosition}
      premium
      eager
    />
  )
}

export default function ProjectDetailPanel({ project, triggerRef, onClose }) {
  const titleId = useId()
  const closeRef = useRef(null)
  const isDesktop = useIsDesktop()
  const { prefersReducedMotion } = useMotionSettings()
  const isOpen = Boolean(project)

  useEffect(() => {
    if (!isOpen) return undefined

    document.body.style.overflow = 'hidden'
    const timer = window.setTimeout(() => closeRef.current?.focus(), prefersReducedMotion ? 0 : 120)

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.clearTimeout(timer)
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
      triggerRef?.current?.focus()
    }
  }, [isOpen, onClose, triggerRef, prefersReducedMotion])

  const panelTransition = { duration: prefersReducedMotion ? 0.01 : 0.36, ease: premiumEase }
  const backdropTransition = { duration: prefersReducedMotion ? 0.01 : 0.32, ease: premiumEase }

  const panelMotion = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : isDesktop
      ? {
          initial: { x: '100%', opacity: 0.55 },
          animate: { x: 0, opacity: 1 },
          exit: { x: '100%', opacity: 0.55 },
          transition: panelTransition,
        }
      : {
          initial: { y: '100%', opacity: 0.7, scale: 0.96 },
          animate: { y: 0, opacity: 1, scale: 1 },
          exit: { y: '100%', opacity: 0.7, scale: 0.96 },
          transition: panelTransition,
        }

  const contentStagger = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.08, delayChildren: 0.14 },
        },
      }

  const blockStagger = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.07, delayChildren: 0.04 },
        },
      }

  const galleryStagger = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.06, delayChildren: 0.06 },
        },
      }

  return (
    <AnimatePresence>
      {project && (
        <div className="project-detail-root" role="presentation">
          <motion.button
            type="button"
            className="project-detail-backdrop"
            aria-label="Закрыть подробный просмотр"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={backdropTransition}
            onClick={onClose}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-label={`Подробности проекта «${project.title}»`}
            className="project-detail-panel"
            {...panelMotion}
          >
            <div className="project-detail-panel__header">
              <motion.div
                key={`${project.id}-header`}
                className="min-w-0 flex-1"
                initial="hidden"
                animate="visible"
                variants={contentStagger}
              >
                <motion.h2
                  id={titleId}
                  className="project-detail-panel__title"
                  variants={contentItem(prefersReducedMotion, 10)}
                >
                  {project.title}
                </motion.h2>

                {project.category && (
                  <motion.div
                    className="project-detail-panel__tags"
                    variants={contentItem(prefersReducedMotion, 8)}
                  >
                    {project.category.split(',').map((tag) => (
                      <span key={tag.trim()} className="project-detail-panel__tag">
                        {tag.trim()}
                      </span>
                    ))}
                  </motion.div>
                )}
              </motion.div>

              <button
                ref={closeRef}
                type="button"
                className="project-detail-panel__close"
                onClick={onClose}
              >
                Закрыть
              </button>
            </div>

            <div className="project-detail-panel__scroll">
              <motion.div
                key={project.id}
                initial="hidden"
                animate="visible"
                variants={contentStagger}
              >
                <motion.div className="project-detail-panel__hero" variants={contentItem(prefersReducedMotion)}>
                  <ProjectHeroMedia project={project} />
                </motion.div>

                <motion.p className="project-detail-panel__description" variants={contentItem(prefersReducedMotion)}>
                  {project.description}
                </motion.p>

                <motion.div className="project-detail-panel__blocks" variants={blockStagger}>
                  {detailBlocks.map((block) =>
                    project[block.key] ? (
                      <motion.div
                        key={block.key}
                        className="project-detail-panel__block"
                        variants={contentItem(prefersReducedMotion, 10)}
                      >
                        <h3 className="project-detail-panel__block-title">{block.title}</h3>
                        <p className="project-detail-panel__block-text">{project[block.key]}</p>
                      </motion.div>
                    ) : null,
                  )}
                </motion.div>

                {project.gallery?.length > 0 && (
                  <motion.div className="project-detail-panel__gallery" variants={galleryStagger}>
                    <motion.p className="project-detail-panel__section-label" variants={contentItem(prefersReducedMotion)}>
                      Галерея
                    </motion.p>
                    <div className="project-detail-panel__gallery-grid">
                      {project.gallery.map((item) => (
                        <motion.figure
                          key={item.src}
                          className="project-detail-panel__gallery-item"
                          variants={galleryItem(prefersReducedMotion)}
                        >
                          <img
                            src={item.src}
                            alt={item.alt}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </motion.figure>
                      ))}
                    </div>
                  </motion.div>
                )}

                {project.videoGallery?.length > 0 && (
                  <motion.div className="project-detail-panel__gallery" variants={galleryStagger}>
                    <motion.p className="project-detail-panel__section-label" variants={contentItem(prefersReducedMotion)}>
                      Видеогалерея
                    </motion.p>
                    <div className="project-detail-panel__video-grid">
                      {project.videoGallery.map((item) => (
                        <motion.div key={item.title} variants={galleryItem(prefersReducedMotion)}>
                          <VideoCard
                            title={item.title}
                            src={item.src}
                            description={item.description}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
