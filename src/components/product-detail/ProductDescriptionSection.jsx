import productDescriptionImage from "../../assets/images/product-detail/product-description-1.png";
import DescriptionList from "./DescriptionList";

const ProductDescriptionSection = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto flex flex-col items-center">
        <nav className="flex h-23 w-full items-center justify-center lg:border-b lg:border-border-light">
          <div className="flex items-center text-sm leading-6 tracking-[0.2px] text-muted">
            <button
              type="button"
              className="px-3 py-6 font-semibold underline lg:no-underline"
            >
              Description
            </button>

            <button type="button" className="px-3 py-6 font-bold">
              Additional Information
            </button>

            <button
              type="button"
              className="flex items-center gap-2 px-3 py-6 font-bold"
            >
              <span>Reviews</span>
              <span className="text-success">(0)</span>
            </button>
          </div>
        </nav>

        <div className="flex w-83 flex-col gap-7.5 pt-6 pb-20 lg:w-264 lg:flex-row lg:pb-12">
          <div className="relative h-73 w-83 shrink-0 overflow-hidden lg:h-98">
            <div className="absolute top-0 left-0.75 h-70.5 w-81 rounded-md bg-[#c4c4c4]/20 lg:h-95.5" />
            <img
              src={productDescriptionImage}
              alt="Product Description"
              className="absolute top-0 left-0 h-68 w-80 rounded-md object-cover lg:h-93 lg:w-79"
            />
          </div>

          <div className="flex w-83 flex-col gap-7.5 py-6 lg:pt-0 lg:pb-6">
            <h3 className="text-2xl font-bold leading-8 tracking-[0.1px] text-dark">
              the quick fox jumps over
            </h3>

            <div className="flex flex-col gap-5 text-sm font-normal leading-5 tracking-[0.2px] text-muted">
              <p>
                Met minim Mollie non desert Alamo est sit cliquey dolor do met
                sent. RELIT official consequent door ENIM RELIT Mollie.
                Excitation venial consequent sent nostrum met.
              </p>

              <p>
                Met minim Mollie non desert Alamo est sit cliquey dolor do met
                sent. RELIT official consequent door ENIM RELIT Mollie.
                Excitation venial consequent sent nostrum met.
              </p>

              <p>
                Met minim Mollie non desert Alamo est sit cliquey dolor do met
                sent. RELIT official consequent door ENIM RELIT Mollie.
                Excitation venial consequent sent nostrum met.
              </p>
            </div>
          </div>

          <div className="flex w-83 flex-col">
            <DescriptionList
              title="the quick fox jumps over"
              items={[
                "the quick fox jumps over the lazy dog",
                "the quick fox jumps over the lazy dog",
                "the quick fox jumps over the lazy dog",
                "the quick fox jumps over the lazy dog",
              ]}
            />

            <div className="pt-6">
              <DescriptionList
                title="the quick fox jumps over"
                items={[
                  "the quick fox jumps over the lazy dog",
                  "the quick fox jumps over the lazy dog",
                  "the quick fox jumps over the lazy dog",
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDescriptionSection;
