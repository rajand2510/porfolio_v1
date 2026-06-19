"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SectionHeading from "./section-heading";
import KeyboardKey from "./keyboard-key";
import { useSectionInView } from "@/lib/hooks";
import { isTypingTarget, useKeyboardSection } from "@/lib/use-keyboard-section";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFigma,
  SiNodedotjs,
  SiOpenjdk,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiGit,
} from "react-icons/si";

type Category = "all" | "Frontend" | "Backend" | "Tools";

type SkillInfo = {
  name: string;
  category: Exclude<Category, "all">;
  note: string;
  detail: string;
  icon: IconType;
};

const skills: SkillInfo[] = [
  { name: "HTML", category: "Frontend", icon: SiHtml5, note: "Semantic markup, accessibility basics, SEO-friendly structure.", detail: "Foundation of every UI I build — clean structure before any framework." },
  { name: "CSS", category: "Frontend", icon: SiCss3, note: "Flexbox, Grid, animations, responsive layouts from scratch.", detail: "From custom layouts to micro-interactions; Tailwind handles most day-to-day styling." },
  { name: "JavaScript", category: "Frontend", icon: SiJavascript, note: "ES6+, async/await, DOM APIs, and modern patterns daily.", detail: "The language behind React, Node, and every MERN app I ship at Tuvoc." },
  { name: "React", category: "Frontend", icon: SiReact, note: "Components, hooks, state management — my primary UI library.", detail: "Daily driver for production UIs — reusable components, hooks, and client-side architecture." },
  { name: "Next.js", category: "Frontend", icon: SiNextdotjs, note: "App Router, SSR, server actions for this portfolio and side projects.", detail: "SSR, App Router, and server actions — used on this portfolio and side projects." },
  { name: "Tailwind", category: "Frontend", icon: SiTailwindcss, note: "Utility-first styling — fast iteration without context switching.", detail: "Utility-first CSS for rapid UI iteration without leaving JSX." },
  { name: "Figma", category: "Frontend", icon: SiFigma, note: "Wireframes and UI kits before code — OneOnic, VR-UI projects.", detail: "OneOnic Solutions, VR-UI, and client flows sketched before a single component ships." },
  { name: "Node.js", category: "Backend", icon: SiNodedotjs, note: "Express APIs, middleware, auth flows in MERN apps.", detail: "Express servers, middleware chains, and REST APIs paired with React frontends." },
  { name: "Java", category: "Backend", icon: SiOpenjdk, note: "OOP, collections, and academic projects during engineering.", detail: "Core OOP and data structures from my Computer Engineering degree at LDRP-ITR." },
  { name: "MongoDB", category: "Backend", icon: SiMongodb, note: "Schema design, aggregation, Mongoose in production apps.", detail: "Mongoose models, aggregations, and document design in live MERN products." },
  { name: "PostgreSQL", category: "Backend", icon: SiPostgresql, note: "Relational modeling, joins, and complex queries.", detail: "Relational schemas, joins, and complex queries from internship and academic work." },
  { name: "Redis", category: "Backend", icon: SiRedis, note: "Caching, session storage, and fast in-memory data lookups.", detail: "In-memory caching and session storage for faster API response times." },
  { name: "Git", category: "Tools", icon: SiGit, note: "Branching, PRs, rebasing — daily workflow at Tuvoc.", detail: "Feature branches, code reviews, and clean commit history — daily at Tuvoc." },
];

const FILTER_KEYS: Record<string, Category> = {
  KeyA: "all",
  KeyF: "Frontend",
  KeyB: "Backend",
  KeyT: "Tools",
};

type FilterKey = "A" | "F" | "B" | "T";

