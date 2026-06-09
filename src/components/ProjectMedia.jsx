import { useState } from 'react'
import PlaceholderMedia from './PlaceholderMedia'
import ProjectVerticalVideo from './ProjectVerticalVideo'

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

export function resolveCardMedia(project) {
  if (project?.cover) return { kind: 'image', src: project.cover }
  if (project?.image) return { kind: 'image', src: project.image }
  if (project?.previewVideo) {
    return {
      kind: 'vertical-preview',
      src: project.previewVideo,
      poster: project.poster ?? project.cover ?? null,
    }
  }
  return { kind: 'placeholder' }
}

function ContainBackdrop({ src, isVideo = false }) {
  if (!src) {
    return <div className="project-media__backdrop" aria-hidden="true" />
  }

  if (isVideo) {
    return (
      <>
        <video
          className="project-media__blur-bg"
          src={src}
          muted
          playsInline
          autoPlay
          loop
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className="project-media__backdrop" aria-hidden="true" />
      </>
    )
  }

  return (
    <>
      <div
        className="project-media__blur-bg"
        style={{ backgroundImage: `url(${src})` }}
        aria-hidden="true"
      />
      <div className="project-media__backdrop" aria-hidden="true" />
    </>
  )
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

  const cardMedia = variant === 'card' && type === 'auto' ? resolveCardMedia(project) : null

  const resolvedType =
    type === 'auto'
      ? cardMedia
        ? cardMedia.kind === 'image'
          ? 'image'
          : cardMedia.kind === 'vertical-preview'
            ? 'vertical-preview'
            : 'placeholder'
        : project?.heroVideo && variant === 'detail'
          ? 'vertical-hero'
          : project?.previewVideo && variant === 'detail' && project?.verticalVideos
            ? 'vertical-hero'
            : project?.previewVideo
              ? 'preview'
              : project?.video && !project?.image && !project?.cover
                ? 'video'
                : project?.cover
                  ? 'image'
                  : 'image'
      : type

  const [videoFailed, setVideoFailed] = useState(false)
  const [currentVideo, setCurrentVideo] = useState(
    () => project?.heroVideo || project?.previewVideo || project?.video || src,
  )

  const shellClass = [
    'project-media',
    `project-media--${variant}`,
    isContain ? 'project-media--contain' : 'project-media--cover',
    resolvedType === 'vertical-preview' ? 'project-media--vertical-phone' : '',
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

  if (resolvedType === 'vertical-preview') {
    const videoSrc = cardMedia?.src || project?.previewVideo
    const poster = cardMedia?.poster || project?.poster || project?.cover || null

    if (!videoSrc || videoFailed) {
      return (
        <div className={shellClass}>
          <PlaceholderMedia
            src={poster}
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
        <ProjectVerticalVideo
          src={videoSrc}
          poster={poster}
          mediaFit="cover"
          mediaPosition={project?.mediaPosition ?? 'center'}
          variant="card-phone"
          autoplay={false}
        />
      </div>
    )
  }

  if (resolvedType === 'vertical-hero') {
    const videoSrc = project?.heroVideo || project?.previewVideo || src

    if (!videoSrc || videoFailed) {
      return (
        <div className={shellClass}>
          <PlaceholderMedia
            src={project?.cover || project?.image}
            alt={resolvedAlt}
            caption="Здесь будет видео проекта"
            type="video"
            variant={index}
            className="project-media__placeholder"
            premium
          />
        </div>
      )
    }

    return (
      <div className={`${shellClass} project-media--vertical-hero`}>
        <ProjectVerticalVideo
          src={videoSrc}
          poster={project?.cover || project?.poster}
          mediaFit={fit}
          mediaPosition={position}
          variant="hero"
          autoplay
        />
      </div>
    )
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
            src={project?.cover || project?.image}
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

    const blurSrc = isContain ? project?.cover || project?.image || videoSrc : null

    return (
      <div className={shellClass}>
        {isContain && <ContainBackdrop src={blurSrc} isVideo={!project?.image && !project?.cover} />}
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

  const imageSrc = src || project?.cover || project?.image

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
      {isContain && <ContainBackdrop src={imageSrc} />}
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
