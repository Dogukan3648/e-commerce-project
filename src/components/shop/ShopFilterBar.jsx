import { ChevronDown, LayoutGrid, List } from "lucide-react";

const ShopFilterBar = () => {
  return (
    <section className="bg-white py-6">
      <div className="mx-auto flex w-full flex-col items-center gap-6 lg:max-w-263 lg:flex-row lg:justify-between lg:gap-0">
        <p className="text-sm font-bold leading-6 tracking-[0.2px] text-muted">
          Showing all 12 results
        </p>

        <div className="flex items-center gap-4">
          <span className="text-sm font-bold leading-6 tracking-[0.2px] text-muted">
            Views:
          </span>

          <div className="flex items-center gap-4">
            <button className="flex size-11.5 items-center justify-center rounded-md border border-border-light text-dark">
              <LayoutGrid size={16} className="fill-dark text-dark" />
            </button>

            <button className="flex size-11.5 items-center justify-center rounded-md border border-border-light text-muted">
              <List size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex h-12.5 w-35 items-center justify-between rounded-md border border-[#ddd] bg-[#f9f9f9] pl-4 pr-7 text-sm leading-7 tracking-[0.2px] text-muted">
            Popularity
            <ChevronDown size={14} />
          </button>

          <button className="flex h-12.5 w-23.5 items-center justify-center rounded-md bg-primary text-sm font-bold leading-6 tracking-[0.2px] text-white">
            Filter
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShopFilterBar;
