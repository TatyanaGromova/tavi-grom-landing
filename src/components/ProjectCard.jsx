import { motion } from 'framer-motion'
import PlaceholderMedia from './PlaceholderMedia'
import ProjectPreviewVideo from './ProjectPreviewVideo'
import VideoPreview from './VideoPreview'
import VideoCard from './VideoCard'
import { useMotionSettings } from '../utils/motion'

export default function ProjectCard({
  title,
  category,
  description,
  image,
  imageAlt,
  video = null,
  previewVideo = null,
  previewVideoFallback = null,
  videoGallery = null,
  objectPosition = 'center',
  index = 0,
}) {
  const { fadeUp, prefersReducedMotion } = useMotionSettings()
  const hasGallery = videoGallery && videoGallery.length > 0
  const showMedia = previewVideo || video || image || !hasGallery
  const enableHoverLift = !prefersReducedMotion && (!hasGallery || previewVideo)
  const hasImageOnly = !previewVideo && !video && image

  const renderMedia = () => {
    if (previewVideo) {
      return (
        <ProjectPreviewVideo
          src={previewVideo}
          fallbackSrc={previewVideoFallback}
          alt={imageAlt}
          caption="Здесь будет видео проекта"
          aspectRatio="aspect-[16/10]"
          className="rounded-t-2xl transition-transform duration-500 group-hover:scale-[1.02]"
          objectPosition={objectPosition}
          variant={index}
        />
      )
    }

    if (video) {
      return (
        <VideoPreview
          poster={image}
          videoSrc={video}
          alt={imageAlt}
          caption="Здесь будет видео проекта"
          aspectRatio="aspect-[16/10]"
          className="rounded-t-2xl transition-transform duration-500 group-hover:scale-[1.02]"
          objectPosition={objectPosition}
        />
      )
    }

    return (
      <PlaceholderMedia
        src={image}
        alt={imageAlt}
        caption="Здесь будет изображение проекта"
        variant={index}
        aspectRatio="aspect-[16/10]"
        className="rounded-t-2xl transition-transform duration-500 group-hover:scale-[1.03]"
        objectPosition={objectPosition}
      />
    )
  }

  return (
    <motion.article
      className={`group relative premium-card rounded-2xl overflow-hidden ${hasGallery ? 'flex flex-col' : ''}`}
      variants={fadeUp}
      whileHover={enableHoverLift ? { y: -8 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      {showMedia && (
        <div className="relative overflow-hidden shrink-0">
          {renderMedia()}
          {hasImageOnly && (
            <div
              className="absolute inset-0 bg-gradient-to-t from-graphite/75 via-graphite/20 to-graphite/5 pointer-events-none"
              aria-hidden="true"
            />
          )}
          {!hasGallery && (
            <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5 pointer-events-none">
              <p className="text-sm text-milk/90 leading-relaxed line-clamp-3">
                {description}
              </p>
            </div>
          )}
        </div>
      )}

      <div className={`p-5 sm:p-6 ${hasGallery ? 'pb-4' : ''}`}>
        {category && (
          <div className="flex flex-wrap gap-1.5">
            {category.split(',').map((tag) => (
              <span
                key={tag.trim()}
                className="text-[11px] px-2.5 py-1 rounded-md bg-accent/8 border border-accent/15 text-lavender/80 tracking-wide"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}
        <h3 className="font-heading text-lg sm:text-xl font-semibold text-milk mt-2">
          {title}
        </h3>
        <p className={`text-sm text-soft-gray mt-2 leading-relaxed ${hasGallery ? '' : 'line-clamp-2 sm:hidden'}`}>
          {description}
        </p>
        {!hasGallery && (
          <button
            type="button"
            className="mt-4 text-sm text-lavender hover:text-lavender-soft transition-colors opacity-0 group-hover:opacity-100 hidden sm:inline-block"
            aria-label={`Подробнее о проекте «${title}»`}
          >
            Подробнее →
          </button>
        )}
      </div>

      {hasGallery && (
        <div className="px-5 sm:px-6 pb-5 sm:pb-6">
          <p className="text-xs text-soft-gray mb-4 tracking-wide uppercase">Видеогалерея</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {videoGallery.map((item) => (
              <VideoCard
                key={item.title}
                title={item.title}
                src={item.src}
                description={item.description}
              />
            ))}
          </div>
        </div>
      )}
    </motion.article>
  )
}
