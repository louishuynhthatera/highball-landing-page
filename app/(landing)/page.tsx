'use client'

import { useEffect } from 'react'
import { useAnimationState } from '@/hooks/useAnimationState'

export default function HomePage() {

  useEffect(() => {
    const lottieBg = document.getElementById("lottieBg");
    if (lottieBg) {
      lottieBg.style.display = "block";
    }
  }, [])

  return (
    <div>
    </div>
  )
}