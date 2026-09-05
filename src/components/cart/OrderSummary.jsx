import { Link } from "react-router-dom";

const OrderSummary = ({
  productsTotal = 0,
  shippingPayment = 0,
  discount = 0,
  grandTotal = 0,
  actionLabel = "Create Order",
  actionTo = "/create-order",
  onAction,
  actionDisabled = false,
}) => {
  const actionClassName =
    "mt-6 flex w-full items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-bold text-white";

  return (
    <aside className="w-full rounded-lg border border-border-light bg-white p-5 lg:w-80 lg:shrink-0">
      <h2 className="text-lg font-bold text-dark">Order Summary</h2>

      <div className="mt-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">Products Total</span>
          <span className="text-sm font-bold text-dark">
            ${productsTotal.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">Shipping</span>
          <span className="text-sm font-bold text-dark">
            ${shippingPayment.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">Discount</span>
          <span className="text-sm font-bold text-success">
            {discount > 0 ? `-$${discount.toFixed(2)}` : "$0.00"}
          </span>
        </div>

        <div className="my-5 border-t border-border-light" />

        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-dark">Grand Total</span>
          <span className="text-xl font-bold text-primary">
            ${grandTotal.toFixed(2)}
          </span>
        </div>

        {onAction ? (
          <button
            type="button"
            onClick={onAction}
            disabled={actionDisabled}
            className={`${actionClassName} ${
              actionDisabled
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }`}
          >
            {actionLabel}
          </button>
        ) : (
          <Link to={actionTo} className={`${actionClassName} cursor-pointer`}>
            {actionLabel}
          </Link>
        )}
      </div>
    </aside>
  );
};

export default OrderSummary;
