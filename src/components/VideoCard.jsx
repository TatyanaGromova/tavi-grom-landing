import { useRef, useState } from 'react'
import PlaceholderMedia from './PlaceholderMedia'

export default function VideoCard({
  title,
  src,
  description,
  poster = null,
  aspectRatio = 'aspect-[16/10]',
}) {
  const videoRef = useRef(null)
  const [failed, setFailed] = useState(false)
  const [playing, setPlaying] = useState(false)

  if (!src || failed) {
    return (
      <div className="premium-card rounded-2xl overflow-hidden">
        <PlaceholderMedia
          src={poster}
          alt={title}
          caption="Здесь будет видео"
          type="video"
          aspectRatio={aspectRatio}
        />
        <div className="p-4 border-t border-white/10">
          <p className="font-heading text-sm font-semibold text-milk">{title}</p>
          {description && (
            <p className="text-xs text-soft-gray mt-1 leading-relaxed">{description}</p>
          )}
        </div>
      </div>
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
    <article
      className="group premium-card rounded-2xl overflow-hidden hover:border-accent/25 transition-all duration-300 hover:shadow-[0_8px_36px_rgba(214,185,140,0.1)]"
      onMouseEnter={play}
      onMouseLeave={pause}
    >
      <button
        type="button"
        className={`relative w-full overflow-hidden ${aspectRatio} sm:pointer-events-none`}
        onClick={togglePlay}
        aria-label={`Воспроизвести: ${title}`}
      >
        {poster && (
          <img
            src={poster}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${playing ? 'opacity-0' : 'opacity-100'}`}
            loading="lazy"
          />
        )}
        <video
          ref={videoRef}
          muted
          playsInline
          loop
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          aria-label={title}
          onError={() => setFailed(true)}
        >
          <source src={src} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-graphite/60 via-transparent to-transparent pointer-events-none" />

        {!playing && (
          <span className="absolute bottom-3 right-3 px-2 py-1 text-[10px] rounded-md bg-graphite/75 text-milk/85 border border-white/10 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            <span className="hidden sm:inline">Наведите для просмотра</span>
            <span className="sm:hidden">Нажмите для просмотра</span>
          </span>
        )}
      </button>

      <div className="p-4 border-t border-white/10">
        <p className="font-heading text-sm font-semibold text-milk">{title}</p>
        {description && (
          <p className="text-xs text-soft-gray mt-1 leading-relaxed line-clamp-2">{description}</p>
        )}
      </div>
    </article>
  )
}
