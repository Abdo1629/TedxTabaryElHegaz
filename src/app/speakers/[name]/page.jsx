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
    return <div>Data is missing</div>;
  }

  const speaker = teamData.team.find((s) => s.name === decodedName);
  const speakerSeasionOne = seasionOne.seasionOne.find((s) => s.name === decodedName);
  const speakerSeasionTwo = seasionTwo.seasionTwo.find((s) => s.name === decodedName);

  if (!speaker && !speakerSeasionOne && !speakerSeasionTwo) {
    return <div>Speaker not found</div>;
  }

  const speakerImage =
      speaker?.image || speakerSeasionOne?.image || speakerSeasionTwo?.image || "default-image.jpg";

  return (
      <div>
        <div>
          <div>
            <Image
                src={`/${speakerImage}`}
                alt={speaker?.nameArabic || speakerSeasionOne?.nameArabic || speakerSeasionTwo?.nameArabic}
                width={300}
                height={300}
            />
          </div>
          <div>
            <h1>{speaker?.nameArabic || speakerSeasionOne?.nameArabic || speakerSeasionTwo?.nameArabic}</h1>
            <h2>{speaker?.titleArabic || speakerSeasionOne?.titleArabic || speakerSeasionTwo?.titleArabic}</h2>
            {(speaker?.description?.arabic || speakerSeasionOne?.description?.arabic || speakerSeasionTwo?.description?.arabic) && (
                <div>
                  <h3>نبذة تعريفية</h3>
                  <p>{speaker?.description?.arabic || speakerSeasionOne?.description?.arabic || speakerSeasionTwo?.description?.arabic}</p>
                </div>
            )}
            {(speaker?.socialMedia?.facebook || speaker?.socialMedia?.linkedin) && (
                <div>
                  {speaker?.socialMedia?.facebook && (
                      <Link
                          href={speaker.socialMedia.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                      >
                        <FaFacebook size={24} />
                      </Link>
                  )}
                  {speaker?.socialMedia?.linkedin && (
                      <Link
                          href={speaker.socialMedia.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                      >
                        <FaLinkedin size={24} />
                      </Link>
                  )}
                </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default SpeakerPage;
