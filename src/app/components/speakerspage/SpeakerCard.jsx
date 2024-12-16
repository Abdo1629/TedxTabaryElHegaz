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
      <div className="custom-card">
        <Link href={`/speakers/${name}`} className="custom-card__link">
          <div className="custom-card__image">
            <Image
                src={`/${image}`}
                alt={nameArabic}
                width={300}
                height={200}
                layout="responsive"
                objectFit="cover"
            />
          </div>
          <div className="custom-card__content">
            <h3 className="custom-card__name">{nameArabic}</h3>
            <p className="custom-card__title">{titleArabic}</p>
          </div>
        </Link>
        {socialMedia && (
            <div className="custom-card__social">
              {socialMedia?.facebook && (
                  <a
                      href={socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="facebook"
                  >
                    <FaFacebook />
                  </a>
              )}
              {socialMedia?.linkedin && (
                  <a
                      href={socialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="linkedin"
                  >
                    <FaLinkedin />
                  </a>
              )}
              {socialMedia?.instagram && (
                  <a
                      href={socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="instagram"
                  >
                    <FaInstagram />
                  </a>
              )}
              {socialMedia?.youtube && (
                  <a
                      href={socialMedia.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="youtube"
                  >
                    <FaYoutube />
                  </a>
              )}
              {socialMedia?.tiktok && (
                  <a
                      href={socialMedia.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tiktok"
                  >
                    <FaTiktok />
                  </a>
              )}
            </div>
        )}
      </div>
  );
};

export default SpeakerCard;
