"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { Sticker, TechBadge } from "./SocialStickers";
import { Code, Cpu } from "lucide-react";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax Effect on Mouse Move
            const handleMouseMove = (e: MouseEvent) => {
                const { clientX, clientY } = e;
                const x = (clientX / window.innerWidth - 0.5) * 20;
                const y = (clientY / window.innerHeight - 0.5) * 20;

                gsap.to(".parallax-layer", {
                    x: x,
                    y: y,
                    duration: 1,
                    ease: "power2.out",
                });

                gsap.to(".parallax-text", {
                    x: x * 0.5,
                    y: y * 0.5,
                    duration: 1,
                    ease: "power2.out",
                });
            };

            window.addEventListener("mousemove", handleMouseMove);

            // Entrance Animation
            const tl = gsap.timeline();
            tl.from(".hero-element", {
                opacity: 0,
                y: 50,
                duration: 1.5,
                stagger: 0.2,
                ease: "power3.out",
                delay: 0.5,
            });

            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
            };
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen py-20 flex flex-col justify-center items-center bg-cinema-bg text-white overflow-hidden"
        >
            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 cinema-grain" />

                {/* Gradient Lighting - Subtle Gold/Silver */}
                <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-cinema-gold/5 rounded-full blur-[120px] mix-blend-screen parallax-layer" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-cinema-silver/5 rounded-full blur-[100px] mix-blend-screen parallax-layer" />
            </div>

            {/* Sticker Decor */}
            <div className="absolute top-[15%] right-[10%] hidden lg:block hero-element opacity-80">
                <Sticker text="AVAILABLE FOR HIRE" className="rotate-12 bg-white text-black text-sm border border-zinc-500" />
            </div>

            <div className="absolute bottom-[20%] left-[5%] hidden lg:block hero-element opacity-80 z-20">
                <Sticker text="FULL STACK DEV" className="rotate-[-8deg] bg-cinema-gold text-black text-sm border-black" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center px-4 max-w-7xl mx-auto flex flex-col justify-center h-full">
                <div className="hero-element mb-6 md:mb-8 flex justify-center gap-4">
                    <TechBadge icon={Code} text="WEB DEVELOPER" />
                    <TechBadge icon={Cpu} text="CREATIVE" />
                </div>

                <h1
                    ref={titleRef}
                    className="hero-element font-heading font-bold uppercase leading-[0.85] tracking-tight mb-6 md:mb-10 parallax-text relative"
                >
                    <span className="block text-white drop-shadow-2xl" style={{ fontSize: "clamp(3rem, 15vw, 10rem)" }}>
                        HARSH
                    </span>
                    <span className="block text-cinema-gold drop-shadow-lg" style={{ fontSize: "clamp(2.5rem, 13vw, 10rem)" }}>
                        BUDHAULIYA
                    </span>
                </h1>

                <div className="hero-element relative max-w-3xl mx-auto mb-10 md:mb-12 px-4">
                    <div className="absolute -left-4 md:-left-12 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-cinema-gold/30 to-transparent hidden md:block" />
                    <div className="absolute -right-4 md:-right-12 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-cinema-gold/30 to-transparent hidden md:block" />

                    <p className="font-body text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 tracking-wide max-w-2xl mx-auto leading-relaxed">
                        Combining cinematic storytelling with high-performance engineering to create digital experiences that wow.
                    </p>
                </div>

                {/* CTA Buttons - Classic Cinema Style (Gold/White) */}
                <div className="hero-element flex flex-wrap justify-center gap-6">
                    <Link
                        href="/projects"
                        className="group relative px-8 py-4 bg-cinema-gold text-black font-heading tracking-widest uppercase hover:bg-white transition-colors duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
                    >
                        View Projects
                    </Link>
                    <Link
                        href="/contact"
                        className="group relative px-8 py-4 bg-transparent border border-white text-white font-heading tracking-widest uppercase hover:border-cinema-gold hover:text-cinema-gold transition-all duration-300"
                    >
                        Contact Me
                    </Link>
                </div>
            </div>
        </section>
    );
}
