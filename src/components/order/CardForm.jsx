import { useEffect } from "react";
import { useForm } from "react-hook-form";

const EMPTY_CARD = {
  card_no: "",
  name_on_card: "",
  expire_month: "",
  expire_year: "",
};

const CardForm = ({
  card = null,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: 11 }, (_, index) => currentYear + index);
  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: EMPTY_CARD,
  });

  useEffect(() => {
    reset(
      card
        ? {
            card_no: String(card.card_no ?? ""),
            name_on_card: card.name_on_card ?? "",
            expire_month: card.expire_month ?? "",
            expire_year: card.expire_year ?? "",
          }
        : EMPTY_CARD,
    );
  }, [card, reset]);

  const handleFormSubmit = (data) => {
    onSubmit({
      card_no: data.card_no,
      name_on_card: data.name_on_card,
      expire_month: Number(data.expire_month),
      expire_year: Number(data.expire_year),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-5 rounded-lg border border-border-light bg-white p-5"
    >
      <h3 className="text-lg font-bold text-dark">
        {card ? "Edit Card" : "Add New Card"}
      </h3>

      <div className="flex flex-col gap-2">
        <label htmlFor="card_no" className="text-sm font-bold text-dark">
          Card Number
        </label>

        <input
          id="card_no"
          type="text"
          inputMode="numeric"
          maxLength={16}
          placeholder="1234 1234 1234 1234"
          {...register("card_no", {
            required: "Card number is required.",
            pattern: {
              value: /^\d{16}$/,
              message: "Card number must contain 16 digits.",
            },
          })}
          className="rounded-md border border-border-light px-3 py-2 text-sm text-dark outline-none focus:border-primary"
        />

        {errors.card_no && (
          <p className="text-xs text-danger">{errors.card_no.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="name_on_card" className="text-sm font-bold text-dark">
          Name on Card
        </label>

        <input
          id="name_on_card"
          type="text"
          {...register("name_on_card", {
            required: "Name on card is required.",
          })}
          className="rounded-md border border-border-light px-3 py-2 text-sm text-dark outline-none focus:border-primary"
        />

        {errors.name_on_card && (
          <p className="text-xs text-danger">{errors.name_on_card.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="expire_month" className="text-sm font-bold text-dark">
            Expire Month
          </label>

          <select
            id="expire_month"
            {...register("expire_month", {
              required: "Expire month is required.",
            })}
            className="cursor-pointer rounded-md border border-border-light bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary"
          >
            <option value="">Month</option>

            {months.map((month) => (
              <option key={month} value={month}>
                {String(month).padStart(2, "0")}
              </option>
            ))}
          </select>

          {errors.expire_month && (
            <p className="text-xs text-danger">{errors.expire_month.message}</p>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="expire_year" className="text-sm font-bold text-dark">
            Expire Year
          </label>

          <select
            id="expire_year"
            {...register("expire_year", {
              required: "Expire year is required.",
            })}
            className="cursor-pointer rounded-md border border-border-light bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary"
          >
            <option value="">Year</option>

            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {errors.expire_year && (
            <p className="text-xs text-danger">{errors.expire_year.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer rounded-md border border-border-light px-5 py-3 text-sm font-bold text-dark"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer rounded-md bg-primary px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : card ? "Update Card" : "Save Card"}
        </button>
      </div>
    </form>
  );
};

export default CardForm;
