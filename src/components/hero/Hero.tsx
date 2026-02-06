import { Suspense, useState, useEffect, lazy } from "react";
import type { FC } from "react";
import { downloadResume } from "@/lib/downloadResume";
import { leftKeywords, rightKeywords } from "./SceneKeywords";

const ScenePanel = lazy(() => import("./Scene"));

const FullPageLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-slate-200 border-t-teal-500" />
      <p className="text-xs font-medium tracking-widest uppercase text-slate-400">
        Loading
      </p>
    </div>
  </div>
);

const Hero: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <FullPageLoader />}
      <section className="relative mx-auto w-full max-w-[100rem] px-0 py-0 md:px-0">
        <div className="grid min-h-screen grid-cols-1 items-center md:grid-cols-[1.2fr_2fr_1.2fr]">
          <div className="hidden h-screen md:block">
            <Suspense fallback={null}>
              <ScenePanel keywords={leftKeywords} />
            </Suspense>
          </div>
          <div className="flex flex-col justify-center space-y-5 px-6 py-16 text-center md:px-12 md:text-left">
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Available for work
              </span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              <span className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                Emanuel
              </span>
              <br />
              <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Sanchez
              </span>
            </h1>

            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-700/80">
              Full-Stack Software Engineer
            </p>

            <p className="mx-auto max-w-lg text-base leading-relaxed text-muted-foreground/90 md:mx-0 md:text-lg">
              4+ years building scalable web applications with TypeScript,
              React, Go &amp; Ruby. Experienced in AWS cloud services,
              event-driven architectures, and AI powered features.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4 md:justify-start">
              <a
                href="/projects"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/30 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
              >
                View Projects
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
              <button
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/80 px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-teal-300 hover:text-teal-700 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
                onClick={downloadResume}
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
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download Resume
              </button>
            </div>
          </div>

          <div className="hidden h-screen md:block">
            <Suspense fallback={null}>
              <ScenePanel keywords={rightKeywords} />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
