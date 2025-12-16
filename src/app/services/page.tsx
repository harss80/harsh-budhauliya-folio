"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// --- SECTIONS ---

// 1. HERO: "THE STUDIO"
const StudioHero = () => {
    return (
        <section className="h-screen w-full relative flex flex-col justify-center items-center overflow-hidden bg-black text-white px-4">
            {/* Dynamic Background Noise */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 animate-grain" />

            {/* Large Floating Blobs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-cinema-gold/20 blur-[100px] md:blur-[150px] rounded-full animate-float-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 md:w-[500px] md:h-[500px] bg-blue-900/20 blur-[100px] md:blur-[150px] rounded-full animate-float-slower" />

            <div className="relative z-10 text-center mix-blend-difference w-full">
                <h1 className="font-heading text-[18vw] md:text-[15vw] leading-[0.85] md:leading-[0.8] font-bold uppercase tracking-tighter opacity-0 animate-reveal-hero">
                    AGENCY
                </h1>
                <h1 className="font-heading text-[18vw] md:text-[15vw] leading-[0.85] md:leading-[0.8] font-bold uppercase tracking-tighter text-transparent stroke-text opacity-0 animate-reveal-hero-delay">
                    LEVEL
                </h1>
                <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-4xl mx-auto mt-8 md:mt-12 border-t border-white/20 pt-6 gap-4 px-4">
                    <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.5em] text-cinema-gold">Services & Production</span>
                    <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.5em] text-gray-400">Est. 2024</span>
                </div>
            </div>

            <style jsx>{`
                .stroke-text { -webkit-text-stroke: 1px #fff; }
                @media (min-width: 768px) {
                    .stroke-text { -webkit-text-stroke: 2px #fff; }
                }
                @keyframes floatSlow { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(20px, -20px); } }
                .animate-float-slow { animation: floatSlow 10s infinite ease-in-out; }
                .animate-float-slower { animation: floatSlow 15s infinite ease-in-out reverse; }
                @keyframes revealHero { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                .animate-reveal-hero { animation: revealHero 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-reveal-hero-delay { animation: revealHero 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards; }
             `}</style>
        </section>
    );
};

// 2. INTERACTIVE SERVICE LIST (Accordion + Image Reveal)
const HighEndServices = () => {
    const services = [
        { id: "01", name: "Art Direction", desc: "Crafting visual languages that speak louder than words." },
        { id: "02", name: "Web Development", desc: "Engineering pixel-perfect, highly scalable digital platforms." },
        { id: "03", name: "Motion Design", desc: "Adding life to static interfaces through complex animation." },
        { id: "04", name: "Brand Identity", desc: "Defining the soul of your business with strategic design." },
    ];

    const [activeId, setActiveId] = useState<string | null>(null);

    return (
        <section className="py-0 bg-black relative z-20">
            <div className="w-full">
                {services.map((s) => (
                    <div
                        key={s.id}
                        onMouseEnter={() => setActiveId(s.id)}
                        onMouseLeave={() => setActiveId(null)}
                        onClick={() => setActiveId(activeId === s.id ? null : s.id)} // Tap to toggle on mobile
                        className="group relative border-t border-white/20 hover:border-white transition-colors duration-500 cursor-pointer md:cursor-none"
                    >


                        <div className="relative z-10 max-w-7xl mx-auto py-12 md:py-20 px-4 md:px-6 flex flex-col md:flex-row justify-between items-start md:items-center group-hover:translate-x-0 md:group-hover:translate-x-4 transition-transform duration-500 ease-out">
                            <span className="font-mono text-cinema-gold text-sm md:text-lg tracking-widest mb-2 md:mb-0">/{s.id}</span>
                            <h2 className="font-heading text-4xl md:text-6xl lg:text-8xl uppercase text-white group-hover:text-transparent group-hover:stroke-text transition-all duration-300">
                                {s.name}
                            </h2>
                            <ArrowUpRight className="text-white opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8 md:w-12 md:h-12 absolute right-4 top-12 md:static" />
                        </div>

                        {/* Description Reveal */}
                        <div className={`max-w-7xl mx-auto px-4 md:px-6 overflow-hidden transition-all duration-500 ease-in-out ${activeId === s.id ? "max-h-60 opacity-100 pb-8 md:pb-10" : "max-h-0 opacity-0"}`}>
                            <p className="font-body text-gray-300 text-lg md:text-xl max-w-2xl relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                {s.desc}
                            </p>
                        </div>
                    </div>
                ))}
                <div className="border-t border-white/20" />
            </div>
            <style jsx>{`
                .stroke-text { -webkit-text-stroke: 1px #fff; }
                @media (min-width: 768px) {
                    .stroke-text { -webkit-text-stroke: 2px #fff; }
                }
            `}</style>
        </section>
    );
};

