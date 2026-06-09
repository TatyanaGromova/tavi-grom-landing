import { useRef, useState } from 'react'
import PlaceholderMedia from './PlaceholderMedia'

export default function VideoPreview({
  poster,
  videoSrc,
  alt,
  caption = 'Здесь будет видео',
  aspectRatio = 'aspect-[16/10]',
  className = '',
  objectPosition = 'center',
}) {
  const videoRef = useRef(null)
  const [failed, setFailed] = useState(false)
  const [playing, setPlaying] = useState(false)

  if (!videoSrc || failed) {
    return (
      <PlaceholderMedia
        src={poster}
        alt={alt}
        caption={caption}
        type="video"
        aspectRatio={aspectRatio}
        className={className}
        objectPosition={objectPosition}
      />
    )
  }

  const play = () => {
    const video = videoRef.current
    if (!video) return
    video.play().then(() => setPlaying(true)).catch(() => {})
  }

  const pause = () => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0
    setPlaying(false)
  }

  const togglePlay = () => {
    if (playing) pause()
    else play()
  }

  return (
    <div
      className={`relative overflow-hidden ${aspectRatio} ${className}`}
      onMouseEnter={play}
      onMouseLeave={pause}
    >
      <button
        type="button"
        className="absolute inset-0 z-10 sm:hidden"
        onClick={togglePlay}
        aria-label="Воспроизвести видео"
      />
      {poster && (
        <img
          src={poster}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${playing ? 'opacity-0' : 'opacity-100'}`}
          style={{ objectPosition }}
          loading="lazy"
        />
      )}
      <video
        ref={videoRef}
        muted
        playsInline
        loop
        preload="metadata"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${playing || !poster ? 'opacity-100' : 'opacity-0'}`}
        style={{ objectPosition }}
        aria-label={alt}
        onError={() => setFailed(true)}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      {!playing && (
        <span className="absolute bottom-3 right-3 px-2 py-1 text-[10px] rounded-md bg-graphite/70 text-milk/80 border border-white/10 pointer-events-none">
          <span className="hidden sm:inline">Наведите для просмотра</span>
          <span className="sm:hidden">Нажмите для просмотра</span>
        </span>
      )}
    </div>
  )
}
