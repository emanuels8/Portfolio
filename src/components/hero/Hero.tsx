import React, { Suspense } from "react";

const Scene = React.lazy(() => import("./Scene"));

const LoadingFallback = () => (
  <div className="pointer-events-none fixed inset-0 hidden md:block -z-10 bg-background">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
    </div>
  </div>
);

const Hero: React.FC = () => {
  return (
    <section className="relative mx-auto w-full max-w-5xl overflow-hidden px-6 pt-24 pb-16">
      <Suspense fallback={<LoadingFallback />}>
        <Scene />
      </Suspense>

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-foreground/80">
          Portfolio
        </div>

        <div className="mt-6 space-y-6">
          <h1 className="text-6xl font-semibold tracking-tight text-foreground sm:text-7xl">
            Hi, I'm Emanuel Sanchez.
          </h1>
          <p className="max-w-2xl text-xl leading-relaxed text-muted-foreground">
            I'm a software engineer focused on reliable systems, cloud
            infrastructure, and thoughtful product experiences.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="/projects"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              View Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
