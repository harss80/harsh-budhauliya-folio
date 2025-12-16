"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CinematicIntro({ onComplete }: { onComplete: () => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    setShowButton(true);
                },
            });

            // Initial black screen
            tl.set(containerRef.current, { opacity: 1 })
                .to(containerRef.current, { duration: 1 }) // Wait a bit

                // "A Film By" style
                .fromTo(
                    ".intro-text-1",
                    { opacity: 0, scale: 0.8 },
                    { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }
                )
                .to(".intro-text-1", { opacity: 0, duration: 1, delay: 0.5 })

                // "Harsh Budhauliya"
                .fromTo(
                    ".intro-text-main",
                    { opacity: 0, scale: 1.1, filter: "blur(10px)" },
                    { opacity: 1, scale: 1, filter: "blur(0px)", duration: 2, ease: "power3.out" }
                )
                .fromTo(
                    ".intro-text-sub",
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 1.5 },
                    "-=1.5"
                )
                // Hold for a moment
                .to({}, { duration: 1 });
        }, containerRef);

        return () => ctx.revert();
    }, [onComplete]);

    const handleEnter = () => {
        const ctx = gsap.context(() => {
            gsap.to(containerRef.current, {
                opacity: 0,
                duration: 1.5,
                ease: "power2.inOut",
                onComplete: onComplete,
            });
        }, containerRef);
    };

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center text-center select-none"
        >
            <div ref={textRef} className="relative z-10 p-4 sm:p-8 w-full max-w-4xl mx-auto">
                <p className="intro-text-1 absolute inset-0 flex items-center justify-center font-heading text-cinema-gold text-sm sm:text-xl md:text-2xl tracking-[0.2em] sm:tracking-[0.5em] opacity-0 text-center px-4">
                    A CINEMATIC EXPERIENCE
                </p>

                <div className="flex flex-col items-center w-full">
                    <h1 className="intro-text-main opacity-0 font-heading text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-widest text-white mb-4 sm:mb-8 leading-tight">
                        HARSH<br />BUDHAULIYA
                    </h1>
                    <p className="intro-text-sub opacity-0 font-body text-xs sm:text-lg md:text-2xl text-cinema-silver tracking-[0.2em] sm:tracking-[0.3em] uppercase text-center max-w-[90%] mx-auto">
                        Creative Full Stack Developer
                    </p>
                </div>
            </div>

            {showButton && (
                <button
                    onClick={handleEnter}
                    className="absolute bottom-12 px-6 py-3 sm:px-10 sm:py-4 bg-transparent border border-cinema-gold text-cinema-gold text-sm sm:text-lg font-heading tracking-[0.2em] uppercase hover:bg-cinema-gold hover:text-black transition-all duration-500 animate-pulse"
                >
                    Enter Experience
                </button>
            )}

            {/* Film Grain & Noise for Intro */}
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[url('/texture.png')] bg-cover mix-blend-overlay"></div>
        </div>
    );
}
