'use client'

import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import Link from 'next/link'

interface HighBallerLogoProps {
    onAnimationComplete?: () => void
    onSlideUp?: () => void
    width?: number
    height?: number
    className?: string
    priority?: boolean
    style?: React.CSSProperties
}

const HighBallerLogo = ({
    onAnimationComplete,
    onSlideUp,
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

            // Force a layout recalculation or wait a tiny bit to ensure dimensions are ready
            const startAnimation = () => {
                // 1. Reset state to measure the "final" position correctly
                gsap.set(logo, { x: 0, y: 0, scale: 1, opacity: 0, visibility: 'visible' });

                const logoRect = logo.getBoundingClientRect();
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;

                const deltaX = centerX - (logoRect.left + logoRect.width / 2);
                const deltaY = centerY - (logoRect.top + logoRect.height / 2);

                const tl = gsap.timeline({
                    onComplete: () => {
                        if (onAnimationComplete) onAnimationComplete();
                    }
                });

                tl.fromTo(logo,
                    {
                        x: deltaX,
                        y: deltaY,
                        scale: 1.3,
                        opacity: 0,
                        filter: 'blur(15px)'
                    },
                    {
                        opacity: 1,
                        filter: 'blur(0px)',
                        duration: 0.8,
                        ease: "power2.out"
                    }
                )
                    .to(logo, {
                        x: 0,
                        y: 0,
                        scale: 1,
                        duration: 1.2,
                        ease: "power4.inOut",
                        delay: 0.3
                    })
                    .add(() => {
                        if (onSlideUp) onSlideUp();
                    }, "-=0.4");
            };

            // Use a small timeout or requestAnimationFrame to ensure the browser has laid out the header
            const timer = setTimeout(startAnimation, 50);
            return () => clearTimeout(timer);
        }
    }, []); // Empty array so it only runs once on mount

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
