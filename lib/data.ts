import React from "react";
import { StaticImageData } from "next/image";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import { FaGithub, FaFigma, FaLink } from "react-icons/fa";
import { IconType } from "react-icons";
import pgone from "@/public/pgone.png";
import pgtwo from "@/public/pgtwo.png";
import oneonic from "@/public/oneonic.png";
import pgthree from "@/public/pgthree.png";
import roomcraft from "@/public/roomcraft.png";
import roomcraft_npm from "@/public/pgfour.png";
import blog_image from "@/public/blog.png";
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
    title: "MERN Stack Developer Intern",
    location: "Technowire data science limited",
    description:
      "A full-stack web application built with React and Node.js, focused on financial product reporting. The platform displays detailed information about a company's products and services, providing a structured and interactive user experience.",
    icon: React.createElement(FaReact),
    date: "April 2025 - Present",
  },
  {
    title: "Full-Stack Development Intern",
    location: "Tatvasoft",
    description:
      "Developed web applications using React, .NET, and PostgreSQL. Designed and optimized PostgreSQL databases with complex SQL queries. Created and integrated RESTful APIs using .NET.",
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
    date: "October 2021 - April 2025",
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
    title: "Blogging Platform",
    description:
      "A full-stack blogging platform with authentication, post creation/editing, commenting, and search functionality. Built with Vite + React, Tailwind CSS, Node.js, and MongoDB.",
    tags: ["React", "Vite", "Tailwind", "Node.js", "MongoDB"],
    imageUrl: blog_image, // Replace with your actual image import
    links: [
      {
        icon: FaGithub,
        url: "https://github.com/rajand2510/blog-platform", // Replace with actual repo if different
      },
      {
        icon: FaLink, // Optional external link icon
        url: "https://chapter-5-blog.vercel.app/",
      },
    ],
  },
  {
    title: " NPM - roomcraft",
    description:
      "RoomCraft: Seamless 3D & AR product viewing, enhancing eCommerce with interactive, immersive shopping experiences.",
    tags: ["React", "NodeJs", "MongoDB", "Tailwind"],
    imageUrl: roomcraft_npm,
    links: [
      {
        icon: FaGithub,
        url: "https://github.com/rajand2510/npm-roomcraft",
      },
      {
        icon: FaLink,
        url: "https://roomcraft.netlify.app/",
      },
    ],
  },
  {
    title: " Room Craft",
    description:
      "Roomcraft is an innovative e-commerce platform for exploring and purchasing home decor items with 3D and AR views.",
    tags: ["React", "NodeJs", "MongoDB", "Tailwind"],
    imageUrl: roomcraft,
    links: [
      {
        icon: FaGithub,
        url: "https://github.com/rajand2510/RoomCraft",
      },
      {
        icon: FaLink,
        url: "https://roomcraft-2.onrender.com/",
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
        url: "https://github.com/rajand2510/pixel-slim-image-compressor",
      },
       {
        icon: FaLink,
        url: "https://pixel-slim-image-compressor.vercel.app/",
      },
    ],
  },
  {
    title: "Virtual Community",
    description:
      "This project will involve participating in social work events to gain firsthand experience in collaboration",
    tags: ["Angular", "Dotnet", "PostgreSQL", "Tailwind"],
    imageUrl: pgtwo,
    links: [
      {
        icon: FaGithub,
        url: "https://github.com/rajand2510/tatvasoft_internship/tree/master/Final",
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
        url: "https://www.figma.com/design/uO6LscGFCLI30otBkeljFC/Oneonic?node-id=0-1",
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
        url: "https://www.figma.com/community/file/1387491949884101289/vr-app",
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
