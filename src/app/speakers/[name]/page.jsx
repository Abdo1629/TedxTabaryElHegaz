"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import teamData from "../../data/teamData.json";

const SpeakerPage = () => {
  const params = useParams();
  const decodedName = decodeURIComponent(params.name);
  const speaker = teamData.team.find((s) => s.name === decodedName);

  if (!speaker) {
    return <div>Speaker not found</div>;
  }

  return (
    <div>
      <div>
        <div>
          <Image
            src={`/${speaker.image}`}
            alt={speaker.nameArabic}
            width={300}
            height={300}
          />
        </div>
        <div>
          <h1>{speaker.nameArabic}</h1>
          <h2>{speaker.titleArabic}</h2>
          {speaker.description?.arabic && (
            <div>
              <h3>نبذة تعريفية</h3>
              <p>{speaker.description.arabic}</p>
            </div>
          )}
          {(speaker.socialMedia?.facebook || speaker.socialMedia?.linkedin) && (
            <div>
              {speaker.socialMedia?.facebook && (
                <Link
                  href={speaker.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook size={24} />
                </Link>
              )}
              {speaker.socialMedia?.linkedin && (
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
