export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 font-display ${className}`}>
      <span className="relative block h-5 w-5">
        <span className="absolute inset-0 bg-gold" />
        <span className="absolute bottom-0 right-0 h-2 w-2 bg-ink" />
      </span>
      <span className="text-lg font-bold tracking-[0.12em] text-bone">KROX</span>
      <span className="text-lg font-light tracking-[0.12em] text-mist">DESIGN</span>
    </span>
  )
}
