import Link from "next/link";
import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

const SpeakerCard = ({ speaker }) => {
  const { nameArabic, titleArabic, image, socialMedia, name } = speaker;

  return (
    <div>
      <div>
        <Link href={`/speakers/${name}`}>
          <div>
            <Image
              src={`/${image}`}
              alt={nameArabic}
              width={200}
              height={200}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div>
            <h3>{nameArabic}</h3>
            <p>{titleArabic}</p>
          </div>
        </Link>
      </div>

      {socialMedia && (
        <div>
          {socialMedia?.facebook && (
            <a
              href={socialMedia.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={24} />
            </a>
          )}
          {socialMedia?.linkedin && (
            <a
              href={socialMedia.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={24} />
            </a>
          )}
          {socialMedia?.instagram && (
            <a
              href={socialMedia.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={24} />
            </a>
          )}
          {socialMedia?.youtube && (
            <a
              href={socialMedia.youtube}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube size={24} />
            </a>
          )}
          {socialMedia?.tiktok && (
            <a
              href={socialMedia.tiktok}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok size={24} />
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default SpeakerCard;
