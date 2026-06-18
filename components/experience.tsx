"use client";

import React from "react";
import SectionHeading from "./section-heading";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { useTheme } from "@/context/theme-context";

export default function Experience() {
  const { ref } = useSectionInView("Experience");
  const { theme } = useTheme();

  return (
    <section
      id="experience"
      ref={ref}
      className="max-w-6xl mx-auto px-5 py-24 scroll-mt-28 sm:scroll-mt-36"
    >
      <SectionHeading subtitle="timeline">My experience</SectionHeading>
      <VerticalTimeline lineColor="">
        {experiencesData.map((item, index) => (
          <React.Fragment key={index}>
            <VerticalTimelineElement
              contentStyle={{
                background:
                  theme === "light" ? "var(--bg-elevated)" : "rgba(255, 255, 255, 0.05)",
                boxShadow: "none",
                border: "1px solid var(--border)",
                textAlign: "left",
                padding: "1.3rem 2rem",
              }}
              contentArrowStyle={{
                borderRight:
                  theme === "light"
                    ? "0.4rem solid var(--accent)"
                    : "0.4rem solid rgba(255, 107, 71, 0.6)",
              }}
              date={item.date}
              icon={item.icon}
              iconStyle={{
                background:
                  theme === "light" ? "var(--bg)" : "rgba(255, 255, 255, 0.1)",
                color: "var(--accent)",
                fontSize: "1.5rem",
                boxShadow: "0 0 0 4px var(--accent-dim)",
              }}
            >
              <h3 className="font-display font-semibold capitalize">{item.title}</h3>
              <p className="font-normal !mt-0 text-accent">{item.location}</p>
              <p className="!mt-1 !font-normal text-muted">{item.description}</p>
            </VerticalTimelineElement>
          </React.Fragment>
        ))}
      </VerticalTimeline>
    </section>
  );
}
