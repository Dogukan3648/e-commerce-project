import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddressList } from "../../store/actions/clientActions";
import { setAddress } from "../../store/actions/shoppingCartActions";
import OrderSummary from "../cart/OrderSummary";
import AddressStep from "./AddressStep";
import CheckoutSteps from "./CheckoutSteps";

const CreateOrderSection = () => {
  const dispatch = useDispatch();

  const addressList = useSelector((state) => state.client.addressList);
  const cart = useSelector((state) => state.shoppingCart.cart);

  const [selectedShippingAddressId, setSelectedShippingAddressId] =
    useState(null);

  const [selectedReceiptAddressId, setSelectedReceiptAddressId] =
    useState(null);

  const [sameAsShipping, setSameAsShipping] = useState(true);

  useEffect(() => {
    dispatch(fetchAddressList());
  }, [dispatch]);

  const selectedItems = cart.filter((item) => item.checked);

  const productsTotal = selectedItems.reduce(
    (total, item) => total + item.product.price * item.count,
    0,
  );

  const shippingPayment = 0;
  const discount = 0;
  const grandTotal = productsTotal + shippingPayment - discount;

  const canSaveAddress =
    selectedShippingAddressId !== null &&
    (sameAsShipping || selectedReceiptAddressId !== null);

  const handleSaveAddress = () => {
    const shippingAddress = addressList.find(
      (address) => address.id === selectedShippingAddressId,
    );

    const receiptAddress = sameAsShipping
      ? shippingAddress
      : addressList.find((address) => address.id === selectedReceiptAddressId);

    if (!shippingAddress || !receiptAddress) {
      return;
    }

    dispatch(
      setAddress({
        shipping: shippingAddress,
        receipt: receiptAddress,
      }),
    );
  };

  return (
    <section className="bg-light-gray py-6 lg:py-10">
      <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <CheckoutSteps />

            <div className="flex items-start gap-3 rounded-lg border border-border-light bg-white p-4">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                i
              </span>

              <p className="text-sm leading-5 text-muted">
                Select your shipping address. You can use the same address for
                receipt information or choose a different one.
              </p>
            </div>

            <div className="rounded-lg border border-border-light bg-white p-4 lg:p-6">
              <AddressStep
                addressList={addressList}
                selectedShippingAddressId={selectedShippingAddressId}
                setSelectedShippingAddressId={setSelectedShippingAddressId}
                selectedReceiptAddressId={selectedReceiptAddressId}
                setSelectedReceiptAddressId={setSelectedReceiptAddressId}
                sameAsShipping={sameAsShipping}
                setSameAsShipping={setSameAsShipping}
              />
            </div>
          </div>

          <OrderSummary
            productsTotal={productsTotal}
            shippingPayment={shippingPayment}
            discount={discount}
            grandTotal={grandTotal}
            actionLabel="Save Address"
            onAction={handleSaveAddress}
            actionDisabled={!canSaveAddress}
          />
        </div>
      </div>
    </section>
  );
};

export default CreateOrderSection;
