import SpeakerCard from "../components/speakerspage/SpeakerCard";
import teamData from "../data/teamData.json";

const SpeakersPage = () => {
  return (
    <div>
      <div>
        <h2>شخصيات هامة</h2>
        <button>عودة</button>
      </div>
      <div>
        <h4>شخصيات هامة</h4>
        <div>
          {teamData &&
            teamData.team.map((speaker) => {
              return <SpeakerCard key={speaker.name} speaker={speaker} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default SpeakersPage;
