import { motion, useInView } from 'framer-motion'
import type { ReactNode } from 'react'
import { useRef } from 'react'

export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 20,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: 'blur(3px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y, filter: 'blur(3px)' }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
