"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
    const container = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 70%",
                },
            });

            tl.from(".cta-bg", {
                scale: 0.8,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
            })
                .from(".cta-title", {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                }, "-=0.5")
                .from(".cta-subtitle", {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                }, "-=0.4")
                .from(".cta-button", {
                    scale: 0,
                    opacity: 0,
                    duration: 0.6,
                    ease: "back.out(2)",
                }, "-=0.3")
                .from(".cta-sparkle", {
                    scale: 0,
                    rotation: -180,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "back.out(2)",
                }, "-=0.3");
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="py-24 px-4 relative overflow-hidden">
            <div className="max-w-4xl mx-auto relative">
                {/* Background Box */}
                <div className="cta-bg relative p-12 md:p-16 bg-gradient-to-br from-bollywood-maroon/40 via-bollywood-red/20 to-bollywood-maroon/40 border-2 border-bollywood-gold/30 overflow-hidden">

                    {/* Corner Sparkles */}
                    <Sparkles className="cta-sparkle absolute top-4 left-4 w-6 h-6 text-bollywood-gold" />
                    <Sparkles className="cta-sparkle absolute top-4 right-4 w-6 h-6 text-bollywood-gold" />
                    <Sparkles className="cta-sparkle absolute bottom-4 left-4 w-6 h-6 text-bollywood-gold" />
                    <Sparkles className="cta-sparkle absolute bottom-4 right-4 w-6 h-6 text-bollywood-gold" />

                    {/* Glow Background */}
                    <div className="absolute inset-0 bg-gradient-radial from-bollywood-gold/10 via-transparent to-transparent" />

                    <div className="relative z-10 text-center">
                        <h2 className="cta-title font-heading text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-bollywood-gold via-bollywood-cream to-bollywood-gold mb-6">
                            READY FOR YOUR BLOCKBUSTER?
                        </h2>

                        <p className="cta-subtitle font-body text-lg md:text-xl text-bollywood-cream/70 mb-10 max-w-2xl mx-auto">
                            Let&apos;s create a digital masterpiece that captivates your audience and tells your brand&apos;s story in cinematic style.
                        </p>

                        <a
                            href="#credits"
                            className="cta-button group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-bollywood-gold to-bollywood-deepgold text-bollywood-black font-heading text-lg tracking-widest uppercase hover:scale-105 transition-transform duration-300 shadow-lg shadow-bollywood-gold/30"
                        >
                            <span>Start the Production</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                        </a>
                    </div>

                    {/* Animated Border Shimmer */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-bollywood-gold to-transparent animate-shine" />
                    </div>
                </div>
            </div>
        </section>
    );
}
