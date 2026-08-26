const ShopPagination = () => {
  return (
    <div className="flex h-[74px] w-[313px] overflow-hidden rounded-md border border-soft-gray shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
      <button
        type="button"
        className="flex items-center justify-center border-r border-soft-gray bg-[#f3f3f3] p-6 text-sm font-bold leading-6 tracking-[0.2px] text-soft-gray"
      >
        First
      </button>

      <button
        type="button"
        className="flex items-center justify-center border-r border-[#e9e9e9] bg-white px-5 py-6 text-sm font-bold leading-6 tracking-[0.2px] text-primary"
      >
        1
      </button>

      <button
        type="button"
        className="flex items-center justify-center border-r border-[#e9e9e9] bg-primary px-5 py-6 text-sm font-bold leading-6 tracking-[0.2px] text-white"
      >
        2
      </button>

      <button
        type="button"
        className="flex items-center justify-center border-r border-[#e9e9e9] bg-white px-5 py-6 text-sm font-bold leading-6 tracking-[0.2px] text-primary"
      >
        3
      </button>

      <button
        type="button"
        className="flex items-center justify-center bg-white p-6 text-sm font-bold leading-6 tracking-[0.2px] text-primary"
      >
        Next
      </button>
    </div>
  );
};

export default ShopPagination;
