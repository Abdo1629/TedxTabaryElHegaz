"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import teamData from "../../data/teamData.json";
import seasionOne from "../../data/seasionOne.json";
import seasionTwo from "../../data/seasionTwo.json";

const SpeakerPage = () => {
  const params = useParams();
  const decodedName = decodeURIComponent(params.name);

  if (!teamData?.team || !seasionOne?.seasionOne || !seasionTwo?.seasionTwo) {
    return <div className="content-error-container">Data is missing</div>;
  }

  const speaker = teamData.team.find((s) => s.name === decodedName);
  const speakerSeasionOne = seasionOne.seasionOne.find((s) => s.name === decodedName);
  const speakerSeasionTwo = seasionTwo.seasionTwo.find((s) => s.name === decodedName);

  if (!speaker && !speakerSeasionOne && !speakerSeasionTwo) {
    return <div className="content-error-container">Speaker not found</div>;
  }

  const speakerImage =
      speaker?.image || speakerSeasionOne?.image || speakerSeasionTwo?.image || "default-image.jpg";

  const socialLinks = {
    facebook:
        speaker?.socialMedia?.facebook || speakerSeasionOne?.socialMedia?.facebook || speakerSeasionTwo?.socialMedia?.facebook || "#",
    linkedin:
        speaker?.socialMedia?.linkedin || speakerSeasionOne?.socialMedia?.linkedin ||  speakerSeasionTwo?.socialMedia?.linkedin || "#",
    instagram:
        speaker?.socialMedia?.instagram || speakerSeasionOne?.socialMedia?.instagram ||  speakerSeasionTwo?.socialMedia?.instagram || "#",
    youtube:
        speaker?.socialMedia?.youtube || speakerSeasionOne?.socialMedia?.youtube ||  speakerSeasionTwo?.socialMedia?.youtube || "#",
    tiktok:
        speaker?.socialMedia?.tiktok || speakerSeasionOne?.socialMedia?.tiktok ||  speakerSeasionTwo?.socialMedia?.tiktok || "#",
  };

  return (
      <div className="speaker-layout-page">
        <div className="speaker-layout-container">
          <Link href="/speakers" className="layout-return-button">
            <span>عودة</span>
          </Link>
          <div className="layout-content-wrapper">
            <div className="layout-image-section">
              <Image
                  src={`/${speakerImage}`}
                  alt={speaker?.nameArabic || speakerSeasionOne?.nameArabic || speakerSeasionTwo?.nameArabic}
                  width={400}
                  height={400}
                  className="layout-speaker-image"
              />
            </div>
            <div className="layout-info-section">
              <h1 className="layout-speaker-name">
                {speaker?.nameArabic || speakerSeasionOne?.nameArabic || speakerSeasionTwo?.nameArabic}
              </h1>
              <h2 className="layout-speaker-title">
                {speaker?.titleArabic || speakerSeasionOne?.titleArabic || speakerSeasionTwo?.titleArabic}
              </h2>
              {(speaker?.description?.arabic || speakerSeasionOne?.description?.arabic || speakerSeasionTwo?.description?.arabic) && (
                  <div className="layout-speaker-bio">
                    <h3>نبذة تعريفية</h3>
                    <p>
                      {speaker?.description?.arabic || speakerSeasionOne?.description?.arabic || speakerSeasionTwo?.description?.arabic}
                    </p>
                  </div>
              )}
              <div className="layout-social-links">
                <Link
                    href={socialLinks.facebook}
                    target={socialLinks.facebook === "#" ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className={`social-link-icon ${socialLinks.facebook === "#" ? "disabled" : ""}`}
                >
                  <FaFacebook/>
                </Link>
                <Link
                    href={socialLinks.linkedin}
                    target={socialLinks.linkedin === "#" ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className={`social-link-icon ${socialLinks.linkedin === "#" ? "disabled" : ""}`}
                >
                  <FaLinkedin/>
                </Link>
                <Link
                    href={socialLinks.instagram}
                    target={socialLinks.instagram === "#" ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className={`social-link-icon ${socialLinks.instagram === "#" ? "disabled" : ""}`}
                >
                  <FaInstagram/>
                </Link>
                <Link
                    href={socialLinks.youtube}
                    target={socialLinks.youtube === "#" ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className={`social-link-icon ${socialLinks.youtube === "#" ? "disabled" : ""}`}
                >
                  <FaYoutube/>
                </Link>
                <Link
                    href={socialLinks.tiktok}
                    target={socialLinks.tiktok === "#" ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className={`social-link-icon ${socialLinks.tiktok === "#" ? "disabled" : ""}`}
                >
                  <FaTiktok/>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default SpeakerPage;
