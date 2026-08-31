import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../store/actions/clientActions";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const onSubmit = async (data) => {
    try {
      await dispatch(loginUser(data));

      const from = location.state?.from || "/";

      history.replace(from);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    }
  };

  return (
    <section className="px-6 py-12 lg:py-16">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mx-auto flex w-full max-w-md flex-col gap-6"
      >
        <h1 className="text-2xl font-bold leading-8 tracking-[0.1px] text-dark">
          Login
        </h1>

        <div className="flex flex-col gap-2.5">
          <label
            htmlFor="email"
            className="text-sm font-bold leading-6 tracking-[0.2px] text-dark"
          >
            Email *
          </label>

          <input
            type="email"
            id="email"
            autoComplete="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
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
            Password
          </label>

          <input
            type="password"
            id="password"
            autoComplete="current-password"
            placeholder="Password"
            {...register("password")}
            className="h-12 w-full rounded-md border border-border-light bg-light-gray px-5 text-sm leading-7 tracking-[0.2px] text-dark outline-none placeholder:text-muted focus:border-primary"
          />
        </div>

        <label className="flex w-fit cursor-pointer items-center gap-2 text-sm leading-6 text-muted">
          <input
            type="checkbox"
            {...register("rememberMe")}
            className="h-4 w-4 accent-primary"
          />
          Remember me
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex self-start items-center justify-center gap-2 rounded-md bg-primary px-10 py-4 text-sm font-bold leading-6 tracking-[0.2px] text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle size={18} className="animate-spin" />
              Logging In...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </section>
  );
};

export default LoginForm;
