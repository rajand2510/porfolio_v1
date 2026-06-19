"use client";

import SectionHeading from "./section-heading";
import { projectsData } from "@/lib/data";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";

export default function Projects() {
  const { ref } = useSectionInView("Projects");

  return (
    <section
      ref={ref}
      id="projects"
      className="max-w-6xl mx-auto px-4 sm:px-5 py-16 sm:py-24 scroll-mt-28 sm:scroll-mt-36"
    >
      <SectionHeading subtitle="work" align="center">My projects</SectionHeading>
      <div className="flex flex-col items-center">
        {projectsData.map((project, index) => (
          <Project key={index} {...project} />
        ))}
      </div>
    </section>
  );
}
