const StoreFields = ({ register, errors }) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-lg font-bold leading-6 tracking-[0.1px] text-dark">
        Store Information
      </h2>

      <div className="flex flex-col gap-2.5">
        <label
          htmlFor="storeName"
          className="text-sm font-bold leading-6 tracking-[0.2px] text-dark"
        >
          Store Name *
        </label>

        <input
          id="storeName"
          autoComplete="organization"
          {...register("store.name", {
            required: "Store name is required",
            minLength: {
              value: 3,
              message: "Store name must be at least 3 characters",
            },
          })}
          placeholder="Store Name"
          className="h-12 w-full rounded-md border border-border-light bg-light-gray px-5 text-sm leading-7 tracking-[0.2px] text-dark outline-none placeholder:text-muted focus:border-primary"
        />

        {errors.store?.name && (
          <p className="text-xs leading-5 text-danger">
            {errors.store.name.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        <label
          htmlFor="storePhone"
          className="text-sm font-bold leading-6 tracking-[0.2px] text-dark"
        >
          Store Phone *
        </label>

        <input
          id="storePhone"
          type="tel"
          autoComplete="tel"
          {...register("store.phone", {
            required: "Store phone is required",
            pattern: {
              value: /^(?:\+90|0)?5\d{9}$/,
              message: "Enter a valid Turkish phone number",
            },
          })}
          placeholder="Store Phone"
          className="h-12 w-full rounded-md border border-border-light bg-light-gray px-5 text-sm leading-7 tracking-[0.2px] text-dark outline-none placeholder:text-muted focus:border-primary"
        />

        {errors.store?.phone && (
          <p className="text-xs leading-5 text-danger">
            {errors.store.phone.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        <label
          htmlFor="storeTaxId"
          className="text-sm font-bold leading-6 tracking-[0.2px] text-dark"
        >
          Store Tax ID *
        </label>

        <input
          id="storeTaxId"
          {...register("store.tax_no", {
            required: "Store tax ID is required",
            pattern: {
              value: /^T\d{4}V\d{6}$/,
              message: "Tax ID must match TXXXXVXXXXXX format",
            },
          })}
          placeholder="TXXXXVXXXXXX"
          className="h-12 w-full rounded-md border border-border-light bg-light-gray px-5 text-sm leading-7 tracking-[0.2px] text-dark outline-none placeholder:text-muted focus:border-primary"
        />

        {errors.store?.tax_no && (
          <p className="text-xs leading-5 text-danger">
            {errors.store.tax_no.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        <label
          htmlFor="storeBankAccount"
          className="text-sm font-bold leading-6 tracking-[0.2px] text-dark"
        >
          Store Bank Account *
        </label>

        <input
          id="storeBankAccount"
          {...register("store.bank_account", {
            required: "Store bank account is required",
            pattern: {
              value: /^TR\d{24}$/,
              message: "Enter a valid Turkish IBAN",
            },
          })}
          placeholder="TR000000000000000000000000"
          className="h-12 w-full rounded-md border border-border-light bg-light-gray px-5 text-sm leading-7 tracking-[0.2px] text-dark outline-none placeholder:text-muted focus:border-primary"
        />

        {errors.store?.bank_account && (
          <p className="text-xs leading-5 text-danger">
            {errors.store.bank_account.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default StoreFields;
