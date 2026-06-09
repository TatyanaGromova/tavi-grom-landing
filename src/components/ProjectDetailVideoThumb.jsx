import { useRef, useState } from 'react'

export default function ProjectDetailVideoThumb({ title, src, description, mediaFit = 'cover', mediaPosition = 'center' }) {
  const videoRef = useRef(null)
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div className="project-detail-video-thumb project-detail-video-thumb--empty">
        <p className="project-detail-video-thumb__title">{title}</p>
        {description && <p className="project-detail-video-thumb__desc">{description}</p>}
      </div>
    )
  }

  const play = () => {
    videoRef.current?.play().catch(() => {})
  }

  const pause = () => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0
  }

  return (
    <article
      className="project-detail-video-thumb group"
      onMouseEnter={play}
      onMouseLeave={pause}
      onFocus={play}
      onBlur={pause}
    >
      <div className={`project-detail-video-thumb__media${mediaFit === 'contain' ? ' project-detail-video-thumb__media--contain' : ''}`}>
        <video
          ref={videoRef}
          muted
          playsInline
          loop
          preload="metadata"
          className="project-detail-video-thumb__video"
          style={{ objectFit: mediaFit, objectPosition: mediaPosition }}
          aria-label={title}
          onError={() => setFailed(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>
      <div className="project-detail-video-thumb__meta">
        <p className="project-detail-video-thumb__title">{title}</p>
        {description && <p className="project-detail-video-thumb__desc">{description}</p>}
      </div>
    </article>
  )
}
