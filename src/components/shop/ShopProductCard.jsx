import { Heart, ImageOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleFavorite } from "../../store/actions/favoritesActions";
import { createSlug, getCategoryPath } from "../../utils/categoryUtils";

const ShopProductCard = ({ product }) => {
  const { id, name, description, price, images, category_id } = product;

  const categories = useSelector((state) => state.product.categories);

  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.favorites);

  const isFavorite = favorites.some((item) => item.id === product.id);

  const category = categories.find((item) => item.id === category_id);

  const productPath = category
    ? `${getCategoryPath(category)}/${createSlug(name)}/${id}`
    : "#";

  const imageUrl =
    images?.find((image) => image.index === 0)?.url ?? images?.[0]?.url ?? "";
  return (
    <div className="relative flex w-87 flex-col overflow-hidden bg-white transition-transform hover:-translate-y-1 lg:w-60">
      <Link to={productPath} className="flex cursor-pointer flex-col">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="h-107 w-full object-cover lg:h-75"
          />
        ) : (
          <div className="flex h-107 w-full items-center justify-center bg-light-gray text-muted lg:h-75">
            <ImageOff size={40} />
          </div>
        )}
        <div className="flex h-47 flex-col items-center gap-2.5 px-6 pt-6 pb-9">
          <h3 className="flex min-h-12 w-33 items-center justify-center text-center text-base font-bold leading-6 tracking-[0.1px] text-dark">
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

      <button
        type="button"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        aria-pressed={isFavorite}
        onClick={() => dispatch(toggleFavorite(product))}
        className="absolute top-3 right-3 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105"
      >
        <Heart
          size={20}
          className={isFavorite ? "fill-danger text-danger" : "text-dark"}
        />
      </button>
    </div>
  );
};

export default ShopProductCard;
