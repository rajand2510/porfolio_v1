import Header from "@/components/header";
import DevToolsEasterEgg from "@/components/devtools-easter-egg";
import "./globals.css";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";
import ThemeContextProvider from "@/context/theme-context";
import Toaster from "@/components/toaster";
import { inspectComment } from "@/lib/dev-profile";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata = {
  title: "Rajan Dhariyaparmar — Software Engineer",
  description: "Software Engineer building with the MERN stack.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <script
          id="devtools-profile"
          type="text/plain"
          dangerouslySetInnerHTML={{ __html: inspectComment }}
        />
      </head>
      <body
        className={`${syne.variable} ${dmSans.variable} ${jetbrains.variable} font-body bg-[var(--bg)] text-ink relative antialiased`}
      >
        <DevToolsEasterEgg />
        <div className="fixed inset-0 grid-bg pointer-events-none -z-10" />
        <div className="fixed top-0 right-0 w-[40vw] h-[50vh] bg-accent/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <Header />
            {children}
            <Footer />
            <Toaster />
            <ThemeSwitch />
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
