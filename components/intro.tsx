"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";

const roles = [
  "Full-Stack Developer",
  "MERN Engineer",
  "UI Builder",
];

const stats = [
  { label: "Stack", value: "MERN" },
  { label: "CGPA", value: "8.18" },
  { label: "Projects", value: "6+" },
];

const techTags = [
  "React",
  "Node.js",
  "MongoDB",
  "TypeScript",
  "Next.js",
  "Express",
  "Tailwind",
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function Intro() {
  const { ref } = useSectionInView("Home");
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={ref}
      id="home"
      className="max-w-6xl mx-auto px-4 sm:px-5 pt-2 sm:pt-3 pb-16 sm:pb-20 scroll-mt-28 sm:scroll-mt-36"
    >
      <motion.div
        className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Intro card */}
        <motion.div
          variants={item}
          className="md:col-span-7 border border-line bg-surface/60 backdrop-blur-sm p-6 sm:p-8 flex flex-col justify-between min-h-[280px] sm:min-h-[320px]"
        >
          <div>
            <div className="flex items-center justify-between gap-3 mb-6">
              <span className="inline-flex items-center gap-2 font-mono text-xs text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Available for work
              </span>
              <span className="font-mono text-xs text-muted">01 — Home</span>
            </div>

            <p className="font-mono text-sm text-muted mb-3">
              Hey, I&apos;m
            </p>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.02] tracking-tight">
              Rajan
              <span className="block text-muted">Dhariyaparmar</span>
            </h1>

            <div className="h-7 mt-4 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={roleIndex}
                  className="font-mono text-sm sm:text-base text-accent"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.3 }}
                >
                  {roles[roleIndex]}
                  <span className="animate-blink">_</span>
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <p className="mt-6 text-sm sm:text-base text-muted leading-relaxed max-w-md">
            I build web products end to end — from API design to pixel-level UI.
            Currently shipping at{" "}
            <span className="text-ink font-medium">Tuvoc Technologies</span>.
          </p>
        </motion.div>

        {/* Photo card */}
        <motion.div
          variants={item}
          className="md:col-span-5 relative border border-line bg-surface/40 overflow-hidden min-h-[280px] sm:min-h-[320px] group"
        >
          <Image
            src="/myimage.jpg"
            alt="Rajan Dhariyaparmar"
            width={480}
            height={560}
            quality={95}
            priority
            className="absolute inset-0 w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/10 to-transparent" />

          <div className="absolute top-4 right-4 font-mono text-[0.65rem] bg-[var(--bg)]/80 backdrop-blur border border-line px-2.5 py-1">
            &lt;dev /&gt;
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
            <div>
              <p className="font-display text-lg sm:text-xl font-bold text-white">
                Rajan D.
              </p>
              <p className="font-mono text-xs text-white/70 mt-0.5">
                Ahmedabad, India
              </p>
            </div>
            <span className="shrink-0 bg-accent text-white font-mono text-xs px-3 py-1.5">
              MERN
            </span>
          </div>
        </motion.div>

        {/* CTA card */}
        <motion.div
          variants={item}
          className="md:col-span-5 border border-line bg-surface/60 backdrop-blur-sm p-5 sm:p-6 flex flex-col justify-center gap-4"
        >
          <p className="font-mono text-xs text-muted uppercase tracking-wider">
            Let&apos;s work together
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 bg-ink text-[var(--bg)] px-5 py-3 text-sm font-medium hover:bg-accent transition-colors flex-1"
              onClick={() => {
                setActiveSection("Contact");
                setTimeOfLastClick(Date.now());
              }}
            >
              Get in touch
              <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              className="inline-flex items-center justify-center gap-2 border border-line px-5 py-3 text-sm font-medium hover:border-accent hover:text-accent transition-colors flex-1"
              href="https://drive.google.com/file/d/13F6hCRPkoYkDyD7L4aEv-BrytGXW8eNK/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
              <HiDownload />
            </a>
          </div>

          <div className="flex gap-2">
            <a
              className="flex-1 inline-flex items-center justify-center gap-2 p-3 border border-line hover:border-accent hover:text-accent transition-colors text-sm"
              href="https://www.linkedin.com/in/rajan-dhariyaparmar/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsLinkedin />
              LinkedIn
            </a>
            <a
              className="flex-1 inline-flex items-center justify-center gap-2 p-3 border border-line hover:border-accent hover:text-accent transition-colors text-sm"
              href="https://github.com/rajand2510"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
              GitHub
            </a>
          </div>
        </motion.div>

        {/* Stats cards */}
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={item}
            className="md:col-span-2 border border-line bg-surface/60 backdrop-blur-sm p-4 sm:p-5 flex flex-col justify-center hover:border-accent/40 transition-colors"
          >
            <p className="font-display text-2xl sm:text-3xl font-bold">{stat.value}</p>
            <p className="font-mono text-[0.65rem] sm:text-xs text-muted uppercase tracking-wider mt-1">
              {stat.label}
            </p>
          </motion.div>
        ))}

        {/* Terminal strip */}
        <motion.div
          variants={item}
          className="md:col-span-12 border border-line bg-ink text-[var(--bg)] p-4 sm:p-5 font-mono text-xs sm:text-sm overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="text-accent shrink-0">$</span>
            <span className="text-white/90">
              whoami <span className="text-accent">→</span> rajan-dhariyaparmar
            </span>
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="text-white/70">
              stack <span className="text-accent">→</span> react · node · mongo · ts
            </span>
            <span className="hidden md:inline text-white/30">|</span>
            <span className="text-white/70 hidden md:inline">
              status <span className="text-accent">→</span> building at Tuvoc
            </span>
            <span className="animate-blink text-accent ml-auto hidden sm:inline">█</span>
          </div>
        </motion.div>

        {/* Tech marquee */}
        <motion.div
          variants={item}
          className="md:col-span-12 border border-line overflow-hidden py-3 bg-surface/40"
          aria-hidden
        >
          <div className="flex w-max animate-marquee">
            {[...techTags, ...techTags].map((tag, i) => (
              <span
                key={`${tag}-${i}`}
                className="mx-4 font-mono text-xs text-muted whitespace-nowrap"
              >
                {tag}
                <span className="ml-4 text-accent">/</span>
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
