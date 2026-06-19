import React from "react";
import { StaticImageData } from "next/image";
import { CgWorkAlt } from "react-icons/cg";
import { LuGraduationCap } from "react-icons/lu";
import { FaGithub, FaLink } from "react-icons/fa";
import { IconType } from "react-icons";
import pgone from "@/public/pgone.png";
import pgtwo from "@/public/pgtwo.png";
import roomcraft from "@/public/roomcraft.png";
import roomcraft_npm from "@/public/pgfour.png";
import blog_image from "@/public/blog.png";
import crictourn from "@/public/crictourn.png";

export const links = [
  { name: "Home", hash: "#home" },
  { name: "About", hash: "#about" },
  { name: "Process", hash: "#process" },
  { name: "Projects", hash: "#projects" },
  { name: "Skills", hash: "#skills" },
  { name: "Experience", hash: "#experience" },
  { name: "Contact", hash: "#contact" },
] as const;

export const experiencesData = [
  {
    title: "Software Engineer",
    location: "Tuvoc Technologies Pvt Ltd",
    description:
      "Building full-stack web applications with the MERN stack — React frontends, Node/Express APIs, and MongoDB. Shipping reusable components, integrating REST services, and working closely with the backend team on performance and scalability.",
    icon: React.createElement(CgWorkAlt),
    date: "July 2025 - Present",
  },
  {
    title: "MERN Stack Developer Intern",
    location: "Technowire Data Science Limited",
    description:
      "Developed a full-stack financial reporting app with React and Node.js. Built interactive dashboards to surface company product data in a clear, structured layout.",
    icon: React.createElement(CgWorkAlt),
    date: "April 2025 - July 2025",
  },
  {
    title: "BE - Computer Engineering",
    location: "LDRP Institute of Technology and Research, Gandhinagar, Gujarat",
    description:
      "CGPA: 8.18. Core focus on software development, data structures, and algorithms.",
    icon: React.createElement(LuGraduationCap),
    date: "October 2021 - April 2025",
  },
] as const;

export const workProcessData = [
  {
    phase: "01",
    title: "Listen first",
    summary: "I start by understanding the actual problem — who's affected, what already exists, and what success looks like.",
    detail:
      "Stakeholder calls, existing codebase review, user flows on paper. No code until the scope is clear.",
  },
  {
    phase: "02",
    title: "Sketch & scope",
    summary: "Wireframes, task breakdown, and a realistic timeline before touching production code.",
    detail:
      "Figma for UI when needed. Jira or a simple checklist for tasks. Edge cases get named early.",
  },
  {
    phase: "03",
    title: "Build in slices",
    summary: "Vertical slices over horizontal layers — ship something working end-to-end, then iterate.",
    detail:
      "MERN by default: MongoDB schema, Express routes, React components. PRs stay small and reviewable.",
  },
  {
    phase: "04",
    title: "Ship & learn",
    summary: "Deploy, watch real usage, fix what breaks, document what stuck.",
    detail:
      "Monitoring, quick hotfixes, retro notes. The loop closes when the feature works for real users.",
  },
  {
    phase: "05",
    title: "AI as my assistant",
    summary:
      "I pair with AI tools daily — for research, boilerplate, and debugging — while I stay in the driver's seat.",
    detail:
      "Cursor and ChatGPT are part of my workflow, like a sharp teammate who never sleeps. I use them to explore options and move faster, but I review every change, own the architecture, and make the final call.",
  },
] as const;

interface ProjectLink {
  icon: IconType;
  url: string;
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  imageUrl: StaticImageData;
  links: ProjectLink[];
}

export const projectsData: Project[] = [
  {
    title: "CricTourn",
    description:
      "Cricket tournament management platform — teams, players, live auctions, fixtures, scoring, and points tables from one dashboard. Used to run a real-world tournament.",
    tags: ["React", "Node.js", "MongoDB", "Tailwind"],
    imageUrl: crictourn,
    links: [
      { icon: FaLink, url: "https://league.crictourn.space/" },
    ],
  },
  {
    title: "Blogging Platform",
    description:
      "Full-stack blogging platform with auth, post CRUD, comments, and search. Vite + React, Tailwind, Node.js, MongoDB.",
    tags: ["React", "Vite", "Tailwind", "Node.js", "MongoDB"],
    imageUrl: blog_image,
    links: [
      { icon: FaGithub, url: "https://github.com/rajand2510/blog-platform" },
      { icon: FaLink, url: "https://chapter-5-blog.vercel.app/" },
    ],
  },
  {
    title: "NPM — roomcraft",
    description:
      "3D & AR product viewing for eCommerce — immersive shopping without leaving the browser.",
    tags: ["React", "NodeJs", "MongoDB", "Tailwind"],
    imageUrl: roomcraft_npm,
    links: [
      { icon: FaGithub, url: "https://github.com/rajand2510/npm-roomcraft" },
      { icon: FaLink, url: "https://roomcraft.netlify.app/" },
    ],
  },
  {
    title: "Room Craft",
    description:
      "eCommerce platform for home decor with 3D and AR product previews.",
    tags: ["React", "NodeJs", "MongoDB", "Tailwind"],
    imageUrl: roomcraft,
    links: [
      { icon: FaGithub, url: "https://github.com/rajand2510/RoomCraft" },
      { icon: FaLink, url: "https://roomcraft-2.onrender.com/" },
    ],
  },
  {
    title: "Pixelslim — Image Compression",
    description:
      "Client-side image compression in the browser — fast, private, no uploads required.",
    tags: ["React", "browser-image-compression", "CSS"],
    imageUrl: pgone,
    links: [
      { icon: FaGithub, url: "https://github.com/rajand2510/pixel-slim-image-compressor" },
      { icon: FaLink, url: "https://pixel-slim-image-compressor.vercel.app/" },
    ],
  },
  {
    title: "Virtual Community",
    description:
      "Social-work event platform for community collaboration and participation tracking.",
    tags: ["Angular", "Dotnet", "PostgreSQL", "Tailwind"],
    imageUrl: pgtwo,
    links: [
      { icon: FaGithub, url: "https://github.com/rajand2510/tatvasoft_internship/tree/master/Final" },
    ],
  },
];

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "Java",
  "React",
  "Next.js",
  "Figma",
  "Node.js",
  "Git",
  "Tailwind",
  "MongoDB",
  "PostgreSQL",
  "Redis",
] as const;
