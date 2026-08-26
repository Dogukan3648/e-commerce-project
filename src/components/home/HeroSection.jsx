import heroWoman from "../../assets/images/home/hero/hero-woman.png";

const HeroSection = () => {
  return (
    <section className="mx-[13px] mt-4 h-[902px] overflow-hidden rounded-[20px] bg-linear-to-r from-hero-start to-hero-end lg:mx-auto lg:mt-6 lg:mb-13 lg:h-[622px] lg:w-[90%] lg:overflow-visible">
      <div className="relative flex h-full flex-col items-center pt-20 lg:block lg:pt-0">
        {/* Content */}
        <div className="flex w-full flex-col items-center gap-8 text-center lg:absolute lg:left-[clamp(64px,calc(15.38vw-93.5px),128px)] lg:top-1/2 lg:w-[clamp(424px,calc(29.81vw+118.8px),548px)] lg:-translate-y-1/2 lg:items-start lg:text-left">
          <span className="text-base font-bold leading-6 tracking-[0.1px] text-hover-text">
            SUMMER 2020
          </span>

          <h1 className="w-[clamp(268px,40vw,320px)] text-[40px] font-bold leading-[50px] tracking-[0.2px] text-dark lg:w-full lg:whitespace-nowrap lg:text-[clamp(40px,calc(4.327vw-4.3px),58px)] lg:leading-[clamp(50px,calc(7.21vw-23.8px),80px)]">
            NEW COLLECTION
          </h1>

          <p className="w-[clamp(291px,42vw,340px)] text-xl leading-[30px] tracking-[0.2px] text-muted lg:w-[376px]">
            We know how large objects will act, but things on a small scale.
          </p>

          <button
            type="button"
            className="flex h-[62px] w-[221px] items-center justify-center rounded-[5px] bg-primary text-2xl font-bold leading-8 tracking-[0.1px] text-white"
          >
            SHOP NOW
          </button>
        </div>

        {/* Mobile / tablet image area */}
        <div className="relative mt-[66px] h-[453px] w-full lg:absolute lg:right-[clamp(-80px,calc(110.37px-13.22vw),-25px)] lg:top-0 lg:mt-0 lg:h-[619px] lg:w-[clamp(479px,calc(52.4vw-57.6px),697px)]">
          <div className="absolute left-1/2 top-10 aspect-[384/372] w-[clamp(384px,calc(10.51vw+340.5px),448px)] -translate-x-1/2 lg:inset-0 lg:h-full lg:w-full lg:translate-x-0 lg:aspect-auto">
            {/* Büyük beyaz daire */}
            <div className="absolute left-[9.24%] top-0 aspect-square w-[76.592%] rounded-full bg-white lg:left-[18.4%] lg:top-[-1.94%] lg:w-[71.72%]" />

            {/* Sol üst beyaz daire */}
            <div className="absolute left-0 top-[1.954%] aspect-square w-[12.246%] rounded-full bg-white lg:left-[9%] lg:top-0 lg:w-[11.47%]" />

            {/* Kadın */}
            <img
              src={heroWoman}
              alt=""
              className="absolute left-1/2 top-2 z-10 w-[107.3%] max-w-none -translate-x-1/2 lg:bottom-0 lg:left-[0.14%] lg:top-auto lg:w-[99.86%] lg:translate-x-0"
            />

            {/* Sağ beyaz daire */}
            <div className="absolute left-[87.725%] top-[40.467%] z-20 aspect-square w-[4.787%] rounded-full bg-white lg:left-[91.1%] lg:top-[39.42%] lg:w-[4.48%]" />

            {/* Sağ mor nokta */}
            <div className="absolute left-[91.287%] top-[19.889%] z-20 aspect-square w-[2.338%] rounded-full bg-accent-purple lg:left-[94.3%] lg:top-[18.42%] lg:w-[2.19%]" />

            {/* Sol mor nokta */}
            <div className="absolute left-[3.785%] top-[66.794%] z-20 aspect-square w-[2.338%] rounded-full bg-accent-purple lg:left-[12.5%] lg:top-[66.24%] lg:w-[2.19%]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
