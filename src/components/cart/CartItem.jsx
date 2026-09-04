import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  decreaseCartItem,
  increaseCartItem,
  removeFromCart,
  toggleCartItem,
} from "../../store/actions/shoppingCartActions";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const { product, count, checked } = item;

  const imageUrl =
    product.images?.find((image) => image.index === 0)?.url ??
    product.images?.[0]?.url ??
    "";

  const itemTotal = product.price * count;

  return (
    <div className="w-full rounded-lg border border-soft-gray bg-white">
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex min-w-0 items-start gap-3 p-5 lg:flex-1 lg:items-center lg:p-4">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => dispatch(toggleCartItem(product.id))}
            className="mt-1 size-5 shrink-0 cursor-pointer accent-primary lg:mt-0"
          />

          <div className="flex h-28 w-24 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#FAFAFA] lg:h-20 lg:w-16">
            <img
              src={imageUrl}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold leading-5 text-dark lg:text-base">
              {product.name}
            </p>

            <p className="mt-1 text-xs text-muted">
              ${product.price.toFixed(2)} each
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-soft-gray px-5 py-4 lg:shrink-0 lg:justify-start lg:gap-5 lg:border-t-0 lg:px-4 lg:py-0">
          <div className="flex w-28 shrink-0 items-center">
            <button
              type="button"
              aria-label="Decrease quantity"
              disabled={count === 1}
              onClick={() => dispatch(decreaseCartItem(product.id))}
              className="flex size-9 cursor-pointer items-center justify-center rounded-l-md border border-soft-gray text-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Minus size={15} />
            </button>

            <span className="flex h-9 min-w-10 items-center justify-center border-y border-soft-gray px-2 text-sm font-bold text-dark">
              {count}
            </span>

            <button
              type="button"
              aria-label="Increase quantity"
              disabled={count >= product.stock}
              onClick={() => dispatch(increaseCartItem(product.id))}
              className="flex size-9 cursor-pointer items-center justify-center rounded-r-md border border-soft-gray text-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus size={15} />
            </button>
          </div>

          <p className="min-w-20 text-right text-base font-bold text-primary lg:w-24">
            ${itemTotal.toFixed(2)}
          </p>

          <button
            type="button"
            aria-label="Remove product from cart"
            onClick={() => dispatch(removeFromCart(product.id))}
            className="flex size-9 shrink-0 cursor-pointer items-center justify-center text-muted hover:text-danger"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
