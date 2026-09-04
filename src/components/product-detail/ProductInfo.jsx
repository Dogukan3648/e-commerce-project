import { Eye, Heart, ShoppingCart, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions/shoppingCartActions";

const ProductInfo = ({ product }) => {
  const {
    name,
    description,
    price,
    stock,
    rating,
    sell_count: sellCount,
  } = product;

  const isInStock = stock > 0;

  const dispatch = useDispatch();

  return (
    <div className="flex h-118 w-87 flex-col pl-6 lg:w-127.5">
      <h2 className="mt-2.5 text-xl font-normal leading-7.5 tracking-[0.2px] text-dark">
        {name}
      </h2>

      <div className="mt-3 flex items-center gap-2.5">
        <div className="flex items-center gap-1.25">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={22}
              className={
                star <= Math.round(rating)
                  ? "fill-[#F3CD03] text-[#F3CD03]"
                  : "text-[#F3CD03]"
              }
            />
          ))}
        </div>

        <span className="text-sm font-bold leading-6 tracking-[0.2px] text-muted">
          {sellCount} Sales
        </span>
      </div>

      <p className="mt-5.5 text-2xl font-bold leading-8 tracking-[0.1px] text-dark">
        ${price.toFixed(2)}
      </p>

      <div className="mt-1 flex items-center gap-1.25 text-sm font-bold leading-6 tracking-[0.2px]">
        <span className="text-muted">Availability :</span>
        <span className="text-primary">
          {isInStock ? `In Stock (${stock})` : "Out of Stock"}
        </span>
      </div>

      <p className="mt-8 w-68 text-sm font-normal leading-5 tracking-[0.2px] text-[#858585] lg:w-116">
        {description}
      </p>

      <div className="mt-4 ml-1.25 h-px w-71 bg-soft-gray lg:mt-7 lg:ml-0 lg:w-111" />

      <div className="mt-4.5 flex items-center gap-2.5 lg:mt-7">
        <button
          type="button"
          className="size-7.5 cursor-pointer rounded-full bg-primary"
        />
        <button
          type="button"
          className="size-7.5 cursor-pointer rounded-full bg-[#2DC071]"
        />
        <button
          type="button"
          className="size-7.5 cursor-pointer rounded-full bg-alert"
        />
        <button
          type="button"
          className="size-7.5 cursor-pointer rounded-full bg-dark"
        />
      </div>

      <div className="mt-12 flex items-center gap-2.5 lg:mt-16.5">
        <button
          type="button"
          className="flex h-11 w-37 items-center justify-center cursor-pointer rounded-md bg-primary text-sm font-bold leading-6 tracking-[0.2px] text-white"
        >
          Select Options
        </button>

        <button
          type="button"
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-[#E8E8E8] bg-white text-dark"
        >
          <Heart size={20} />
        </button>

        <button
          type="button"
          disabled={!isInStock}
          onClick={() => dispatch(addToCart(product))}
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-[#E8E8E8] bg-white text-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ShoppingCart size={20} />
        </button>

        <button
          type="button"
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-[#E8E8E8] bg-white text-dark"
        >
          <Eye size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
