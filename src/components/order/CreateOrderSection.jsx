import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchAddressList } from "../../store/actions/clientActions";
import { createOrder } from "../../store/actions/orderActions";
import {
  setAddress,
  setCart,
  setPayment,
} from "../../store/actions/shoppingCartActions";
import OrderSummary from "../cart/OrderSummary";
import AddressStep from "./AddressStep";
import CheckoutSteps from "./CheckoutSteps";
import PaymentStep from "./PaymentStep";

const CreateOrderSection = () => {
  const dispatch = useDispatch();

  const addressList = useSelector((state) => state.client.addressList);
  const cart = useSelector((state) => state.shoppingCart.cart);
  const creditCards = useSelector((state) => state.client.creditCards);

  const [cvv, setCvv] = useState("");

  const [isOrdering, setIsOrdering] = useState(false);

  const [selectedShippingAddressId, setSelectedShippingAddressId] =
    useState(null);

  const [isPaymentReady, setIsPaymentReady] = useState(false);

  const [selectedReceiptAddressId, setSelectedReceiptAddressId] =
    useState(null);

  const [selectedCardId, setSelectedCardId] = useState(null);

  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    dispatch(fetchAddressList());
  }, [dispatch]);

  const selectedItems = cart.filter((item) => item.checked);
  const hasSelectedItems = selectedItems.length > 0;

  const productsTotal = selectedItems.reduce(
    (total, item) => total + item.product.price * item.count,
    0,
  );

  const shippingPayment = 0;
  const discount = 0;
  const grandTotal = productsTotal + shippingPayment - discount;

  const canSaveAddress =
    hasSelectedItems &&
    selectedShippingAddressId !== null &&
    (sameAsShipping || selectedReceiptAddressId !== null);

  const handleSaveAddress = () => {
    if (!hasSelectedItems) {
      return;
    }

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

    setCurrentStep(2);
  };

  const handleSavePayment = async () => {
    const selectedCard = creditCards.find((card) => card.id === selectedCardId);

    if (!selectedCard || !isPaymentReady || !hasSelectedItems || isOrdering) {
      return;
    }
    const orderData = {
      address_id: selectedShippingAddressId,
      order_date: new Date().toISOString().slice(0, 19),
      card_no: selectedCard.card_no,
      card_name: selectedCard.name_on_card,
      card_expire_month: selectedCard.expire_month,
      card_expire_year: selectedCard.expire_year,
      card_ccv: Number(cvv),
      price: Number(grandTotal.toFixed(2)),
      products: selectedItems.map((item) => ({
        product_id: item.product.id,
        count: item.count,
        detail: "",
      })),
    };

    setIsOrdering(true);

    try {
      dispatch(
        setPayment({
          cardId: selectedCard.id,
          installment: 1,
        }),
      );
      await dispatch(createOrder(orderData));

      dispatch(setCart([]));
      dispatch(setAddress({}));
      dispatch(setPayment({}));

      setSelectedShippingAddressId(null);
      setSelectedReceiptAddressId(null);
      setSelectedCardId(null);
      setSameAsShipping(true);
      setCvv("");
      setIsPaymentReady(false);
      setCurrentStep(1);

      toast.success("Your order has been created successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Order could not be created. Please try again.",
      );
    } finally {
      setIsOrdering(false);
    }
  };

  const handleAddressChange = () => {
    setIsPaymentReady(false);
    setCurrentStep(1);
  };

  return (
    <section className="bg-light-gray py-6 lg:py-10">
      <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <CheckoutSteps
              currentStep={currentStep}
              onAddressChange={handleAddressChange}
            />

            {currentStep === 1 ? (
              <>
                <div className="flex items-start gap-3 rounded-lg border border-border-light bg-white p-4">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    i
                  </span>

                  <p className="text-sm leading-5 text-muted">
                    Select your shipping address. You can use the same address
                    for receipt information or choose a different one.
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
              </>
            ) : (
              <div className="rounded-lg border border-border-light bg-white p-4 lg:p-6">
                <PaymentStep
                  selectedCardId={selectedCardId}
                  setSelectedCardId={setSelectedCardId}
                  grandTotal={grandTotal}
                  onPaymentReadyChange={setIsPaymentReady}
                  cvv={cvv}
                  setCvv={setCvv}
                />
              </div>
            )}
          </div>

          <OrderSummary
            productsTotal={productsTotal}
            shippingPayment={shippingPayment}
            discount={discount}
            grandTotal={grandTotal}
            actionLabel={
              currentStep === 1
                ? "Save Address"
                : isOrdering
                  ? "Processing..."
                  : "Pay"
            }
            onAction={currentStep === 1 ? handleSaveAddress : handleSavePayment}
            actionDisabled={
              currentStep === 1
                ? !canSaveAddress
                : !isPaymentReady || !hasSelectedItems || isOrdering
            }
          />
        </div>
      </div>
    </section>
  );
};

export default CreateOrderSection;
