const InstallmentOptions = ({ total = 0 }) => {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <h3 className="text-base font-bold text-dark">Installment Options</h3>

        <p className="mt-1 text-xs text-muted">
          Available payment option for the selected card.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-border-light">
        <div className="flex items-center justify-between border-b border-border-light bg-light-gray px-4 py-3">
          <span className="text-xs font-bold text-muted">Payment Type</span>
          <span className="text-xs font-bold text-muted">Total</span>
        </div>

        <label className="flex cursor-pointer items-center justify-between gap-4 px-4 py-4">
          <span className="flex items-center gap-3">
            <input
              type="radio"
              name="installment"
              checked
              readOnly
              className="size-4 cursor-pointer accent-primary"
            />

            <span className="text-sm font-bold text-dark">Single Payment</span>
          </span>

          <span className="text-sm font-bold text-primary">
            ${total.toFixed(2)}
          </span>
        </label>
      </div>
    </div>
  );
};

export default InstallmentOptions;
