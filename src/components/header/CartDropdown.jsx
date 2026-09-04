import { Link } from "react-router-dom";

const CartDropdown = ({ cart }) => {
  const cartItemCount = cart.reduce((total, item) => total + item.count, 0);

  return (
    <div className="absolute top-full right-4 z-50 w-72 overflow-hidden rounded-lg border border-soft-gray bg-white shadow-lg lg:right-0 lg:w-80">
      <div className="px-4 py-4">
        <h3 className="text-sm font-bold text-dark">
          Cart ({cartItemCount} {cartItemCount === 1 ? "Item" : "Items"})
        </h3>
      </div>

      <div className="flex flex-col">
        {cart.map(({ product, count }) => {
          const imageUrl =
            product.images?.find((image) => image.index === 0)?.url ??
            product.images?.[0]?.url ??
            "";

          return (
            <div
              key={product.id}
              className="flex gap-3 border-t border-soft-gray px-4 py-4"
            >
              <img
                src={imageUrl}
                alt={product.name}
                className="h-20 w-16 shrink-0 object-cover"
              />

              <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-sm font-bold leading-5 text-dark">
                  {product.name}
                </p>
                <span className="mt-1 text-xs text-muted">
                  Quantity: {count}
                </span>

                <span className="mt-1 text-sm font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3 border-t border-soft-gray p-4">
        <Link
          to={"/cart"}
          className="flex flex-1 cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border-primary bg-white px-3 py-2.5 text-sm font-bold text-primary"
        >
          Go to Cart
        </Link>

        <button
          type="button"
          className="flex flex-1 cursor-pointer items-center justify-center whitespace-nowrap rounded-md bg-primary px-3 py-2.5 text-sm font-bold text-white"
        >
          Complete Order
        </button>
      </div>
    </div>
  );
};

export default CartDropdown;
