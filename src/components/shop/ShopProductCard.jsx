const ShopProductCard = ({ image }) => {
  return (
    <article className="flex w-87 flex-col overflow-hidden bg-white lg:w-60">
      <img src={image} alt="" className="h-107 w-full object-cover lg:h-75" />

      <div className="flex h-47 flex-col items-center gap-2.5 px-6 pt-6 pb-9">
        <h3 className="w-33 text-center text-base font-bold leading-6 tracking-[0.1px] text-dark">
          Graphic Design
        </h3>

        <p className="whitespace-nowrap text-center text-sm font-bold leading-6 tracking-[0.2px] text-muted">
          English Department
        </p>

        <div className="flex items-center gap-1 px-1 py-1 text-base font-bold leading-6 tracking-[0.1px]">
          <span className="text-soft-gray">$16.48</span>
          <span className="text-success">$6.48</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="size-4 rounded-full bg-primary" />
          <span className="size-4 rounded-full bg-success" />
          <span className="size-4 rounded-full bg-alert" />
          <span className="size-4 rounded-full bg-dark" />
        </div>
      </div>
    </article>
  );
};

export default ShopProductCard;
