export default function Logo({ className = '', dotClassName = 'text-accent' }) {
  return (
    <span className={`inline-flex items-baseline whitespace-nowrap tracking-[-0.02em] ${className}`}>
      <span className="text-milk">ТА</span>
      <span className={`${dotClassName} -mx-[0.07em]`}>•</span>
      <span className="text-milk">ВИ&nbsp;Гром</span>
    </span>
  )
}
