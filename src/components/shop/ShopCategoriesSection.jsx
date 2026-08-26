import { shopCategories } from "../../data/shop/shopCategories";

const ShopCategoriesSection = () => {
  return (
    <section className="bg-light-gray px-6 py-6 lg:px-0 lg:pb-12 lg:pt-0">
      <div className="mx-auto flex w-full flex-col items-center gap-4 lg:w-fit lg:flex-row">
        {shopCategories.map((category) => (
          <div
            key={category.id}
            className="relative h-75 w-full max-w-83 overflow-hidden bg-white lg:h-56 lg:w-51 lg:shrink-0"
          >
            <img
              src={category.image}
              alt=""
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-[#212121]/25" />

            <div className="absolute inset-0 flex translate-y-3 flex-col items-center justify-center gap-2.5 text-white lg:translate-y-0.5">
              <h2 className="text-base font-bold leading-6 tracking-[0.1px]">
                {category.title}
              </h2>

              <p className="text-sm font-bold leading-6 tracking-[0.2px] lg:font-normal lg:leading-5">
                {category.itemCount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopCategoriesSection;
