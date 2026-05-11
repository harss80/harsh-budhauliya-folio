"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { number: "02+", label: "Years Experience" },
    { number: "10+", label: "Projects Completed" },
    { number: "500+", label: "Cups of Coffee" },
    { number: "1M+", label: "Lines of Code" }
];

export default function Stats() {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".stat-card", {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 80%",
                },
                opacity: 0,
                scale: 0.9,
                y: 40,
                duration: 0.8,
                stagger: 0.1,
                ease: "back.out(1.5)"
            });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="py-20 relative max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 w-full z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-l border-border-light">
                {stats.map((stat, idx) => (
                    <div key={idx} className="stat-card border-b border-r border-border-light p-8 md:p-12 flex flex-col justify-end text-left group hover:bg-text-primary transition-colors duration-500 cursor-default bg-bg-secondary">
                        <span className="text-4xl md:text-5xl lg:text-7xl font-black text-text-primary mb-4 tracking-tighter group-hover:text-bg-primary transition-colors duration-500">
                            {stat.number}
                        </span>
                        <span className="text-sm font-bold text-text-secondary uppercase tracking-widest group-hover:text-bg-primary transition-colors duration-500">
                            {stat.label}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