// 3. HORIZONTAL SCROLL PROCESS
const HorizontalProcess = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const sections = gsap.utils.toArray(".process-panel");
            gsap.to(sections, {
                xPercent: -100 * (sections.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (sections.length - 1),
                    end: () => "+=" + (triggerRef.current?.offsetWidth || 0)
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const steps = [
        { num: "I", title: "Vision", text: "We start by deconstructing your idea into core emotional beats." },
        { num: "II", title: "Structure", text: "Architecting the user journey with wireframes and logic flows." },
        { num: "III", title: "Production", text: "High-fidelity design and code implementation. The magic happens." },
        { num: "IV", title: "Release", text: "Deployment, optimization, and the final premiere." },
    ];

    return (
        <section ref={sectionRef} className="overflow-hidden bg-cinema-gold text-black">
            <div ref={triggerRef} className="flex h-screen w-[400vw]">
                {steps.map((step, i) => (
                    <div key={i} className="process-panel w-screen h-full flex flex-col justify-center items-center relative border-r border-black/10 px-4">
                        <span className="absolute top-10 md:top-20 left-4 md:left-20 text-[25vw] md:text-[20vw] font-heading font-bold opacity-10 leading-none select-none">
                            {step.num}
                        </span>
                        <div className="relative z-10 max-w-4xl px-4 md:px-8 text-center pt-20 md:pt-0">
                            <h3 className="text-lg md:text-xl font-mono tracking-widest uppercase mb-4 opacity-60">Phase {step.num}</h3>
                            <h2 className="text-5xl md:text-6xl lg:text-9xl font-heading uppercase font-bold mb-6 md:mb-8 break-words">{step.title}</h2>
                            <p className="text-xl md:text-2xl lg:text-3xl font-body max-w-2xl mx-auto leading-relaxed">
                                {step.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

// 4. PRICING TIERS (Cards)
const PricingTiers = () => {
    const tiers = [
        { name: "Indie", price: "$2,500", detail: "Perfect for personal portfolios & MVPs", check: ["Design System", "Next.js Build", "CMS Config"] },
        { name: "Studio", price: "$5,000", detail: "For growing businesses & startups", check: ["All Indie Features", "Advanced Animations", "SEO Optimization", "3D Elements"] },
        { name: "Box Office", price: "Custom", detail: "Enterprise scale production", check: ["Full Stack App", "User Auth", "Database", "Priority 24/7 Support"] },
    ];

    return (
        <section className="py-20 md:py-32 px-4 bg-zinc-950 text-white">
            <div className="max-w-7xl mx-auto">
                <h2 className="font-heading text-4xl md:text-5xl lg:text-7xl uppercase text-center mb-16 md:mb-24">
                    Production<br /><span className="text-cinema-gold">Budgets</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {tiers.map((tier, i) => (
                        <div key={i} className="relative group bg-zinc-900 border border-zinc-800 p-6 md:p-8 hover:bg-zinc-800 transition-all duration-500 hover:-translate-y-2 md:hover:-translate-y-4">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cinema-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <h3 className="font-heading text-2xl md:text-3xl uppercase mb-2">{tier.name}</h3>
                            <p className="font-mono text-cinema-gold text-lg md:text-xl mb-6 md:mb-8">{tier.price}</p>
                            <p className="text-gray-400 text-sm mb-6 md:mb-8 border-b border-zinc-700 pb-6 md:pb-8">{tier.detail}</p>

                            <ul className="space-y-3 md:space-y-4 mb-8 md:mb-12">
                                {tier.check.map((c, j) => (
                                    <li key={j} className="flex items-start gap-3 text-sm font-mono text-gray-300">
                                        <Check size={14} className="text-cinema-gold mt-1 flex-shrink-0" />
                                        <span className="leading-tight">{c}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className="w-full py-4 bg-transparent border border-white text-white font-heading uppercase tracking-widest hover:bg-white hover:text-black transition-colors text-sm md:text-base">
                                Select
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// 5. FINAL CTO (Marquee + Button)
const FinalCTA = () => {
    return (
        <section className="py-16 md:py-20 bg-cinema-gold overflow-hidden flex flex-col items-center justify-center relative">
            <div className="whitespace-nowrap flex absolute top-1/2 -translate-y-1/2 opacity-10 pointer-events-none select-none">
                {Array(5).fill("START PRODUCTION • ").map((s, i) => (
                    <span key={i} className="text-[15vw] lg:text-[10vw] font-heading font-bold uppercase text-black">{s}</span>
                ))}
            </div>

            <div className="relative z-10 text-center px-4">
                <Link href="/contact" className="group relative inline-flex items-center justify-center px-8 md:px-12 py-4 md:py-6 bg-black text-white font-heading text-lg md:text-2xl uppercase tracking-widest overflow-hidden w-full md:w-auto">
                    <span className="relative z-10 flex items-center gap-3 md:gap-4 group-hover:gap-6 transition-all">
                        Initiate Project <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
                    </span>
                    <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 z-0" />
                    <span className="absolute inset-0 z-10 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 text-black transition-opacity duration-300 pointer-events-none">
                        Initiate Project <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
                    </span>
                </Link>
            </div>
        </section>
    );
};

export default function ServicesPage() {
    return (
        <main className="bg-black min-h-screen text-white selection:bg-cinema-gold selection:text-black">
            {/* Nav Back */}
            <Link
                href="/"
                className="fixed top-6 left-6 z-50 group flex items-center gap-3 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-300"
            >
                <ArrowLeft size={16} />
                <span className="font-mono text-xs uppercase tracking-widest hidden md:inline">Home</span>
            </Link>

            <StudioHero />
            <HighEndServices />
            <HorizontalProcess />
            <PricingTiers />
            <FinalCTA />
        </main>
    );
}
