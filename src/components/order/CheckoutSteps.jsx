const CheckoutSteps = ({ currentStep }) => {
  const isAddressStep = currentStep === 1;
  const isPaymentStep = currentStep === 2;

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border-light bg-white lg:flex-row">
      <div
        className={`flex flex-1 items-center gap-4 border-b-2 p-4 ${
          isAddressStep ? "border-primary" : "border-border-light"
        }`}
      >
        <span
          className={`text-2xl font-bold ${
            isAddressStep ? "text-primary" : "text-muted"
          }`}
        >
          1
        </span>

        <div>
          <p
            className={`text-base font-bold ${
              isAddressStep ? "text-dark" : "text-muted"
            }`}
          >
            Address Information
          </p>

          <p className="mt-1 text-xs text-muted">
            Choose your shipping and receipt address
          </p>
        </div>
      </div>

      <div
        className={`flex flex-1 items-center gap-4 border-b-2 p-4 ${
          isPaymentStep ? "border-primary" : "border-transparent"
        }`}
      >
        <span
          className={`text-2xl font-bold ${
            isPaymentStep ? "text-primary" : "text-muted"
          }`}
        >
          2
        </span>

        <div>
          <p
            className={`text-base font-bold ${
              isPaymentStep ? "text-dark" : "text-muted"
            }`}
          >
            Payment Options
          </p>

          <p className="mt-1 text-xs text-muted">
            Complete your payment information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
