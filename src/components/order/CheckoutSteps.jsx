const CheckoutSteps = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border-light bg-white lg:flex-row">
      <div className="flex flex-1 items-center gap-4 border-b-2 border-primary p-4 lg:border-b-2">
        <span className="text-2xl font-bold text-primary">1</span>

        <div>
          <p className="text-base font-bold text-dark">Address Information</p>

          <p className="mt-1 text-xs text-muted">
            Choose your shipping and receipt address
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center gap-4 p-4">
        <span className="text-2xl font-bold text-muted">2</span>

        <div>
          <p className="text-base font-bold text-muted">Payment Options</p>

          <p className="mt-1 text-xs text-muted">
            Complete your payment information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
