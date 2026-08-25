import featuredProductsLeft from "../../assets/images/home/featured-products/featured-products-left.png";
import featuredProductsRight from "../../assets/images/home/featured-products/featured-products-right.png";
const FeaturedProductsSection = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto w-9/10 py-20 lg:w-263">
        <div className="flex flex-col items-center gap-13 md:gap-16 lg:flex-row-reverse lg:gap-22">
          <div className="flex w-3/4 max-w-xl flex-col items-start gap-4 lg:w-112 lg:max-w-none">
            <p className="text-base font-bold leading-6 text-primary">
              Featured Products
            </p>

            <h2 className="w-7/8 text-[40px] font-bold leading-12 text-dark lg:w-auto">
              We love what we do
            </h2>

            <div className="flex w-11/12 flex-col gap-5 text-sm leading-5 text-muted lg:w-88">
              <p>
                Problems trying to resolve the conflict between the two major
                realms of Classical physics: Newtonian mechanics.
              </p>

              <p>
                Problems trying to resolve the conflict between the two major
                realms of Classical physics: Newtonian mechanics.
              </p>
            </div>
          </div>

          <div className="flex aspect-[374/364] w-full max-w-3xl gap-3 overflow-hidden md:gap-4 lg:h-124 lg:w-128 lg:max-w-none lg:aspect-auto">
            <div className="h-full w-5/12 shrink-0 lg:w-54">
              <img
                src={featuredProductsLeft}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>

            <div className="h-full min-w-0 flex-1">
              <img
                src={featuredProductsRight}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
