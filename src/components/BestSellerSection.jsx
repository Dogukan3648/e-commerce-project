import bestsellerProducts from "../data/bestSellerProducts";
import ProductCard from "./ProductCard";

const BestSellerSection = () => {
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
              {bestsellerProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={index >= 5 ? "hidden lg:block" : ""}
                >
                  <ProductCard
                    image={product.image}
                    title={product.title}
                    department={product.department}
                    oldPrice={product.oldPrice}
                    newPrice={product.newPrice}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="flex h-13 w-64 items-center justify-center rounded-md border border-primary text-sm font-bold leading-6 text-primary"
          >
            LOAD MORE PRODUCTS
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestSellerSection;
