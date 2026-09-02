import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LayoutGrid, List } from "lucide-react";
import { setFilter, setSort } from "../../store/actions/productActions";

const ShopFilterBar = () => {
  const dispatch = useDispatch();
  const { filter, sort, total } = useSelector((state) => state.product);

  const [selectedSort, setSelectedSort] = useState(sort);

  const handleFilter = () => {
    dispatch(setSort(selectedSort));
  };

  return (
    <section className="bg-white py-6">
      <div className="mx-auto flex w-full flex-col items-center gap-6 lg:max-w-263 lg:flex-row lg:justify-between lg:gap-0">
        <p className="text-sm font-bold leading-6 tracking-[0.2px] text-muted">
          Showing all {total} results
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

        <div className="flex flex-wrap items-center justify-center gap-3 lg:flex-nowrap">
          <input
            type="text"
            value={filter}
            onChange={(event) => dispatch(setFilter(event.target.value))}
            placeholder="Search Products"
            className="h-12.5 w-52 rounded-md border border-[#ddd] bg-[#f9f9f9] px-4 text-sm text-muted outline-none transition-colors focus:border-primary lg:w-60"
          />

          <select
            value={selectedSort}
            onChange={(event) => setSelectedSort(event.target.value)}
            className="h-12.5 w-44 rounded-md border border-[#ddd] bg-[#f9f9f9] px-4 text-sm leading-7 tracking-[0.2px] text-muted outline-none focus:border-primary"
          >
            <option value="">Popularity</option>
            <option value="price:asc">Price: Low to High</option>
            <option value="price:desc">Price: High to Low</option>
            <option value="rating:asc">Rating: Low to High</option>
            <option value="rating:desc">Rating: High to Low</option>
          </select>

          <button
            onClick={handleFilter}
            className="flex h-12.5 w-20 items-center justify-center rounded-md bg-primary text-sm font-bold leading-6 tracking-[0.2px] text-white"
          >
            Filter
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShopFilterBar;
