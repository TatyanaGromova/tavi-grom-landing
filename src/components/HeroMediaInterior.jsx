export default function HeroMediaInterior({ compact = false }) {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(214,185,140,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(214,185,140,0.1) 1px, transparent 1px)',
          backgroundSize: compact ? '32px 32px' : '40px 40px',
        }}
      />

      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-graphite/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-graphite/60 to-transparent" />

      <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-accent/20 rounded-tl-sm" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-accent/20 rounded-br-sm" />
    </div>
  )
}
