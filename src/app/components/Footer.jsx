import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <div>
        <Image
          src="/images/logo2.png"
          alt="TEDx Logo"
          width={100}
          height={50}
          loading="lazy"
        />
        <p>حقوق الطبع والنشر © TEDxTabaryElHegazHS. جميع الحقوق محفوظة 2025</p>
      </div>
    </footer>
  );
}
