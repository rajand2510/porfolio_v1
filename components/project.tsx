"use client";

import { useRef } from "react";
import { projectsData } from "@/lib/data";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { IconType } from "react-icons";

type ProjectProps = (typeof projectsData)[number];

export default function Project({
  title,
  description,
  tags,
  imageUrl,
  links,
}: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgess,
        opacity: opacityProgess,
      }}
      className="group mb-3 sm:mb-8 last:mb-0 w-full max-w-[50rem] mx-auto"
    >
      <section className="bg-surface w-full border border-line rounded-lg overflow-hidden sm:pr-8 relative sm:h-[20rem] hover:bg-accent-dim transition sm:group-even:pl-8">
        <div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full sm:group-even:ml-[18rem]">
          <div className="flex items-center">
            <h3 className="font-display text-2xl font-semibold">{title}</h3>
            <div className="ml-4 flex space-x-2">
              {links.map((link, index) => {
                const IconComponent: IconType = link.icon;
                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl text-muted hover:text-accent transition-colors"
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          </div>
          <p className="mt-2 leading-relaxed text-muted">{description}</p>
          <ul className="flex flex-wrap mt-4 gap-2 sm:mt-auto">
            {tags.map((tag, index) => (
              <li
                className="bg-ink/80 px-3 py-1 text-[0.7rem] uppercase tracking-wider text-[var(--bg)] rounded-full dark:bg-white/15 dark:text-ink"
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <Image
          src={imageUrl}
          alt={title}
          quality={95}
          className="absolute hidden sm:block top-8 -right-40 w-[28.25rem] rounded-t-lg shadow-2xl transition
            group-hover:scale-[1.04]
            group-hover:-translate-x-3
            group-hover:translate-y-3
            group-hover:-rotate-2
            group-even:group-hover:translate-x-3
            group-even:group-hover:translate-y-3
            group-even:group-hover:rotate-2
            group-even:right-[initial] group-even:-left-40"
        />
      </section>
    </motion.div>
  );
}
