import { useState, useEffect, lazy, Suspense } from "react";
import type { FC } from "react";
import { downloadResume } from "@/lib/downloadResume";

const FluidBackground = lazy(() => import("./FluidBackground"));

const FullPageLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c1220]">
    <div className="flex flex-col items-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-slate-700 border-t-teal-400" />
      <p className="text-xs font-medium tracking-widest uppercase text-slate-500">
        Loading
      </p>
    </div>
  </div>
);

const Hero: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <FullPageLoader />}
      <Suspense fallback={null}>
        <FluidBackground />
      </Suspense>

      <section className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4 sm:space-y-5 md:space-y-7 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            <span className="block bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Emanuel
            </span>
            <span className="block bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
              Sanchez
            </span>
          </h1>

          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-400/70 sm:text-xs sm:tracking-[0.3em] md:text-sm">
            Full-Stack Software Engineer
          </p>

          <div className="h-px w-16 bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />

          <p className="max-w-sm text-sm leading-relaxed text-slate-400 sm:max-w-lg sm:text-base md:max-w-xl md:text-lg">
            4+ years building scalable web applications with TypeScript, React,
            Go &amp; Ruby. Experienced in AWS cloud services, event-driven
            architectures, and AI&#8209;powered features.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2 sm:gap-4">
            <a
              href="/work"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-teal-500 px-5 py-2.5 text-xs font-semibold text-slate-950 shadow-lg shadow-teal-500/20 transition-all duration-300 hover:bg-teal-400 hover:shadow-xl hover:shadow-teal-400/25 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-[#0c1220] sm:px-7 sm:py-3.5 sm:text-sm"
            >
              View Work
            </a>
            <button
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-slate-600/60 bg-slate-800/40 px-5 py-2.5 text-xs font-semibold text-slate-300 backdrop-blur-sm transition-all duration-300 hover:border-teal-500/50 hover:text-teal-300 hover:shadow-md hover:shadow-teal-500/10 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-[#0c1220] sm:px-7 sm:py-3.5 sm:text-sm"
              onClick={downloadResume}
            >
              Resume
            </button>
            <a
              href="https://game.emanuels8.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-slate-600/60 bg-slate-800/40 px-5 py-2.5 text-xs font-semibold text-slate-300 backdrop-blur-sm transition-all duration-300 hover:border-teal-500/50 hover:text-teal-300 hover:shadow-md hover:shadow-teal-500/10 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-[#0c1220] sm:px-7 sm:py-3.5 sm:text-sm"
            >
              Play Game
            </a>
          </div>

          <div className="flex items-center gap-4 pt-1 sm:gap-5 sm:pt-2">
            <a
              href="https://linkedin.com/in/emanuel-sanchez-"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-slate-500 transition-colors duration-300 hover:text-teal-400"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://github.com/emanuels8"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-slate-500 transition-colors duration-300 hover:text-teal-400"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
            <a
              href="mailto:emanuels8001@gmail.com"
              aria-label="Email"
              className="text-slate-500 transition-colors duration-300 hover:text-teal-400"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </a>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce sm:bottom-8">
            <svg
              className="h-5 w-5 text-slate-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
