import SpeakerCard from "../components/speakerspage/SpeakerCard";
import teamData from "../data/teamData.json";
import  seasionOne from "../data/seasionOne.json";
import  seasionTwo from "../data/seasionTwo.json";
import {satisfies} from "next/dist/lib/semver-noop";

const SpeakersPage = () => {
  return (
    <div className="margintop events-container">
      <div className=" EventsHeader arabic-content">
        <h2>شخصيات هامة</h2>
        <button className="btn">عودة</button>
      </div>
      <div>
        <span className="section-title arabic-content">شخصيات هامة</span>
        <div className="events-cards">
          {teamData &&
            teamData.team.map((speaker) => {
              return <SpeakerCard key={speaker.name} speaker={speaker} />;
            })}
        </div>
      </div>
      <div className="margintop" >
        <span className="section-title arabic-content" >متحدثون الموسم الاول</span>
        <div className="events-cards">
            {seasionOne &&
                seasionOne.seasionOne.map((speaker) => {
                    return <SpeakerCard key={speaker.name} speaker={speaker} />;
                })}
        </div>
      </div>
      <div className="margintop" >
        <span className="section-title arabic-content">متحدثون الموسم الثاني</span>
          <div>
              <div className="events-cards">
                  {seasionTwo &&
                      seasionTwo.seasionTwo.map((speaker) => {
                          return <SpeakerCard key={speaker.name} speaker={speaker}/>;
                      })}
              </div>
          </div>
      </div>
    </div>
  );
};

export default SpeakersPage;
