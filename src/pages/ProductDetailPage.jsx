import BestsellerProductsSection from "../components/product-detail/BestsellerProductsSection";
import ProductDescriptionSection from "../components/product-detail/ProductDescriptionSection";
import ProductDetailBreadcrumb from "../components/product-detail/ProductDetailBreadcrumb";
import ProductDetailSection from "../components/product-detail/ProductDetailSection";
import ClientsSection from "../components/shared/ClientsSection";

const ProductDetailPage = () => {
  return (
    <>
      <ProductDetailBreadcrumb />
      <ProductDetailSection />
      <ProductDescriptionSection />
      <BestsellerProductsSection />
      <ClientsSection />
    </>
  );
};

export default ProductDetailPage;
