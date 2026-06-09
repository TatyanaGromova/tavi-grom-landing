import { useState } from 'react'
import PlaceholderMedia from './PlaceholderMedia'

function mediaStyle(fit, position) {
  return {
    objectFit: fit,
    objectPosition: position,
  }
}

export function resolveProjectMedia(project, overrides = {}) {
  const fit = overrides.mediaFit ?? project?.mediaFit ?? 'cover'
  const position =
    overrides.mediaPosition ??
    project?.mediaPosition ??
    project?.objectPosition ??
    'center'

  return { fit, position }
}

export default function ProjectMedia({
  project,
  variant = 'card',
  index = 0,
  src = null,
  alt = '',
  mediaFit,
  mediaPosition,
  type = 'auto',
  className = '',
  eager = false,
  fallbackVideo = null,
}) {
  const { fit, position } = resolveProjectMedia(project, { mediaFit, mediaPosition })
  const isContain = fit === 'contain'
  const resolvedAlt = alt || project?.alt || 'Медиа проекта'
  const resolvedType =
    type === 'auto'
      ? project?.previewVideo
        ? 'preview'
        : project?.video && !project?.image
          ? 'video'
          : 'image'
      : type

  const [videoFailed, setVideoFailed] = useState(false)
  const [currentVideo, setCurrentVideo] = useState(
    () => project?.previewVideo || project?.video || src,
  )

  const shellClass = [
    'project-media',
    `project-media--${variant}`,
    isContain ? 'project-media--contain' : 'project-media--cover',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const handleVideoError = () => {
    if (fallbackVideo && currentVideo !== fallbackVideo) {
      setCurrentVideo(fallbackVideo)
      return
    }
    if (project?.previewVideoFallback && currentVideo !== project.previewVideoFallback) {
      setCurrentVideo(project.previewVideoFallback)
      return
    }
    setVideoFailed(true)
  }

  if (resolvedType === 'preview' || resolvedType === 'video') {
    const videoSrc =
      resolvedType === 'preview'
        ? currentVideo || project?.previewVideo
        : src || project?.video || currentVideo

    if (!videoSrc || videoFailed) {
      return (
        <div className={shellClass}>
          <PlaceholderMedia
            src={project?.image}
            alt={resolvedAlt}
            caption="Здесь будет видео проекта"
            type="video"
            variant={index}
            className="project-media__placeholder"
            objectPosition={position}
            premium
          />
        </div>
      )
    }

    return (
      <div className={shellClass}>
        {isContain && <div className="project-media__backdrop" aria-hidden="true" />}
        <video
          key={videoSrc}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="project-media__asset"
          style={mediaStyle(fit, position)}
          aria-label={resolvedAlt}
          onError={handleVideoError}
        />
      </div>
    )
  }

  const imageSrc = src || project?.image

  if (!imageSrc) {
    return (
      <div className={shellClass}>
        <PlaceholderMedia
          src={null}
          alt={resolvedAlt}
          caption="Здесь будет изображение проекта"
          variant={index}
          className="project-media__placeholder"
          objectPosition={position}
          premium
        />
      </div>
    )
  }

  return (
    <div className={shellClass}>
      {isContain && <div className="project-media__backdrop" aria-hidden="true" />}
      <img
        src={imageSrc}
        alt={resolvedAlt}
        className="project-media__asset"
        style={mediaStyle(fit, position)}
        loading={eager ? 'eager' : 'lazy'}
      />
    </div>
  )
}
