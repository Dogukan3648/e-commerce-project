import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBestsellerProducts } from "../../store/actions/productActions";
import { createSlug, getCategoryPath } from "../../utils/categoryUtils";

import ProductCard from "../product/ProductCard";

const BestSellerSection = () => {
  const dispatch = useDispatch();

  const { bestsellerProducts, categories } = useSelector(
    (state) => state.product,
  );
  useEffect(() => {
    dispatch(fetchBestsellerProducts());
  }, [dispatch]);

  return (
    <section className="overflow-hidden bg-white">
      <div className="mx-auto w-[414px] [zoom:calc(100vw/414px)] lg:w-[1124px] lg:translate-x-[37px] lg:[zoom:1]">
        <div className="mx-auto flex w-86 max-w-full flex-col items-center gap-6 py-20 lg:w-full lg:max-w-none">
          <div className="flex w-70 flex-col items-center gap-2.5 text-center lg:w-[692px]">
            <p className="hidden text-xl font-normal leading-[30px] text-muted lg:block">
              Featured Products
            </p>

            <h2 className="w-60 text-2xl font-bold leading-8 text-dark lg:w-auto">
              BESTSELLER PRODUCTS
            </h2>

            <p className="w-65 text-sm leading-5 text-muted lg:w-auto">
              Problems trying to resolve the conflict between
            </p>
          </div>

          <div className="w-full py-2 lg:w-[1115px]">
            <div className="flex flex-col items-center gap-8 py-6 lg:ml-9 lg:w-[1035px] lg:flex-row lg:flex-wrap lg:items-start lg:gap-x-[30px] lg:gap-y-[15px]">
              {bestsellerProducts.map((product, index) => {
                const imageUrl =
                  product.images?.find((image) => image.index === 0)?.url ??
                  product.images?.[0]?.url ??
                  "";
                const category = categories.find(
                  (item) => item.id === product.category_id,
                );

                const productPath = category
                  ? `${getCategoryPath(category)}/${createSlug(product.name)}/${product.id}`
                  : "#";

                return (
                  <div
                    key={product.id}
                    className={index >= 5 ? "hidden lg:block" : ""}
                  >
                    <ProductCard
                      to={productPath}
                      image={imageUrl}
                      title={product.name}
                      department={product.description}
                      oldPrice=""
                      newPrice={`$${product.price.toFixed(2)}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <Link
            to="/shop"
            className="flex h-13 w-64 cursor-pointer items-center justify-center rounded-md border border-primary text-sm font-bold leading-6 text-primary transition hover:bg-primary hover:text-white"
          >
            VIEW ALL PRODUCTS
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellerSection;
