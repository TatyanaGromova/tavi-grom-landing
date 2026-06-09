import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const gradientVariants = [
  'from-lavender/22 via-bg-elevated to-apricot/16',
  'from-apricot/16 via-bg-elevated to-lavender/14',
  'from-powder/14 via-bg-elevated to-lavender/16',
  'from-lavender-soft/16 via-bg-elevated to-apricot-soft/12',
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
  premium = false,
  objectPosition = 'center',
  eager = false,
  onMediaError,
  showControls = false,
}) {
  const prefersReducedMotion = useReducedMotion()
  const [failed, setFailed] = useState(false)

  const handleError = () => {
    setFailed(true)
    onMediaError?.()
  }

  if (src && !failed) {
    if (type === 'video' && showControls) {
      return (
        <video
          src={src}
          className={`w-full h-full object-cover ${className}`}
          style={{ objectPosition }}
          controls
          muted
          playsInline
          aria-label={alt}
          onError={handleError}
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
        style={{ objectPosition }}
        loading={eager ? 'eager' : 'lazy'}
        onError={handleError}
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

      {premium && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(214,185,140,0.12), transparent 70%)',
          }}
          aria-hidden="true"
        />
      )}

      <div className="absolute inset-0 hero-noise opacity-60" aria-hidden="true" />

      <motion.div
        className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-lavender/15 blur-3xl"
        animate={prefersReducedMotion ? {} : { x: [0, 10, 0], y: [0, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute -bottom-1/4 -left-1/4 w-1/3 h-1/3 rounded-full bg-apricot/12 blur-3xl"
        animate={prefersReducedMotion ? {} : { x: [0, -8, 0], y: [0, 6, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      {premium && (
        <>
          <div
            className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
            aria-hidden="true"
          />
          <div
            className="absolute top-8 left-8 w-2 h-2 rounded-full border border-lavender/20"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-10 right-10 w-3 h-3 rounded-full border border-apricot/15"
            aria-hidden="true"
          />
        </>
      )}

      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 ${
          premium ? 'pt-14' : ''
        }`}
      >
        <div
          className={`flex items-center justify-center rounded-2xl ${
            premium
              ? 'w-14 h-14 bg-bg-elevated/60 border border-white/10 text-lavender/60'
              : 'text-lavender/60'
          }`}
        >
          {icon}
        </div>
        <p className="text-sm sm:text-base text-soft-gray text-center leading-relaxed max-w-[220px]">
          {caption}
        </p>
      </div>

      <div
        className={`absolute inset-0 rounded-[inherit] pointer-events-none ${
          premium
            ? 'border border-accent/25 shadow-[inset_0_0_40px_rgba(214,185,140,0.08)]'
            : 'border border-white/10'
        }`}
        aria-hidden="true"
      />
    </div>
  )
}
