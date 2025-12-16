"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sticker } from "./SocialStickers";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { label: "Years Exp", value: 5, suffix: "+" },
    { label: "Projects", value: 50, suffix: "+" },
    { label: "Awards", value: 12, suffix: "" },
    { label: "Coffee", value: 1000, suffix: "L" },
];

export default function StatsSection() {
    const container = useRef(null);
    const marqueeRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Infinite Marquee
            gsap.to(marqueeRef.current, {
                xPercent: -50,
                repeat: -1,
                duration: 20,
                ease: "linear",
            });

            // "Slot Machine" Rolling Numbers Effect
            stats.forEach((stat, i) => {
                const element = document.getElementById(`stat-val-${i}`);
                if (!element) return;

                // Create a dummy object to hold the value
                const cont = { val: 0 };

                gsap.to(cont, {
                    val: stat.value,
                    duration: 2.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top 80%",
                    },
                    onUpdate: function () {
                        // Update with floor value for integer
                        element.innerHTML = Math.floor(cont.val).toString();
                    }
                });
            });

            // Fade in labels
            gsap.from(".stat-label", {
                opacity: 0,
                y: 20,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 70%",
                }
            });

        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="py-24 bg-cinema-bg border-y border-zinc-800 relative overflow-hidden">
            <div className="absolute inset-0 cinema-grain" />

            {/* Scrolling Text Background (Infinite Marquee) */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[200%] whitespace-nowrap opacity-[0.04] text-white text-[8rem] md:text-[14rem] font-heading font-bold select-none pointer-events-none flex" ref={marqueeRef}>
                <span className="pr-10">BOX OFFICE RECORDS • WORLDWIDE RELEASE • BESTSELLER • BOX OFFICE RECORDS • WORLDWIDE RELEASE • BESTSELLER</span>
                <span className="pr-10">BOX OFFICE RECORDS • WORLDWIDE RELEASE • BESTSELLER • BOX OFFICE RECORDS • WORLDWIDE RELEASE • BESTSELLER</span>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                {stats.map((stat, idx) => (
                    <div key={idx} className="relative group p-6 border border-transparent hover:border-zinc-800 transition-colors duration-500 rounded-lg bg-gradient-to-b from-transparent to-transparent hover:to-zinc-900/50">
                        <div className="text-6xl md:text-8xl font-heading text-white font-bold mb-2 flex justify-center items-baseline drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            {/* Value with ID for GSAP targeting */}
                            <span id={`stat-val-${idx}`} className="stat-value tabular-nums">0</span>
                            <span className="text-4xl text-cinema-gold">{stat.suffix}</span>
                        </div>
                        <p className="stat-label text-cinema-silver font-mono text-xs md:text-sm tracking-[0.3em] uppercase">{stat.label}</p>

                        {/* Hover Line */}
                        <div className="w-0 group-hover:w-full h-[1px] bg-gradient-to-r from-transparent via-cinema-gold to-transparent mx-auto mt-6 transition-all duration-700 ease-out" />
                    </div>
                ))}
            </div>

            <div className="absolute top-10 right-10 hidden md:block rotate-12 hover:rotate-0 transition-transform duration-500">
                <div className="bg-cinema-gold text-black px-4 py-2 font-mono text-xs font-bold border-2 border-white border-dashed shadow-[5px_5px_0px_rgba(255,255,255,0.2)]">
                    ADMIT ONE<br />★ VIP ACCESS
                </div>
            </div>
        </section>
    );
}
