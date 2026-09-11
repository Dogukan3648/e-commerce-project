import { Heart, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleFavorite } from "../../store/actions/favoritesActions";
import { addToCart } from "../../store/actions/shoppingCartActions";
import { createSlug, getCategoryPath } from "../../utils/categoryUtils";

const FavoriteProductCard = ({ product }) => {
  const { id, name, description, price, images, category_id, stock } = product;

  const dispatch = useDispatch();

  const categories = useSelector((state) => state.product.categories);
  const favorites = useSelector((state) => state.favorites.favorites);

  const isFavorite = favorites.some((item) => item.id === id);

  const category = categories.find((item) => item.id === category_id);

  const productPath = category
    ? `${getCategoryPath(category)}/${createSlug(name)}/${id}`
    : "#";

  const imageUrl =
    images?.find((image) => image.index === 0)?.url ?? images?.[0]?.url ?? "";

  return (
    <article className="relative flex w-full flex-col overflow-hidden rounded-lg border border-border-light bg-white shadow-sm transition-transform hover:-translate-y-1 lg:w-[330px]">
      <Link to={productPath} className="cursor-pointer">
        <div className="flex h-80 items-center justify-center bg-light-gray p-4">
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-contain"
          />
        </div>
      </Link>

      <div className="flex min-h-44 flex-col px-5 py-5">
        <Link to={productPath} className="cursor-pointer">
          <h3 className="text-base font-bold leading-6 text-dark">{name}</h3>

          <p className="mt-2 truncate text-sm font-medium leading-6 text-muted">
            {description}
          </p>
        </Link>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <p className="text-lg font-bold text-success">${price.toFixed(2)}</p>

          <button
            type="button"
            disabled={stock <= 0}
            onClick={() => dispatch(addToCart(product))}
            className="flex h-10 cursor-pointer items-center gap-2 rounded-md bg-primary px-4 text-sm font-bold whitespace-nowrap text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingCart size={16} />

            {stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>

      <button
        type="button"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        aria-pressed={isFavorite}
        onClick={() => dispatch(toggleFavorite(product))}
        className="absolute top-4 right-4 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105"
      >
        <Heart
          size={20}
          className={isFavorite ? "fill-danger text-danger" : "text-dark"}
        />
      </button>
    </article>
  );
};

export default FavoriteProductCard;
