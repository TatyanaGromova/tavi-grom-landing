import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { premiumEase, useMotionSettings } from '../utils/motion'

export default function MediaLightbox({ items, index = 0, onClose, onChange }) {
  const closeRef = useRef(null)
  const videoRef = useRef(null)
  const { prefersReducedMotion } = useMotionSettings()
  const isOpen = Array.isArray(items) && items.length > 0
  const current = isOpen ? items[Math.min(Math.max(index, 0), items.length - 1)] : null
  const hasMany = items?.length > 1
  const canPrev = hasMany && index > 0
  const canNext = hasMany && index < items.length - 1

  useEffect(() => {
    if (!isOpen) return undefined

    document.body.style.overflow = 'hidden'
    const timer = window.setTimeout(() => closeRef.current?.focus(), prefersReducedMotion ? 0 : 80)

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft' && canPrev) onChange(index - 1)
      if (event.key === 'ArrowRight' && canNext) onChange(index + 1)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.clearTimeout(timer)
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose, onChange, index, canPrev, canNext, prefersReducedMotion])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    if (!isOpen || current?.type !== 'video') {
      video.pause()
      video.currentTime = 0
      video.muted = true
      return undefined
    }

    video.pause()
    video.currentTime = 0
    video.muted = true

    return () => {
      video.pause()
      video.currentTime = 0
      video.muted = true
    }
  }, [isOpen, current?.type, current?.src, index])

  const transition = { duration: prefersReducedMotion ? 0.01 : 0.28, ease: premiumEase }

  return (
    <AnimatePresence>
      {isOpen && current && (
        <div className="media-lightbox-root" role="presentation">
          <motion.button
            type="button"
            className="media-lightbox-backdrop"
            aria-label="Закрыть просмотр медиа"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            onClick={onClose}
          />

          {canPrev && (
            <button
              type="button"
              className="media-lightbox-nav media-lightbox-nav--prev"
              aria-label="Предыдущее медиа"
              onClick={() => onChange(index - 1)}
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}

          {canNext && (
            <button
              type="button"
              className="media-lightbox-nav media-lightbox-nav--next"
              aria-label="Следующее медиа"
              onClick={() => onChange(index + 1)}
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.title || current.alt || 'Просмотр медиа'}
            className="media-lightbox-panel"
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.96 }}
            transition={transition}
          >
            <button
              ref={closeRef}
              type="button"
              className="media-lightbox-close"
              onClick={onClose}
              aria-label="Закрыть"
            >
              <span aria-hidden="true">×</span>
            </button>

            <div
              className={`media-lightbox-stage${current.vertical ? ' media-lightbox-stage--vertical' : ''}`}
            >
              {current.type === 'video' ? (
                <video
                  ref={videoRef}
                  key={current.src}
                  src={current.src}
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  className="media-lightbox-video"
                  style={{
                    objectFit: current.mediaFit ?? 'contain',
                    objectPosition: current.mediaPosition ?? 'center',
                  }}
                  aria-label={current.alt}
                />
              ) : (
                <img
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  className="media-lightbox-image"
                  style={{
                    objectFit: current.mediaFit ?? 'contain',
                    objectPosition: current.mediaPosition ?? 'center',
                  }}
                />
              )}
            </div>

            {(current.title || current.description) && (
              <div className="media-lightbox-caption">
                {current.title && <p className="media-lightbox-caption__title">{current.title}</p>}
                {current.description && (
                  <p className="media-lightbox-caption__desc">{current.description}</p>
                )}
              </div>
            )}

            {hasMany && (
              <p className="media-lightbox-counter" aria-live="polite">
                {index + 1} / {items.length}
              </p>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
