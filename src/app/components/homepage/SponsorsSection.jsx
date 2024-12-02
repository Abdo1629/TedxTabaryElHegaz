import Image from "next/image";

export default function SponsorsSection() {
  const sponsorLogos = [
    "/images/Sponsors/1.jpg",
    "/images/Sponsors/2.jpg",
    "/images/Sponsors/3.jpg",
    "/images/Sponsors/4.jpg",
    "/images/Sponsors/5.jpg",
    "/images/Sponsors/6.jpg",
    "/images/Sponsors/7.jpg",
    "/images/Sponsors/8.jpg",
    "/images/Sponsors/9.jpg",
    "/images/Sponsors/10.jpg",
    "/images/Sponsors/11.jpg",
    "/images/Sponsors/12.jpg",
    "/images/Sponsors/13.jpg",
    "/images/Sponsors/14.jpg",
    "/images/Sponsors/15.jpg",
    "/images/Sponsors/16.jpg",
    "/images/Sponsors/17.jpg",
  ];

  return (
    <div>
      <span>الشركاء والرعاة</span>
      <div>
        {sponsorLogos.map((logo, index) => (
          <Image
            key={index}
            src={logo}
            alt="Sponsor Logo"
            loading="lazy"
            width={200}
            height={200}
          />
        ))}
      </div>
    </div>
  );
}
