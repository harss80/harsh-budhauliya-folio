"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";
import { Sticker } from "./SocialStickers";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        name: "Alex Morgan",
        role: "CEO, FinTech Inc.",
        quote: "Harsh didn't just build a website, he built a digital experience that doubled our conversions.",
        rating: 5
    },
    {
        name: "Sarah Chen",
        role: "Director, ArtGallery",
        quote: "The visual storytelling capabilities are unmatched. A true cinematic developer.",
        rating: 5
    },
    {
        name: "David V.",
        role: "Founder, StartupX",
        quote: "Technical prowess meets artistic vision. Highly recommended for premium projects.",
        rating: 5
    },
    {
        name: "Elena R.",
        role: "CTO, FutureWeb",
        quote: "Clean code, stunning visuals, and perfect execution. A rare find in the industry.",
        rating: 5
    }
];

export default function TestimonialsSection() {
    const container = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Constant smooth scrolling
            const tl = gsap.to(trackRef.current, {
                xPercent: -50,
                ease: "linear",
                duration: 25,
                repeat: -1,
            });

            // Pause on hover
            const track = trackRef.current;
            if (track) {
                track.addEventListener("mouseenter", () => tl.pause());
                track.addEventListener("mouseleave", () => tl.play());
            }

            return () => {
                if (track) {
                    track.removeEventListener("mouseenter", () => tl.pause());
                    track.removeEventListener("mouseleave", () => tl.play());
                }
            };
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="py-32 relative bg-cinema-bg overflow-hidden border-t border-zinc-800">
            <div className="absolute inset-0 cinema-grain" />

            <div className="text-center mb-20 relative z-10">
                <Sticker text="CRITICS CHOICE" className="mx-auto relative mb-8 rotate-[-3deg] bg-cinema-gold text-black border-none" />
                <h2 className="text-4xl md:text-6xl font-heading text-white uppercase tracking-widest">
                    What They Say
                </h2>
            </div>

            <div className="overflow-hidden relative z-10">
                {/* 
                    Using a wider container to hold duplicated items for seamless loop 
                    We need to make sure we have enough items to fill the screen + transition
                */}
                <div ref={trackRef} className="flex gap-8 w-max px-4">
                    {[...testimonials, ...testimonials, ...testimonials].map((item, idx) => (
                        <div
                            key={idx}
                            className="w-[85vw] md:w-[30vw] p-8 md:p-10 bg-zinc-900 border border-zinc-800 relative group flex-shrink-0 hover:border-cinema-gold transition-colors duration-300"
                        >
                            <Quote className="text-cinema-gold mb-6 w-10 h-10 opacity-50 group-hover:opacity-100 transition-opacity" />
                            <p className="text-xl md:text-2xl font-heading text-gray-300 mb-8 leading-snug">
                                &quot;{item.quote}&quot;
                            </p>

                            <div className="flex items-center gap-4 mt-auto">
                                <div className="w-10 h-10 bg-gradient-to-br from-zinc-700 to-black rounded-full border border-zinc-600" />
                                <div>
                                    <h4 className="text-white font-bold font-heading uppercase tracking-wider text-sm">{item.name}</h4>
                                    <p className="text-gray-500 text-xs font-mono">{item.role}</p>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="absolute top-8 right-8 flex gap-1">
                                {[...Array(item.rating)].map((_, i) => (
                                    <div key={i} className="w-1.5 h-1.5 bg-cinema-gold rounded-full" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
