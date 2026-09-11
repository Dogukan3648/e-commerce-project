import { Link } from "react-router-dom";

const ProductCard = ({ to, image, title, department, oldPrice, newPrice }) => {
  return (
    <Link
      to={to}
      className="flex w-74 cursor-pointer flex-col bg-white transition-transform hover:-translate-y-1 lg:w-[183px]"
    >
      <img
        src={image}
        alt={title}
        className="h-90 w-full object-cover lg:h-60"
      />

      <div className="flex flex-col items-center gap-2.5 px-6 pt-6 pb-9">
        <h3 className="flex min-h-12 items-center text-center text-base font-bold leading-6 text-dark">
          {title}
        </h3>

        <p className="w-full truncate text-center text-sm font-bold leading-6 text-muted">
          {department}
        </p>

        <div className="flex items-center gap-1 px-1 py-1">
          {oldPrice && (
            <span className="text-base font-bold leading-6 text-[#BDBDBD]">
              {oldPrice}
            </span>
          )}
          <span className="text-base font-bold leading-6 text-[#23856D]">
            {newPrice}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
