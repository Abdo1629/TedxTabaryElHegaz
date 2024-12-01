import { Alexandria, Noto_Sans_Arabic, Tajawal } from "next/font/google";
import "./globals.css";
import Navbar from "./components/homepage/Navbar";

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
  viewport: "width=device-width, initial-scale=1.0",
  charset: "UTF-8",
  copyright: "Copyright © TedxTabaryElHegazHS. All Rights Reserved 2025",
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
      </body>
    </html>
  );
}
