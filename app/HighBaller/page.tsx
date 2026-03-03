'use client'

import { useEffect, useRef, useState, useLayoutEffect } from 'react'
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
    const headerRef = useRef<HTMLElement>(null)
    const [isHeaderFixed, setIsHeaderFixed] = useState(false)
    const [headerHeight, setHeaderHeight] = useState(0)
    const [threshold, setThreshold] = useState<number | null>(null)

    useEffect(() => {
        // Force scroll to top on reload/mount
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);

        // Ensure header is shown if we navigate directly or from home
        setShowHeader(true)

        return () => {
            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'auto';
            }
        };
    }, [setShowHeader])

    useEffect(() => {
        const handleScroll = () => {
            if (threshold === null || !headerRef.current) return;

            if (window.scrollY >= threshold) {
                if (!isHeaderFixed) {
                    setIsHeaderFixed(true);
                    setHeaderHeight(headerRef.current.offsetHeight);
                }
            } else {
                if (isHeaderFixed) {
                    setIsHeaderFixed(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHeaderFixed, threshold]);

    const handleSlideUp = () => {
        // After logo slides up, calculate exactly when it should stick
        const logoElement = document.querySelector('.hb-header-logo');
        if (logoElement) {
            const logoRect = logoElement.getBoundingClientRect();
            const currentScroll = window.scrollY;
            const menuPaddingTop = 16;
            // threshold = current position - desired position + current scroll
            setThreshold(logoRect.top + currentScroll - menuPaddingTop);
        }

        if (contentRef.current) {
            gsap.to(contentRef.current, {
                opacity: 1,
                duration: 0.8,
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
            <header
                className={`highballer-header ${isHeaderFixed ? 'header-sticky' : ''}`}
                ref={headerRef}
            >
                <HighBallerLogo
                    onSlideUp={handleSlideUp}
                    className="hb-header-logo"
                    width={300}
                    height={100}
                />
            </header>


            <div
                className='highballer-main'
                ref={contentRef}
                style={isHeaderFixed ? { marginTop: `${headerHeight}px` } : {}}
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
