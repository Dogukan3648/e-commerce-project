import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { productGallery } from "../../data/product-detail/productGallery";

const ProductGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevious = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0
        ? productGallery.thumbnails.length - 1
        : currentIndex - 1,
    );
  };

  const handleNext = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === productGallery.thumbnails.length - 1
        ? 0
        : currentIndex + 1,
    );
  };

  const activeImage =
    activeIndex === 0
      ? productGallery.mainImage
      : productGallery.thumbnails[activeIndex].image;

  return (
    <div className="flex w-87 flex-col lg:w-126.5">
      <div className="relative h-69 w-full overflow-hidden rounded-md lg:h-112.5">
        <img
          src={activeImage}
          alt="Product"
          className="h-full w-full object-cover"
        />

        <button
          type="button"
          onClick={handlePrevious}
          className="absolute top-1/2 left-10 -translate-y-1/2 text-white"
        >
          <ChevronLeft size={44} />
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="absolute top-1/2 right-9 -translate-y-1/2 text-white"
        >
          <ChevronRight size={44} />
        </button>
      </div>
      <div className="mt-10 flex gap-5 lg:mt-5">
        {productGallery.thumbnails.map((thumbnail, index) => (
          <button
            key={thumbnail.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-19 w-25 overflow-hidden ${
              activeIndex === index ? "opacity-100" : "opacity-50"
            }`}
          >
            <img
              src={thumbnail.image}
              alt=""
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
