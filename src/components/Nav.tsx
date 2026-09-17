import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MagneticLink from './MagneticLink'
import ThemeToggle from './ThemeToggle'
import Logomark from './Logomark'

const LINKS = [
  { href: '#product', label: 'Product' },
  { href: '#solutions', label: 'Solutions' },
  { href: '#docs', label: 'Docs' },
  { href: '#about', label: 'About' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const menuRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 40)
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])

  // Track the md breakpoint so the off-screen mobile menu can be made inert
  // (matches Tailwind's `md` = 768px). On desktop the menu is always visible.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // When the mobile menu is closed it's only pushed off-screen with CSS, so its
  // links stay focusable / exposed to screen readers. Mark it inert to remove
  // those phantom tab stops. Never inert on desktop, where the menu is shown.
  const menuHidden = !isDesktop && !open
  useEffect(() => {
    if (menuRef.current) menuRef.current.inert = menuHidden
  }, [menuHidden])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] border-b backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 ${
        scrolled
          ? 'border-border bg-bg/75 shadow-[0_1px_0_0_var(--border)]'
          : 'border-border/25 bg-bg/20'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-container items-center justify-between px-6 sm:px-8">
        <motion.a
          href="#home"
          className="flex items-center gap-2.5"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Logomark className="h-6 w-6 text-accent" />
          <span className="font-display text-[18px] font-semibold tracking-tight text-accent">Minder</span>
        </motion.a>

        <motion.ul
          ref={menuRef}
          aria-hidden={menuHidden || undefined}
          className={`fixed inset-x-0 top-16 flex h-[calc(100vh-64px)] flex-col items-start gap-6 overflow-y-auto border-t border-border bg-bg px-6 py-8 transition-transform duration-300 md:static md:h-auto md:flex-row md:items-center md:gap-8 md:overflow-visible md:border-0 md:bg-transparent md:p-0 md:transition-none ${
            open ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
        >
          {LINKS.map((link, i) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-mono text-[15px] uppercase tracking-[0.08em] text-ink-dim transition-colors hover:text-ink md:text-[11.5px] md:tracking-[0.14em]"
              >
                {link.label}
              </a>
            </motion.li>
          ))}
          <li className="mt-2 md:hidden">
            <ThemeToggle />
          </li>
          <motion.li
            className="mt-4 md:mt-0 md:ml-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <MagneticLink
              href="#docs"
              onClick={() => setOpen(false)}
              className="inline-flex whitespace-nowrap rounded-full bg-primary px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-bg transition-colors hover:bg-primary-hover"
            >
              Get Started
            </MagneticLink>
          </motion.li>
        </motion.ul>

        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
        </div>

        <button
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="p-2 text-ink md:hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.svg
                key="close"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="h-[22px] w-[22px]"
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              </motion.svg>
            ) : (
              <motion.svg
                key="menu"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="h-[22px] w-[22px]"
                initial={{ rotate: 45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -45, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>
      </div>
    </header>
  )
}
