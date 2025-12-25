"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github, Monitor, Play, Layers, Box, Cpu } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// --- SECTIONS ---

// 1. PROJECT HERO (Parallax)
const ProjectHero = () => {
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(".hero-bg", {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        }, heroRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="h-[80vh] relative flex items-center justify-center overflow-hidden">
            {/* Background with Parallax */}
            <div className="hero-bg absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 w-full h-[120%]" />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cinema-bg/50 to-cinema-bg" />

            {/* Content */}
            <div className="relative z-10 text-center px-4">
                <p className="font-mono text-cinema-gold text-sm tracking-[0.5em] mb-4 uppercase animate-fade-in-up">Now Showing</p>
                <h1 className="font-heading text-6xl md:text-9xl font-bold uppercase text-white mb-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                    Selected<br /><span className="text-transparent stroke-text">Works</span>
                </h1>
                <p className="font-body text-gray-400 max-w-2xl mx-auto text-lg md:text-xl animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                    A curated collection of web experiences, heavy on interaction and light on loading times.
                </p>
            </div>

            <style jsx>{`
                .stroke-text {
                    -webkit-text-stroke: 2px #fff;
                }
             `}</style>
        </section>
    );
};

// 2. FEATURED PROJECT (Spotlight)
const SpotlightProject = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "bottom center",
                    toggleActions: "play none none reverse",
                }
            });

            tl.from(".spotlight-content", { x: -50, opacity: 0, duration: 1, ease: "power3.out" })
                .from(".spotlight-image", { scale: 1.1, opacity: 0, duration: 1.2, ease: "power2.out" }, "-=0.8");

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 px-4 bg-zinc-950 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="spotlight-content space-y-8 order-2 lg:order-1">
                    <div className="flex items-center gap-4 text-cinema-gold font-mono text-xs uppercase tracking-widest">
                        <span className="px-2 py-1 border border-cinema-gold">Latest Release</span>
                        <span>2025</span>
                    </div>
                    <h2 className="font-heading text-5xl md:text-7xl uppercase text-white leading-none">
                        Buda's<br />Pub
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed font-body">
                        A vibrant neighborhood bar and grill website featuring a dynamic menu of over 80 dishes
                        and real-time live music event scheduling. Designed for immersive visual storytelling
                        and seamless user interaction.
                    </p>

                    <div className="flex flex-wrap gap-3">
                        {["Next.js", "TailwindCSS", "Framer Motion", "Vercel"].map((tag, i) => (
                            <span key={i} className="px-3 py-1 bg-white/5 text-gray-300 text-xs font-mono uppercase">{tag}</span>
                        ))}
                    </div>

                    <div className="flex gap-6 pt-4">
                        <a
                            href="https://harsh-budhauliya-restaurant.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-white border-b border-white pb-1 hover:text-cinema-gold hover:border-cinema-gold transition-all"
                        >
                            <Monitor size={18} /> Live Demo
                        </a>
                        <button className="flex items-center gap-2 text-gray-400 border-b border-gray-600 pb-1 hover:text-white hover:border-white transition-all">
                            <Github size={18} /> Source Code
                        </button>
                    </div>
                </div>

                <div className="spotlight-image relative aspect-square lg:aspect-[4/3] order-1 lg:order-2">
                    <div className="absolute inset-0 bg-cinema-gold/10 -rotate-6 z-0 rounded-lg"></div>
                    <div className="absolute inset-0 bg-zinc-800 border border-zinc-700 overflow-hidden rounded-lg z-10 hover:scale-105 transition-transform duration-700">
                        {/* Project Image */}
                        <Image
                            src="/poster-restaurant.png"
                            alt="Buda's Pub"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    );
};

