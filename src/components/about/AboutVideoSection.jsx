import aboutVideoDesktop from "../../assets/images/about/about-video-desktop.png";
import aboutVideoMobile from "../../assets/images/about/about-video-mobile.png";

const AboutVideoSection = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto flex items-center justify-center py-20 lg:w-262 lg:py-28">
        <img
          src={aboutVideoMobile}
          alt=""
          className="h-79 w-77 object-contain lg:hidden"
        />

        <img
          src={aboutVideoDesktop}
          alt=""
          className="hidden h-135 w-247 object-contain lg:block"
        />
      </div>
    </section>
  );
};

export default AboutVideoSection;
