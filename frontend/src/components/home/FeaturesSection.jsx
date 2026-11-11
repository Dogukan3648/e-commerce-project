import features from "../../data/home/features";

const FeaturesSection = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto flex w-full flex-col items-center gap-20 py-20 lg:max-w-263">
        <div className="flex w-3/5 flex-col items-center gap-2.5 text-center lg:w-173">
          <p className="text-xl leading-8 text-muted">Featured Products</p>

          <h2 className="text-2xl font-bold leading-8 text-dark">
            THE BEST SERVICES
          </h2>

          <p className="w-4/5 text-sm leading-5 text-muted lg:w-87">
            Problems trying to resolve the conflict between
          </p>
        </div>

        <div className="flex w-4/5 flex-col items-center gap-8 lg:w-full lg:flex-row lg:justify-center lg:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex w-79 flex-col items-center gap-5 px-10 py-9 text-center"
            >
              <img src={feature.icon} alt="" className="size-18" />

              <h3 className="w-59 text-2xl font-bold leading-8 text-dark">
                {feature.title}
              </h3>

              <p className="w-58 text-sm leading-5 text-muted">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
