import { ChevronDown } from "lucide-react";
import { useState } from "react";

const PreviousOrderPanel = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="overflow-hidden rounded-lg border border-border-light bg-white">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left lg:px-5 lg:py-4"
      >
        <div className="flex min-w-0 flex-1 flex-col gap-1 lg:flex-row lg:items-center">
          <span className="text-sm font-bold text-dark lg:flex-1">
            Order #{order.id}
          </span>

          <span className="text-sm text-muted lg:w-52">
            {new Date(order.order_date).toLocaleDateString()}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-4 lg:gap-0">
          <span className="font-bold text-primary lg:w-32 lg:text-right">
            ${order.price.toFixed(2)}
          </span>

          <span className="flex w-10 justify-end">
            <ChevronDown
              size={18}
              className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="flex flex-col gap-5 border-t border-border-light p-4 lg:p-5">
          <div className="flex flex-col gap-1 text-sm">
            <span className="text-muted">Card</span>

            <span className="font-medium text-dark">
              **** **** **** {String(order.card_no).slice(-4)}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {order.products.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 rounded-lg border border-border-light p-3"
              >
                {product.images?.[0]?.url && (
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="h-20 w-16 shrink-0 rounded object-cover"
                  />
                )}

                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="font-bold text-dark">{product.name}</span>

                  <span className="text-sm text-muted">
                    Quantity: {product.count}
                  </span>

                  <span className="text-sm font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default PreviousOrderPanel;
