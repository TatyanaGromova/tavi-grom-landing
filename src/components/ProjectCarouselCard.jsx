import { useRef } from 'react'
import ProjectMedia from './ProjectMedia'
import { useMotionSettings } from '../utils/motion'

export default function ProjectCarouselCard({ project, index, onOpenDetails }) {
  const triggerRef = useRef(null)
  const { prefersReducedMotion } = useMotionSettings()
  const primaryTag = project.category?.split(',')[0]?.trim()

  const handleDetails = () => {
    onOpenDetails(project, triggerRef)
  }

  return (
    <article
      className={`project-carousel-card group${prefersReducedMotion ? '' : ' project-carousel-card--animated'}`}
    >
      <div className="project-carousel-card__media">
        <ProjectMedia project={project} variant="card" index={index} type="auto" />
      </div>

      <div className="project-carousel-card__body">
        {primaryTag && <span className="project-carousel-card__tag">{primaryTag}</span>}

        <h3 className="project-carousel-card__title">{project.title}</h3>
        <p className="project-carousel-card__desc">{project.description}</p>

        <button
          ref={triggerRef}
          type="button"
          className="project-carousel-card__cta"
          onClick={handleDetails}
          aria-label={`Подробнее о проекте «${project.title}»`}
        >
          Подробнее
        </button>
      </div>
    </article>
  )
}
