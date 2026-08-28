import clients from "../../data/shared/clients";

const ClientsSection = ({ title, description }) => {
  const hasContent = title && description;

  return (
    <section
      className={
        hasContent
          ? "bg-light-gray"
          : "flex h-293 items-center bg-white lg:h-44"
      }
      aria-label="Our clients"
    >
      <div
        className={
          hasContent
            ? "mx-auto flex flex-col items-center py-30 lg:w-262 lg:gap-6 lg:py-20"
            : "w-full"
        }
      >
        {hasContent && (
          <div className="flex flex-col items-center gap-7.5 text-center">
            <h2 className="w-72 text-[40px] font-bold leading-12 tracking-[0.2px] text-dark lg:w-auto">
              {title}
            </h2>

            <p className="w-82 text-sm font-normal leading-5 tracking-[0.2px] text-muted lg:w-137">
              {description}
            </p>
          </div>
        )}

        <div
          className={
            hasContent
              ? "flex w-full flex-col items-center gap-15 py-12 lg:flex-row lg:gap-7.5"
              : "mx-auto flex w-full flex-col items-center gap-15 py-12 lg:max-w-262 lg:flex-row lg:gap-8"
          }
        >
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
      </div>
    </section>
  );
};

export default ClientsSection;
