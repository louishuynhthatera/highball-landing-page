'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAnimationState } from '@/hooks/useAnimationState'

export default function Header() {
  const pathname = usePathname()
  const { showHeader } = useAnimationState()

  return (
    <header id="main-header" className={showHeader ? 'show' : ''}>
      <div className="logo">
        <Link href="/" >
          <img src="/images/Logo.svg" alt="Logo" />
        </Link>
      </div>
      <nav className="sidebar">
   <Link
  href="/"
  className={`nav-link ${pathname === "/" ? "active" : ""}`}
>
  Home
</Link>

        <Link href="/works" className={`nav-link ${pathname === "/works" ? "active" : ""}`}>
          Works
        </Link>
        <Link href="/HighBaller" className={`nav-link ${pathname === "/HighBaller" ? "active" : ""}`}>
          HighBaller
        </Link>
        <Link className='nav-link' href="/about">About</Link>
        <Link className='nav-link' href="/contact">Contact</Link>
      </nav>
    </header>
  )
}