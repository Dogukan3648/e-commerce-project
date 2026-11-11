const PaymentSecurityFields = ({
  cvv,
  onCvvChange,
  useThreeDSecure,
  onThreeDSecureChange,
}) => {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-base font-bold text-dark">Card Security</h3>

        <p className="mt-1 text-xs text-muted">
          Enter the security code for this payment.
        </p>
      </div>

      <div className="flex flex-col gap-2 lg:max-w-52">
        <label htmlFor="cvv" className="text-sm font-bold text-dark">
          CVV
        </label>

        <input
          id="cvv"
          type="password"
          inputMode="numeric"
          autoComplete="cc-csc"
          maxLength={4}
          value={cvv}
          onChange={onCvvChange}
          placeholder="CVV"
          className="rounded-md border border-border-light px-3 py-2 text-sm text-dark outline-none focus:border-primary"
        />

        <p className="text-xs text-muted">
          Your CVV is used only for this payment and is not stored.
        </p>
      </div>

      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={useThreeDSecure}
          onChange={(event) => onThreeDSecureChange(event.target.checked)}
          className="mt-0.5 size-4 shrink-0 cursor-pointer accent-primary"
        />

        <span>
          <span className="block text-sm font-bold text-dark">
            Pay with 3D Secure
          </span>

          <span className="mt-1 block text-xs leading-5 text-muted">
            Your bank may ask you to verify the payment before it is completed.
          </span>
        </span>
      </label>
    </div>
  );
};

export default PaymentSecurityFields;
