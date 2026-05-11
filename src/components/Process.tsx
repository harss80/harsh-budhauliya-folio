"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const processes = [
    {
        number: "01",
        title: "Discovery & Strategy",
        description: "Understanding the core problem. Defining the architecture, technology stack, and setting strict performance targets before a single line of code is written."
    },
    {
        number: "02",
        title: "Design & Prototyping",
        description: "Translating wireframes into high-fidelity, interactive prototypes. Ensuring every component aligns perfectly with the overarching structural aesthetic."
    },
    {
        number: "03",
        title: "Engineering Execution",
        description: "Building the application with extreme precision. Utilizing React, Next.js, and advanced GSAP techniques to ensure the final product is both beautiful and robust."
    },
    {
        number: "04",
        title: "Deployment & Polish",
        description: "Rigorous testing across devices. Optimizing web vitals, refining micro-interactions, and launching a flawless, high-performance product."
    }
];

export default function Process() {
    const container = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            const ctx = gsap.context(() => {
                // Animate the central vertical line drawing down
                if (lineRef.current) {
                    gsap.fromTo(lineRef.current,
                        { scaleY: 0 },
                        {
                            scaleY: 1,
                            ease: "none",
                            scrollTrigger: {
                                trigger: container.current,
                                start: "top center",
                                end: "bottom center",
                                scrub: true,
                                invalidateOnRefresh: true,
                            }
                        }
                    );
                }

                // Animate each process block revealing
                gsap.utils.toArray<HTMLElement>(".process-block").forEach((block, i) => {
                    const direction = i % 2 === 0 ? -50 : 50;
                    gsap.fromTo(block,
                        { opacity: 0, x: direction },
                        {
                            opacity: 1,
                            x: 0,
                            duration: 1,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: block,
                                start: "top 75%",
                                invalidateOnRefresh: true,
                            }
                        }
                    );
                });
            }, container);
            return () => ctx.revert();
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section ref={container} className="py-32 relative max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 w-full border-t border-border-light bg-bg-primary overflow-hidden">
            <div className="flex flex-col mb-24 items-center text-center">
                <span className="text-text-secondary font-bold tracking-widest text-xs uppercase mb-4 block">
                    [03] Methodology
                </span>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-text-primary leading-[0.9]">
                    My <br /> Approach.
                </h2>
            </div>

            <div className="relative w-full max-w-5xl mx-auto">
                {/* Background thin line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-border-light -translate-x-1/2 z-0"></div>
                
                {/* Animated active line */}
                <div 
                    ref={lineRef} 
                    className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[3px] bg-text-primary origin-top -translate-x-1/2 z-10"
                ></div>

                <div className="flex flex-col gap-12 md:gap-24 relative z-20">
                    {processes.map((step, idx) => (
                        <div key={idx} className={`process-block flex flex-col md:flex-row items-center gap-8 md:gap-16 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                            
                            {/* Content Side */}
                            <div className="w-full pl-12 md:pl-0 md:w-1/2 flex flex-col">
                                <div className={`panel p-8 md:p-12 hover:bg-bg-secondary transition-colors ${idx % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                                    <span className="text-text-secondary font-bold tracking-widest text-sm uppercase mb-4 block">
                                        Step {step.number}
                                    </span>
                                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-text-primary mb-6">
                                        {step.title}
                                    </h3>
                                    <p className="text-lg md:text-xl font-light text-text-secondary leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Empty Side for layout */}
                            <div className="hidden md:block w-1/2"></div>
                            
                            {/* Center Dot */}
                            <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-bg-primary border-4 border-text-primary -translate-x-1/2 mt-8 md:mt-0 shadow-[0_0_0_8px_var(--bg-primary)]"></div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
