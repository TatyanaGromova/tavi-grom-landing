import { useState } from 'react'
import PlaceholderMedia from './PlaceholderMedia'

export default function ProjectPreviewVideo({
  src,
  fallbackSrc = null,
  alt = 'Видео-превью проекта',
  caption = 'Здесь будет видео проекта',
  aspectRatio = 'aspect-[16/10]',
  className = '',
  objectPosition = 'center',
  variant = 0,
}) {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [failed, setFailed] = useState(false)

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc)
      return
    }
    setFailed(true)
  }

  if (!currentSrc || failed) {
    return (
      <PlaceholderMedia
        src={null}
        alt={alt}
        caption={caption}
        type="video"
        variant={variant}
        aspectRatio={aspectRatio}
        className={className}
        objectPosition={objectPosition}
        premium
      />
    )
  }

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
      <video
        key={currentSrc}
        src={currentSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition }}
        aria-label={alt}
        onError={handleError}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-graphite/90 via-graphite/35 to-graphite/10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-graphite/40 via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </div>
  )
}
