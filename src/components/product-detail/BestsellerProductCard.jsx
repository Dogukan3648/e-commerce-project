const BestsellerProductCard = ({
  image,
  title,
  department,
  oldPrice,
  price,
}) => {
  return (
    <article className="flex w-87 flex-col overflow-hidden bg-white lg:w-60">
      <div className="h-106.5 w-full overflow-hidden lg:h-70">
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-col items-start gap-2.5 px-6 py-6 pb-9">
        <h3 className="text-base font-bold leading-6 tracking-[0.1px] text-dark">
          {title}
        </h3>

        <p className="text-sm font-bold leading-6 tracking-[0.2px] text-muted">
          {department}
        </p>

        <div className="flex items-center gap-1.25 px-0.75 py-1.25 text-base font-bold leading-6 tracking-[0.1px] ">
          <span className="text-soft-gray">{oldPrice}</span>
          <span className="text-success">{price}</span>
        </div>
      </div>
    </article>
  );
};

export default BestsellerProductCard;
