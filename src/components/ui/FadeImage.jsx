import { useState } from 'react'

/**
 * Foto që shfaqet me fade të butë pasi ngarkohet, pa "kërcim" vizual.
 * Fade-i ndodh te mbështjellësi, ndaj `className` i fotos mund të ketë
 * tranzicionet e veta (zoom, grayscale) pa konflikt.
 * Prindi duhet të ketë dimensione fikse (aspect-ratio ose h/w).
 */
export default function FadeImage({ className = '', wrapperClassName = 'block h-full w-full', onLoad, ...props }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <span
      className={`${wrapperClassName} transition-opacity duration-1200 ease-silk ${loaded ? 'opacity-100' : 'opacity-0'}`}
    >
      <img
        {...props}
        ref={(el) => {
          // Foto nga cache-i mund të jetë ngarkuar para se React të lidhë onLoad
          if (el?.complete && el.naturalWidth && !loaded) setLoaded(true)
        }}
        onLoad={(e) => {
          setLoaded(true)
          onLoad?.(e)
        }}
        className={className}
      />
    </span>
  )
}
