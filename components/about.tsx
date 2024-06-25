"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
      I'm a passionate{" "}
        <span className="font-medium">Web Developer</span>, currently in the final year of my Bachelor's degree in{" "}
        <span className="font-medium">Computer Engineering</span>.{" "}
        <span className="font-medium">I have also knowledge about </span>
        <span className="italic">
        UI/UX
        </span>
        . I'm eager to leverage my skills and knowledge in a real-world setting through an internship, where I can further develop my expertise and contribute to creating engaging web experiences, while also exploring the exciting world of AR/VR.{" "}
      
      </p>

    </motion.section>
  );
}
