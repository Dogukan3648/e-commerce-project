const AboutContentSection = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto flex flex-col items-center gap-15 py-20 lg:w-254 lg:flex-row lg:justify-center lg:gap-15 lg:py-6">
        <div className="flex flex-col items-center py-6 lg:w-99 lg:items-start">
          <div className="flex w-95 flex-col items-center gap-6 lg:w-99 lg:items-start">
            <p className="text-sm font-normal leading-5 tracking-[0.2px] text-danger">
              Problems trying
            </p>

            <h2 className="w-72 text-center text-2xl font-bold leading-8 tracking-[0.1px] text-dark lg:w-99 lg:text-left">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met
              sent.
            </h2>
          </div>
        </div>

        <div className="w-76 lg:w-132">
          <p className="text-sm font-normal leading-5 tracking-[0.2px] text-muted">
            Problems trying to resolve the conflict between the two major realms
            of Classical physics: Newtonian mechanics
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutContentSection;
