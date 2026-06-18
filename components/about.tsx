"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SectionHeading from "./section-heading";
import KeyboardKey from "./keyboard-key";
import { motion, AnimatePresence } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

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
  {
    key: "U",
    label: "UI/UX",
    headline: "Design before code",
    summary:
      "I sketch in Figma before writing components. Good UI is clarity — not decoration.",
    detail:
      "From OneOnic Solutions to VR-UI explorations, I've designed interfaces meant to be used, not just seen. I ship in small slices and iterate based on real feedback.",
    highlights: ["Figma wireframes & kits", "Responsive craft", "AR/VR UI interest"],
  },
] as const;

type TopicKey = (typeof aboutTopics)[number]["key"];

const KEY_MAP: Record<string, TopicKey> = {
  KeyW: "W",
  KeyM: "M",
  KeyU: "U",
};

export default function About() {
  const { ref } = useSectionInView("About");
  const [step, setStep] = useState(0);
  const [shiftHeld, setShiftHeld] = useState(false);
  const [pressedKey, setPressedKey] = useState<TopicKey | null>(null);
  const [inView, setInView] = useState(false);

  const current = aboutTopics[step];

  const goToStep = useCallback((index: number) => {
    setStep(index % aboutTopics.length);
    setPressedKey(aboutTopics[index % aboutTopics.length].key);
    setTimeout(() => setPressedKey(null), 150);
  }, []);

  const goToKey = useCallback(
    (key: TopicKey) => {
      const index = aboutTopics.findIndex((t) => t.key === key);
      if (index >= 0) goToStep(index);
    },
    [goToStep]
  );

  const nextStep = useCallback(() => {
    goToStep(step + 1);
  }, [goToStep, step]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    const el = document.getElementById("about");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (!e.repeat) nextStep();
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
  }, [inView, nextStep, goToKey]);

  const isKeyActive = (key: TopicKey) => current.key === key;
  const isKeyPressed = (key: TopicKey) => pressedKey === key;

  return (
    <section
      ref={ref}
      id="about"
      className="max-w-6xl mx-auto px-5 py-24 scroll-mt-28 sm:scroll-mt-36"
    >
      <SectionHeading subtitle="about">A bit about me</SectionHeading>

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div className="bg-surface border border-line p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs text-muted">
              {shiftHeld ? "shift — more detail" : "W / M / U — pick a topic · space — next"}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${step}-${shiftHeld}`}
              initial={{ opacity: 0, x: shiftHeld ? -12 : 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <p className="font-mono text-accent text-sm mb-2">
                {current.label} · Tuvoc Technologies
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold mb-4">
                {current.headline}
              </h3>
              <p className="text-muted leading-relaxed text-lg mb-6">
                {shiftHeld ? current.detail : current.summary}
              </p>
              <ul className="space-y-2">
                {current.highlights.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i }}
                    className="flex items-center gap-3 text-sm text-ink"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

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

        <div className="flex flex-col items-center gap-4">
          <p className="font-mono text-xs text-muted text-center mb-2">
            Press{" "}
            <kbd className="px-1.5 py-0.5 bg-accent-dim text-accent rounded">W</kbd>{" "}
            work ·{" "}
            <kbd className="px-1.5 py-0.5 bg-accent-dim text-accent rounded">M</kbd>{" "}
            stack ·{" "}
            <kbd className="px-1.5 py-0.5 bg-accent-dim text-accent rounded">U</kbd>{" "}
            design · hold{" "}
            <kbd className="px-1.5 py-0.5 bg-accent-dim text-accent rounded">Shift</kbd>{" "}
            for detail
          </p>

          <div className="w-full max-w-md bg-[var(--key-bg)] border border-line rounded-xl p-4 sm:p-5 shadow-lg">
            <div className="flex gap-2 mb-2 justify-center">
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
              <KeyboardKey label="U" />
            </div>
            <div className="flex gap-2 mb-2 justify-center">
              <KeyboardKey label="A" />
              <KeyboardKey label="S" />
              <KeyboardKey label="D" />
              <KeyboardKey label="F" />
              <KeyboardKey label="G" />
              <KeyboardKey label="H" />
              <KeyboardKey
                label="M"
                sublabel="mern"
                active={isKeyActive("M")}
                pressed={isKeyPressed("M")}
                onClick={() => goToKey("M")}
              />
            </div>
            <div className="flex gap-2 mb-3 items-center">
              <KeyboardKey
                label="Shift"
                wide
                active={shiftHeld}
                pressed={shiftHeld}
              />
              <div className="flex gap-2 flex-1 justify-center">
                <KeyboardKey label="Z" />
                <KeyboardKey label="X" />
                <KeyboardKey label="C" />
                <KeyboardKey label="V" />
                <KeyboardKey
                  label="U"
                  sublabel="ui"
                  active={isKeyActive("U")}
                  pressed={isKeyPressed("U")}
                  onClick={() => goToKey("U")}
                />
              </div>
            </div>
            <KeyboardKey
              label="Space"
              sublabel="next topic"
              wide
              active={!shiftHeld}
              pressed={pressedKey !== null && !shiftHeld}
              onClick={nextStep}
            />
          </div>

          <div className="grid grid-cols-3 gap-2 w-full max-w-md mt-2">
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
