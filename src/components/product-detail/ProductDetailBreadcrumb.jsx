import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProductDetailBreadcrumb = () => {
  return (
    <section className="bg-light-gray py-6">
      <div className="mx-auto flex w-full justify-center lg:w-258 lg:justify-start">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-4 py-2.5 text-sm font-bold leading-6 tracking-[0.2px]"
        >
          <Link to="/" className="text-dark">
            Home
          </Link>

          <ChevronRight size={14} className="text-soft-gray" />

          <Link to="/shop" className="text-muted lg:text-soft-gray">
            Shop
          </Link>
        </nav>
      </div>
    </section>
  );
};

export default ProductDetailBreadcrumb;
