import React from "react";
import { Link } from "react-router-dom";
import { selectedWork } from "@/components/data";

const Work: React.FC = () => {
  return (
    <section
      id="work"
      className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-16 md:py-20"
    >
      <Link
        to="/"
        className="group inline-flex items-center gap-1.5 text-xs font-medium mb-6 text-slate-400 transition-colors hover:text-teal-400 sm:gap-2 sm:text-sm sm:mb-10"
      >
        <svg
          className="h-4 w-4 transition-transform group-hover:-translate-x-0.5 text-current"
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

      <header className="mb-8 max-w-2xl sm:mb-12">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-400 mb-2 sm:text-xs sm:mb-3">
          Work
        </p>
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-100 sm:text-3xl md:text-4xl">
          Professional Experience
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-400 sm:mt-3 sm:text-base">
          Key projects and contributions across cloud infrastructure, full-stack
          development.
        </p>
      </header>

      <ul className="space-y-3 sm:space-y-5">
        {selectedWork.map((item, idx) => (
          <li
            key={item.title}
            className="group relative rounded-xl border border-slate-700/40 bg-slate-800/40 p-4 backdrop-blur-sm transition-colors duration-300 hover:border-slate-600/60 hover:bg-slate-800/50 sm:rounded-2xl sm:p-7"
          >
            <div className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full bg-gradient-to-b from-teal-400 to-cyan-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:top-6 sm:bottom-6" />

            <article className="space-y-3 pl-1 sm:space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <h3 className="text-base font-semibold tracking-tight text-slate-200 transition-colors group-hover:text-teal-300 sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-400 sm:text-sm">
                    {item.summary}
                  </p>
                </div>
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-700/50 text-[10px] font-medium text-slate-400 transition-colors group-hover:bg-teal-900/30 group-hover:text-teal-400 sm:mt-1 sm:h-8 sm:w-8 sm:text-xs">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-700/40 px-2 py-0.5 text-[10px] font-medium text-slate-400 transition-colors group-hover:bg-teal-900/30 group-hover:text-teal-300 sm:px-3 sm:py-1 sm:text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Work;
