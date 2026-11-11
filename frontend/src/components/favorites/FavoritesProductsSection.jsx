import { Heart } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FavoriteProductCard from "./FavoriteProductCard";

const FavoritesProductsSection = () => {
  const favorites = useSelector((state) => state.favorites.favorites);

  return (
    <section className="bg-white px-6 py-16 lg:px-0">
      <div className="mx-auto flex w-full max-w-[1050px] flex-col items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-dark">Saved Products</h2>

          <p className="mt-2 text-sm font-medium text-muted">
            {favorites.length} saved {favorites.length === 1 ? "item" : "items"}
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="flex min-h-80 flex-col items-center justify-center text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-light-gray text-primary">
              <Heart size={28} />
            </div>

            <h3 className="mt-6 text-lg font-bold text-dark">
              No saved products yet.
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
              Save products you like and find them easily here later.
            </p>

            <Link
              to="/shop"
              className="mt-6 flex h-12 cursor-pointer items-center justify-center rounded-md bg-primary px-6 text-sm font-bold text-white transition hover:opacity-90"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="mt-12 flex w-full flex-wrap justify-center gap-x-[30px] gap-y-12">
            {favorites.map((product) => (
              <FavoriteProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FavoritesProductsSection;
