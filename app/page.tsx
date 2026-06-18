import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import HowIWork from "@/components/how-i-work";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import Skills from "@/components/skills";

export default function Home() {
  return (
    <main className="pt-20 sm:pt-28">
      <Intro />
      <About />
      <HowIWork />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
}
