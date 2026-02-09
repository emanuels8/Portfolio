import React from "react";
import { Link } from "react-router-dom";
import { selectedWork } from "@/components/data";

const Work: React.FC = () => {
  return (
    <section id="work" className="mx-auto w-full max-w-4xl px-6 py-20">
      <Link
        to="/"
        className="group inline-flex items-center gap-2 text-sm font-medium mb-10 text-slate-400 transition-colors hover:text-teal-400"
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

      <header className="mb-12 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-400 mb-3">
          Work
        </p>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl">
          Professional Experience
        </h2>
        <p className="mt-3 text-base leading-relaxed text-slate-400">
          Key projects and contributions across cloud infrastructure, full-stack
          development.
        </p>
      </header>

      <ul className="space-y-5">
        {selectedWork.map((item, idx) => (
          <li
            key={item.title}
            className="group relative rounded-2xl border border-slate-700/40 bg-slate-800/40 p-7 backdrop-blur-sm transition-colors duration-300 hover:border-slate-600/60 hover:bg-slate-800/50"
          >
            <div className="absolute left-0 top-6 bottom-6 w-0.5 rounded-full bg-gradient-to-b from-teal-400 to-cyan-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <article className="space-y-4 pl-1">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <h3 className="text-lg font-semibold tracking-tight text-slate-200 transition-colors group-hover:text-teal-300">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {item.summary}
                  </p>
                </div>
                <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700/50 text-xs font-medium text-slate-400 transition-colors group-hover:bg-teal-900/30 group-hover:text-teal-400">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-700/40 px-3 py-1 text-xs font-medium text-slate-400 transition-colors group-hover:bg-teal-900/30 group-hover:text-teal-300"
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
