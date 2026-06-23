"use client";

import Image from "next/image";
import { useEffect } from "react";
import { devProfile } from "@/lib/dev-profile";

const accent = "#d94f2b";
const ink = "#1a1a1a";
const muted = "#5c5c5c";

const CONSOLE_IMAGE_SCALE = 0.55;

function buildConsoleImageStyle(dataUrl: string, w: number, h: number) {
  return [
    "font-size:1px",
    "line-height:1px",
    `padding:${h / 2}px ${w / 2}px`,
    `background:url(${dataUrl}) no-repeat top center`,
    "background-size:cover",
    "border:1px solid rgba(26,26,26,0.2)",
  ].join(";");
}

/** Draw same crop as hero: object-cover + object-top, grayscale */
async function loadProfileImageDataUrl(): Promise<string | null> {
  try {
    const imageUrl = `${window.location.origin}${devProfile.image}`;
    const response = await fetch(imageUrl);
    if (!response.ok) return null;

    const blob = await response.blob();
    const bitmap = await createImageBitmap(blob);

    const w = Math.round(devProfile.imageWidth * CONSOLE_IMAGE_SCALE);
    const h = Math.round(devProfile.imageHeight * CONSOLE_IMAGE_SCALE);

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const scale = Math.max(w / bitmap.width, h / bitmap.height);
    const drawW = bitmap.width * scale;
    const drawH = bitmap.height * scale;
    const drawX = (w - drawW) / 2;
    const drawY = 0;

    ctx.filter = "grayscale(100%)";
    ctx.drawImage(bitmap, drawX, drawY, drawW, drawH);
    bitmap.close();

    return canvas.toDataURL("image/jpeg", 0.92);
  } catch {
    return null;
  }
}

function respondToHi() {
  console.log(
    `%c👋 Hey! Great to meet a fellow developer.\n\n` +
      `I'm ${devProfile.name} — ${devProfile.role}.\n` +
      `📧 ${devProfile.email}\n` +
      `🔗 ${devProfile.linkedin}\n\n` +
      `Let's build something cool together!`,
    `font-size:13px;line-height:1.6;color:${ink};font-family:system-ui,sans-serif;`
  );
  console.log(
    `%c→ Scroll to #contact on this page or email me directly.`,
    `font-size:12px;color:${accent};font-family:monospace;`
  );
  return "👋 Thanks for saying hi!";
}

function setupHiEasterEgg() {
  const trigger = () => {
    respondToHi();
    return "👋 Thanks for saying hi!";
  };

  for (const key of ["hi", "hello", "hey"]) {
    Object.defineProperty(window, key, {
      get: trigger,
      configurable: true,
    });
  }
}

async function logDevConsoleProfile() {
  if (typeof window === "undefined") return;

  const origin = window.location.origin;
  const dataUrl = await loadProfileImageDataUrl();

  const w = Math.round(devProfile.imageWidth * CONSOLE_IMAGE_SCALE);
  const h = Math.round(devProfile.imageHeight * CONSOLE_IMAGE_SCALE);

  if (dataUrl) {
    console.log("%c ", buildConsoleImageStyle(dataUrl, w, h));
  } else {
    console.log(
      `%c[photo: ${devProfile.image}]`,
      `font-size:12px;color:${muted};font-family:monospace;`
    );
  }

  console.log(
    `%c${devProfile.name}`,
    `font-size:22px;font-weight:800;color:${accent};font-family:system-ui,sans-serif;`
  );

  console.log(
    `%c${devProfile.role} · ${devProfile.stack}`,
    `font-size:13px;color:${muted};font-family:monospace;`
  );

  console.log(
    `%c${devProfile.tagline}`,
    `font-size:12px;color:${ink};font-family:system-ui,sans-serif;margin-top:8px;`
  );

  console.table({
    Company: devProfile.company,
    Location: devProfile.location,
    Education: devProfile.education,
    CGPA: devProfile.cgpa,
    Projects: devProfile.projects,
    Email: devProfile.email,
  });

  console.log(
    "%cLinks",
    `font-size:11px;font-weight:700;color:${accent};text-transform:uppercase;letter-spacing:0.08em;`
  );
  console.log(`  GitHub   → ${devProfile.github}`);
  console.log(`  LinkedIn → ${devProfile.linkedin}`);
  console.log(`  Resume   → ${devProfile.resume}`);
  console.log(`  Contact  → ${origin}/#contact`);

  console.log(
    "%c✦ Curious mind detected. Want to build something together?",
    `font-size:12px;color:${accent};font-family:monospace;padding:8px 0 4px;`
  );
  console.log(
    "%c→ Type %c hi %cand press Enter ↵",
    `font-size:12px;color:${muted};font-family:monospace;`,
    `font-size:13px;font-weight:700;color:${accent};font-family:monospace;background:${accent}18;padding:2px 6px;`,
    `font-size:12px;color:${muted};font-family:monospace;`
  );

  setupHiEasterEgg();
}

export default function DevToolsEasterEgg() {
  useEffect(() => {
    logDevConsoleProfile();
  }, []);

  return (
    <div id="dev-profile" hidden aria-hidden="true" data-profile="rajan-dhariyaparmar">
      <figure data-hero-image>
        <Image
          src={devProfile.image}
          alt={devProfile.name}
          width={devProfile.imageWidth}
          height={devProfile.imageHeight}
          quality={95}
        />
        <figcaption>{devProfile.name}</figcaption>
      </figure>
      <dl>
        <dt>name</dt>
        <dd>{devProfile.name}</dd>
        <dt>role</dt>
        <dd>
          {devProfile.role} · {devProfile.stack}
        </dd>
        <dt>company</dt>
        <dd>{devProfile.company}</dd>
        <dt>location</dt>
        <dd>{devProfile.location}</dd>
        <dt>email</dt>
        <dd>{devProfile.email}</dd>
        <dt>github</dt>
        <dd>{devProfile.github}</dd>
        <dt>linkedin</dt>
        <dd>{devProfile.linkedin}</dd>
        <dt>skills</dt>
        <dd>{devProfile.skills.join(", ")}</dd>
        <dt>image</dt>
        <dd>{devProfile.image}</dd>
      </dl>
    </div>
  );
}
