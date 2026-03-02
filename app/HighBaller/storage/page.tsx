'use client'

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import HighBallerLogo from '@/components/highballer/HighBallerLogo';
import HighBallerFooter from '@/components/highballer/HighBallerFooter';
import '../highballer.css';

export default function StoragePage() {
    const contentRef = useRef<HTMLDivElement>(null);

    const handleSlideUp = () => {
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

    return (
        <div className="highballer-container" style={{ paddingTop: '0' }}>
            {/* SITE HEADER */}
            <header className="highballer-header" style={{ position: 'sticky', top: 0, zIndex: 200, background: '#0b0c0c', borderBottom: '1px solid rgba(255, 255, 255, 0.12)', padding: '18px 24px 16px', textAlign: 'center' }}>
                <HighBallerLogo
                    onSlideUp={handleSlideUp}
                    className="hb-header-logo"
                    width={200}
                    height={60}
                    style={{ height: 'auto' }}
                />
            </header>

            <div ref={contentRef} style={{ padding: '40px' }}>
                <h1>Storage Page</h1>
                <p>This is the archive/storage page for more posts.</p>
                <Link href="/HighBaller" style={{ color: '#f5c842' }}>Back to HighBaller</Link>
                <HighBallerFooter />
            </div>
        </div>
    );
}
