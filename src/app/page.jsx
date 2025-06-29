import ContactsSection from "./components/homepage/ContactsSection";
import Countdown from "./components/homepage/CountDown";
import DefineSection from "./components/homepage/DefineSection";
import EventsSection from "./components/homepage/EventsSection";
import LandingPage from "./components/homepage/LandingPage";
import PromoSection from "./components/homepage/PromoSection";
import SpeakersSection from "./components/homepage/SpeakersSection";
import SponsorsSection from "./components/homepage/SponsorsSection";
import StatsSection from "./components/homepage/StatesSection";
import VideosSection from "./components/homepage/VideosSection";
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
  return (
    <>
      <Analytics/>
      <Countdown />
      <LandingPage />
      <DefineSection />
      <PromoSection />
      <StatsSection />
      <EventsSection />
      <SpeakersSection />
      <VideosSection />
      <SponsorsSection />
      <ContactsSection />
    </>
  );
}
