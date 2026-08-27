import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";

const ProductDetailSection = () => {
  return (
    <section className="bg-light-gray">
      <div className="mx-auto flex w-87 flex-col gap-7.5 py-12 lg:w-[1050px] lg:flex-row lg:pb-12 lg:pt-0">
        <ProductGallery />
        <ProductInfo />
      </div>
    </section>
  );
};

export default ProductDetailSection;
