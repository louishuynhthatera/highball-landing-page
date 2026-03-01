import Link from 'next/link';
import { HighBallerItem } from '@/types/highballer';

interface HighBallerCardProps {
    item: HighBallerItem;
    variant?: 'hero' | 'secondary' | 'thumbnail';
    className?: string;
}

export default function HighBallerCard({ item, variant = 'thumbnail', className = '' }: HighBallerCardProps) {
    const isMore = item.isMore;
    const href = isMore ? '/HighBaller/storage' : `/HighBaller/${item.id}`;

    return (
        <Link href={href} className={`hb-card hb-card-${variant} ${className}`}>
            <img src={item.image} alt={item.title} />


            <div className="hb-card-meta">
                {variant === 'hero' && <span>Latest Update: {item.date}</span>}
                {variant !== 'hero' && <span>{item.date}</span>}

            </div>

            <div className="hb-card-title">
                {item.title}
            </div>

            <div className="hb-card-number">
                <img src="/images/logos/highball_icon_logo.png" alt="HighBaller Icon" className="hb-icon-img" />
                {item.number}
            </div>

            {item.author && variant !== 'thumbnail' && (
                <div className="hb-card-author">
                    Author: {item.author}
                </div>
            )}
        </Link>
    );
}
