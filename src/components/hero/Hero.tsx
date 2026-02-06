import React, { Suspense, useState, useEffect } from "react";
import { downloadResume } from "@/lib/downloadResume";

const Scene = React.lazy(() => import("./Scene"));

const FullPageLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
);

const Hero: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <FullPageLoader />}
      <section className="relative mx-auto w-full max-w-5xl overflow-hidden px-6 pt-24 pb-16">
        <Suspense fallback={null}>
          <Scene />
        </Suspense>

        <div className="relative z-10">
          <div className="mt-6 space-y-6">
            <h1 className="text-6xl font-semibold tracking-tight text-foreground sm:text-7xl">
              Emanuel Sanchez
            </h1>
            <p className="max-w-2xl text-xl leading-relaxed text-muted-foreground">
              Full-Stack Software Engineer with 4+ years of experience building
              scalable web applications using TypeScript, React.js, Go, Ruby.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="/projects"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 px-5 py-2.5 text-base font-semibold text-white shadow-lg transition-colors hover:from-teal-500 hover:to-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              >
                View Projects
              </a>
              <button
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-400 to-blue-600 px-5 py-2.5 text-base font-semibold text-white shadow-lg transition-colors hover:from-blue-500 hover:to-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-300"
                onClick={downloadResume}
              >
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
