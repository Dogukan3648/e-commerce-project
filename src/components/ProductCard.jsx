const ProductCard = ({ image, title, department, oldPrice, newPrice }) => {
  return (
    <section className="flex w-74 flex-col bg-white lg:w-[183px]">
      <img
        src={image}
        alt={title}
        className="h-90 w-full object-cover lg:h-[238px]"
      />

      <div className="flex flex-col items-center gap-2.5 px-6 pt-6 pb-9 lg:px-[25px] lg:pt-[25px] lg:pb-[35px]">
        <h3 className="text-center text-base font-bold leading-6 text-dark lg:tracking-[0.1px]">
          {title}
        </h3>

        <p className="text-center text-sm font-bold leading-6 text-muted lg:whitespace-nowrap lg:tracking-[0.2px]">
          {department}
        </p>

        <div className="flex items-center gap-1 px-1 py-1 lg:gap-[5px] lg:px-[3px] lg:py-[5px]">
          <span className="text-base font-bold leading-6 text-[#BDBDBD] lg:w-[52px] lg:tracking-[0.1px]">
            {oldPrice}
          </span>

          <span className="text-base font-bold leading-6 text-[#23856D] lg:w-[45px] lg:tracking-[0.1px]">
            {newPrice}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
