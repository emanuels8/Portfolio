import React from "react";
import { Link } from "react-router-dom";
import { selectedWork } from "@/components/data";

const Projects: React.FC = () => {
  return (
    <section id="projects" className="mx-auto w-full max-w-5xl px-6 py-20">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground mb-8"
      >
        ← Back to Home
      </Link>

      <header className="mb-16 max-w-2xl">
        <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Selected Projects
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          A collection of projects focused on scalable systems, reliability, and
          measurable impact.
        </p>
      </header>

      <ul className="space-y-16">
        {selectedWork.map((item) => (
          <li
            key={item.title}
            className="group rounded-xl border border-border/70 p-8 transition-colors hover:bg-primary/5 hover:border-primary/25"
          >
            <article className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {item.summary}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-foreground/80 transition-colors hover:bg-primary/15"
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

export default Projects;
