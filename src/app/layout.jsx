import { Alexandria, Noto_Sans_Arabic, Tajawal } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Load fonts with specific subsets and weights
const alexandria = Alexandria({
  subsets: ["latin"],
  weight: ["100", "400", "900"],
  display: "swap",
});
const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["500"],
  display: "swap",
});
const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "900"],
  display: "swap",
});

export const metadata = {
  title: "TEDxTabaryElHegaz",
  description:
    "TEDx طبري الحجاز هو حدث منظم بشكل مستقل بموجب ترخيص TED، يقام في مصر، تحديداً في منطقة الحجاز. يهدف الحدث إلى توفير منصة لمشاركة الأفكار المبتكرة والمبادرات الملهمة من مختلف المجالات، مع التركيز على تمكين المجتمع المحلي لمشاركة قصص وتجارب فريدة.",
  keywords:
    "Tedx, TedxTabaryElHegazHS ,Events ,Ahmed Mostafa ,أول تيداكس في مدرسة حكومية ,Tedx In Public School",
  author: "Ahmed Mostafa",
  charset: "UTF-8",
  copyright: "Copyright © TedxTabaryElHegazHS. All Rights Reserved 2025",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${alexandria.variable} ${notoSansArabic.variable} ${tajawal.variable}`}
    >
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
      <head>
        <link rel="shortcut icon" href="https://res.cloudinary.com/dbgdvnkev/image/upload/v1730659366/tedx_qogx0k.webp" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#000000" />
        <meta charSet="UTF-8" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta name="copyright" content={metadata.copyright} />
        <title>{metadata.title}</title>
      <script type="application/ld+json">
          {`
            {
            "@context": "https://schema.org"
              "@type": "Organization",
              "url": "https://tedxtabaryelhegaz.com",
              "logo": "https://res.cloudinary.com/dbgdvnkev/image/upload/v1730659366/tedx_qogx0k.webp"
            }
          `}
        </script>
      </head>
    </html>
  );
}
