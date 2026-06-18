"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";
import { HiMenuAlt3, HiX } from "react-icons/hi";

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (name: (typeof links)[number]["name"]) => {
    setActiveSection(name);
    setTimeOfLastClick(Date.now());
    setMobileOpen(false);
  };

  return (
    <header className="z-[999] relative">
      {/* Desktop — single pill wraps background + links */}
      <motion.nav
        className="hidden lg:flex fixed top-5 left-1/2 -translate-x-1/2 z-[1000] h-12 items-center rounded-full border border-line bg-[var(--bg)]/90 backdrop-blur-md shadow-lg shadow-black/[0.05] px-1.5 max-w-[calc(100vw-2rem)]"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        aria-label="Main navigation"
      >
        <ul className="flex items-center justify-center min-w-0 h-full">
          {links.map((link, index) => (
            <li key={link.hash} className="relative h-full flex items-center">
              {activeSection === link.name && (
                <motion.span
                  layoutId="navPill"
                  className="absolute inset-x-0 inset-y-1 bg-ink rounded-full dark:bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Link
                className={clsx(
                  "relative z-10 flex items-center h-full px-2.5 xl:px-3 text-[0.72rem] xl:text-[0.8rem] font-medium rounded-full whitespace-nowrap transition-colors duration-200",
                  activeSection === link.name
                    ? "text-white"
                    : "text-muted hover:text-ink"
                )}
                href={link.hash}
                onClick={() => handleNavClick(link.name)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </motion.nav>

      {/* Mobile / tablet bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-[1000] h-14 border-b border-line bg-[var(--bg)]/90 backdrop-blur-md">
        <nav className="flex h-full items-center justify-between px-5">
          <Link
            href="#home"
            onClick={() => handleNavClick("Home")}
            className="font-display font-bold text-lg"
          >
            RD<span className="text-accent">.</span>
          </Link>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="p-2 rounded-full border border-line bg-surface"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-[998] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-14 left-4 right-4 z-[999] lg:hidden bg-surface border border-line rounded-2xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <ul className="p-2">
                {links.map((link, index) => (
                  <motion.li
                    key={link.hash}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <Link
                      href={link.hash}
                      onClick={() => handleNavClick(link.name)}
                      className={clsx(
                        "flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium transition-colors",
                        activeSection === link.name
                          ? "bg-accent text-white"
                          : "text-ink hover:bg-accent-dim"
                      )}
                    >
                      {link.name}
                      {activeSection === link.name && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
