'use client'

import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import Link from 'next/link'

interface HighBallerLogoProps {
    onAnimationComplete?: () => void
    onFadeIn?: () => void
    width?: number
    height?: number
    className?: string
    priority?: boolean
    style?: React.CSSProperties
}

const HighBallerLogo = ({
    onAnimationComplete,
    onFadeIn,
    width = 300,
    height = 100,
    className = "",
    priority = true,
    style
}: HighBallerLogoProps) => {
    const linkRef = useRef<HTMLAnchorElement>(null)

    useLayoutEffect(() => {
        if (linkRef.current) {
            const logo = linkRef.current;

            // Simple fade-in animation
            gsap.set(logo, { opacity: 0, visibility: 'visible' });

            gsap.to(logo, {
                opacity: 1,
                duration: 1.2,
                ease: "power2.out",
                onComplete: () => {
                    if (onAnimationComplete) onAnimationComplete();
                    if (onFadeIn) onFadeIn();
                }
            });
        }
    }, []);

    return (
        <Link
            href="/HighBaller"
            ref={linkRef}
            className={className}
            style={{
                ...style,
                cursor: 'pointer',
                display: 'inline-block',
                verticalAlign: 'middle',
                textDecoration: 'none',
                lineHeight: 0,
                visibility: 'hidden' // Hide initially for GSAP
            }}
        >
            <Image
                src="/images/logos/logo_highball.png"
                alt="HighBaller"
                width={width}
                height={height}
                style={{ display: 'block', height: 'auto', width: '100%' }}
                priority={priority}
            />
        </Link>
    )
}

export default HighBallerLogo;
