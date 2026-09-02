import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShopPagination from "./ShopPagination";
import ShopProductCard from "./ShopProductCard";

import { fetchProducts } from "../../store/actions/productActions";

const ShopProductsSection = () => {
  const dispatch = useDispatch();

  const { productList, fetchState } = useSelector((state) => state.product);

  const mobileProducts = productList.slice(0, 4);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (fetchState === "FETCHING") {
    return (
      <section className="flex min-h-80 items-center justify-center bg-white">
        <div className="size-10 animate-spin rounded-full border-4 border-soft-gray border-t-primary" />
      </section>
    );
  }

  return (
    <section className="bg-white">
      <div className="mx-auto flex flex-col items-center gap-12 py-20 lg:w-[1124px] lg:py-12">
        <div className="flex flex-col items-center gap-[30px] lg:hidden">
          {mobileProducts.map((product) => (
            <ShopProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="hidden w-[1050px] flex-wrap gap-x-[30px] gap-y-12 lg:flex">
          {productList.map((product) => (
            <ShopProductCard key={product.id} product={product} />
          ))}
        </div>

        <ShopPagination />
      </div>
    </section>
  );
};

export default ShopProductsSection;
