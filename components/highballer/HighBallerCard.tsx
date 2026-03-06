// import Link from 'next/link';
import { HighBallerItem } from '@/types/highballer';

interface HighBallerCardProps {
    item: HighBallerItem;
    variant?: 'hero' | 'secondary' | 'thumbnail';
    className?: string;
}

export default function HighBallerCard({ item, variant = 'thumbnail', className = '' }: HighBallerCardProps) {
    const isMore = item.isMore;
    const href = isMore ? '/HighBaller/storage' : `/HighBaller/${item.id}`;

    const renderTitle = (text: string) => {
        // Regex to split between English/Number/Space and Japanese characters
        // \u3000-\u303f: Japanese punctuation
        // \u3040-\u309f: Hiragana
        // \u30a0-\u30ff: Katakana
        // \uff00-\uff9f: Full-width Roman & Half-width Katakana
        // \u4e00-\u9faf: Kanji
        const regex = /([a-zA-Z0-9\s!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/-]+)|([\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]+)/g;
        const parts = text.matchAll(regex);
        const elements = [];
        let i = 0;

        for (const part of parts) {
            if (part[1]) {
                // English part
                elements.push(<span key={i++} className="en">{part[1]}</span>);
            } else if (part[2]) {
                // Japanese part
                elements.push(<span key={i++} className="ja">{part[2]}</span>);
            }
        }

        return elements.length > 0 ? elements : text;
    };

    return (
        <div className={`hb-card hb-card-${variant} ${className}`} style={{ cursor: 'default' }}>
            <img src={item.image} alt={item.title} />


            <div className="hb-card-meta">
                {variant === 'hero' && <span>Latest Update: {item.date}</span>}
                {variant !== 'hero' && <span>{item.date}</span>}

            </div>

            <div className="hb-card-title">
                {renderTitle(item.title)}
            </div>

            <div className="hb-card-number">

                <img src="/images/logos/highball_icon_logo.svg" alt="HighBaller Icon" className="hb-icon-img" />
                {item.number}
            </div>

            {item.author && variant !== 'thumbnail' && (
                <div className="hb-card-author">
                    Author: {item.author}
                </div>
            )}
        </div>
    );
}
