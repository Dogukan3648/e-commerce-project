import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-light-gray px-4 py-16">
      <div className="flex max-w-xl flex-col items-center text-center">
        <p className="text-7xl font-bold leading-none text-primary lg:text-8xl">
          404
        </p>

        <h1 className="mt-5 text-3xl font-bold text-dark lg:text-4xl">
          Page Not Found
        </h1>

        <p className="mt-4 text-sm leading-6 text-muted">
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link
          to="/"
          className="mt-8 flex h-12 cursor-pointer items-center justify-center rounded-md bg-primary px-6 text-sm font-bold text-white transition hover:opacity-90"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
