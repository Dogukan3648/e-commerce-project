const ProductCard = ({ image, title, department, oldPrice, newPrice }) => {
  return (
    <section className="flex w-74 flex-col bg-white lg:w-[183px]">
      <img
        src={image}
        alt={title}
        className="h-90 w-full object-cover lg:h-60"
      />

      <div className="flex flex-col items-center gap-2.5 px-6 pt-6 pb-9">
        <h3 className="text-center text-base font-bold leading-6 text-dark">
          {title}
        </h3>

        <p className="text-center text-sm font-bold leading-6 text-muted lg:whitespace-nowrap">
          {department}
        </p>

        <div className="flex items-center gap-1 px-1 py-1">
          <span className="text-base font-bold leading-6 text-[#BDBDBD]">
            {oldPrice}
          </span>

          <span className="text-base font-bold leading-6 text-[#23856D]">
            {newPrice}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
