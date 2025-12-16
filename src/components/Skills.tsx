"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
    {
        category: "Frontend Magic",
        items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
        icon: "🎬"
    },
    {
        category: "Backend Power",
        items: ["Node.js", "Express", "MongoDB", "REST APIs"],
        icon: "⚡"
    },
    {
        category: "Design Artistry",
        items: ["UI/UX", "Figma", "GSAP", "Framer Motion"],
        icon: "🎨"
    },
    {
        category: "Performance",
        items: ["SEO", "Core Web Vitals", "Optimization", "Analytics"],
        icon: "🚀"
    },
];

export default function Skills() {
    const container = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Cards fade up simply
            gsap.set(".skill-category", { opacity: 0, y: 30 }); // Initial State

            ScrollTrigger.batch(".skill-category", {
                start: "top 85%",
                onEnter: (batch) => {
                    gsap.to(batch, {
                        opacity: 1,
                        y: 0,
                        stagger: 0.1,
                        duration: 0.8,
                        ease: "power2.out",
                        overwrite: true
                    });
                },
                once: true
            });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={container}
            className="py-24 px-4 relative overflow-hidden bg-cinema-bg"
        >
            {/* Background Texture */}
            <div className="absolute inset-0 cinema-grain" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <span className="text-cinema-gold font-heading tracking-[0.5em] text-sm uppercase">
                        ★ Scene 3 ★
                    </span>
                    <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl mt-4 text-white uppercase tracking-wider">
                        PRODUCTION GEAR
                    </h2>
                    <div className="w-24 h-[1px] mx-auto mt-6 bg-gradient-to-r from-transparent via-cinema-gold to-transparent" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {skills.map((group, idx) => (
                        <div
                            key={idx}
                            className="skill-category p-8 bg-zinc-950 border border-zinc-800 relative group overflow-hidden"
                        >
                            {/* Metal Corners */}
                            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-zinc-700" />
                            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-zinc-700" />
                            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-zinc-700" />
                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-zinc-700" />

                            {/* Background Number */}
                            <span className="absolute -right-4 -bottom-8 text-9xl font-heading text-zinc-900 group-hover:text-zinc-800 transition-colors pointer-events-none select-none">
                                0{idx + 1}
                            </span>

                            {/* Icon */}
                            <div className="relative z-10 text-4xl mb-6 text-cinema-gray group-hover:text-cinema-gold transition-colors duration-500 transform group-hover:scale-110 origin-left">
                                {group.icon}
                            </div>

                            {/* Category Title */}
                            <h3 className="relative z-10 text-white font-heading text-xl mb-6 uppercase tracking-widest border-b border-zinc-800 pb-4 group-hover:border-cinema-gold/50 transition-colors">
                                {group.category}
                            </h3>

                            {/* Skills List */}
                            <ul className="relative z-10 space-y-3">
                                {group.items.map((item, i) => (
                                    <li
                                        key={i}
                                        className="skill-item flex items-center gap-3"
                                    >
                                        <span className="w-1 h-1 bg-cinema-gold/50 rounded-full" />
                                        <span className="font-mono text-sm text-gray-500 group-hover:text-white transition-colors duration-300 uppercase tracking-wider">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
