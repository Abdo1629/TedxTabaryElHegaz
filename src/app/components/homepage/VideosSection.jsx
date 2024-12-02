import Link from 'next/link';

// @tokhy -> retransfer the code to make it more cleaner (make a video component and use props.)

export default function VideosSection() {
    return (
        <div>
            <div>
                <span>شاهد الأن</span>
                <div>
                    <h2>مقاطع الفيديو</h2>
                    <Link href="https://youtube.com/playlist?list=PLcpez9tyjp7Rb7gMoL8QzxXd8-Wz-agv1&si=VRml5RdXQCtURKQi" target="_blank">
                        <button>شاهد المزيد</button>
                    </Link>
                </div>
            </div>

            <div>
                <div>
                    <div>
                        <iframe 
                            src="https://www.youtube.com/embed/f0TqIzm9rYc"
                            loading="lazy" 
                            allowFullScreen
                        />
                        <h5>لغتنا هويتنا</h5>
                    </div>
                    <div>
                        <iframe 
                            src="https://www.youtube.com/embed/2xFoxG3HFmw"
                            loading="lazy" 
                            allowFullScreen
                        />
                        <h5>عائلتك ومجتمعك اولاً</h5>
                    </div>
                    <div>
                        <iframe 
                            src="https://www.youtube.com/embed/Os2k62pMn2Y"
                            loading="lazy" 
                            allowFullScreen
                        />
                        <h5>هرمون الدوبامين</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}