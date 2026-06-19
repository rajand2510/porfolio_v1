"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import { workProcessData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { isTypingTarget, useKeyboardSection } from "@/lib/use-keyboard-section";
import KeyboardKey from "./keyboard-key";

export default function HowIWork() {
  const { ref } = useSectionInView("Process");
  const [step, setStep] = useState(0);
  const [shiftHeld, setShiftHeld] = useState(false);
  const [spacePressed, setSpacePressed] = useState(false);
  const keyboardActive = useKeyboardSection("Process");
  const pressTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const lastSpaceRef = useRef(0);

  const flashSpace = useCallback(() => {
    setSpacePressed(true);
    if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
    pressTimerRef.current = setTimeout(() => setSpacePressed(false), 100);
  }, []);

  const nextStep = useCallback(() => {
    setStep((s) => (s + 1) % workProcessData.length);
    flashSpace();
  }, [flashSpace]);

  useEffect(() => {
    if (!keyboardActive) setShiftHeld(false);
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
  }, [keyboardActive, nextStep]);

  const current = workProcessData[step];

  return (
    <section
      id="process"
      ref={ref}
      className="max-w-6xl mx-auto px-4 sm:px-5 py-16 sm:py-24 scroll-mt-28 sm:scroll-mt-36"
    >
      <SectionHeading subtitle="process">How I work</SectionHeading>

      <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 items-start">
        <div className="bg-surface border border-line p-5 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="font-mono text-xs text-muted">
              {shiftHeld ? "shift — behind the scenes" : "space — next phase"}
            </span>
          </div>

          <div className="min-h-[140px] sm:min-h-[160px]">
            <motion.div
              layout
              transition={{ layout: { duration: 0.2, ease: "easeOut" } }}
            >
              <p className="font-mono text-accent text-sm mb-2">
                Phase {current.phase}
              </p>
              <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
                {current.title}
              </h3>
              <p className="text-muted leading-relaxed text-base sm:text-lg">
                {shiftHeld ? current.detail : current.summary}
              </p>
            </motion.div>
          </div>

          <div className="flex gap-2 mt-8">
            {workProcessData.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className={`h-1 flex-1 transition-colors ${
                  i === step ? "bg-accent" : "bg-line"
                }`}
                aria-label={`Go to phase ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 w-full">
          <p className="font-mono text-xs text-muted text-center mb-2 hidden sm:block">
            Press{" "}
            <kbd className="px-1.5 py-0.5 bg-accent-dim text-accent rounded">
              Space
            </kbd>{" "}
            to advance, hold{" "}
            <kbd className="px-1.5 py-0.5 bg-accent-dim text-accent rounded">
              Shift
            </kbd>{" "}
            for details
          </p>
          <p className="font-mono text-xs text-muted text-center mb-2 sm:hidden">
            Tap keys below to explore
          </p>

          <div className="w-full max-w-md overflow-x-auto">
            <div className="min-w-[20rem] bg-[var(--key-bg)] border border-line rounded-xl p-4 sm:p-5 shadow-lg">
            <div className="flex gap-2 mb-2 justify-center flex-wrap">
              {["Q", "W", "E", "R", "T", "Y", "U"].map((k) => (
                <KeyboardKey key={k} label={k} />
              ))}
            </div>
            <div className="flex gap-2 mb-2 justify-center flex-wrap">
              {["A", "S", "D", "F", "G", "H", "J"].map((k) => (
                <KeyboardKey key={k} label={k} />
              ))}
            </div>
            <div className="flex gap-2 mb-3 items-center">
              <KeyboardKey
                label="Shift"
                wide
                active={shiftHeld}
                pressed={shiftHeld}
              />
              <div className="flex gap-2 flex-1 justify-center">
                {["Z", "X", "C", "V", "B"].map((k) => (
                  <KeyboardKey key={k} label={k} />
                ))}
              </div>
            </div>
            <KeyboardKey
              label="Space"
              sublabel="next phase"
              wide
              active={!shiftHeld}
              pressed={spacePressed}
              onClick={nextStep}
            />
            </div>
          </div>

          <button
            onClick={nextStep}
            className="mt-2 text-sm text-muted hover:text-accent font-mono transition-colors"
          >
            or tap here to advance →
          </button>
        </div>
      </div>
    </section>
  );
}
