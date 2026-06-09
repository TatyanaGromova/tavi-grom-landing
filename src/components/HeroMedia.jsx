import { useState } from 'react'
import PlaceholderMedia from './PlaceholderMedia'

export default function HeroMedia({
  videoSrc,
  imageSrc,
  alt = 'Портрет Татьяны Громовой',
  caption = 'Здесь будет портрет или видео',
  aspectRatio = 'aspect-[3/4]',
  className = '',
  premium = true,
  objectPosition = 'center top',
}) {
  const [mode, setMode] = useState(() => {
    if (videoSrc) return 'video'
    if (imageSrc) return 'image'
    return 'placeholder'
  })

  if (mode === 'video' && videoSrc) {
    return (
      <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition }}
          aria-label={alt}
          onError={() => setMode(imageSrc ? 'image' : 'placeholder')}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
    )
  }

  if (mode === 'image' && imageSrc) {
    return (
      <PlaceholderMedia
        src={imageSrc}
        alt={alt}
        caption={caption}
        type="portrait"
        variant={0}
        premium={premium}
        aspectRatio={aspectRatio}
        className={className}
        objectPosition={objectPosition}
        eager
        onMediaError={() => setMode('placeholder')}
      />
    )
  }

  return (
    <PlaceholderMedia
      src={null}
      alt={alt}
      caption={caption}
      type="portrait"
      variant={0}
      premium={premium}
      aspectRatio={aspectRatio}
      className={className}
    />
  )
}
