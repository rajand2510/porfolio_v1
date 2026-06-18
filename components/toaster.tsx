"use client";

import { Toaster as Sonner } from "sonner";
import { useTheme } from "@/context/theme-context";

export default function Toaster() {
  const { theme } = useTheme();

  return <Sonner theme={theme} position="bottom-right" />;
}
