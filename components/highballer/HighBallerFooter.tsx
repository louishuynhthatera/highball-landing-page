import Image from 'next/image';
import Link from 'next/link';

export default function HighBallerFooter() {
    return (
        <footer className="hb-footer">
            <button
                className="hb-cta-btn"
                onClick={() => window.open('https://highball.jp/', '_blank')}
            >
                <Image
                    src="/images/logos/hb_cta_btn.png"
                    alt="HighBaller になりたい！"
                    width={250}
                    height={80}
                    className="hb-cta-img"
                />
            </button>
            <div className="logo">
                <Link href="/" >
                    <img src="/images/Logo.svg" alt="Logo" />
                </Link>
            </div>
        </footer>
    );
}
