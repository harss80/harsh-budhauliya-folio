"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const photoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            
            // Text Mask Reveal (Advanced Typography Animation)
            tl.fromTo(".hero-title-word", 
                { y: "120%", rotateZ: 5 },
                { y: "0%", rotateZ: 0, duration: 1.2, stagger: 0.1, ease: "power4.out" }
            );

            tl.fromTo(".hero-desc",
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
                "-=0.6"
            );

            tl.fromTo(".hero-cta",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
                "-=0.8"
            );

            // Parallax photo entrance
            tl.fromTo(".hero-visual-wrapper",
                { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)", scale: 1.1 },
                { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", scale: 1, duration: 1.5, ease: "power4.inOut" },
                "-=1.2"
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Subtle parallax on photo container based on mouse
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!photoRef.current) return;
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 30;
        const yPos = (clientY / window.innerHeight - 0.5) * 30;

        gsap.to(photoRef.current, {
            x: xPos,
            y: yPos,
            duration: 1,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = () => {
        if (!photoRef.current) return;
        gsap.to(photoRef.current, {
            x: 0,
            y: 0,
            duration: 1,
            ease: "power3.out"
        });
    };

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen flex flex-col pt-32 lg:pt-40 pb-24 px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto z-10 overflow-hidden"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                
                {/* Left Content (Massive Typography) */}
                <div className="lg:col-span-7 flex flex-col items-start z-10">
                    
                    <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-text-primary leading-[0.9] mb-8 uppercase flex flex-col">
                        <div className="text-mask-container pb-2">
                            <div className="hero-title-word">Crafting</div>
                        </div>
                        <div className="text-mask-container pb-2">
                            <div className="hero-title-word flex items-center gap-2 sm:gap-4">
                                Scalable <span className="hidden sm:inline-block w-12 sm:w-16 md:w-32 h-2 sm:h-3 bg-text-primary mb-2 sm:mb-4"></span>
                            </div>
                        </div>
                        <div className="text-mask-container pb-2 text-text-secondary">
                            <div className="hero-title-word">Systems.</div>
                        </div>
                    </h1>

                    <p className="hero-desc text-lg sm:text-xl md:text-2xl text-text-secondary font-light max-w-xl leading-relaxed mb-10 md:mb-12 border-l-2 border-border-light pl-4 md:pl-6">
                        I am Harsh Budhauliya. A software engineer and UI/UX designer focused on structural perfection, advanced motion, and premium aesthetics.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                        <a 
                            href="#projects" 
                            className="hero-cta group relative flex items-center gap-3 px-6 sm:px-8 py-4 sm:py-5 bg-text-primary text-bg-primary font-bold overflow-hidden transition-all"
                        >
                            <span className="relative z-10 flex items-center gap-3 text-sm sm:text-base">
                                View My Work
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
                            </span>
                        </a>
                        <a 
                            href="#contact"
                            className="hero-cta px-6 sm:px-8 py-4 sm:py-5 font-bold text-text-primary border border-border-light hover:bg-white hover:text-black transition-colors duration-300 text-sm sm:text-base"
                        >
                            Let's Talk
                        </a>
                    </div>
                </div>

                {/* Right Visuals (Structural Photo Parallax) */}
                <div className="lg:col-span-5 relative w-full h-[40vh] md:h-[60vh] lg:h-[80vh] flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
                    <div 
                        className="relative w-full max-w-[350px] md:max-w-[450px] h-full"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Structural offset backplate */}
                        <div className="absolute top-6 sm:top-10 -left-6 sm:-left-10 w-full h-full border border-border-light pointer-events-none z-0 hidden md:block"></div>
                        
                        {/* The Photo Container with clipping entrance */}
                        <div className="hero-visual-wrapper absolute inset-0 z-10 bg-bg-secondary overflow-hidden">
                            <div 
                                ref={photoRef}
                                className="relative w-[110%] h-[110%] -left-[5%] -top-[5%]"
                            >
                                <Image
                                    src="/profilephoto.webp"
                                    alt="Harsh Budhauliya"
                                    fill
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                    priority
                                    quality={100}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
