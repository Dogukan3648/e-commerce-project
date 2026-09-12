import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  fetchProducts,
  setLimit,
  setOffset,
} from "../../store/actions/productActions";
import ShopPagination from "./ShopPagination";
import ShopProductCard from "./ShopProductCard";
import ShopProductListCard from "./ShopProductListCard";

const ShopProductsSection = ({ viewMode }) => {
  const [isLimitReady, setLimitReady] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const { categoryId } = useParams();
  const dispatch = useDispatch();

  const { productList, fetchState, filter, sort, limit, offset } = useSelector(
    (state) => state.product,
  );

  const previousQuery = useRef({ categoryId, filter, sort, limit });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleBreakPointChange = (event) => {
      const nextLimit = event.matches ? 12 : 4;

      dispatch(setLimit(nextLimit));
      setIsDesktop(event.matches);
      setLimitReady(true);
    };

    handleBreakPointChange(mediaQuery);

    mediaQuery.addEventListener("change", handleBreakPointChange);

    return () => {
      mediaQuery.removeEventListener("change", handleBreakPointChange);
    };
  }, [dispatch]);

  useEffect(() => {
    if (!isLimitReady) {
      return;
    }

    const queryChanged =
      previousQuery.current.categoryId !== categoryId ||
      previousQuery.current.filter !== filter ||
      previousQuery.current.sort !== sort ||
      previousQuery.current.limit !== limit;

    previousQuery.current = { categoryId, filter, sort, limit };

    if (queryChanged && offset !== 0) {
      dispatch(setOffset(0));
      return;
    }

    dispatch(fetchProducts(categoryId));
  }, [dispatch, categoryId, filter, sort, limit, offset, isLimitReady]);

  if (fetchState === "FETCHING") {
    return (
      <section className="flex min-h-80 items-center justify-center bg-white">
        <div className="size-10 animate-spin rounded-full border-4 border-soft-gray border-t-primary" />
      </section>
    );
  }

  if (fetchState === "FAILED") {
    return (
      <section className="flex min-h-80 items-center justify-center bg-white">
        <p className="text-sm font-bold text-muted">
          Products could not be loaded.
        </p>
      </section>
    );
  }

  if (fetchState === "FETCHED" && productList.length === 0) {
    return (
      <section className="flex min-h-80 items-center justify-center bg-white px-6">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-xl font-bold text-dark">No products found</h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
            Try adjusting your search or filters to find what you are looking
            for.
          </p>
        </div>
      </section>
    );
  }

  const ProductItem =
    isDesktop && viewMode === "list" ? ShopProductListCard : ShopProductCard;

  return (
    <section className="bg-white">
      <div className="mx-auto flex flex-col items-center gap-12 py-20 lg:w-[1124px] lg:py-12">
        <div
          className={
            !isDesktop || viewMode === "grid"
              ? "flex w-full flex-col items-center gap-[30px] px-6 lg:w-[1050px] lg:flex-row lg:flex-wrap lg:items-stretch lg:gap-x-[30px] lg:gap-y-12 lg:px-0"
              : "flex w-full flex-col gap-6 px-4 lg:w-[1050px] lg:px-0"
          }
        >
          {productList.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>

        <ShopPagination />
      </div>
    </section>
  );
};

export default ShopProductsSection;
