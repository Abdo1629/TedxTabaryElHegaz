"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
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

  return (
      <div className="speaker-layout-page">
        <div className="speaker-layout-container">
          <Link href="/" className="layout-return-button">
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
                {speaker?.socialMedia?.facebook && (
                    <Link
                        href={speaker.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link-icon"
                    >
                      <FaFacebook />
                    </Link>
                )}
                {speaker?.socialMedia?.linkedin && (
                    <Link
                        href={speaker.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link-icon"
                    >
                      <FaLinkedin />
                    </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default SpeakerPage;
