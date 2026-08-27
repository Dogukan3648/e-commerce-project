import { Heart, Menu, Search, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";

import shopChevronIcon from "../../assets/icons/shop-chevron.svg";

const Navbar = () => {
  return (
    <div className="pb-24 lg:mt-3 lg:flex lg:h-14 lg:w-full lg:items-center lg:pr-5 lg:pl-10 lg:pb-0">
      <div className="flex h-28 items-center justify-between px-9 lg:h-auto lg:w-47 lg:px-0">
        <Link to="/" className="text-2xl font-bold leading-8">
          Bandage
        </Link>

        <div className="flex items-center gap-2 lg:hidden">
          <button type="button" aria-label="Search" className="p-2">
            <Search size={24} />
          </button>

          <button type="button" aria-label="Shopping cart" className="p-2">
            <ShoppingCart size={24} />
          </button>

          <button type="button" aria-label="Menu" className="p-2">
            <Menu size={24} />
          </button>
        </div>
      </div>

      <nav className="mt-12 lg:ml-10 lg:mt-0" aria-label="Main navigation">
        <ul className="flex flex-col items-center gap-8 text-3xl font-normal leading-normal text-muted lg:flex-row lg:gap-4 lg:text-sm lg:font-bold lg:leading-6">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li className="lg:hidden">Product</li>

          <li className="lg:hidden">Pricing</li>

          <li className="hidden items-center gap-2 px-1.5 lg:flex">
            <Link to="/shop" className="font-medium text-dark">
              Shop
            </Link>
            <img src={shopChevronIcon} alt="" className="h-2.5 w-1.5" />
          </li>

          <li className="hidden lg:block">About</li>

          <li className="hidden lg:block">Blog</li>

          <li>
            <Link to="/contact">Contact</Link>
          </li>

          <li>
            <Link to="/team">Team</Link>
          </li>

          <li className="hidden lg:block">Pages</li>
        </ul>
      </nav>

      <div className="ml-auto hidden shrink-0 items-center text-primary lg:flex">
        <button
          type="button"
          className="flex items-center gap-1 rounded-full p-4 text-sm font-bold leading-6"
        >
          <User size={12} />
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
          <span className="text-xs leading-4">1</span>
        </button>

        <button
          type="button"
          aria-label="Favorites"
          className="flex items-center gap-1 rounded-full p-4"
        >
          <Heart size={16} />
          <span className="text-xs leading-4">1</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
