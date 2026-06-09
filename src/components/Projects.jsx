import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from './SectionTitle'
import ProjectCarouselCard from './ProjectCarouselCard'
import ProjectDetailPanel from './ProjectDetailPanel'
import { projects } from '../data/projects'
import {
  cardRevealPremium,
  fadeUpPremium,
  premiumEase,
  sectionViewport,
  useMotionSettings,
} from '../utils/motion'

export default function Projects() {
  const trackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)
  const [detailTriggerRef, setDetailTriggerRef] = useState(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)
  const { prefersReducedMotion } = useMotionSettings()

  const entryY = prefersReducedMotion ? 0 : 14

  const sectionVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.11, delayChildren: 0.04 },
        },
      }

  const carouselShellVariants = fadeUpPremium(prefersReducedMotion, entryY, 0.82)

  const trackVariants = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.1, delayChildren: 0.12 },
        },
      }

  const slideVariants = cardRevealPremium(prefersReducedMotion, prefersReducedMotion ? 0 : 16)

  const updateScrollState = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    const { scrollLeft, scrollWidth, clientWidth } = track
    const maxScroll = scrollWidth - clientWidth
    setCanScrollPrev(scrollLeft > 8)
    setCanScrollNext(scrollLeft < maxScroll - 8)
    setScrollProgress(maxScroll > 0 ? scrollLeft / maxScroll : 1)

    const cards = Array.from(track.children)
    if (!cards.length) return

    let closestIndex = 0
    let closestDistance = Number.POSITIVE_INFINITY

    cards.forEach((card, index) => {
      const distance = Math.abs(card.offsetLeft - scrollLeft)
      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })

    setActiveIndex(closestIndex)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined

    updateScrollState()
    track.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)

    return () => {
      track.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [updateScrollState])

  const scrollToIndex = (index) => {
    const track = trackRef.current
    const card = track?.children[index]
    if (!card) return

    card.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest',
    })
  }

  const scrollByDirection = (direction) => {
    const nextIndex = Math.min(Math.max(activeIndex + direction, 0), projects.length - 1)
    scrollToIndex(nextIndex)
  }

  const handleOpenDetails = (project, triggerRef) => {
    setSelectedProject(project)
    setDetailTriggerRef(triggerRef)
  }

  const handleCloseDetails = () => {
    setSelectedProject(null)
  }

  return (
    <section id="projects" className="section-padding section-surface projects-section">
      <div className="container-wide">
        <motion.div
          className="projects-entry"
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={sectionVariants}
        >
          <SectionTitle
            title="Проекты"
            subtitle="Каждый проект — это не просто файл или картинка, а собранная форма идеи."
            staggeredEntry
            inheritAnimation
          />

          <motion.div className="projects-carousel" variants={carouselShellVariants}>
            <motion.button
              type="button"
              className="projects-carousel__arrow projects-carousel__arrow--prev"
              onClick={() => scrollByDirection(-1)}
              disabled={!canScrollPrev}
              aria-label="Предыдущий проект"
              whileHover={prefersReducedMotion ? {} : { x: -3 }}
              transition={{ duration: 0.28, ease: premiumEase }}
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M15 6l-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>

            <div className="projects-carousel__viewport">
              <div className="projects-carousel__fade projects-carousel__fade--left" aria-hidden="true" />
              <div className="projects-carousel__fade projects-carousel__fade--right" aria-hidden="true" />
              <motion.div
                ref={trackRef}
                className="projects-carousel__track"
                variants={trackVariants}
              >
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="projects-carousel__slide"
                    variants={slideVariants}
                  >
                    <ProjectCarouselCard
                      project={project}
                      index={index}
                      onOpenDetails={handleOpenDetails}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.button
              type="button"
              className="projects-carousel__arrow projects-carousel__arrow--next"
              onClick={() => scrollByDirection(1)}
              disabled={!canScrollNext}
              aria-label="Следующий проект"
              whileHover={prefersReducedMotion ? {} : { x: 3 }}
              transition={{ duration: 0.28, ease: premiumEase }}
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>

            <div
              className="projects-carousel__progress"
              aria-hidden="true"
              role="presentation"
            >
              <motion.div
                className="projects-carousel__progress-fill"
                initial={false}
                animate={{ width: `${Math.max(scrollProgress * 100, 4)}%` }}
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.35, ease: premiumEase }}
              />
            </div>

            <div className="projects-carousel__dots" role="tablist" aria-label="Навигация по проектам">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  role="tab"
                  className={`projects-carousel__dot${index === activeIndex ? ' projects-carousel__dot--active' : ''}`}
                  aria-label={`Проект ${index + 1}: ${project.title}`}
                  aria-selected={index === activeIndex}
                  onClick={() => scrollToIndex(index)}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <ProjectDetailPanel
        project={selectedProject}
        triggerRef={detailTriggerRef}
        onClose={handleCloseDetails}
      />
    </section>
  )
}
