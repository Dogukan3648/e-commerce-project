import { Mail, Phone } from "lucide-react";

import facebookIcon from "../assets/icons/facebook.svg";
import instagramIcon from "../assets/icons/instagram.svg";
import twitterIcon from "../assets/icons/twitter.svg";
import youtubeIcon from "../assets/icons/youtube.svg";

const HeaderTopBar = () => {
  return (
    <div className="hidden h-[58px] items-center bg-dark text-white lg:flex">
      <div className="flex w-full items-center justify-between px-6">
        <div className="flex items-center gap-2.5">
          <a
            href="tel:+12255550118"
            className="flex items-center gap-1 p-2.5 text-sm font-bold leading-6 tracking-[0.2px]"
          >
            <Phone size={16} />
            <span>(225) 555-0118</span>
          </a>

          <a
            href="mailto:michelle.rivera@example.com"
            className="flex items-center gap-1 p-2.5 text-sm font-bold leading-6 tracking-[0.2px]"
          >
            <Mail size={16} />
            <span>michelle.rivera@example.com</span>
          </a>
        </div>

        <span className="text-sm font-bold leading-6 tracking-[0.2px]">
          Follow Us and get a chance to win 80% off
        </span>

        <div className="flex items-center gap-2.5 p-2.5">
          <span className="text-sm font-bold leading-6 tracking-[0.2px]">
            Follow Us :
          </span>

          <div className="flex w-30 items-center justify-between">
            <span className="p-1">
              <img
                src={instagramIcon}
                alt=""
                className="h-4 w-4 object-contain"
              />
            </span>

            <span className="p-1">
              <img
                src={youtubeIcon}
                alt=""
                className="h-4 w-4 object-contain"
              />
            </span>

            <span className="p-1">
              <img
                src={facebookIcon}
                alt=""
                className="h-4 w-4 object-contain"
              />
            </span>

            <span className="p-1">
              <img
                src={twitterIcon}
                alt=""
                className="h-4 w-4 object-contain"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTopBar;
