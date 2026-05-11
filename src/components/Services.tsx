"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        number: "01",
        title: "Frontend Architecture",
        description: "Designing and building robust, scalable client-side applications. Focusing on component-driven development and strict typing with React, Next.js, and TypeScript.",
    },
    {
        number: "02",
        title: "Creative Development",
        description: "Elevating web experiences from static pages to interactive masterpieces. Implementing physics-based animations, precise DOM manipulation, and WebGL elements using GSAP and Three.js.",
    },
    {
        number: "03",
        title: "UI/UX Engineering",
        description: "Bridging the gap between design and engineering. Ensuring every pixel, interaction, and layout structure matches the original high-fidelity Figma designs flawlessly.",
    },
];

export default function Services() {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Fade in and slide up each service item
            gsap.utils.toArray<HTMLElement>(".service-item").forEach((item) => {
                gsap.fromTo(item,
                    { opacity: 0, y: 100 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 80%",
                        }
                    }
                );
            });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="relative w-full bg-text-primary text-bg-primary">
            <div className="grid grid-cols-1 lg:grid-cols-12 max-w-[1440px] mx-auto min-h-screen relative">
                
                {/* Left Pinned Column (Native CSS Sticky) */}
                <div className="lg:col-span-5 hidden lg:flex flex-col justify-center h-screen border-r border-bg-primary/20 p-12 lg:p-24 sticky top-0">
                    <h2 className="text-[8vw] lg:text-[6vw] font-black uppercase tracking-tighter leading-[0.9]">
                        Technical <br /> Expertise.
                    </h2>
                </div>

                {/* Mobile Title (hidden on desktop) */}
                <div className="lg:hidden p-6 pt-24 border-b border-bg-primary/20">
                    <h2 className="text-6xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
                        Technical <br /> Expertise.
                    </h2>
                </div>

                {/* Right Scrolling Content */}
                <div className="lg:col-span-7 flex flex-col">
                    {services.map((item, idx) => (
                        <div 
                            key={idx} 
                            className="service-item flex flex-col lg:flex-row gap-6 lg:gap-12 p-6 md:p-12 lg:p-24 border-b border-bg-primary/20 group hover:bg-black/5 transition-colors duration-500"
                        >
                            <span className="text-xl md:text-2xl font-bold opacity-30">
                                {item.number}
                            </span>
                            <div className="flex flex-col gap-6">
                                <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">
                                    {item.title}
                                </h3>
                                <p className="text-lg md:text-xl font-light leading-relaxed opacity-80 max-w-xl">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                    
                    {/* Padding block to allow the last item to scroll into view fully before unpinning */}
                    <div className="h-[20vh] lg:h-[40vh] border-b border-bg-primary/20"></div>
                </div>
            </div>
        </section>
    );
}
