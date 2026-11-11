import contactHeroImage from "../../assets/images/contact/contact-hero.png";

const ContactHeroSection = ({
  image = contactHeroImage,
  eyebrow,
  title = "CONTACT US",
  description = "Have questions about our products or services? Feel free to get in touch with us.",
  buttonText = "CONTACT US",
  withDesktopTopMargin = true,
}) => {
  return (
    <section
      className={`relative h-130 overflow-hidden bg-hover-text lg:h-[636px] ${
        withDesktopTopMargin ? "lg:mt-8" : ""
      }`}
    >
      <img
        src={image}
        alt=""
        className="absolute top-0 right-0 hidden h-[634px] w-[590px] object-cover lg:block"
      />

      <div className="mx-auto flex h-full items-center justify-center lg:w-[1050px] lg:justify-start">
        <div className="flex w-68 flex-col items-center gap-6 text-center lg:w-[438px] lg:items-start lg:text-left">
          {eyebrow && (
            <p className="text-base font-bold leading-6 tracking-[0.1px] text-white">
              {eyebrow}
            </p>
          )}

          <h1 className="w-[274px] text-[40px] font-bold leading-[50px] tracking-[0.2px] text-white lg:w-[440px]">
            {title}
          </h1>

          <p className="w-[257px] text-sm font-normal leading-5 tracking-[0.2px] text-white lg:w-[367px]">
            {description}
          </p>

          <a
            href="mailto:dogukan122216@gmail.com"
            className="mt-4 flex h-13 w-32.5 items-center justify-center rounded-md border border-light-gray text-sm font-bold leading-[22px] tracking-[0.2px] text-light-gray lg:mt-0"
          >
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactHeroSection;
