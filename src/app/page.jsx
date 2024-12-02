import Countdown from "./components/homepage/CountDown";
import DefineSection from "./components/homepage/DefineSection";
import EventsSection from "./components/homepage/EventsSection";
import LandingPage from "./components/homepage/LandingPage";
import PromoSection from "./components/homepage/PromoSection";
import SpeakersSection from "./components/homepage/SpeakersSection";
import VideosSection from "./components/homepage/VideosSection";

export default function Home() {
  return (
    <div>
      <Countdown />
      <LandingPage />
      <DefineSection />
      <PromoSection />
      <EventsSection />
      <SpeakersSection />
      <VideosSection />
    </div>
  );
}
