import { Link } from "react-router-dom";

const ShopProductCard = ({ product }) => {
  const { id, name, description, price, images } = product;

  const imageUrl =
    images?.find((image) => image.index === 0)?.url ?? images?.[0]?.url ?? "";
  return (
    <Link
      to={`/product/${id}`}
      className="flex w-87 flex-col overflow-hidden bg-white lg:w-60"
    >
      <img
        src={imageUrl}
        alt={name}
        className="h-107 w-full object-cover lg:h-75"
      />

      <div className="flex h-47 flex-col items-center gap-2.5 px-6 pt-6 pb-9">
        <h3 className="w-33 text-center text-base font-bold leading-6 tracking-[0.1px] text-dark">
          {name}
        </h3>

        <p className="w-full truncate text-center text-sm font-bold leading-6 tracking-[0.2px] text-muted">
          {description}
        </p>

        <div className="flex items-center gap-1 px-1 py-1 text-base font-bold leading-6 tracking-[0.1px]">
          <span className="text-success">${price.toFixed(2)}</span>
        </div>
      </div>
    </Link>
  );
};

export default ShopProductCard;
