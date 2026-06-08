import { motion } from 'framer-motion'

const gradientVariants = [
  'from-lavender/20 via-graphite-light to-apricot/15',
  'from-apricot/15 via-lavender/10 to-graphite-light',
  'from-powder/10 via-apricot-soft/10 to-lavender/15',
  'from-lavender-soft/15 via-graphite-light to-powder/10',
]

const icons = {
  image: (
    <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  video: (
    <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  portrait: (
    <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
}

export default function PlaceholderMedia({
  src = null,
  alt = 'Изображение',
  caption = 'Здесь будет изображение',
  type = 'image',
  className = '',
  variant = 0,
  aspectRatio = 'aspect-[4/3]',
}) {
  if (src) {
    if (type === 'video') {
      return (
        <video
          src={src}
          className={`w-full h-full object-cover ${className}`}
          controls
          aria-label={alt}
        >
          <track kind="captions" />
        </video>
      )
    }
    return (
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
        loading="lazy"
      />
    )
  }

  const gradient = gradientVariants[variant % gradientVariants.length]
  const icon = icons[type] || icons.image

  return (
    <div
      className={`relative overflow-hidden ${aspectRatio} ${className}`}
      role="img"
      aria-label={caption}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        }}
      />
      <motion.div
        className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-lavender/20 blur-3xl"
        animate={{ x: [0, 10, 0], y: [0, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-1/4 -left-1/4 w-1/3 h-1/3 rounded-full bg-apricot/15 blur-3xl"
        animate={{ x: [0, -8, 0], y: [0, 6, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 border border-white/10 rounded-[inherit]">
        <div className="text-lavender/60">{icon}</div>
        <p className="text-sm sm:text-base text-soft-gray text-center leading-relaxed max-w-[220px]">
          {caption}
        </p>
      </div>
    </div>
  )
}
