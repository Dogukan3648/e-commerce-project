import { Heart, ImageOff, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { toggleFavorite } from "../../store/actions/favoritesActions";
import { addToCart } from "../../store/actions/shoppingCartActions";
import { createSlug, getCategoryPath } from "../../utils/categoryUtils";

const ShopProductListCard = ({ product }) => {
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
    <article className="flex w-full overflow-hidden rounded-lg border border-border-light bg-white transition-transform hover:-translate-y-1">
      <Link
        to={productPath}
        className="flex h-40 w-28 shrink-0 cursor-pointer items-center justify-center bg-light-gray lg:h-56 lg:w-56"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-light-gray text-muted">
            <ImageOff size={36} />
          </div>
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col px-4 py-4 lg:px-8 lg:py-6">
        <Link to={productPath} className="min-w-0 cursor-pointer">
          <h3 className="text-base font-bold leading-6 text-dark lg:text-lg">
            {name}
          </h3>

          <p className="mt-2 truncate text-sm font-medium leading-6 text-muted lg:whitespace-normal">
            {description}
          </p>
        </Link>

        <p className="mt-4 text-base font-bold text-success lg:text-lg">
          ${price.toFixed(2)}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
          <button
            type="button"
            disabled={stock <= 0}
            onClick={() => dispatch(addToCart(product))}
            className="flex h-10 cursor-pointer items-center gap-2 rounded-md bg-primary px-4 text-sm font-bold whitespace-nowrap text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingCart size={16} />
            {stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>

          <button
            type="button"
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            aria-pressed={isFavorite}
            onClick={() => dispatch(toggleFavorite(product))}
            className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-border-light bg-white text-dark transition hover:border-danger"
          >
            <Heart
              size={20}
              className={isFavorite ? "fill-danger text-danger" : "text-dark"}
            />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ShopProductListCard;
