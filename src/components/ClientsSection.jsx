import awsLogo from "../assets/icons/brands/aws.svg";
import hooliLogo from "../assets/icons/brands/hooli.svg";
import lyftLogo from "../assets/icons/brands/lyft.svg";
import piedPiperLogo from "../assets/icons/brands/pied-piper.svg";
import redditLogo from "../assets/icons/brands/reddit.svg";
import stripeLogo from "../assets/icons/brands/stripe.svg";

const clients = [
  {
    name: "Hooli",
    logo: hooliLogo,
    sizeClass: "h-9 w-26",
  },
  {
    name: "Lyft",
    logo: lyftLogo,
    sizeClass: "h-15 w-21",
  },
  {
    name: "Pied Piper",
    logo: piedPiperLogo,
    sizeClass: "h-19 w-26",
  },
  {
    name: "Stripe",
    logo: stripeLogo,
    sizeClass: "h-11 w-26",
  },
  {
    name: "AWS",
    logo: awsLogo,
    sizeClass: "h-16 w-26",
  },
  {
    name: "Reddit",
    logo: redditLogo,
    sizeClass: "h-18 w-19",
  },
];

const ClientsSection = () => {
  return (
    <section className="h-293 bg-white lg:h-44" aria-label="Our clients">
      <div className="mx-auto flex h-full w-full flex-col items-center justify-between py-28 lg:max-w-[1440px] lg:flex-row lg:justify-center lg:gap-16 lg:px-12 lg:py-12">
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
