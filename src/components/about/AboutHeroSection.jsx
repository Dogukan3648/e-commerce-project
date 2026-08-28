import aboutHeroDesktop from "../../assets/images/about/about-hero-desktop.png";
import aboutHeroMobile from "../../assets/images/about/about-hero-mobile.png";

const AboutHeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white lg:h-160">
      <div className="mx-auto flex flex-col items-center gap-10 lg:h-full lg:w-262 lg:items-start lg:gap-0">
        <div className="flex h-148 flex-col items-center justify-center gap-10 text-center lg:h-full lg:w-150 lg:items-start lg:justify-start lg:gap-9 lg:pt-28 lg:text-left">
          <p className="hidden text-base font-bold leading-6 tracking-[0.1px] text-dark lg:block">
            ABOUT COMPANY
          </p>

          <h1 className="text-[40px] font-bold leading-12 tracking-[0.2px] text-dark lg:text-[58px] lg:leading-20">
            ABOUT US
          </h1>

          <p className="w-68 text-xl font-normal leading-7.5 tracking-[0.2px] text-muted lg:w-94">
            We know how large objects will act, but things on a small scale
            <span className="lg:hidden"> just do not act that way.</span>
          </p>

          <button
            type="button"
            className="rounded-md bg-primary px-10 py-4 text-sm font-bold leading-5.5 tracking-[0.2px] text-white"
          >
            Get Quote Now
          </button>
        </div>

        <div className="flex h-110 w-full items-end justify-center lg:hidden">
          <img
            src={aboutHeroMobile}
            alt=""
            className="h-110 w-97 object-contain"
          />
        </div>
      </div>

      <img
        src={aboutHeroDesktop}
        alt=""
        className="absolute top-6 right-16 hidden h-153 w-158 object-contain lg:block"
      />
    </section>
  );
};

export default AboutHeroSection;
