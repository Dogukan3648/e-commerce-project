import { Heart, Menu, Search, ShoppingCart, User } from "lucide-react";

import shopChevronIcon from "../assets/icons/shop-chevron.svg";

const Navbar = () => {
  return (
    <div className="lg:flex lg:h-16 lg:items-center lg:pl-10 lg:pr-4">
      <div className="flex items-center justify-between px-9 py-9 lg:w-48 lg:flex-none lg:p-0">
        <span className="text-2xl font-bold lg:text-3xl">Bandage</span>

        <div className="flex items-center gap-6 lg:hidden">
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

      <nav className="mt-15 lg:ml-20 lg:mt-0">
        <ul className="flex flex-col items-center gap-8 text-muted lg:flex-row lg:gap-8">
          <li className="text-3xl leading-[45px] lg:text-base lg:font-bold lg:leading-6 lg:tracking-[0.2px]">
            Home
          </li>

          <li className="text-3xl leading-[45px] lg:hidden">Product</li>

          <li className="text-3xl leading-[45px] lg:hidden">Pricing</li>

          <li className="hidden lg:flex lg:items-center lg:gap-2 lg:px-1.5">
            <span className="text-base font-medium leading-7 tracking-[0.2px] text-dark">
              Shop
            </span>

            <img src={shopChevronIcon} alt="" className="h-2.5 w-1.5" />
          </li>

          <li className="hidden font-bold leading-6 tracking-[0.2px] lg:block lg:text-base">
            About
          </li>

          <li className="hidden font-bold leading-6 tracking-[0.2px] lg:block lg:text-base">
            Blog
          </li>

          <li className="text-3xl leading-[45px] lg:text-base lg:font-bold lg:leading-6 lg:tracking-[0.2px]">
            Contact
          </li>

          <li className="hidden font-bold leading-6 tracking-[0.2px] lg:block lg:text-base">
            Pages
          </li>
        </ul>
      </nav>

      <div className="ml-auto hidden shrink-0 items-center text-primary lg:flex">
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
