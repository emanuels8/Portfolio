import React from "react";
import { Link } from "react-router-dom";
import { selectedWork } from "@/components/data";
import { theme } from "@/components/ui/theme";

const Projects: React.FC = () => {
  return (
    <section id="projects" className="mx-auto w-full max-w-5xl px-6 py-20">
      <Link
        to="/"
        className={`inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors ${theme.link}`}
      >
        ← Back to Home
      </Link>

      <header className="mb-8 max-w-2xl">
        <h2
          className={`text-4xl font-bold tracking-tight bg-clip-text text-black`}
        >
          Selected Projects
        </h2>
      </header>

      <ul className="space-y-8">
        {selectedWork.map((item) => (
          <li
            key={item.title}
            className={`group rounded-xl border p-8 transition-colors ${theme.cardBorder} ${theme.cardBg}`}
          >
            <article className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold tracking-tight text-blue-900 dark:text-blue-200">
                  {item.title}
                </h3>
                <p className="text-base leading-relaxed text-black-900 dark:text-black-200">
                  {item.summary}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-full border px-3 py-1 text-xs text-black-900 font-medium transition-colors ${theme.tag}`}
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
