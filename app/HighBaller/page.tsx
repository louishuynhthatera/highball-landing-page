'use client'

import { useEffect } from 'react'

import { useAnimationState } from '@/hooks/useAnimationState'
import './highballer.css'
import { HIGHBALLER_ITEMS } from '@/lib/mock-data'
import HighBallerCard from '@/components/highballer/HighBallerCard'
import HighBallerFooter from '@/components/highballer/HighBallerFooter'

export default function HighBallerPage() {
    const { setShowHeader } = useAnimationState()

    useEffect(() => {
        // Ensure header is shown if we navigate directly or from home
        setShowHeader(true)
    }, [setShowHeader])

    // Split items for layout

    const heroItem = HIGHBALLER_ITEMS.find(item => item.id === '12');
    const secondaryItems = HIGHBALLER_ITEMS.filter(item => item.id === '11' || item.id === '10');
    const bottomItems = HIGHBALLER_ITEMS.filter(item => !['12', '11', '10'].includes(item.id));

    return (
        <div className="highballer-container">
            <header className="highballer-header">
                <h1 className="en"><em>HighBaller</em></h1>
            </header>


            <div className='highballer-main'>
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
            </div>

            <HighBallerFooter />
        </div>
    );
}
