"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SectionHeading from "./section-heading";
import KeyboardKey from "./keyboard-key";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { isTypingTarget, useKeyboardSection } from "@/lib/use-keyboard-section";

const aboutTopics = [
  {
    key: "W",
    label: "Work",
    headline: "Full Stack Developer @ Tuvoc",
    summary:
      "Currently at Tuvoc Technologies — building production MERN apps and owning features from API to UI.",
    detail:
      "I'm leading a client project to redesign the architecture flow — restructuring how modules, APIs, and the frontend connect so the system scales cleanly and is easier to maintain.",
    highlights: [
      "Client architecture flow redesign",
      "MERN stack in production",
      "End-to-end feature delivery",
    ],
  },
  {
    key: "M",
    label: "MERN",
    headline: "Mongo · Express · React · Node",
    summary:
      "Computer Engineering graduate from LDRP-ITR (CGPA 8.18). The MERN stack is my daily toolkit.",
    detail:
      "MongoDB for data modeling, Express for REST APIs, React for interfaces, Node for server logic. I also work with Next.js and TypeScript on personal projects like this portfolio.",
    highlights: ["React & Node.js daily", "MongoDB & REST APIs", "Next.js & TypeScript"],
  },
] as const;

type TopicKey = (typeof aboutTopics)[number]["key"];

const KEY_MAP: Record<string, TopicKey> = {
  KeyW: "W",
  KeyM: "M",
};

