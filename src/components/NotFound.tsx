import type { FC } from "react";
import { Link } from "react-router-dom";

const NotFound: FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0c1220] px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-400">
        404
      </p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl md:text-5xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400 sm:mt-4 sm:max-w-md sm:text-base">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal-500 px-5 py-2.5 text-xs font-semibold text-slate-950 shadow-lg shadow-teal-500/20 transition-all duration-300 hover:bg-teal-400 hover:shadow-xl hover:shadow-teal-400/25 hover:-translate-y-0.5 sm:mt-8 sm:px-7 sm:py-3 sm:text-sm"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 17l-5-5m0 0l5-5m-5 5h12"
          />
        </svg>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
