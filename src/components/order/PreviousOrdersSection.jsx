import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchOrders } from "../../store/actions/orderActions";
import PreviousOrderPanel from "./PreviousOrderPanel";

const PreviousOrdersSection = () => {
  const dispatch = useDispatch();

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await dispatch(fetchOrders());
        setOrders(data);
      } catch {
        setError("Orders could not be loaded.");
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, [dispatch]);

  return (
    <section className="bg-light-gray py-8 lg:py-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 lg:px-8">
        <div>
          <h1 className="text-2xl font-bold text-dark lg:text-3xl">
            Previous Orders
          </h1>

          <p className="mt-2 text-sm text-muted">
            View your previous orders and order details.
          </p>
        </div>

        {isLoading && <p className="text-sm text-muted">Loading orders...</p>}

        {!isLoading && error && <p className="text-sm text-danger">{error}</p>}

        {!isLoading && !error && orders.length === 0 && (
          <div className="rounded-lg border border-border-light bg-white p-6 text-center">
            <p className="text-sm text-muted">
              You do not have any previous orders yet.
            </p>
          </div>
        )}

        {!isLoading && !error && orders.length > 0 && (
          <div className="flex flex-col">
            <div className="hidden border-b border-border-light px-5 py-3 text-sm font-bold text-muted lg:flex">
              <span className="flex-1">Order</span>
              <span className="w-52">Date</span>
              <span className="w-32 text-right">Total</span>
              <span className="w-10" />
            </div>

            <div className="flex flex-col gap-4 lg:gap-0">
              {orders.map((order) => (
                <PreviousOrderPanel key={order.id} order={order} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PreviousOrdersSection;
