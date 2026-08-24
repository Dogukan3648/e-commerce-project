import heroWoman from "../assets/images/hero-woman.png";

const HeroSection = () => {
  return (
    <section
      aria-labelledby="hero-title"
      className="mx-3 h-226 overflow-hidden rounded-[20px] bg-linear-to-r from-hero-start to-hero-end lg:mx-auto lg:mt-16 lg:h-156 lg:w-[90%]"
    >
      <div className="flex h-full flex-col items-center gap-16 pt-20 lg:flex-row lg:gap-0 lg:pt-0">
        <div className="flex w-full flex-col items-center gap-8 text-center lg:min-w-0 lg:flex-1 lg:items-start lg:pl-32 lg:text-left">
          <span className="text-base font-bold leading-6 text-hover-text">
            SUMMER 2020
          </span>

          <h1
            id="hero-title"
            className="max-w-xs text-[40px] font-bold leading-12 text-dark lg:max-w-none lg:whitespace-nowrap lg:text-6xl lg:leading-20"
          >
            NEW COLLECTION
          </h1>

          <p className="max-w-xs text-xl leading-8 text-muted lg:max-w-sm">
            We know how large objects will act, but things on a small scale.
          </p>

          <button
            type="button"
            className="rounded-md bg-primary px-10 py-4 text-2xl font-bold leading-8 text-white"
          >
            SHOP NOW
          </button>
        </div>

        <div className="relative flex h-113 w-full flex-none items-center justify-center lg:h-full lg:w-174">
          <div className="absolute left-10 top-10 size-74 rounded-full bg-white lg:-top-3 lg:left-32 lg:size-125" />

          <div className="absolute left-0 top-12 size-12 rounded-full bg-white lg:left-17 lg:top-0 lg:size-20" />

          <div className="absolute right-8 top-48 size-5 rounded-full bg-white lg:right-6 lg:top-61 lg:size-8" />

          <div className="absolute right-7 top-28 size-2 rounded-full bg-accent-purple lg:right-4 lg:size-4" />

          <div className="absolute left-4 top-72 z-20 size-2 rounded-full bg-accent-purple lg:left-23 lg:top-102 lg:size-4" />

          <img
            src={heroWoman}
            alt=""
            className="absolute left-1/2 top-2 z-10 -ml-4 w-103 max-w-none -translate-x-1/2 object-contain lg:-top-14 lg:ml-0 lg:w-174"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
