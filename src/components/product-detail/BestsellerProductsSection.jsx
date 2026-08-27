import { bestsellerProducts } from "../../data/product-detail/bestsellerProducts";
import BestsellerProductCard from "./BestsellerProductCard";

const BestsellerProductsSection = () => {
  return (
    <section className="bg-light-gray py-12">
      <div className="mx-auto flex w-87 flex-col items-center lg:w-[1050px] lg:items-start">
        <h2 className="text-center text-2xl font-bold leading-8 tracking-[0.1px] text-dark lg:text-left">
          BESTSELLER PRODUCTS
        </h2>

        <div className="mt-6 h-0.5 w-83 bg-border-light lg:w-[1042px]" />

        <div className="mt-6 flex flex-col gap-7.5 lg:flex-row lg:flex-wrap lg:gap-x-7.5 lg:gap-y-6">
          {bestsellerProducts.map((product, index) => (
            <div
              key={product.id}
              className={index >= 4 ? "hidden lg:block" : "block"}
            >
              <BestsellerProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestsellerProductsSection;
