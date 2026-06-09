import { motion } from 'framer-motion'
import PlaceholderMedia from './PlaceholderMedia'
import VideoPreview from './VideoPreview'
import { useMotionSettings } from '../utils/motion'

export default function ProjectCard({
  title,
  category,
  description,
  image,
  imageAlt,
  video = null,
  objectPosition = 'center',
  index = 0,
}) {
  const { fadeUp, prefersReducedMotion } = useMotionSettings()

  return (
    <motion.article
      className="group relative premium-card rounded-2xl overflow-hidden"
      variants={fadeUp}
      whileHover={prefersReducedMotion ? {} : { y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      <div className="relative overflow-hidden">
        {video ? (
          <VideoPreview
            poster={image}
            videoSrc={video}
            alt={imageAlt}
            caption="Здесь будет видео проекта"
            aspectRatio="aspect-[16/10]"
            className="rounded-t-2xl transition-transform duration-500 group-hover:scale-[1.02]"
            objectPosition={objectPosition}
          />
        ) : (
          <PlaceholderMedia
            src={image}
            alt={imageAlt}
            caption="Здесь будет изображение проекта"
            variant={index}
            aspectRatio="aspect-[16/10]"
            className="rounded-t-2xl transition-transform duration-500 group-hover:scale-[1.03]"
            objectPosition={objectPosition}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5 pointer-events-none">
          <p className="text-sm text-milk/90 leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>
      </div>
      <div className="p-5 sm:p-6">
        <span className="text-xs text-lavender/70 tracking-wide">{category}</span>
        <h3 className="font-heading text-lg sm:text-xl font-semibold text-milk mt-2">
          {title}
        </h3>
        <p className="text-sm text-soft-gray mt-2 leading-relaxed line-clamp-2 sm:hidden">
          {description}
        </p>
        <button
          type="button"
          className="mt-4 text-sm text-lavender hover:text-lavender-soft transition-colors opacity-0 group-hover:opacity-100 hidden sm:inline-block"
          aria-label={`Подробнее о проекте «${title}»`}
        >
          Подробнее →
        </button>
      </div>
    </motion.article>
  )
}
