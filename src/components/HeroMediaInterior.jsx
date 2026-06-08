const miniPreviews = [
  { label: 'Проект 01', top: '38%', left: '8%', width: 'w-[28%]', rotate: '-rotate-3' },
  { label: 'Проект 02', top: '52%', right: '6%', width: 'w-[26%]', rotate: 'rotate-2' },
  { label: 'Проект 03', top: '68%', left: '18%', width: 'w-[24%]', rotate: '-rotate-1' },
]

export default function HeroMediaInterior({ compact = false }) {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(184,169,217,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(184,169,217,0.14) 1px, transparent 1px)',
          backgroundSize: compact ? '28px 28px' : '36px 36px',
        }}
      />

      {/* Light glares */}
      <div className="absolute top-[20%] left-[15%] w-24 h-24 rounded-full bg-lavender/10 blur-2xl" />
      <div className="absolute bottom-[25%] right-[12%] w-20 h-20 rounded-full bg-apricot/8 blur-2xl" />
      <div className="absolute top-[45%] right-[30%] w-1 h-16 bg-gradient-to-b from-transparent via-white/15 to-transparent rotate-12" />

      {/* Mini preview cards */}
      {!compact &&
        miniPreviews.map((card) => (
          <div
            key={card.label}
            className={`absolute ${card.width} ${card.rotate} rounded-lg overflow-hidden border border-white/12 bg-bg-elevated/60 backdrop-blur-sm`}
            style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)', top: card.top, left: card.left, right: card.right }}
          >
            <div className="aspect-[4/3] bg-gradient-to-br from-lavender/15 via-transparent to-apricot/10 relative">
              <div className="absolute inset-0 hero-noise opacity-40" />
              <div className="absolute bottom-1.5 left-1.5 right-1.5">
                <div className="h-1 w-2/3 rounded-full bg-white/10 mb-1" />
                <div className="h-1 w-1/2 rounded-full bg-cream/10" />
              </div>
            </div>
            <div className="px-2 py-1 text-[8px] text-soft-gray/70 tracking-wide">{card.label}</div>
          </div>
        ))}

      {/* Soon media indicator */}
      <div className="absolute top-14 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-bg-elevated/70 border border-white/12" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}>
        <span className="w-1.5 h-1.5 rounded-full bg-lavender/50 animate-pulse" />
        <span className="text-[9px] sm:text-[10px] text-soft-gray/80 tracking-wide">скоро будет медиа</span>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3 sm:gap-4 px-4">
        {['портрет', 'видео', 'проекты'].map((item, i) => (
          <span key={item} className="flex items-center gap-3 text-[10px] sm:text-xs text-soft-gray/60 tracking-wide">
            {i > 0 && <span className="w-px h-2.5 bg-white/10 shrink-0" />}
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
