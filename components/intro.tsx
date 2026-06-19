"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";

export default function Intro() {
  const { ref } = useSectionInView("Home");
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  return (
    <section
      ref={ref}
      id="home"
      className="min-h-[calc(100vh-5rem)] max-w-6xl mx-auto px-4 sm:px-5 pt-6 sm:pt-8 pb-16 sm:pb-20 scroll-mt-28 sm:scroll-mt-36 flex flex-col justify-center"
    >
      <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
        <div>
          <motion.p
            className="font-mono text-sm text-accent mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Software Engineer · MERN Stack
          </motion.p>

          <motion.h1
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-balance"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Rajan
            <br />
            <span className="text-muted">Dhariyaparmar</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-base sm:text-lg text-muted max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            I build web products end to end — from API design to pixel-level UI.
            Currently shipping at{" "}
            <span className="text-ink font-medium">Tuvoc Technologies</span>.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Link
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 bg-ink text-[var(--bg)] px-5 sm:px-6 py-3 text-sm font-medium hover:bg-accent transition-colors w-full sm:w-auto"
              onClick={() => {
                setActiveSection("Contact");
                setTimeOfLastClick(Date.now());
              }}
            >
              Get in touch
              <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              className="inline-flex items-center justify-center gap-2 border border-line px-5 sm:px-6 py-3 text-sm font-medium hover:border-accent hover:text-accent transition-colors w-full sm:w-auto"
              href="https://drive.google.com/file/d/13F6hCRPkoYkDyD7L4aEv-BrytGXW8eNK/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
              <HiDownload />
            </a>

            <div className="flex gap-2 ml-1">
              <a
                className="p-3 border border-line hover:border-accent hover:text-accent transition-colors"
                href="https://www.linkedin.com/in/rajan-dhariyaparmar-7bb7a2233/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <BsLinkedin />
              </a>
              <a
                className="p-3 border border-line hover:border-accent hover:text-accent transition-colors"
                href="https://github.com/rajand2510"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto lg:mx-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="absolute -inset-3 border border-accent/30 -z-10 translate-x-3 translate-y-3" />
          <Image
            src="/myimage.jpg"
            alt="Rajan Dhariyaparmar"
            width={280}
            height={340}
            quality={95}
            priority
            className="w-56 sm:w-64 lg:w-72 h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute -bottom-4 -left-4 bg-accent text-white font-mono text-xs px-3 py-2">
            Ahmedabad, IN
          </div>
        </motion.div>
      </div>

      <motion.div
        className="mt-12 sm:mt-20 grid grid-cols-3 gap-4 sm:gap-6 max-w-lg border-t border-line pt-6 sm:pt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {[
          { label: "Stack", value: "MERN" },
          { label: "CGPA", value: "8.18" },
          { label: "Projects", value: "6+" },
        ].map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted uppercase tracking-wider mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
