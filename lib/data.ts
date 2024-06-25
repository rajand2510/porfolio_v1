import React from "react";
import { StaticImageData } from 'next/image';
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import { FaGithub, FaFigma } from "react-icons/fa";
import { IconType } from "react-icons";
import pgone from "@/public/pgone.png";
import pgtwo from "@/public/pgtwo.png";
import oneonic from "@/public/oneonic.png";
import pgthree from "@/public/pgthree.png";
export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Full-Stack Development Intern",
    location: "Tatvasoft",
    description:
      "Developed web applications using Angular, .NET, and PostgreSQL. Designed and optimized PostgreSQL databases with complex SQL queries. Created and integrated RESTful APIs using .NET.",
    icon: React.createElement(FaReact),
    date: "May 2024 - June 2024",
  },
  {
    title: "Front-End Intern",
    location: "Edunet Foundation-IBM Skill build",
    description:
      "Mastered HTML, CSS, and JavaScript during internship. Built responsive web pages with dynamic features.",
    icon: React.createElement(CgWorkAlt),
    date: "June 2023 - July 2023",
  },
  {
    title: "BE - Computer Engineering",
    location: "LDRP institute of technology and research Gandhinagr, Gujarat",
    description:
      " Current CPI: 7.70 Gained comprehensive knowledge in software development, data structures, algorithms.",
    icon: React.createElement(LuGraduationCap),
    date: "October 2021 - Present",
  }
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
    title: "Virtual Community",
    description:
      "This project will involve actively participating in various social work community events, allowing me to gain firsthand experience in how these events foster collaboration",
    tags: ["Angular", "Dotnet", "PostgreSQL", "Tailwind"],
    imageUrl: pgtwo,
    links: [
      {
        icon: FaGithub,
        url: "https://github.com/yourusername/virtual-community",
      },
    ],
  },
  {
    title: "UI-OneOnic Solutions",
    description:
      "I led UI design for Onic Solution, crafting intuitive interfaces for user engagement.",
    tags: ["Figma"],
    imageUrl: oneonic,
    links: [
      {
        icon: FaFigma,
        url: "https://www.figma.com/file/yourfile",
      },
    ],
  },
  {
    title: "Pixelslim-Image Compression",
    description:
      "Pixel Slim is a React web app that shrinks images using advanced libraries for a smooth user experience.",
    tags: ["React", "browser-image-compression", "Css"],
    imageUrl: pgone,
    links: [
      {
        icon: FaGithub,
        url: "https://github.com/yourusername/pixelslim",
      },
    ],
  },
  {
    title: "VR-UI",
    description:
      "I crafted a cutting-edge user interface tailored specifically for Virtual Reality environments",
    tags: ["Figma"],
    imageUrl: pgthree,
    links: [
      {
        icon: FaFigma,
        url: "https://www.figma.com/file/anotherfile",
      },
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
  "DotNet",
  "Tailwind",
  "MongoDB",
  "PostgreSQL",
] as const;
