"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Phone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const container = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".credit-line", {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                stagger: 0.15,
                duration: 1,
                ease: "power2.out",
            });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={container}
            id="credits"
            className="min-h-screen relative flex flex-col items-center justify-center py-24 text-center overflow-hidden bg-black"
        >
            <div className="absolute inset-0 cinema-grain" />

            {/* Sparkles - Flat style */}
            <div className="sparkle-credit absolute top-[10%] left-[15%] text-2xl text-cinema-gray opacity-30">✦</div>
            <div className="sparkle-credit absolute bottom-[30%] left-[10%] text-xl text-cinema-gray opacity-30">✧</div>

            <div className="z-10 w-full max-w-3xl px-6">
                {/* Title */}
                <h2 className="font-heading text-5xl sm:text-6xl md:text-8xl mb-16 credit-line text-white">
                    <span className="text-white">
                        THE END
                    </span>
                    <span className="block text-sm sm:text-xl text-cinema-gray tracking-[0.3em] sm:tracking-[0.5em] mt-4 uppercase font-body">
                        (Or just the beginning)
                    </span>
                </h2>

                <div className="space-y-12 font-heading tracking-widest text-lg md:text-xl">
                    {/* Director */}
                    <div className="credit-line">
                        <p className="text-xs sm:text-sm text-cinema-silver mb-2 uppercase tracking-[0.3em] sm:tracking-[0.5em]">
                            DIRECTED & PRODUCED BY
                        </p>
                        <p className="text-2xl sm:text-4xl text-cinema-gold font-bold">HARSH BUDHAULIYA</p>
                    </div>

                    {/* Roles */}
                    <div className="credit-line">
                        <p className="text-sm text-cinema-silver mb-2 uppercase tracking-[0.5em]">
                            STARRING AS
                        </p>
                        <p className="text-2xl text-white">
                            Full Stack Developer • Web Designer • Digital Marketer
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div className="credit-line pt-8 space-y-4">
                        <div className="w-24 h-[1px] bg-cinema-gray mx-auto mb-8" />

                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-gray-400">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-cinema-gold" />
                                <span>India</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-cinema-gold" />
                                <span>harsh@example.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-cinema-gold" />
                                <span>+91 XXXXX XXXXX</span>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="credit-line pt-8">
                        <p className="text-gray-600 mb-6 uppercase text-sm tracking-[0.3em]">
                            Ready to create your blockbuster?
                        </p>
                        <a href="/contact" className="inline-block px-12 py-5 border border-cinema-gold text-cinema-gold hover:bg-cinema-gold hover:text-black font-bold tracking-[0.2em] uppercase transition-all duration-300">
                            ★ HIRE ME ★
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-8 text-xs text-gray-700 uppercase tracking-[0.5em] credit-line">
                © 2025 HARSH BUDHAULIYA • All Rights Reserved
            </div>
        </section>
    );
}
