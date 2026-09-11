import { useSelector } from "react-redux";
import { createSlug, getCategoryPath } from "../../utils/categoryUtils";

import BestsellerProductCard from "./BestsellerProductCard";

const BestsellerProductsSection = ({ products }) => {
  const categories = useSelector((state) => state.product.categories);

  return (
    <section className="bg-light-gray py-12">
      <div className="mx-auto flex w-87 flex-col items-center lg:w-[1050px] lg:items-start">
        <h2 className="text-center text-2xl font-bold leading-8 tracking-[0.1px] text-dark lg:text-left">
          BESTSELLER PRODUCTS
        </h2>

        <div className="mt-6 h-0.5 w-83 bg-border-light lg:w-[1042px]" />

        <div className="mt-6 flex flex-col gap-7.5 lg:flex-row lg:flex-wrap lg:gap-x-7.5 lg:gap-y-6">
          {products.map((product, index) => {
            const category = categories.find(
              (item) => item.id === product.category_id,
            );

            const productPath = category
              ? `${getCategoryPath(category)}/${createSlug(product.name)}/${product.id}`
              : "#";

            return (
              <div
                key={product.id}
                className={index >= 4 ? "hidden lg:block" : "block"}
              >
                <BestsellerProductCard {...product} to={productPath} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BestsellerProductsSection;
