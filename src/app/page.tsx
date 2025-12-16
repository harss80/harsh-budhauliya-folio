"use client";

import { useState } from "react";
import CinematicIntro from "@/components/CinematicIntro";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import TimelineSection from "@/components/TimelineSection";
import Projects from "@/components/Projects";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Services from "@/components/Services";
import Contact from "@/components/Contact";

export default function HomePage() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <main className="relative bg-cinema-bg min-h-screen text-white overflow-hidden selection:bg-cinema-gold selection:text-black">

      {/* Cinematic Intro Sequence */}
      {!introComplete && (
        <CinematicIntro onComplete={() => setIntroComplete(true)} />
      )}

      {/* Main Movie Content */}
      <div className={`transition-opacity duration-1000 ${introComplete ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}>

        {/* Scene 1: The Opening (Hero) */}
        <div id="home">
          <Hero />
        </div>

        {/* Scene 2: Quick Stats Impact */}
        <div className="relative z-10 border-t border-zinc-800">
          <StatsSection />
        </div>

        {/* Scene 3: The Origin Story (About) */}
        <div id="about" className="relative z-10">
          <About />
        </div>

        {/* Scene 4: The Arsenal (Skills) */}
        <div id="skills" className="relative z-10">
          <TechStackSeparator />
          <Skills />
        </div>

        {/* Scene 5: Experience Timeline */}
        <div className="relative z-10">
          <TimelineSection />
        </div>

        {/* Scene 6: Featured Films (Projects) */}
        <div id="projects" className="relative z-10">
          <Projects />
        </div>

        {/* Scene 7: Production Services (Services) */}
        <div id="services" className="relative z-10">
          <Services />
        </div>

        {/* Scene 8: Testimonials */}
        <div className="relative z-10">
          <TestimonialsSection />
        </div>

        {/* Scene 9: The Finale (Contact) */}
        <div id="contact" className="relative z-10">
          <Contact />
        </div>
      </div>
    </main>
  );
}

function TechStackSeparator() {
  return (
    <div className="w-full h-24 bg-cinema-bg flex items-center overflow-hidden border-y border-zinc-800 relative z-20">
      <div className="absolute inset-0 bg-white/5"></div>
      <div className="whitespace-nowrap animate-marquee font-mono text-cinema-gold/30 text-4xl font-bold uppercase select-none">
        React • Next.js • TypeScript • Node.js • GraphQL • Tailwind • GSAP • Three.js • AWS • Docker • React • Next.js • TypeScript • Node.js
      </div>
      <style jsx>{`
                .animate-marquee {
                    animation: marquee 20s linear infinite;
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
    </div>
  )
}
