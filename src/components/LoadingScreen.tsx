"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export default function LoadingScreen() {
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => setComplete(true),
        });

        // Bollywood Dramatic Loading
        tl.to(".loading-sparkle", {
            scale: 1.5,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(2)",
        })
            .to(".loading-title", {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
            }, "-=0.3")
            .to(".loading-bar-inner", {
                width: "100%",
                duration: 2,
                ease: "power2.inOut",
            }, "-=0.5")
            .to(".loading-subtitle", {
                opacity: 1,
                duration: 0.5,
            }, "-=1")
            .to(".loading-screen", {
                opacity: 0,
                duration: 1.5,
                delay: 0.5,
                ease: "power2.inOut",
            })
            .set(".loading-screen", { display: "none" });

    }, []);

    if (complete) return null;

    return (
        <div className="loading-screen fixed inset-0 z-[100] bg-bollywood-black flex flex-col items-center justify-center">
            {/* Ornate Border */}
            <div className="absolute inset-8 md:inset-16 border border-bollywood-gold/20">
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-bollywood-gold" />
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-bollywood-gold" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-bollywood-gold" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-bollywood-gold" />
            </div>

            {/* Sparkles */}
            <div className="flex gap-4 mb-8">
                <span className="loading-sparkle text-4xl text-bollywood-gold opacity-0 scale-0">✦</span>
                <span className="loading-sparkle text-4xl text-bollywood-saffron opacity-0 scale-0">★</span>
                <span className="loading-sparkle text-4xl text-bollywood-gold opacity-0 scale-0">✦</span>
            </div>

            {/* Title */}
            <h1 className="loading-title font-heading text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-bollywood-gold via-bollywood-cream to-bollywood-gold tracking-[0.3em] opacity-0 translate-y-8 mb-4">
                HARSH
            </h1>

            <p className="loading-subtitle text-bollywood-saffron font-heading tracking-[0.5em] text-sm opacity-0 mb-12">
                PRODUCTIONS
            </p>

            {/* Loading Bar */}
            <div className="w-64 md:w-80 h-1 bg-bollywood-maroon/50 overflow-hidden border border-bollywood-gold/30">
                <div className="loading-bar-inner w-0 h-full bg-gradient-to-r from-bollywood-gold via-bollywood-saffron to-bollywood-gold shadow-[0_0_20px_rgba(212,175,55,0.5)]" />
            </div>

            {/* Loading Text */}
            <p className="mt-4 text-bollywood-cream/50 text-sm tracking-[0.3em] font-heading">
                LOADING EXPERIENCE
            </p>
        </div>
    );
}
