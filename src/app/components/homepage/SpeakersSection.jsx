import Image from "next/image";
import Link from "next/link";
import mixData from "../../data/mixData";
import SpeakerCard from "../speakerspage/SpeakerCard";


// @tokhy -> don't forget to replace all `a` tags with Link component.

const SpeakersSection = () => {
  return (
    <div className="margintop events-container" id="speakers-section">
      <div className="">
        <div className="content arabic-content">
          <span>نرحل ويبقى الأثر</span>
          <div className="EventsHeader">
            <h2>شخصيات هامة</h2>
            <Link href="/speakers">
              <button className="btn">عرض المزيد</button>
            </Link>
          </div>
        </div>
        {/* 
          <div className="content arabic-content">
            <span>We leave, yet the impact remains</span>
            <div className="EventsHeader">
              <h2>Important People</h2>
              <Link href="/more-speakers">
                <button className="btn">View All</button>
              </Link>
            </div>
          </div> */}
      </div>

      <div className="events-cards">
            {mixData &&
                mixData.mixData.map((speaker) => {
                    return <SpeakerCard key={speaker.name} speaker={speaker} />;
                })}
        </div>
    </div>
  );
};

export default SpeakersSection;