export default function Skills() {
  const { ref } = useSectionInView("Skills");
  const [filter, setFilter] = useState<Category>("all");
  const [index, setIndex] = useState(0);
  const [shiftHeld, setShiftHeld] = useState(false);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const keyboardActive = useKeyboardSection("Skills");
  const filteredRef = useRef(skills);
  const pressTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const lastSpaceRef = useRef(0);

  const filtered =
    filter === "all" ? skills : skills.filter((s) => s.category === filter);

  filteredRef.current = filtered;

  const flashPressed = useCallback((key: string) => {
    setPressedKey(key);
    if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
    pressTimerRef.current = setTimeout(() => setPressedKey(null), 100);
  }, []);

  const active = filtered[index] ?? filtered[0];
  const ActiveIcon = active?.icon ?? SiReact;

  const setFilterAndReset = useCallback((cat: Category, keyLabel?: string) => {
    setFilter(cat);
    setIndex(0);
    if (keyLabel) flashPressed(keyLabel);
  }, [flashPressed]);

  const nextSkill = useCallback(() => {
    const len = filteredRef.current.length;
    if (len === 0) return;
    setIndex((i) => (i + 1) % len);
    flashPressed("Space");
  }, [flashPressed]);

  const prevSkill = useCallback(() => {
    const len = filteredRef.current.length;
    if (len === 0) return;
    setIndex((i) => (i - 1 + len) % len);
    flashPressed("ArrowLeft");
  }, [flashPressed]);

  const selectSkill = useCallback(
    (name: string) => {
      const i = filtered.findIndex((s) => s.name === name);
      if (i >= 0) setIndex(i);
    },
    [filtered]
  );

  useEffect(() => {
    if (index >= filtered.length) setIndex(0);
  }, [filtered.length, index]);

  useEffect(() => {
    if (!keyboardActive) setShiftHeld(false);
  }, [keyboardActive]);

  useEffect(() => {
    if (!keyboardActive) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;

      const cat = FILTER_KEYS[e.code];
      if (cat && !e.repeat) {
        const keyLabel = e.code.replace("Key", "");
        setFilterAndReset(cat, keyLabel);
      }
      if (e.code === "Space") {
        e.preventDefault();
        const now = Date.now();
        if (now - lastSpaceRef.current < 60) return;
        lastSpaceRef.current = now;
        nextSkill();
      }
      if (e.code === "ArrowRight") {
        e.preventDefault();
        nextSkill();
      }
      if (e.code === "ArrowLeft") {
        e.preventDefault();
        prevSkill();
      }
      if (e.key === "Shift") setShiftHeld(true);
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") setShiftHeld(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [keyboardActive, nextSkill, prevSkill, setFilterAndReset]);

  const isFilterActive = (key: FilterKey) => {
    const map: Record<FilterKey, Category> = {
      A: "all",
      F: "Frontend",
      B: "Backend",
      T: "Tools",
    };
    return filter === map[key];
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="max-w-6xl mx-auto px-4 sm:px-5 py-16 sm:py-24 scroll-mt-28 sm:scroll-mt-36 border-t border-line"
    >
      <SectionHeading subtitle="skills">What I use</SectionHeading>

      <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 items-start">
        <div className="bg-surface border border-line p-5 sm:p-8 min-h-[240px] sm:min-h-[280px] order-1 lg:order-none">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="font-mono text-xs text-muted">
              {shiftHeld ? "shift — deeper context" : "space / → — next skill · ← — previous"}
            </span>
          </div>

          <div className="min-h-[180px]">
            {active && (
              <motion.div
                layout
                transition={{ layout: { duration: 0.2, ease: "easeOut" } }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.span
                    layout
                    className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent-dim text-accent"
                  >
                    <ActiveIcon className="text-2xl" />
                  </motion.span>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold">{active.name}</h3>
                    <p className="font-mono text-xs text-accent">{active.category}</p>
                  </div>
                </div>
                <p className="text-muted leading-relaxed text-base sm:text-lg">
                  {shiftHeld ? active.detail : active.note}
                </p>
              </motion.div>
            )}
          </div>

          <div className="flex gap-2 mt-8">
            {filtered.map((skill, i) => (
              <button
                key={skill.name}
                onClick={() => setIndex(i)}
                className={`h-1 flex-1 transition-colors ${i === index ? "bg-accent" : "bg-line"}`}
                aria-label={`Select ${skill.name}`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 w-full order-2 lg:order-none">
          <p className="font-mono text-xs text-muted text-center mb-2 hidden sm:block">
            <kbd className="px-1.5 py-0.5 bg-accent-dim text-accent rounded">A</kbd> all ·{" "}
            <kbd className="px-1.5 py-0.5 bg-accent-dim text-accent rounded">F</kbd> frontend ·{" "}
            <kbd className="px-1.5 py-0.5 bg-accent-dim text-accent rounded">B</kbd> backend ·{" "}
            <kbd className="px-1.5 py-0.5 bg-accent-dim text-accent rounded">T</kbd> tools ·{" "}
            <kbd className="px-1.5 py-0.5 bg-accent-dim text-accent rounded">Space</kbd> next
          </p>
          <p className="font-mono text-xs text-muted text-center mb-2 sm:hidden">
            Tap filter keys or skill chips below
          </p>

          <div className="w-full max-w-md overflow-x-auto">
            <div className="min-w-[20rem] bg-[var(--key-bg)] border border-line rounded-xl p-4 sm:p-5 shadow-lg">
            <div className="flex gap-2 mb-2 justify-center flex-wrap">
              {["Q", "E", "R", "Y", "U"].map((k) => (
                <KeyboardKey key={k} label={k} />
              ))}
              <KeyboardKey
                label="T"
                sublabel="tools"
                active={isFilterActive("T")}
                pressed={pressedKey === "T"}
                onClick={() => setFilterAndReset("Tools", "T")}
              />
            </div>
            <div className="flex gap-2 mb-2 justify-center flex-wrap">
              <KeyboardKey
                label="A"
                sublabel="all"
                active={isFilterActive("A")}
                pressed={pressedKey === "A"}
                onClick={() => setFilterAndReset("all", "A")}
              />
              <KeyboardKey label="S" />
              <KeyboardKey label="D" />
              <KeyboardKey
                label="F"
                sublabel="front"
                active={isFilterActive("F")}
                pressed={pressedKey === "F"}
                onClick={() => setFilterAndReset("Frontend", "F")}
              />
              <KeyboardKey label="G" />
              <KeyboardKey label="H" />
              <KeyboardKey
                label="B"
                sublabel="back"
                active={isFilterActive("B")}
                pressed={pressedKey === "B"}
                onClick={() => setFilterAndReset("Backend", "B")}
              />
            </div>
            <div className="flex gap-2 mb-3 items-center">
              <KeyboardKey label="Shift" wide active={shiftHeld} pressed={shiftHeld} />
              <div className="flex gap-2 flex-1 justify-center">
                {["Z", "X", "C", "V"].map((k) => (
                  <KeyboardKey key={k} label={k} />
                ))}
              </div>
            </div>
            <KeyboardKey
              label="Space"
              sublabel="next skill"
              wide
              active={!shiftHeld}
              pressed={pressedKey === "Space"}
              onClick={nextSkill}
            />
            </div>
          </div>

          <ul className="flex flex-wrap gap-2 justify-center w-full max-w-md">
            {filtered.map((skill, i) => {
              const Icon = skill.icon;
              const isSelected = i === index;
              return (
                <li key={skill.name}>
                  <button
                    onClick={() => selectSkill(skill.name)}
                    className={`
                      inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border rounded-lg transition-all duration-200
                      ${isSelected
                        ? "border-accent bg-accent text-white scale-105"
                        : "border-line bg-surface text-ink hover:border-accent/50"}
                    `}
                  >
                    <Icon className="text-sm" />
                    {skill.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
