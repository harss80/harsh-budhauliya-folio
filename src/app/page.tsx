import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Stats from "@/components/Stats";
import TimelineSection from "@/components/TimelineSection";
import Services from "@/components/Services";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-bg-primary">
      <div className="relative z-10 w-full block">
        <Hero />
        <Stats />
        <Projects />
        <Skills />
        <Process />
        <TimelineSection />
        <Services />
        <About />
        <Contact />
      </div>
    </main>
  );
}
