import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const ShoppingCartSection = () => {
  const cart = useSelector((state) => state.shoppingCart.cart);

  const selectedItems = cart.filter((item) => item.checked);

  const totalPrice = selectedItems.reduce(
    (total, item) => total + item.product.price * item.count,
    0,
  );

  return (
    <section className="bg-white px-2 py-8 sm:px-4 lg:px-10 lg:py-12">
      <div className="mx-auto flex w-full max-w-none flex-col lg:max-w-5xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-dark">
            Shopping Cart ({cart.length}{" "}
            {cart.length === 1 ? "Product" : "Products"})
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="flex min-h-60 items-center justify-center rounded-lg border border-soft-gray bg-white">
            <p className="text-sm font-bold text-muted">
              Your shopping cart is empty.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-2 hidden items-center px-4 text-xs font-bold text-muted lg:flex">
              <span className="flex-1">Product</span>

              <div className="flex shrink-0 items-center gap-5">
                <span className="w-28 text-center">Quantity</span>
                <span className="w-24 text-right">Total</span>
                <span className="w-9" />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {cart.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between rounded-lg border border-soft-gray bg-white px-4 py-5 lg:px-6">
              <div>
                <p className="text-base font-bold text-dark">Total Payment</p>

                <p className="mt-1 text-xs text-muted">
                  Selected products only
                </p>
              </div>

              <p className="text-xl font-bold text-primary lg:text-2xl">
                ${totalPrice.toFixed(2)}
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ShoppingCartSection;
