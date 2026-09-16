import type { AnchorHTMLAttributes } from 'react'
import { useMagnetic } from '../hooks/useMagnetic'

export default function MagneticLink({
  className = '',
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const ref = useMagnetic<HTMLAnchorElement>()
  return (
    <a ref={ref} className={className} {...props}>
      {children}
    </a>
  )
}
