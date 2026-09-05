import { useEffect } from "react";
import { useForm } from "react-hook-form";
import cities from "../../data/address/cities";

const EMPTY_ADDRESS = {
  title: "",
  name: "",
  surname: "",
  phone: "",
  city: "",
  district: "",
  neighborhood: "",
};

const AddressForm = ({
  address = null,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: EMPTY_ADDRESS,
  });

  useEffect(() => {
    reset(
      address
        ? {
            title: address.title ?? "",
            name: address.name ?? "",
            surname: address.surname ?? "",
            phone: address.phone ?? "",
            city: address.city?.toLocaleLowerCase("tr-TR") ?? "",
            district: address.district ?? "",
            neighborhood: address.neighborhood ?? "",
          }
        : EMPTY_ADDRESS,
    );
  }, [address, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 rounded-lg border border-border-light bg-white p-5"
    >
      <h3 className="text-lg font-bold text-dark">
        {address ? "Edit Address" : "Add Address"}
      </h3>

      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-sm font-bold text-dark">
          Address Title
        </label>

        <input
          id="title"
          type="text"
          {...register("title", {
            required: "Address title is required.",
          })}
          className="rounded-md border border-border-light px-3 py-2 text-sm text-dark outline-none focus:border-primary"
        />

        {errors.title && (
          <p className="text-xs text-danger">{errors.title.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="name" className="text-sm font-bold text-dark">
            Name
          </label>

          <input
            id="name"
            type="text"
            {...register("name", {
              required: "Name is required.",
            })}
            className="rounded-md border border-border-light px-3 py-2 text-sm text-dark outline-none focus:border-primary"
          />

          {errors.name && (
            <p className="text-xs text-danger">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="surname" className="text-sm font-bold text-dark">
            Surname
          </label>

          <input
            id="surname"
            type="text"
            {...register("surname", {
              required: "Surname is required.",
            })}
            className="rounded-md border border-border-light px-3 py-2 text-sm text-dark outline-none focus:border-primary"
          />

          {errors.surname && (
            <p className="text-xs text-danger">{errors.surname.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="text-sm font-bold text-dark">
          Phone
        </label>

        <input
          id="phone"
          type="tel"
          {...register("phone", {
            required: "Phone is required.",
          })}
          className="rounded-md border border-border-light px-3 py-2 text-sm text-dark outline-none focus:border-primary"
        />

        {errors.phone && (
          <p className="text-xs text-danger">{errors.phone.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="city" className="text-sm font-bold text-dark">
            City
          </label>

          <select
            id="city"
            {...register("city", {
              required: "City is required.",
            })}
            className="cursor-pointer rounded-md border border-border-light bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary"
          >
            <option value="">Select city</option>

            {cities.map((city) => (
              <option key={city} value={city.toLocaleLowerCase("tr-TR")}>
                {city}
              </option>
            ))}
          </select>

          {errors.city && (
            <p className="text-xs text-danger">{errors.city.message}</p>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="district" className="text-sm font-bold text-dark">
            District
          </label>

          <input
            id="district"
            type="text"
            {...register("district", {
              required: "District is required.",
            })}
            className="rounded-md border border-border-light px-3 py-2 text-sm text-dark outline-none focus:border-primary"
          />

          {errors.district && (
            <p className="text-xs text-danger">{errors.district.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="neighborhood" className="text-sm font-bold text-dark">
          Neighborhood
        </label>

        <input
          id="neighborhood"
          type="text"
          {...register("neighborhood", {
            required: "Neighborhood is required.",
          })}
          className="rounded-md border border-border-light px-3 py-2 text-sm text-dark outline-none focus:border-primary"
        />

        {errors.neighborhood && (
          <p className="text-xs text-danger">{errors.neighborhood.message}</p>
        )}
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
          {isSubmitting
            ? "Saving..."
            : address
              ? "Update Address"
              : "Save Address"}
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
