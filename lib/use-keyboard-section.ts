"use client";

import { useActiveSectionContext } from "@/context/active-section-context";
import type { SectionName } from "@/lib/types";

export function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

/** Only true when this nav section is the one currently in view (scroll spy). */
export function useKeyboardSection(section: SectionName) {
  const { activeSection } = useActiveSectionContext();
  return activeSection === section;
}
