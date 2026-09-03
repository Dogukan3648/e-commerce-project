import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchBestsellerProducts,
  fetchProduct,
} from "../store/actions/productActions";

import BestsellerProductsSection from "../components/product-detail/BestsellerProductsSection";
import ProductDescriptionSection from "../components/product-detail/ProductDescriptionSection";
import ProductDetailBreadcrumb from "../components/product-detail/ProductDetailBreadcrumb";
import ProductDetailSection from "../components/product-detail/ProductDetailSection";
import ClientsSection from "../components/shared/ClientsSection";

const ProductDetailPage = () => {
  const { productId } = useParams();

  const dispatch = useDispatch();

  const { product, productFetchState, bestsellerProducts } = useSelector(
    (state) => state.product,
  );

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    dispatch(fetchBestsellerProducts());
  }, [dispatch]);

  if (productFetchState === "FETCHING" || !product) {
    return (
      <section className="flex min-h-80 items-center justify-center bg-white">
        <div className="size-10 animate-spin rounded-full border-4 border-soft-gray border-t-primary" />
      </section>
    );
  }
  return (
    <>
      <ProductDetailBreadcrumb />
      <ProductDetailSection product={product} />
      <ProductDescriptionSection product={product} />
      <BestsellerProductsSection products={bestsellerProducts} />
      <ClientsSection />
    </>
  );
};

export default ProductDetailPage;
