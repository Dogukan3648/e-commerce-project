import awsLogo from "../assets/icons/brands/aws.svg";
import hooliLogo from "../assets/icons/brands/hooli.svg";
import lyftLogo from "../assets/icons/brands/lyft.svg";
import piedPiperLogo from "../assets/icons/brands/pied-piper.svg";
import redditLogo from "../assets/icons/brands/reddit.svg";
import stripeLogo from "../assets/icons/brands/stripe.svg";

const clients = [
  { name: "Hooli", logo: hooliLogo },
  { name: "Lyft", logo: lyftLogo },
  { name: "Pied Piper", logo: piedPiperLogo },
  { name: "Stripe", logo: stripeLogo },
  { name: "AWS", logo: awsLogo },
  { name: "Reddit", logo: redditLogo },
];

const ClientsSection = () => {
  return (
    <section className="bg-white py-[110px] xl:py-0" aria-label="Our clients">
      <div className="mx-auto flex w-full flex-col items-center gap-[60px] py-[50px] xl:max-w-[1050px] xl:flex-row xl:gap-[30px]">
        {clients.map((client) => (
          <div
            key={client.name}
            className="flex items-center justify-center xl:flex-1"
          >
            <img
              src={client.logo}
              alt={`${client.name} logo`}
              className="h-auto w-36 xl:w-auto"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientsSection;
