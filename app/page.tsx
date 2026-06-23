import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import HowIWork from "@/components/how-i-work";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import Skills from "@/components/skills";

export default function Home() {
  return (
    <main className="pt-16 lg:pt-20 overflow-x-hidden">
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
