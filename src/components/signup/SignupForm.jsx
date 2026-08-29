import { ChevronDown, LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../../api/apiClient";
import { fetchRoles } from "../../store/actions/clientActions";
import StoreFields from "./StoreFields";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    shouldUnregister: true,
  });

  const dispatch = useDispatch();

  const roles = useSelector((state) => state.client.roles);

  const history = useHistory();

  useEffect(() => {
    if (roles.length === 0) {
      dispatch(fetchRoles());
    }
  }, [dispatch, roles.length]);

  useEffect(() => {
    const customerRole = roles.find((role) => role.code === "customer");

    if (customerRole) {
      setValue("role_id", customerRole.id);
    }
  }, [roles, setValue]);

  const selectedRoleId = watch("role_id");

  const storeRole = roles.find((role) => role.code === "store");

  const isStore = selectedRoleId === storeRole?.id;

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      role_id: data.role_id,
    };

    if (data.role_id === storeRole?.id) {
      payload.store = {
        name: data.store.name,
        phone: data.store.phone,
        tax_no: data.store.tax_no,
        bank_account: data.store.bank_account,
      };
    }
    try {
      await apiClient.post("/signup", payload);

      toast.warn("You need to click link in email to activate your account!");
      history.goBack();
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Something went wrong. Please try again",
      );
    }
  };

  return (
    <section className="px-6 py-12 lg:py-16">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-md flex-col gap-6"
      >
        <h1 className="text-2xl font-bold leading-8 tracking-[0.1px] text-dark">
          Sign Up
        </h1>

        <div className="flex flex-col gap-2.5">
          <label
            htmlFor="name"
            className="text-sm font-bold leading-6 tracking-[0.2px] text-dark"
          >
            Name *
          </label>

          <input
            id="name"
            autoComplete="name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
            placeholder="Name"
            className="h-12 w-full rounded-md border border-border-light bg-light-gray px-5 text-sm leading-7 tracking-[0.2px] text-dark outline-none placeholder:text-muted focus:border-primary"
          />

          {errors.name && (
            <p className="text-xs leading-5 text-danger">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          <label
            htmlFor="email"
            className="text-sm font-bold leading-6 tracking-[0.2px] text-dark"
          >
            Email *
          </label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            placeholder="Email"
            className="h-12 w-full rounded-md border border-border-light bg-light-gray px-5 text-sm leading-7 tracking-[0.2px] text-dark outline-none placeholder:text-muted focus:border-primary"
          />

          {errors.email && (
            <p className="text-xs leading-5 text-danger">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          <label
            htmlFor="password"
            className="text-sm font-bold leading-6 tracking-[0.2px] text-dark"
          >
            Password *
          </label>

          <input
            id="password"
            type="password"
            autoComplete="new-password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                message:
                  "Password must include uppercase, lowercase, number and special character",
              },
            })}
            placeholder="Password"
            className="h-12 w-full rounded-md border border-border-light bg-light-gray px-5 text-sm leading-7 tracking-[0.2px] text-dark outline-none placeholder:text-muted focus:border-primary"
          />

          {errors.password && (
            <p className="text-xs leading-5 text-danger">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-bold leading-6 tracking-[0.2px] text-dark"
          >
            Confirm Password *
          </label>

          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            placeholder="Confirm Password"
            className="h-12 w-full rounded-md border border-border-light bg-light-gray px-5 text-sm leading-7 tracking-[0.2px] text-dark outline-none placeholder:text-muted focus:border-primary"
          />

          {errors.confirmPassword && (
            <p className="text-xs leading-5 text-danger">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          <label
            htmlFor="role"
            className="text-sm font-bold leading-6 tracking-[0.2px] text-dark"
          >
            Role *
          </label>

          <div className="relative">
            <select
              id="role"
              {...register("role_id", {
                required: "Role is required",
                valueAsNumber: true,
              })}
              className="h-12 w-full appearance-none rounded-md border border-border-light bg-light-gray px-5 pr-12 text-sm leading-7 tracking-[0.2px] text-muted outline-none focus:border-primary"
            >
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute top-1/2 right-5 -translate-y-1/2 text-muted"
            />
          </div>

          {errors.role_id && (
            <p className="text-xs leading-5 text-danger">
              {errors.role_id.message}
            </p>
          )}
        </div>

        {isStore && <StoreFields register={register} errors={errors} />}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex self-start items-center justify-center gap-2 rounded-md bg-primary px-10 py-4 text-sm font-bold leading-6 tracking-[0.2px] text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle size={18} className="animate-spin" />
              Signing Up...
            </>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </section>
  );
};

export default SignupForm;
