import clients from "../data/clients";

const ClientsSection = () => {
  return (
    <section
      className="flex h-293 items-center bg-white lg:h-44"
      aria-label="Our clients"
    >
      <div className="mx-auto flex w-full flex-col items-center gap-15 py-12 lg:max-w-[1050px] lg:flex-row lg:gap-8">
        {clients.map((client) => (
          <div
            key={client.name}
            className="flex items-center justify-center lg:flex-1"
          >
            <img
              src={client.logo}
              alt={`${client.name} logo`}
              className={`${client.sizeClass} object-contain`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientsSection;
