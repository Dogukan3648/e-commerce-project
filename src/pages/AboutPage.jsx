import AboutContentSection from "../components/about/AboutContentSection";
import AboutHeroSection from "../components/about/AboutHeroSection";
import AboutStatsSection from "../components/about/AboutStatsSection";
import AboutVideoSection from "../components/about/AboutVideoSection";
import ContactHeroSection from "../components/contact/ContactHeroSection";
import ClientsSection from "../components/shared/ClientsSection";
import TeamSection from "../components/team/TeamSection";

const AboutPage = () => {
  return (
    <>
      <AboutHeroSection />
      <AboutContentSection />
      <AboutStatsSection />
      <TeamSection />
      <ClientsSection
        title="Big Companies Are Here"
        description="Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics"
      />
      <AboutVideoSection />
      <ContactHeroSection />
    </>
  );
};

export default AboutPage;
