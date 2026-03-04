'use client'

import { useEffect, useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'

import { useAnimationState } from '@/hooks/useAnimationState'
import './highballer.css'
import { HIGHBALLER_ITEMS } from '@/lib/mock-data'
import HighBallerCard from '@/components/highballer/HighBallerCard'
import HighBallerFooter from '@/components/highballer/HighBallerFooter'
import HighBallerLogo from '@/components/highballer/HighBallerLogo'

export default function HighBallerPage() {
    const { setShowHeader } = useAnimationState()
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Force scroll to top on reload/mount
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);

        // Ensure global header is hidden on this page
        setShowHeader(false)

        return () => {
            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'auto';
            }
        };
    }, [setShowHeader])

    const handleLogoFadeIn = () => {
        if (contentRef.current) {
            gsap.to(contentRef.current, {
                opacity: 1,
                duration: 0.8,
                delay: 0.2,
                ease: "power2.out"
            });
        }
    }

    useLayoutEffect(() => {
        if (contentRef.current) {
            gsap.set(contentRef.current, { opacity: 0 });
        }
    }, [])

    // Split items for layout
    const heroItem = HIGHBALLER_ITEMS.find(item => item.id === '12');
    const secondaryItems = HIGHBALLER_ITEMS.filter(item => item.id === '11' || item.id === '10');
    const bottomItems = HIGHBALLER_ITEMS.filter(item => !['12', '11', '10'].includes(item.id));

    return (
        <div className="highballer-container">
            <header className="highballer-header">
                <HighBallerLogo
                    onFadeIn={handleLogoFadeIn}
                    className="hb-header-logo"
                    width={225}
                    height={75}
                />
            </header>

            <div
                className='highballer-main'
                ref={contentRef}
            >
                {/* TOP GRID */}
                <div className="hb-grid-top">
                    {heroItem && (
                        <HighBallerCard
                            item={heroItem}
                            variant="hero"
                            className="hb-card-hero"
                        />
                    )}

                    <div className="hb-secondary-pair">
                        {secondaryItems.map(item => (
                            <HighBallerCard
                                key={item.id}
                                item={item}
                                variant="secondary"
                                className="hb-card-secondary"
                            />
                        ))}
                    </div>
                </div>

                {/* BOTTOM GRID */}
                <div className="hb-grid-bottom">
                    {bottomItems.map(item => (
                        <HighBallerCard
                            key={item.id}
                            item={item}
                            variant="thumbnail"
                        />
                    ))}
                </div>

                <HighBallerFooter />
            </div>
        </div>
    );
}
