"use client";

import { useTheme } from "@/context/theme-context";
import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="fixed bottom-20 sm:bottom-5 right-4 sm:right-5 w-11 h-11 border border-line bg-surface flex items-center justify-center hover:border-accent hover:text-accent transition-colors z-50 shadow-md"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === "light" ? <BsSun size={16} /> : <BsMoon size={16} />}
    </button>
  );
}
