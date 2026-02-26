import Image from 'next/image';

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
            <div className="hb-footer-logo">
                <Image
                    src="/images/logos/highball_icon_logo.png"
                    alt="HighBaller Logo"
                    width={32}
                    height={32}
                    className="hb-footer-icon-img"
                />
                HighBall
            </div>
        </footer>
    );
}
