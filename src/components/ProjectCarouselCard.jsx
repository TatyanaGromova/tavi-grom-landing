import { useRef } from 'react'
import PlaceholderMedia from './PlaceholderMedia'
import ProjectPreviewVideo from './ProjectPreviewVideo'
import { useMotionSettings } from '../utils/motion'

export default function ProjectCarouselCard({ project, index, onOpenDetails }) {
  const triggerRef = useRef(null)
  const { prefersReducedMotion } = useMotionSettings()

  const handleDetails = () => {
    onOpenDetails(project, triggerRef)
  }

  const renderMedia = () => {
    if (project.previewVideo) {
      return (
        <ProjectPreviewVideo
          src={project.previewVideo}
          fallbackSrc={project.previewVideoFallback}
          alt={project.alt}
          caption="Здесь будет видео проекта"
          aspectRatio="aspect-[16/10]"
          className="project-carousel-card__media-inner project-carousel-card__media-video"
          objectPosition={project.objectPosition}
          variant={index}
        />
      )
    }

    if (project.video && !project.image) {
      return (
        <div className="project-carousel-card__media-inner project-carousel-card__media-video aspect-[16/10] relative overflow-hidden">
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
          <div
            className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-graphite/25 to-graphite/5 pointer-events-none"
            aria-hidden="true"
          />
        </div>
      )
    }

    return (
      <PlaceholderMedia
        src={project.image}
        alt={project.alt}
        caption="Здесь будет изображение проекта"
        variant={index}
        aspectRatio="aspect-[16/10]"
        className="project-carousel-card__media-inner project-carousel-card__media-image"
        objectPosition={project.objectPosition}
        premium
      />
    )
  }

  return (
    <article
      className={`project-carousel-card group${prefersReducedMotion ? '' : ' project-carousel-card--animated'}`}
    >
      <div className="project-carousel-card__media">
        {renderMedia()}
        <div
          className="project-carousel-card__media-overlay"
          aria-hidden="true"
        />
      </div>

      <div className="project-carousel-card__body">
        {project.category && (
          <div className="project-carousel-card__tags">
            {project.category.split(',').map((tag) => (
              <span key={tag.trim()} className="project-carousel-card__tag">
                {tag.trim()}
              </span>
            ))}
          </div>
        )}

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
          <span className="project-carousel-card__cta-arrow" aria-hidden="true">
            →
          </span>
        </button>
      </div>
    </article>
  )
}
