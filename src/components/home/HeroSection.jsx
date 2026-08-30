import heroCoverDesktop from "../../assets/images/home/hero/hero-cover-desktop.webp";
import heroCoverMobile from "../../assets/images/home/hero/hero-cover-mobile.webp";

const HeroSection = () => {
  return (
    <section className="mx-3 mt-4 h-226 overflow-hidden rounded-2xl bg-linear-to-r from-hero-start to-hero-end lg:mx-auto lg:mt-6 lg:mb-13 lg:h-155 lg:w-9/10">
      <div className="flex h-full flex-col items-center pt-20 lg:flex-row lg:items-center lg:pt-0 lg:pl-32">
        <div className="flex shrink-0 flex-col items-center gap-8 text-center lg:w-137 lg:items-start lg:gap-7.5 lg:text-left">
          <span className="text-base font-bold leading-6 tracking-[0.1px] text-hover-text">
            SUMMER 2020
          </span>

          <h1 className="w-67 text-[40px] font-bold leading-[50px] tracking-[0.2px] text-dark lg:w-full lg:whitespace-nowrap lg:text-[58px] lg:leading-20">
            NEW COLLECTION
          </h1>

          <p className="w-73 text-xl leading-7.5 tracking-[0.2px] text-muted lg:w-94">
            We know how large objects will act, but things on a small scale.
          </p>

          <button
            type="button"
            className="flex h-15.5 w-55 items-center justify-center rounded-md bg-primary text-2xl font-bold leading-8 tracking-[0.1px] text-white"
          >
            SHOP NOW
          </button>
        </div>

        <div className="mt-16.5 flex h-113 w-full shrink-0 items-center justify-center lg:mt-0 lg:h-full lg:min-w-0 lg:flex-1">
          <picture className="block lg:w-full">
            <source media="(min-width: 1024px)" srcSet={heroCoverDesktop} />

            <img
              src={heroCoverMobile}
              alt=""
              className="block w-96 max-w-none lg:ml-auto lg:h-auto lg:w-full lg:max-w-174"
            />
          </picture>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
