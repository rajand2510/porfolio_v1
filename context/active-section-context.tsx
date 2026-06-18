"use client";

import type { SectionName } from "@/lib/types";
import { links } from "@/lib/data";
import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";

type ActiveSectionContextProviderProps = {
  children: React.ReactNode;
};

type ActiveSectionContextType = {
  activeSection: SectionName;
  setActiveSection: React.Dispatch<React.SetStateAction<SectionName>>;
  timeOfLastClick: number;
  setTimeOfLastClick: React.Dispatch<React.SetStateAction<number>>;
};

export const ActiveSectionContext =
  createContext<ActiveSectionContextType | null>(null);

const SCROLL_SPY_OFFSET = 140;

export default function ActiveSectionContextProvider({
  children,
}: ActiveSectionContextProviderProps) {
  const [activeSection, setActiveSection] = useState<SectionName>("Home");
  const [timeOfLastClick, setTimeOfLastClick] = useState(0);
  const timeOfLastClickRef = useRef(timeOfLastClick);

  timeOfLastClickRef.current = timeOfLastClick;

  useEffect(() => {
    const updateActiveSection = () => {
      if (Date.now() - timeOfLastClickRef.current < 1000) return;

      let current: SectionName = links[0].name;

      for (const link of links) {
        const el = document.getElementById(link.hash.slice(1));
        if (!el) continue;

        const { top } = el.getBoundingClientRect();
        if (top <= SCROLL_SPY_OFFSET) {
          current = link.name;
        }
      }

      setActiveSection((prev) => (prev === current ? prev : current));
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <ActiveSectionContext.Provider
      value={{
        activeSection,
        setActiveSection,
        timeOfLastClick,
        setTimeOfLastClick,
      }}
    >
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSectionContext() {
  const context = useContext(ActiveSectionContext);
  if (context === null) {
    throw new Error(
      "useActiveSectionContext must be used within an ActiveSectionContextProvider"
    );
  }
  return context;
}