// 3. THE COLLECTION (Gallery Grid)
const PortfolioGrid = () => {
    const projects = [
        { id: "01", title: "Social Connect", cat: "Social Media", year: "2023" },
        { id: "02", title: "AI Dashboard", cat: "Data Viz", year: "2024" },
        { id: "03", title: "Crypto Vault", cat: "FinTech", year: "2023" },
        { id: "04", title: "Neon City", cat: "Game Dev", year: "2022" },
    ];

    return (
        <section className="py-32 px-4 bg-cinema-bg">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-20 border-b border-zinc-800 pb-6">
                    <h2 className="font-heading text-4xl md:text-6xl text-white uppercase">The Archives</h2>
                    <span className="font-mono text-cinema-silver hidden md:block">SELECT WORKS (2022-2025)</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                    {projects.map((p, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="aspect-video bg-zinc-900 border border-zinc-800 relative overflow-hidden mb-6">
                                <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black">
                                        <Play size={24} fill="currentColor" />
                                    </div>
                                </div>
                                {/* Image Placeholder */}
                                <div className="w-full h-full bg-zinc-800 group-hover:scale-110 transition-transform duration-700" />
                            </div>

                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="font-mono text-cinema-gold text-xs mb-2 block">{p.id} // {p.cat}</span>
                                    <h3 className="font-heading text-3xl text-white uppercase group-hover:text-cinema-gold transition-colors">{p.title}</h3>
                                </div>
                                <span className="font-mono text-gray-500 border border-zinc-800 px-2 py-1 text-xs">{p.year}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// 4. TECH STACK MARQUEE
const TechTicker = () => {
    return (
        <div className="py-12 bg-cinema-gold text-black overflow-hidden border-y-4 border-black">
            <div className="flex whitespace-nowrap animate-marquee">
                {Array(10).fill("REACT • THREE.JS • GSAP • NEXT.JS • TAILWIND • WEBGL • ").map((text, i) => (
                    <span key={i} className="text-4xl font-heading font-bold uppercase mx-4">{text}</span>
                ))}
            </div>
            <style jsx>{`
                .animate-marquee {
                    animation: marquee 20s linear infinite;
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
};

// 5. PROCESS (Timeline Steps)
const ProcessTimeline = () => {
    const steps = [
        { num: "01", title: "Scripting", desc: "Understanding the core requirements and user needs." },
        { num: "02", title: "Storyboarding", desc: "Wireframing and high-fidelity prototyping in Figma." },
        { num: "03", title: "Production", desc: "Clean, efficient coding with modern frameworks." },
        { num: "04", title: "Post-Production", desc: "Testing, optimization, and final polish." },
    ];

    return (
        <section className="py-32 px-4 bg-zinc-950">
            <div className="max-w-6xl mx-auto">
                <h2 className="font-heading text-4xl text-center text-white mb-20 uppercase">Production Process</h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {steps.map((step, i) => (
                        <div key={i} className="relative p-6 border-l border-zinc-800 hover:border-cinema-gold transition-colors duration-300 group">
                            <span className="absolute -left-3 top-0 w-6 h-6 bg-zinc-950 border border-zinc-800 group-hover:border-cinema-gold rounded-full transition-colors" />
                            <span className="font-heading text-6xl text-white/5 font-bold absolute top-0 right-0 pointer-events-none">{step.num}</span>

                            <h3 className="text-xl font-heading text-white uppercase mb-4 relative z-10">{step.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// 6. TESTIMONIALS (Critics Reviews)
const CriticsReviews = () => {
    return (
        <section className="py-32 px-4 bg-cinema-bg relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center">
                <LayoutIcon icon={Layers} className="mx-auto mb-8 text-cinema-gold opacity-50" />
                <h2 className="font-heading text-3xl text-gray-500 uppercase tracking-widest mb-16">Critics Reviews</h2>

                <blockquote className="text-2xl md:text-4xl font-heading text-white leading-tight mb-8">
                    "A visual masterpiece. The attention to detail and smooth animations make it a joy to use."
                </blockquote>
                <cite className="font-mono text-cinema-gold not-italic uppercase tracking-widest text-sm">
                    — Creative Director, Digital Agency
                </cite>
            </div>
        </section>
    );
};

const LayoutIcon = ({ icon: Icon, className }: { icon: any, className?: string }) => (
    <div className={`w-12 h-12 flex items-center justify-center border border-zinc-800 rounded-full ${className}`}>
        <Icon size={20} />
    </div>
);


// 7. NEXT PROJECT CTA
const NextProject = () => {
    return (
        <section className="h-[50vh] flex flex-col justify-center items-center bg-white text-black text-center px-4 relative overflow-hidden group">
            <div className="absolute inset-0 bg-cinema-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-bottom z-0" />

            <div className="relative z-10">
                <p className="font-mono uppercase tracking-widest mb-4 opacity-60">Ready for the sequel?</p>
                <h2 className="font-heading text-5xl md:text-8xl font-bold uppercase mb-8">
                    Let's Build It
                </h2>
                <Link
                    href="/contact"
                    className="inline-block px-8 py-3 bg-black text-white font-heading uppercase tracking-widest hover:bg-white hover:text-black hover:border-black border border-transparent transition-all duration-300"
                >
                    Contact Production
                </Link>
            </div>
        </section>
    );
};

export default function ProjectsPage() {
    return (
        <main className="bg-cinema-bg min-h-screen text-white selection:bg-cinema-gold selection:text-black">
            {/* Nav Back */}
            <Link
                href="/"
                className="fixed top-6 left-6 z-50 group flex items-center gap-3 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-300"
            >
                <ArrowLeft size={16} />
                <span className="font-mono text-xs uppercase tracking-widest">Back Home</span>
            </Link>

            <ProjectHero />
            <SpotlightProject />
            <TechTicker />
            <PortfolioGrid />
            <ProcessTimeline />
            <CriticsReviews />
            <NextProject />
        </main>
    );
}
