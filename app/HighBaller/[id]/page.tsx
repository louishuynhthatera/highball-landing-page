'use client'

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { HIGHBALLER_ITEMS } from '@/lib/mock-data';
import HighBallerCard from '@/components/highballer/HighBallerCard';
import HighBallerFooter from '@/components/highballer/HighBallerFooter';
import '../highballer.css';
import '../highball-post.css';

export default function PostDetailPage() {
    const { id } = useParams();
    const currentItem = HIGHBALLER_ITEMS.find(item => item.id === id) || HIGHBALLER_ITEMS[0];

    // Get other items for the sidebar/bottom list (excluding current and 'more')
    const otherItems = HIGHBALLER_ITEMS.filter(item => item.id !== id && !item.isMore);
    const moreItem = HIGHBALLER_ITEMS.find(item => item.isMore);

    return (
        <div className="highballer-container" style={{ paddingTop: '0' }}>
            {/* SITE HEADER */}
            <header className="highballer-header" style={{ position: 'sticky', top: 0, zIndex: 200, background: '#0b0c0c', borderBottom: '1px solid rgba(255, 255, 255, 0.12)', padding: '18px 24px 16px' }}>
                <Link href="/HighBaller">
                    <Image
                        src="/images/logos/logo_highball.png"
                        alt="HighBaller"
                        width={200}
                        height={60}
                        style={{ height: 'auto', width: 'clamp(150px, 20vw, 200px)', margin: '0 auto', display: 'block' }}
                    />
                </Link>
            </header>

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
                <div className="hb-post-hero-num">
                    <img src="/images/logos/highball_icon_logo.png" alt="HighBaller Icon" className="hb-icon-img" />
                    {currentItem.number}
                </div>

                <div className="hb-post-hero-title">{currentItem.title}</div>
                <div className="hb-post-hero-meta">
                    <span>Date : {currentItem.date}</span>
                    <span>Author: {currentItem.author || 'Takuya Ota'}</span>
                </div>
            </div>

            {/* OUTER */}
            <div className="hb-post-outer">
                <div className="hb-post-grid">

                    {/* ARTICLE */}
                    <article className="hb-post-article">
                        <div className="hb-post-author-row">
                            <div className="hb-post-author-avatar">
                                <img src="/images/logos/highball_icon_logo.png" alt="Avatar" className="hb-author-img" />
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
        </div >
    );
}
