import facebookIcon from "../assets/icons/social/footer-facebook.svg";
import instagramIcon from "../assets/icons/social/footer-instagram.svg";
import twitterIcon from "../assets/icons/social/footer-twitter.svg";
import footerLinks from "../data/shared/footerLinks";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="relative h-43 bg-light-gray lg:h-36">
        <div className="mx-auto flex h-full w-full flex-col justify-center gap-3 px-11 lg:w-263 lg:flex-row lg:items-center lg:justify-between lg:px-0">
          <div className="flex h-15 w-59 items-center">
            <p className="text-2xl font-bold leading-8 text-dark">Bandage</p>
          </div>

          <div className="flex items-center gap-5 lg:w-59 lg:justify-center">
            <img
              src={facebookIcon}
              alt=""
              className="size-6"
              aria-hidden="true"
            />

            <img
              src={instagramIcon}
              alt=""
              className="size-6"
              aria-hidden="true"
            />

            <img
              src={twitterIcon}
              alt=""
              className="h-5 w-6"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="absolute left-1/2 top-36 w-full -translate-x-1/2 border-t border-[#E6E6E6] lg:top-35 lg:w-263" />
      </div>

      <div className="h-268 bg-white lg:h-68">
        <div className="mx-auto flex h-full w-full items-start px-11 py-18 lg:w-263 lg:px-0 lg:py-12">
          <div className="flex w-full flex-col gap-7 lg:flex-row lg:gap-8">
            {footerLinks.map((group) => (
              <div key={group.title} className="flex flex-col gap-5 lg:w-37">
                <h3 className="text-base font-bold leading-6 text-dark">
                  {group.title}
                </h3>

                <div className="flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <span
                      key={link}
                      className="text-sm font-bold leading-6 text-muted"
                    >
                      {link}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex w-full max-w-80 flex-col gap-5 lg:ml-auto lg:w-80">
              <h3 className="text-base font-bold leading-6 text-dark">
                Get In Touch
              </h3>

              <div className="h-22 w-full">
                <div className="flex h-15 w-full overflow-hidden rounded-md border border-[#E6E6E6]">
                  <div className="flex min-w-0 flex-1 items-center bg-[#F9F9F9] px-5">
                    <span className="text-sm leading-7 text-muted">
                      Your Email
                    </span>
                  </div>

                  <div className="flex w-29 items-center justify-center bg-primary">
                    <span className="text-sm leading-7 text-white">
                      Subscribe
                    </span>
                  </div>
                </div>

                <p className="mt-1 text-xs leading-7 text-muted">
                  Lore imp sum dolor Amit
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-25 items-center bg-[#FAFAFA] lg:h-18">
        <div className="mx-auto flex w-full justify-center lg:w-263 lg:justify-start">
          <p className="text-center text-sm font-bold leading-6 text-muted lg:text-left">
            <span className="block lg:inline">Made With Love By </span>
            <span className="block lg:inline">Finland All Right Reserved</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
