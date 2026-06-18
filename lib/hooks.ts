import { useRef } from "react";
import type { SectionName } from "./types";

export function useSectionInView(_sectionName?: SectionName) {
  const ref = useRef<HTMLElement>(null);
  return { ref };
}
