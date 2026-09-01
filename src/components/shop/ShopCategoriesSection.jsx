import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getCategoryPath } from "../../utils/categoryUtils";

const ShopCategoriesSection = () => {
  const categories = useSelector((state) => state.product.categories);

  const topCategories = [...categories]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return (
    <section className="bg-light-gray px-6 py-6 lg:px-0 lg:pb-12 lg:pt-0">
      <div className="mx-auto flex w-full flex-col items-center gap-4 lg:w-fit lg:flex-row">
        {topCategories.map((category) => (
          <Link
            key={category.id}
            to={getCategoryPath(category)}
            className="relative h-75 w-full max-w-83 overflow-hidden bg-white lg:h-56 lg:w-51 lg:shrink-0"
          >
            <img
              src={category.img}
              alt={category.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-[#212121]/25" />

            <div className="absolute inset-0 flex translate-y-3 flex-col items-center justify-center gap-2.5 text-white lg:translate-y-0.5">
              <h2 className="text-base font-bold leading-6 tracking-[0.1px]">
                {category.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ShopCategoriesSection;
