"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const primarySkills = [
    "React", "Next.js", "TypeScript", "GSAP", "TailwindCSS", "Node.js"
];

const secondarySkills = [
    "PostgreSQL", "MongoDB", "Three.js", "Figma", "Framer Motion", "Express", "Docker", "GraphQL", "WebRTC"
];

export default function Skills() {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Removed .skill-border animation as the element does not exist

            gsap.from(".skill-text", {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 75%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.5
            });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={container}
            className="py-32 lg:py-48 relative w-full border-t border-border-light bg-bg-primary overflow-hidden"
        >
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
                <div className="flex flex-col mb-16">
                    <span className="text-text-secondary font-bold tracking-widest text-xs uppercase mb-4 block">
                        [05] Capabilities
                    </span>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-text-primary leading-[0.9]">
                        Technical <br /> Arsenal.
                    </h2>
                </div>

                {/* Primary Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-border-light">
                    {primarySkills.map((skill, idx) => (
                        <div 
                            key={idx} 
                            className="group relative p-12 lg:p-16 border-b border-r border-border-light flex items-center justify-center overflow-hidden hover:bg-text-primary transition-colors duration-500 cursor-default"
                        >
                            <h3 className="skill-text text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-text-primary group-hover:text-bg-primary transition-colors duration-500 relative z-10">
                                {skill}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>

            {/* Continuous Marquee for Secondary Skills */}
            <div className="mt-32 border-y border-border-light py-8 bg-bg-secondary overflow-hidden flex whitespace-nowrap">
                <div className="animate-marquee inline-flex items-center gap-12 px-6">
                    {secondarySkills.map((skill, i) => (
                        <div key={`marquee1-${i}`} className="flex items-center gap-12">
                            <span className="text-2xl font-bold uppercase tracking-widest text-text-secondary">
                                {skill}
                            </span>
                            <span className="w-2 h-2 bg-text-secondary rounded-full"></span>
                        </div>
                    ))}
                    {secondarySkills.map((skill, i) => (
                        <div key={`marquee2-${i}`} className="flex items-center gap-12">
                            <span className="text-2xl font-bold uppercase tracking-widest text-text-secondary">
                                {skill}
                            </span>
                            <span className="w-2 h-2 bg-text-secondary rounded-full"></span>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Infinite Marquee CSS directly injected for simplicity */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 20s linear infinite;
                    width: max-content;
                }
            `}} />
        </section>
    );
}
