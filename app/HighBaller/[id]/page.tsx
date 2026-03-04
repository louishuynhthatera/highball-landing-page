'use client'

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { HIGHBALLER_ITEMS } from '@/lib/mock-data';
import HighBallerCard from '@/components/highballer/HighBallerCard';
import HighBallerFooter from '@/components/highballer/HighBallerFooter';
import HighBallerLogo from '@/components/highballer/HighBallerLogo';
import { useAnimationState } from '@/hooks/useAnimationState';
import '../highballer.css';
import '../highball-post.css';

export default function PostDetailPage() {
    const { id } = useParams();
    const { setShowHeader } = useAnimationState();
    const currentItem = HIGHBALLER_ITEMS.find(item => item.id === id) || HIGHBALLER_ITEMS[0];
    const contentRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLElement>(null);

    const [isHeaderFixed, setIsHeaderFixed] = useState(false)
    const [headerHeight, setHeaderHeight] = useState(0)
    const [threshold, setThreshold] = useState<number | null>(null)

    // Get other items for the sidebar/bottom list (excluding current and 'more')
    const otherItemsRaw = HIGHBALLER_ITEMS.filter(item => item.id !== id && !item.isMore);
    const moreItem = HIGHBALLER_ITEMS.find(item => item.isMore);
    const otherItems = otherItemsRaw.slice(0, 9); // Show up to 9 other items

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

    return (
        <div className="highballer-container">
            {/* SITE HEADER */}
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
                {/* HERO */}
                <div className="hb-post-hero">
                    <div className="hb-post-hero-bg">
                        {currentItem.image && (
                            <Image
                                src={currentItem.image}
                                alt={currentItem.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                priority
                            />
                        )}
                    </div>
                    <div className="hb-post-hero-ov"></div>
                    <div className="hb-post-hero-number">
                        <img src="/images/logos/highball_icon_logo.png" alt="HighBaller Icon" className="hb-icon-img" />
                        {currentItem.number}
                    </div>

                    <div className="hb-post-hero-title">{currentItem.title}</div>
                    <div className="hb-post-hero-date">Date : {currentItem.date}</div>
                    <div className="hb-post-hero-author">Author: {currentItem.author || 'Takuya Ota'}</div>
                </div>

                {/* OUTER */}
                <div className="hb-post-outer">
                    <div className="hb-post-grid">

                        {/* ARTICLE */}
                        <article className="hb-post-article">
                            <div className="hb-post-author-row">
                                <div className="hb-post-author-avatar">
                                    <img src="/images/logos/highball_icon_logo.png" alt="Avatar" className="hb-icon-img" />
                                </div>
                                <div className="hb-post-author-name">{currentItem.author || 'Takuya Ota'} / CEO</div>
                            </div>

                            <div className="hb-post-body">
                                <p>はじめまして。株式会社ハイボールの大田です。</p>
                                <p>ついに念願のオウンドメディアを立ち上げました！！</p>
                                <p>（パチパチパチ）</p>
                                <p>
                                    会社を立ち上げた当初からオウンドメディアへのあこがれはあり、mercariのmercanやカヤックのHPなどをみて、面白そうな会社だなと思っていたし、それを表現することへのあこがれがあったのでめちゃくちゃテンション上がっています。
                                </p>
                                <p>そして、なにより株式会社ハイボール自身がめちゃくちゃおもしろい会社になってきたのでそれを多くの人に伝える場所になればなと思っております。</p>

                                <div className="hb-post-inline-photo">
                                    <div className="hb-post-photo-bg"></div>
                                </div>

                                <h2 className="hb-post-sec-heading">{currentItem.title}</h2>

                                <p>僕がただただハイボールが好きという理由で2019年10月25日に名付けられた株式会社ハイボールなのですが、なんとも少し3周年です。</p>
                                <p>
                                    3年の中で死にそうなときが何度もあって、メンバー全員に2ヶ月も給与を待ってもらったことや僕の人脈すべてを使って友達や先輩から総額1000万以上も借りてなんとか資金を回した時期もあったのですが、3年以内に90%がなくなるといわれてるスタートアップの業界でなんとか生3てこられました。
                                </p>
                                <p>これも周りの皆さんのおかげです！本当にありがとうございます!!(圧倒的感謝)</p>
                                <p>そして、色々な事業を経て今は個人のインフルエンサーの YouTube や TikTok
                                    などの裏方に回って手助けするWebマーケティング事業的なことをやっております。ありがたいことに事業が大きくなっていて業務委託の方なども合わせると100人弱・年商10億の規模になってきました。
                                </p>
                                <p>
                                    そして、ハイボールから「HighBaller(ハイボーラー)」という言葉が爆誕し、「HighBaller」という響きにちょっと違和感があると思っているすべての人を数年後だまらせるために世の中に全力で「HighBaller」を浸透させていきたいと思っております！！
                                </p>
                            </div>

                            <div className="hb-post-article-footer">Date: {currentItem.date} by {currentItem.author || 'Takuya Ota'} / CEO</div>
                            <div className="hb-post-next-wrap">
                                <Link href="#" className="hb-post-next-btn">Next</Link>
                            </div>

                            {/* INDEX BELOW — tablet + mobile */}
                            <div className="hb-post-idx-below">
                                <div className="hb-post-idx-title">Index</div>
                                <div className="hb-post-idx-grid">
                                    {otherItems.map(item => (
                                        <HighBallerCard key={item.id} item={item} variant="thumbnail" />
                                    ))}
                                    {moreItem && <HighBallerCard item={moreItem} variant="thumbnail" />}
                                </div>
                            </div>
                        </article>

                        {/* SIDEBAR — desktop */}
                        <aside className="hb-post-sidebar">
                            <div className="hb-post-idx-title">Index</div>
                            <div className="hb-post-sidebar-list">
                                {otherItems.map(item => (
                                    <HighBallerCard key={item.id} item={item} variant="thumbnail" />
                                ))}
                                {moreItem && <HighBallerCard item={moreItem} variant="thumbnail" />}
                            </div>
                        </aside>
                    </div>
                </div>

                <HighBallerFooter />
            </div>
        </div >
    );
}
