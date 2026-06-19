import React from "react";

type SectionHeadingProps = {
  children: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  children,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={`mb-8 sm:mb-12 ${align === "center" ? "text-center" : ""}`}>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
        {subtitle ?? "section"}
      </p>
      <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink">
        {children}
      </h2>
    </div>
  );
}
