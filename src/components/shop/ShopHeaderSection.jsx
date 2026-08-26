import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const ShopHeaderSection = () => {
  return (
    <section className="bg-light-gray py-6">
      <div className="mx-auto flex w-full flex-col items-center gap-8 lg:max-w-263 lg:flex-row lg:justify-between lg:gap-0">
        <h1 className="py-6 text-2xl font-bold leading-8 text-dark lg:py-0">
          Shop
        </h1>

        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-4 py-2.5 text-sm font-bold leading-6"
        >
          <Link to="/" className="text-dark">
            Home
          </Link>

          <ChevronRight size={14} className="text-soft-gray" />

          <span className="text-muted lg:text-soft-gray">Shop</span>
        </nav>
      </div>
    </section>
  );
};

export default ShopHeaderSection;
