const MARQUEE_ITEMS = [
  'Визуалы',
  'Видео',
  'Сайты',
  'Игры',
  'Приложения',
  'Боты',
  'Нейрофотосессии',
  'Контент',
  'Сценарии',
  'Промпты',
]

const MARQUEE_TEXT = MARQUEE_ITEMS.join(' • ') + ' • '

function MarqueeTrack() {
  return (
    <span className="hero-marquee__segment" aria-hidden="true">
      {MARQUEE_TEXT.repeat(2)}
    </span>
  )
}

export default function HeroMarquee() {
  return (
    <div className="hero-marquee group" aria-label="Направления работы">
      <div className="hero-marquee__inner">
        <div className="hero-marquee__track">
          <MarqueeTrack />
          <MarqueeTrack />
        </div>
      </div>
    </div>
  )
}
