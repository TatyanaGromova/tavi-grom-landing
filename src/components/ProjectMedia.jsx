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
  if (project?.cover) return { kind: 'cover', src: project.cover }
  if (project?.previewVideo) return { kind: 'preview-video', src: project.previewVideo }
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
          controls={false}
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
  clickable = false,
  onClick,
}) {
  const { fit, position } = resolveProjectMedia(project, { mediaFit, mediaPosition })
  const isContain = fit === 'contain'
  const resolvedAlt = alt || project?.alt || 'Медиа проекта'

  const cardMedia = variant === 'card' && type === 'auto' ? resolveCardMedia(project) : null

  const resolvedType =
    type === 'auto'
      ? cardMedia
        ? cardMedia.kind === 'cover'
          ? 'cover'
          : cardMedia.kind === 'preview-video'
            ? 'preview-video'
            : 'placeholder'
        : project?.heroVideo && variant === 'detail' && project?.verticalVideos
          ? 'vertical-hero'
          : project?.previewVideo && variant === 'detail' && project?.verticalVideos
            ? 'vertical-hero'
            : project?.cover
              ? 'cover'
              : project?.previewVideo
                ? 'preview-video'
                : project?.video
                  ? 'video'
                  : 'cover'
      : type

  const [videoFailed, setVideoFailed] = useState(false)
  const [currentVideo, setCurrentVideo] = useState(
    () => project?.heroVideo || project?.previewVideo || project?.video || src,
  )

  const shellClass = [
    'project-media',
    `project-media--${variant}`,
    isContain ? 'project-media--contain' : 'project-media--cover',
    clickable ? 'project-media--clickable' : '',
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

  const wrapInteractive = (content) => {
    if (!clickable || !onClick) return content

    return (
      <button
        type="button"
        className={shellClass}
        onClick={onClick}
        aria-label={`Открыть медиа: ${resolvedAlt}`}
      >
        {content}
      </button>
    )
  }

  const renderShell = (content) => {
    if (clickable && onClick) {
      return (
        <button type="button" className={shellClass} onClick={onClick} aria-label={`Открыть медиа: ${resolvedAlt}`}>
          {content}
        </button>
      )
    }

    return <div className={shellClass}>{content}</div>
  }

  if (resolvedType === 'vertical-hero') {
    const videoSrc = project?.heroVideo || project?.previewVideo || src

    if (!videoSrc || videoFailed) {
      return renderShell(
        <PlaceholderMedia
          src={project?.cover}
          alt={resolvedAlt}
          caption="Здесь будет видео проекта"
          type="video"
          variant={index}
          className="project-media__placeholder"
          premium
        />,
      )
    }

    return renderShell(
      <div className="project-media--vertical-hero-inner">
        <ProjectVerticalVideo
          src={videoSrc}
          mediaFit={fit}
          mediaPosition={position}
          variant="hero"
          autoplay
        />
      </div>,
    )
  }

  if (resolvedType === 'preview-video' || resolvedType === 'preview' || resolvedType === 'video') {
    const videoSrc =
      resolvedType === 'preview-video'
        ? cardMedia?.src || project?.previewVideo
        : src || project?.video || currentVideo || project?.previewVideo

    if (!videoSrc || videoFailed) {
      return renderShell(
        <PlaceholderMedia
          src={project?.cover}
          alt={resolvedAlt}
          caption="Здесь будет видео проекта"
          type="video"
          variant={index}
          className="project-media__placeholder"
          objectPosition={position}
          premium
        />,
      )
    }

    const blurSrc = isContain ? project?.cover || videoSrc : null

    return renderShell(
      <>
        {isContain && <ContainBackdrop src={blurSrc} isVideo={!project?.cover} />}
        <video
          key={videoSrc}
          src={videoSrc}
          autoPlay={variant === 'card' || variant === 'detail'}
          muted
          loop
          playsInline
          preload="metadata"
          controls={false}
          className="project-media__asset"
          style={mediaStyle('cover', project?.mediaPosition ?? position ?? 'center')}
          aria-label={resolvedAlt}
          onError={handleVideoError}
        />
      </>,
    )
  }

  const imageSrc = src || project?.cover

  if (!imageSrc) {
    return renderShell(
      <PlaceholderMedia
        src={null}
        alt={resolvedAlt}
        caption="Здесь будет изображение проекта"
        variant={index}
        className="project-media__placeholder"
        objectPosition={position}
        premium
      />,
    )
  }

  return renderShell(
    <>
      {isContain && <ContainBackdrop src={imageSrc} />}
      <img
        src={imageSrc}
        alt={resolvedAlt}
        className="project-media__asset"
        style={mediaStyle(fit, position)}
        loading={eager ? 'eager' : 'lazy'}
      />
    </>,
  )
}
