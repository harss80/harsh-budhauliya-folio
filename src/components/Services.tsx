"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Palette, Rocket, Zap, Film, Megaphone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: "Web Development",
        icon: <Code className="w-8 h-8" />,
        description: "Building scalable, high-performance web applications using modern MERN stack.",
    },
    {
        title: "UI/UX Design",
        icon: <Palette className="w-8 h-8" />,
        description: "Crafting intuitive and immersive user interfaces with cinematic flair.",
    },
    {
        title: "Performance",
        icon: <Zap className="w-8 h-8" />,
        description: "Optimizing for speed, accessibility, and SEO for maximum reach.",
    },
    {
        title: "Branding",
        icon: <Rocket className="w-8 h-8" />,
        description: "Developing cohesive digital identities that captivate audiences.",
    },
    {
        title: "Motion Design",
        icon: <Film className="w-8 h-8" />,
        description: "Creating stunning animations and micro-interactions that wow users.",
    },
    {
        title: "Digital Marketing",
        icon: <Megaphone className="w-8 h-8" />,
        description: "Strategic campaigns that drive engagement and conversions.",
    },
];

export default function Services() {
    const container = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(".service-card", { opacity: 0, y: 50 }); // Set initial state explicitly

            ScrollTrigger.batch(".service-card", {
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
                once: true // Ensure it only happens once and stays visible
            });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="py-24 px-4 relative overflow-hidden bg-cinema-bg">
            <div className="absolute inset-0 cinema-grain" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <span className="text-cinema-gold font-heading tracking-[0.5em] text-sm uppercase">
                        ★ Scene 5 ★
                    </span>
                    <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mt-4 text-white uppercase tracking-wider">
                        WHAT I CREATE
                    </h2>
                    <div className="w-24 h-[2px] mx-auto mt-4 bg-cinema-gold" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {services.map((item, idx) => (
                        <div
                            key={idx}
                            className="service-card group relative p-8 bg-zinc-900 border border-zinc-800 hover:border-cinema-gold transition-all duration-300"
                        >
                            {/* Icon */}
                            <div className="text-cinema-silver mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:text-cinema-gold">
                                {item.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-heading text-white mb-4 uppercase tracking-widest border-b border-zinc-700 pb-2">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-400 font-body text-sm leading-relaxed group-hover:text-white transition-colors">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
