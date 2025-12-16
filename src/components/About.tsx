"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const container = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".script-line", {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 70%",
                    end: "bottom center",
                    scrub: 1,
                },
                x: -50,
                opacity: 0,
                stagger: 0.15,
            });

            gsap.to(".float-decor", {
                y: -20,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
                stagger: 0.5,
            });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={container}
            className="min-h-screen flex flex-col justify-center px-6 md:px-20 py-24 relative bg-cinema-bg overflow-hidden"
        >
            <div className="absolute inset-0 cinema-grain" />

            {/* Decorative Elements */}
            <div className="float-decor absolute top-20 right-20 text-6xl text-cinema-gray opacity-30">✦</div>
            <div className="float-decor absolute bottom-40 left-10 text-4xl text-cinema-gray opacity-30">★</div>

            {/* Large Background Text */}
            <div className="absolute top-10 left-10 text-white/5 text-[12rem] font-heading leading-none pointer-events-none select-none hidden md:block">
                STORY
            </div>

            <div className="max-w-4xl mx-auto font-mono text-gray-300 space-y-8 relative z-10">
                {/* Section Header */}
                <div className="mb-12">
                    <span className="text-cinema-gold font-heading tracking-[0.5em] text-sm uppercase">
                        ★ Scene 2 ★
                    </span>
                    <h2 className="text-white font-heading text-4xl md:text-5xl mt-4 tracking-wider uppercase">
                        The Origin Story
                    </h2>
                    <div className="w-32 h-[2px] mt-4 bg-cinema-gold" />
                </div>

                <div className="space-y-6 text-lg md:text-xl leading-relaxed font-body">
                    <p className="script-line">
                        <span className="text-cinema-silver font-heading tracking-widest border-b border-zinc-700 pb-1">EXT. INDIA - DAY</span>
                    </p>
                    <p className="script-line text-gray-400">
                        In the heart of innovation, a young visionary named{" "}
                        <span className="text-white font-bold">HARSH BUDHAULIYA</span>{" "}
                        discovers the art of digital creation. It wasn&apos;t just code—it was{" "}
                        <span className="text-cinema-gold">magic</span>.
                    </p>
                    <p className="script-line">
                        <span className="text-cinema-silver font-heading tracking-widest border-b border-zinc-700 pb-1">CUT TO:</span>
                    </p>
                    <p className="script-line text-gray-400">
                        Late nights illuminated by glowing screens. The relentless pursuit of{" "}
                        <span className="text-cinema-gold">perfection</span>. Harsh transforms
                        from a curious student into a{" "}
                        <span className="text-white font-bold">MASTER CREATOR</span>,
                        wielding the MERN stack to build digital empires.
                    </p>
                    <p className="script-line">
                        <span className="text-cinema-silver font-heading tracking-widest border-b border-zinc-700 pb-1">NARRATOR (V.O)</span>
                    </p>
                    <p className="script-line italic text-gray-500 border-l-2 border-cinema-gold pl-4">
                        &quot;He didn&apos;t just write code. He directed experiences. Every
                        pixel was a frame, every animation a scene in his grand vision.&quot;
                    </p>
                </div>

                <div className="mt-12 script-line">
                    <a href="/about" className="group inline-flex items-center gap-3 px-8 py-3 bg-transparent border border-cinema-gold text-cinema-gold font-heading uppercase tracking-widest hover:bg-cinema-gold hover:text-black transition-all duration-300">
                        <span>Read Full Biography</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
