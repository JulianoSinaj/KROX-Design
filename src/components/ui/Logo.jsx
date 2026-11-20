export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 font-display ${className}`}>
      <img src="/images/company-logo.png" alt="" aria-hidden="true" className="block h-10 w-10 object-contain" />
      <span className="text-xl font-bold tracking-[0.12em] text-bone">KROX</span>
    </span>
  )
}
