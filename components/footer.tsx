import React from "react";

export default function Footer() {
  return (
    <footer className="max-w-6xl mx-auto px-5 py-12 border-t border-line">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-muted">
        <p>
          &copy; {new Date().getFullYear()} Rajan Dhariyaparmar
        </p>
        <p className="font-mono text-xs">
          Next.js · TypeScript · Tailwind
        </p>
      </div>
    </footer>
  );
}
