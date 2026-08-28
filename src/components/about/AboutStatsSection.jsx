const stats = [
  { value: "15K", label: "Happy Customers" },
  { value: "150K", label: "Monthly Visitors" },
  { value: "15", label: "Countries Worldwide" },
  { value: "100+", label: "Top Partners" },
];

const AboutStatsSection = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto flex flex-col items-center gap-25 py-36 lg:w-262 lg:flex-row lg:gap-7.5 lg:py-20">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex w-60 flex-col items-center text-center"
          >
            <p className="text-6xl font-bold leading-20 tracking-[0.2px] text-dark">
              {stat.value}
            </p>

            <p className="text-base font-bold leading-6 tracking-[0.1px] text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutStatsSection;
