import { useDispatch, useSelector } from "react-redux";
import { setOffset } from "../../store/actions/productActions";

const ShopPagination = () => {
  const dispatch = useDispatch();

  const { total, limit, offset } = useSelector((state) => state.product);

  const currentPage = Math.floor(offset / limit) + 1;

  const totalPage = Math.ceil(total / limit);

  const startPage = Math.max(1, Math.min(currentPage - 1, totalPage - 2));
  const endPage = Math.min(totalPage, startPage + 2);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  const handlePageChange = (page) => {
    dispatch(setOffset((page - 1) * limit));
  };

  return (
    <div className="flex h-[74px] w-fit overflow-hidden rounded-md border border-soft-gray shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
      <button
        type="button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center border-r border-soft-gray bg-[#f3f3f3] p-6 text-sm font-bold leading-6 tracking-[0.2px] text-soft-gray cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => handlePageChange(page)}
          className={`flex items-center justify-center border-r border-[#e9e9e9] px-5 py-6 text-sm font-bold leading-6 tracking-[0.2px] cursor-pointer ${
            currentPage === page
              ? "bg-primary text-white"
              : "bg-white text-primary"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPage}
        className="flex items-center justify-center bg-white p-6 text-sm font-bold leading-6 tracking-[0.2px] text-primary cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default ShopPagination;
