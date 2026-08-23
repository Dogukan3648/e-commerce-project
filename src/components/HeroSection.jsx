import heroWoman from "../assets/images/hero-woman.png";

const HeroSection = () => {
  return (
    <section className="mx-auto mt-20 w-97 max-w-full rounded-2xl bg-linear-to-r from-[#96E9FB] to-[#ABECD6] md:w-4/5 xl:mt-6 xl:w-[90%]">
      <div className="flex flex-col items-center gap-16 pt-20 xl:h-[622px] xl:flex-row xl:gap-0 xl:pt-0">
        <div className="flex w-full flex-col items-center gap-8 text-center xl:min-w-0 xl:flex-1 xl:items-start xl:pl-[clamp(4rem,8vw,10rem)] xl:text-left">
          <span className="text-base font-bold leading-6 tracking-[0.1px] text-[#2A7CC7]">
            SUMMER 2020
          </span>

          <h1 className="w-67 text-[40px] font-bold leading-[50px] tracking-[0.2px] text-dark xl:w-auto xl:whitespace-nowrap xl:text-[clamp(48px,4vw,58px)] xl:leading-20">
            NEW COLLECTION
          </h1>

          <p className="w-72 text-xl font-normal leading-8 tracking-[0.2px] text-muted xl:w-94">
            We know how large objects will act, but things on a small scale.
          </p>

          <button
            type="button"
            className="rounded-md bg-primary px-10 py-4 text-2xl font-bold leading-8 tracking-[0.1px] text-white"
          >
            SHOP NOW
          </button>
        </div>

        <div className="relative -mt-12 flex h-[453px] w-full items-end justify-center xl:ml-auto xl:mt-0 xl:h-full xl:w-[54%] xl:max-w-[696px] xl:flex-none">
          <div className="absolute bottom-10 left-9 h-[294px] w-[294px] rounded-full bg-white xl:hidden" />

          <div className="absolute left-0 top-32 h-12 w-12 rounded-full bg-white xl:hidden" />

          <div className="absolute left-88 top-39 h-2 w-2 rounded-full bg-[#977DF4] xl:hidden" />

          <div className="absolute left-[14px] top-[330px] z-20 h-[9px] w-[9px] rounded-full bg-[#977DF4] xl:hidden" />

          <div className="absolute left-84 top-58 z-20 h-5 w-5 rounded-full bg-white xl:hidden" />

          <div className="absolute left-[18%] -top-3 hidden aspect-square w-[72%] max-w-[500px] rounded-full bg-white xl:block" />

          <div className="absolute left-[10%] top-0 hidden h-20 w-20 rounded-full bg-white xl:block" />

          <div className="absolute right-0 top-28 hidden h-4 w-4 rounded-full bg-[#977DF4] xl:block" />

          <div className="absolute left-[13%] top-[66%] z-20 hidden h-4 w-4 rounded-full bg-[#977DF4] xl:block" />

          <div className="absolute right-4 top-[39%] z-20 hidden h-8 w-8 rounded-full bg-white xl:block" />

          <img
            src={heroWoman}
            alt="Woman"
            className="relative z-10 w-[410px] max-w-none object-contain xl:w-full xl:max-w-[696px] xl:translate-x-20"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
