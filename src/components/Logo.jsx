export default function Logo({ className = '', dotClassName = 'text-lavender' }) {
  return (
    <span className={`inline-flex items-baseline whitespace-nowrap tracking-tight ${className}`}>
      <span>ТА</span>
      <span className={`${dotClassName} -mx-[0.06em]`}>•</span>
      <span>ВИ&nbsp;Гром</span>
    </span>
  )
}
