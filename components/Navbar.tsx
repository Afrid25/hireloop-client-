
"use client"

import { useCallback, useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"

const navLinks = [
  { name: "Browse Jobs", href: "/jobs" },
  { name: "Company", href: "/company" },
  { name: "Pricing", href: "/pricing" },
]

function DesktopNav() {
  return (
    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
      {navLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="transition-colors hover:text-foreground"
        >
          {link.name}
        </Link>
      ))}

      <div className="h-4 w-px bg-border mx-2" />

      <Link
        href="/sign-in"
        className="transition-colors hover:text-foreground"
      >
        Sign In
      </Link>

      <Link
        href="/get-started"
        className="inline-flex items-center justify-center rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-700"
      >
        Get Started
      </Link>
    </div>
  )
}

function MobileMenu({
  isOpen,
  closeMenu,
}: {
  isOpen: boolean
  closeMenu: () => void
}) {
  if (!isOpen) return null

  return (
    <div
      id="mobile-navigation"
      className="md:hidden border-t border-border/50"
    >
      <div className="px-4 py-3 space-y-2">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={closeMenu}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {link.name}
          </Link>
        ))}

        <div className="border-t border-border/50 my-2" />

        <Link
          href="/sign-in"
          onClick={closeMenu}
          className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent"
        >
          Sign In
        </Link>

        <Link
          href="/get-started"
          onClick={closeMenu}
          className="block rounded-lg bg-violet-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-violet-700"
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 md:px-6">
      <nav className="mx-auto w-full max-w-7xl rounded-2xl border border-border/50 bg-background/90 shadow-lg backdrop-blur-xl supports-[backdrop-filter]:bg-background/80">

        <div className="flex min-h-16 items-center justify-between gap-6 px-5 py-3 md:px-8">

          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-0.5"
          >
            <span className="text-xl font-bold tracking-tight text-blue-400">
              hirel
            </span>
            <span className="text-xl font-bold tracking-tight text-orange-500">
              oop
            </span>
          </Link>

          {/* Desktop Navigation */}
          <DesktopNav />

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-foreground transition-colors hover:bg-accent md:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>

        </div>

        <MobileMenu isOpen={isOpen} closeMenu={closeMenu} />
      </nav>
    </header>
  )
}
