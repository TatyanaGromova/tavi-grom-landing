import { useState } from 'react'
import PlaceholderMedia from './PlaceholderMedia'

export default function ProjectPreviewVideo({
  src,
  alt = 'Видео-превью проекта',
  caption = 'Здесь будет видео проекта',
  aspectRatio = 'aspect-[16/10]',
  className = '',
  objectPosition = 'center',
  variant = 0,
}) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
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
      />
    )
  }

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition }}
        aria-label={alt}
        onError={() => setFailed(true)}
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
