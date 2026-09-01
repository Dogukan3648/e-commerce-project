import { Heart, Menu, Search, ShoppingCart, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import shopChevronIcon from "../../assets/icons/shop-chevron.svg";
import { getCategoryPath } from "../../utils/categoryUtils";

const getGravatarUrl = async (email) => {
  const normalizedEmail = email.trim().toLowerCase();

  const encodedEmail = new TextEncoder().encode(normalizedEmail);

  const hashBuffer = await crypto.subtle.digest("SHA-256", encodedEmail);

  const hash = Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return `https://www.gravatar.com/avatar/${hash}?s=32&d=mp`;
};

const Navbar = () => {
  const [avatar, setAvatar] = useState({
    email: "",
    url: "",
  });

  const user = useSelector((state) => state.client.user);
  const categories = useSelector((state) => state.product.categories);

  const womenCategories = categories.filter(
    (category) => category.gender === "k",
  );

  const menCategories = categories.filter(
    (category) => category.gender === "e",
  );

  const location = useLocation();

  const from =
    location.pathname === "/login"
      ? "/"
      : `${location.pathname}${location.search}${location.hash}`;

  useEffect(() => {
    if (!user.email) {
      return;
    }

    let isCurrent = true;

    getGravatarUrl(user.email).then((url) => {
      if (isCurrent) {
        setAvatar({
          email: user.email,
          url,
        });
      }
    });

    return () => {
      isCurrent = false;
    };
  }, [user.email]);

  const avatarUrl = avatar.email === user.email ? avatar.url : "";

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

          <li className="lg:hidden">
            <Link to="/shop">Product</Link>
          </li>

          <li className="lg:hidden">Pricing</li>

          <li className="group relative hidden lg:block">
            <div className="flex items-center gap-2 px-1.5">
              <Link to="/shop" className="font-medium text-dark">
                Shop
              </Link>
              <img src={shopChevronIcon} alt="" className="h-2.5 w-1.5" />
            </div>

            <div className="absolute left-0 top-full z-50 hidden pt-4 group-hover:block group-focus-within:block">
              <div className="flex w-72 gap-12 bg-white px-6 py-5 shadow-md">
                <div className="flex flex-1 flex-col gap-3">
                  <span className="font-bold text-dark">Kadın</span>

                  {womenCategories.map((category) => (
                    <Link
                      key={category.id}
                      to={getCategoryPath(category)}
                      className="font-medium text-muted hover:text-primary"
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>

                <div className="flex flex-1 flex-col gap-3">
                  <span className="font-bold text-dark">Erkek</span>

                  {menCategories.map((category) => (
                    <Link
                      key={category.id}
                      to={getCategoryPath(category)}
                      className="font-medium text-muted hover:text-primary"
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </li>

          <li className="hidden lg:block">
            <Link to="/about">About</Link>
          </li>

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
        {user.email ? (
          <div className="flex items-center gap-2 rounded-full p-4 text-sm font-bold leading-6">
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt={`${user.name} avatar`}
                className="h-8 w-8 rounded-full"
              />
            )}

            <span className="whitespace-nowrap">{user.name}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 rounded-full p-4 text-sm font-bold leading-6">
            <User size={12} />

            <Link
              to={{
                pathname: "/login",
                state: { from },
              }}
            >
              Login
            </Link>

            <span>/</span>

            <Link to="/signup">Register</Link>
          </div>
        )}

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
