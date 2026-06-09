import { useRef, useState } from 'react'

export default function ProjectVerticalVideo({
  src,
  title = '',
  description = '',
  mediaFit = 'cover',
  mediaPosition = 'center',
  variant = 'story',
  poster = null,
  autoplay = false,
  className = '',
}) {
  const videoRef = useRef(null)
  const [failed, setFailed] = useState(false)

  const shellClass = [
    'project-vertical-video',
    `project-vertical-video--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const play = () => {
    videoRef.current?.play().catch(() => {})
  }

  const pause = () => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    if (variant !== 'hero') {
      video.currentTime = 0
    }
  }

  if (!src || failed) {
    return (
      <article className={`${shellClass} project-vertical-video--empty`}>
        <div className="project-vertical-video__frame">
          <div className="project-vertical-video__fallback">
            <span>Видео недоступно</span>
          </div>
        </div>
        {title && <p className="project-vertical-video__title">{title}</p>}
      </article>
    )
  }

  const interactive = !autoplay

  return (
    <article
      className={shellClass}
      onMouseEnter={interactive ? play : undefined}
      onMouseLeave={interactive ? pause : undefined}
      onFocus={interactive ? play : undefined}
      onBlur={interactive ? pause : undefined}
    >
      <div className="project-vertical-video__frame">
        <div className="project-vertical-video__glow" aria-hidden="true" />
        <video
          ref={videoRef}
          src={src}
          poster={poster || undefined}
          autoPlay={autoplay}
          muted
          loop
          playsInline
          preload="metadata"
          className="project-vertical-video__video"
          style={{ objectFit: mediaFit, objectPosition: mediaPosition }}
          aria-label={title || 'Видео проекта'}
          onError={() => setFailed(true)}
        />
      </div>
      {title && <p className="project-vertical-video__title">{title}</p>}
      {description && variant === 'story' && (
        <p className="project-vertical-video__desc">{description}</p>
      )}
    </article>
  )
}
