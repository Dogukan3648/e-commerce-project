import shopBottomImage from "../assets/images/shop-bottom.png";
import shopMainImage from "../assets/images/shop-main.png";
import shopTopImage from "../assets/images/shop-top.png";

const ShopCardsSection = () => {
  return (
    <section className="bg-white" aria-label="Featured products">
      <div className="mx-auto w-5/6 py-6 lg:max-w-[1185px] lg:-translate-x-10 lg:py-20">
        <div className="flex flex-col gap-4 lg:h-143 lg:flex-row">
          <div className="relative h-139 lg:h-full lg:w-[52%]">
            <img
              src={shopMainImage}
              alt=""
              className="h-full w-full object-cover"
            />

            <div className="absolute bottom-0 left-0 flex h-60 w-full flex-col bg-shop-overlay/75 pl-10 pt-15 text-white lg:w-105 lg:pl-16">
              <h3 className="w-48 text-2xl font-bold leading-8">
                Top Product Of the Week
              </h3>

              <button
                type="button"
                className="mt-6 flex h-13 w-50 items-center justify-center rounded-md border border-white text-sm font-bold leading-6 lg:mt-5"
              >
                EXPLORE ITEMS
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:flex-1 lg:gap-6">
            <div className="relative h-99 lg:h-72">
              <img
                src={shopTopImage}
                alt=""
                className="h-full w-full object-cover"
              />

              <div className="absolute bottom-0 left-0 flex h-60 w-full flex-col bg-shop-overlay/75 pl-10 pt-15 text-white lg:h-43 lg:w-87 lg:pl-9 lg:pt-10">
                <h3 className="w-48 text-2xl font-bold leading-8 lg:w-65 lg:whitespace-nowrap lg:text-xl lg:font-normal">
                  Top Product Of the Week
                </h3>

                <button
                  type="button"
                  className="mt-6 flex h-13 w-50 items-center justify-center rounded-md border border-white text-sm font-bold leading-6 lg:mt-5"
                >
                  EXPLORE ITEMS
                </button>
              </div>
            </div>

            <div className="relative h-99 lg:h-65">
              <img
                src={shopBottomImage}
                alt=""
                className="h-full w-full object-cover"
              />

              <div className="absolute bottom-0 left-0 flex h-60 w-full flex-col bg-shop-overlay/75 pl-10 pt-15 text-white lg:h-38 lg:w-87 lg:pl-9 lg:pt-7">
                <h3 className="w-48 text-2xl font-bold leading-8 lg:w-65 lg:whitespace-nowrap lg:text-xl lg:font-normal">
                  Top Product Of the Week
                </h3>

                <button
                  type="button"
                  className="mt-6 flex h-13 w-50 items-center justify-center rounded-md border border-white text-sm font-bold leading-6 lg:mt-5"
                >
                  EXPLORE ITEMS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopCardsSection;