export default function About() {
  const { ref } = useSectionInView("About");
  const [step, setStep] = useState(0);
  const [shiftHeld, setShiftHeld] = useState(false);
  const [pressedKey, setPressedKey] = useState<TopicKey | null>(null);
  const [spacePressed, setSpacePressed] = useState(false);
  const keyboardActive = useKeyboardSection("About");
  const pressTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const spaceTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const lastSpaceRef = useRef(0);

  const current = aboutTopics[step];

  const flashPressed = useCallback((key: TopicKey) => {
    setPressedKey(key);
    if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
    pressTimerRef.current = setTimeout(() => setPressedKey(null), 100);
  }, []);

  const flashSpace = useCallback(() => {
    setSpacePressed(true);
    if (spaceTimerRef.current) clearTimeout(spaceTimerRef.current);
    spaceTimerRef.current = setTimeout(() => setSpacePressed(false), 100);
  }, []);

  const goToStep = useCallback((index: number) => {
    const next = index % aboutTopics.length;
    setStep(next);
    flashPressed(aboutTopics[next].key);
  }, [flashPressed]);

  const goToKey = useCallback(
    (key: TopicKey) => {
      const index = aboutTopics.findIndex((t) => t.key === key);
      if (index >= 0) goToStep(index);
    },
    [goToStep]
  );

  const nextStep = useCallback(() => {
    setStep((s) => (s + 1) % aboutTopics.length);
    flashSpace();
  }, [flashSpace]);

  useEffect(() => {
    if (!keyboardActive) {
      setShiftHeld(false);
    }
  }, [keyboardActive]);

  useEffect(() => {
    if (!keyboardActive) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;

      if (e.code === "Space") {
        e.preventDefault();
        const now = Date.now();
        if (now - lastSpaceRef.current < 60) return;
        lastSpaceRef.current = now;
        nextStep();
      }
      if (e.key === "Shift") setShiftHeld(true);
      const topicKey = KEY_MAP[e.code];
      if (topicKey && !e.repeat) goToKey(topicKey);
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
  }, [keyboardActive, nextStep, goToKey]);

  const isKeyActive = (key: TopicKey) => current.key === key;
  const isKeyPressed = (key: TopicKey) => pressedKey === key;

  return (
    <section
      ref={ref}
      id="about"
      className="max-w-6xl mx-auto px-4 sm:px-5 py-16 sm:py-24 scroll-mt-28 sm:scroll-mt-36"
    >
      <SectionHeading subtitle="about">A bit about me</SectionHeading>

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div className="bg-surface border border-line p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
            <span className="font-mono text-xs text-muted">
              <span className="hidden sm:inline">
                {shiftHeld ? "shift — more detail" : "W / M — pick a topic · space — next"}
              </span>
              <span className="sm:hidden">
                {shiftHeld ? "shift — detail" : "Tap W, M, or Space"}
              </span>
            </span>
          </div>

          <div className="min-h-[220px]">
            <motion.div
              layout
              transition={{ layout: { duration: 0.2, ease: "easeOut" } }}
            >
              <p className="font-mono text-accent text-sm mb-2">
                {current.label} · Tuvoc Technologies
              </p>
              <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
                {current.headline}
              </h3>
              <p className="text-muted leading-relaxed text-base sm:text-lg mb-6">
                {shiftHeld ? current.detail : current.summary}
              </p>
              <ul className="space-y-2">
                {current.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-ink"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="flex gap-2 mt-8">
            {aboutTopics.map((topic, i) => (
              <button
                key={topic.key}
                onClick={() => goToStep(i)}
                className={`h-1 flex-1 transition-colors ${
                  i === step ? "bg-accent" : "bg-line"
                }`}
                aria-label={`Show ${topic.label}`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 w-full min-w-0">
          <p className="font-mono text-xs text-muted text-center mb-2 px-1 hidden sm:block">
            Press{" "}
            <kbd className="px-1.5 py-0.5 bg-accent-dim text-accent rounded">W</kbd>{" "}
            work ·{" "}
            <kbd className="px-1.5 py-0.5 bg-accent-dim text-accent rounded">M</kbd>{" "}
            stack · hold{" "}
            <kbd className="px-1.5 py-0.5 bg-accent-dim text-accent rounded">Shift</kbd>{" "}
            for detail
          </p>
          <p className="font-mono text-xs text-muted text-center mb-2 sm:hidden">
            Tap keys below to explore
          </p>

          <div className="w-full bg-[var(--key-bg)] border border-line rounded-xl p-3 sm:p-5 shadow-lg">
            <div className="grid grid-cols-6 gap-1.5 sm:gap-2 mb-2">
              <KeyboardKey label="Q" />
              <KeyboardKey
                label="W"
                sublabel="work"
                active={isKeyActive("W")}
                pressed={isKeyPressed("W")}
                onClick={() => goToKey("W")}
              />
              <KeyboardKey label="E" />
              <KeyboardKey label="R" />
              <KeyboardKey label="T" />
              <KeyboardKey label="Y" />
            </div>
            <div className="grid grid-cols-6 gap-1.5 sm:gap-2 mb-2">
              <KeyboardKey label="A" />
              <KeyboardKey label="S" />
              <KeyboardKey label="D" />
              <KeyboardKey label="F" />
              <KeyboardKey label="G" />
              <KeyboardKey label="H" />
            </div>
            <div className="flex gap-1.5 sm:gap-2 mb-3 items-stretch w-full">
              <div className="w-[22%] min-w-0">
                <KeyboardKey
                  label="Shift"
                  wide
                  active={shiftHeld}
                  pressed={shiftHeld}
                />
              </div>
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2 flex-1 min-w-0">
                <KeyboardKey label="Z" />
                <KeyboardKey label="X" />
                <KeyboardKey label="C" />
                <KeyboardKey label="V" />
                <KeyboardKey label="B" />
              </div>
              <div className="w-[14%] min-w-0">
                <KeyboardKey
                  label="M"
                  sublabel="mern"
                  active={isKeyActive("M")}
                  pressed={isKeyPressed("M")}
                  onClick={() => goToKey("M")}
                />
              </div>
            </div>
            <div className="flex w-full">
              <KeyboardKey
                label="Space"
                sublabel="next topic"
                wide
                active={!shiftHeld}
                pressed={spacePressed}
                onClick={nextStep}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 w-full mt-2">
            {[
              { label: "Role", value: "Full Stack" },
              { label: "Company", value: "Tuvoc" },
              { label: "Stack", value: "MERN" },
            ].map((fact) => (
              <div
                key={fact.label}
                className="border border-line bg-surface px-3 py-3 text-center"
              >
                <p className="font-display font-bold text-sm">{fact.value}</p>
                <p className="font-mono text-[0.6rem] uppercase tracking-wider text-muted mt-0.5">
                  {fact.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
