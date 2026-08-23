import { Heart, Menu, Search, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";

import shopChevronIcon from "../assets/icons/shop-chevron.svg";

const Navbar = () => {
  return (
    <div className="xl:flex xl:h-16 xl:items-center xl:pl-10 xl:pr-4">
      <div className="flex items-center justify-between px-9 py-9 xl:w-48 xl:flex-none xl:p-0">
        <Link to="/" className="text-2xl font-bold xl:text-3xl">
          Bandage
        </Link>

        <div className="flex items-center gap-6 xl:hidden">
          <button type="button" aria-label="Search">
            <Search size={24} />
          </button>

          <button type="button" aria-label="Shopping cart">
            <ShoppingCart size={24} />
          </button>

          <button type="button" aria-label="Menu">
            <Menu size={24} />
          </button>
        </div>
      </div>

      <nav className="mt-15 xl:ml-20 xl:mt-0">
        <ul className="flex flex-col items-center gap-8 text-muted xl:flex-row xl:gap-8">
          <li className="text-3xl leading-[45px] xl:text-base xl:font-bold xl:leading-6 xl:tracking-[0.2px]">
            <Link to="/">Home</Link>
          </li>

          <li className="text-3xl leading-[45px] xl:hidden">Product</li>

          <li className="text-3xl leading-[45px] xl:hidden">Pricing</li>

          <li className="hidden xl:flex xl:items-center xl:gap-2 xl:px-1.5">
            <span className="text-base font-medium leading-7 tracking-[0.2px] text-dark">
              Shop
            </span>

            <img src={shopChevronIcon} alt="" className="h-2.5 w-1.5" />
          </li>

          <li className="hidden font-bold leading-6 tracking-[0.2px] xl:block xl:text-base">
            About
          </li>

          <li className="hidden font-bold leading-6 tracking-[0.2px] xl:block xl:text-base">
            Blog
          </li>

          <li className="text-3xl leading-[45px] xl:text-base xl:font-bold xl:leading-6 xl:tracking-[0.2px]">
            Contact
          </li>

          <li className="hidden font-bold leading-6 tracking-[0.2px] xl:block xl:text-base">
            Pages
          </li>
        </ul>
      </nav>

      <div className="ml-auto hidden shrink-0 items-center text-primary xl:flex">
        <button
          type="button"
          className="flex items-center gap-1 rounded-full p-4 text-base font-bold leading-6 tracking-[0.2px]"
        >
          <User size={14} />
          <span className="whitespace-nowrap">Login / Register</span>
        </button>

        <button type="button" aria-label="Search" className="rounded-full p-4">
          <Search size={16} />
        </button>

        <button
          type="button"
          aria-label="Shopping cart"
          className="flex items-center gap-1 rounded-full p-4"
        >
          <ShoppingCart size={16} />
          <span className="text-xs leading-4 tracking-[0.2px]">1</span>
        </button>

        <button
          type="button"
          aria-label="Favorites"
          className="flex items-center gap-1 rounded-full p-4"
        >
          <Heart size={16} />
          <span className="text-xs leading-4 tracking-[0.2px]">1</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
