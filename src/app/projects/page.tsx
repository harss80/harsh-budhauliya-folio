"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
    ArrowLeft, ArrowRight, ExternalLink, Github, Play, ArrowDown,
    Star, Film, Monitor, Layers, Code, Zap, Globe, Cpu
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// --- UTILS ---
const MagneticButton = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const mouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = el.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 1, ease: "power3.out" });
        };

        const mouseLeave = () => {
            gsap.to(el, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
        };

        el.addEventListener("mousemove", mouseMove);
        el.addEventListener("mouseleave", mouseLeave);
        return () => {
            el.removeEventListener("mousemove", mouseMove);
            el.removeEventListener("mouseleave", mouseLeave);
        };
    }, []);

    return <div ref={ref} className={className}>{children}</div>;
};

// --- SECTIONS ---

// 1. HERO: Kinetic Typography & Video Background
const SectionHero = () => {
    return (
        <section className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-black">
            {/* Background Texture & Gradient */}
            <div className="absolute inset-0 w-full h-full bg-zinc-900">
                <div className="absolute inset-0 bg-[url('/texture.png')] opacity-[0.05] mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/30 via-black to-black"></div>
            </div>

            <div className="relative z-10 text-center mix-blend-difference text-white">
                <h1 className="hero-title font-heading text-[12vw] leading-[0.8] uppercase font-bold tracking-tighter">
                    Selected
                </h1>
                <div className="flex items-center justify-center gap-4 overflow-hidden my-2">
                    <div className="h-[2px] w-12 md:w-24 bg-cinema-gold hero-line" />
                    <span className="font-mono text-sm md:text-xl tracking-[0.3em] md:tracking-[0.5em] hero-subtitle whitespace-nowrap">WORKS '24-'25</span>
                    <div className="h-[2px] w-12 md:w-24 bg-cinema-gold hero-line" />
                </div>
                <h1 className="hero-title font-heading text-[12vw] leading-[0.8] uppercase font-bold tracking-tighter">
                    Projects
                </h1>
            </div>

            <div className="absolute bottom-10 left-10 hidden md:block">
                <span className="font-mono text-xs text-white/50 text-vertical-rl tracking-widest uppercase">Scroll to explore</span>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 right-10 flex flex-col items-center gap-2 animate-bounce">
                <ArrowDown className="text-cinema-gold" />
            </div>
        </section>
    );
};

// 2. VISION: Sticky Text Reveal
const SectionVision = () => {
    const container = useRef(null);
    const textRef = useRef(null);

    useLayoutEffect(() => {
        if (!container.current || !textRef.current) return;

        let ctx = gsap.context(() => {
            const words = textRef.current.querySelectorAll(".word");
            gsap.fromTo(words,
                { opacity: 0.1, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top 60%",
                        end: "bottom 80%",
                        scrub: 1,
                    }
                }
            );
        }, container);
        return () => ctx.revert();
    }, []);

    const visionText = "Design is not just what it looks like and feels like. Design is how it works. We build immersive digital experiences that defy boundaries.";

    return (
        <section ref={container} className="min-h-[80vh] bg-zinc-950 flex items-center justify-center px-6 md:px-20 py-24">
            <div className="max-w-5xl">
                <p ref={textRef} className="font-heading text-4xl md:text-6xl lg:text-7xl leading-[1.1] text-white uppercase text-center flex flex-wrap justify-center gap-x-4 gap-y-2">
                    {visionText.split(" ").map((word, i) => (
                        <span key={i} className="word transition-colors">{word}</span>
                    ))}
                </p>
            </div>
        </section>
    );
};

// 3. SHOWCASE CLUSTER: Featured Project (Buda's Pub)
const SectionSpotlight = () => {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(".spotlight-img", {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    scrub: true
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 px-6 md:px-12 bg-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 border-b border-zinc-800 pb-8">
                    <div>
                        <span className="block font-mono text-cinema-gold mb-2">01 / FEATURED</span>
                        <h2 className="text-5xl md:text-7xl font-heading text-white uppercase">Buda's Pub</h2>
                    </div>
                    <Link href="https://harsh-budhauliya-restaurant.vercel.app" target="_blank" className="group flex items-center gap-2 text-white font-mono uppercase tracking-widest mt-6 md:mt-0">
                        Visit Site <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="relative aspect-video w-full bg-zinc-900 overflow-hidden group border border-zinc-800">
                    <div className="spotlight-img absolute inset-0 -top-[20%] h-[140%] w-full">
                        <img
                            src="/poster-restaurant.png"
                            alt="Buda's Pub"
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                        />
                    </div>

                    <div className="absolute bottom-8 left-8 p-6 bg-black/80 backdrop-blur border border-white/10 max-w-sm z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <p className="text-zinc-300 mb-4 font-body">A complete digital overhaul for a gastropub featuring real-time menus and reservation systems.</p>
                        <div className="flex gap-2 flex-wrap">
                            {["Next.js", "GSAP", "Tailwind"].map(t => (
                                <span key={t} className="text-[10px] border border-white/20 px-2 py-1 text-white uppercase font-mono">{t}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// 4. HORIZONTAL SCROLL: Selected Works
const SectionHorizontal = () => {
    const sectionRef = useRef(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!sectionRef.current || !triggerRef.current) return;

        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray(".work-card");

            gsap.to(cards, {
                xPercent: -100 * (cards.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (cards.length - 1),
                    end: () => "+=" + (triggerRef.current?.offsetWidth || 0),
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const works = [
        { id: "01", title: "Cyber Finance", type: "Fintech", img: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000&auto=format&fit=crop" },
        { id: "02", title: "Neon Market", type: "E-Commerce", img: "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2070&auto=format&fit=crop" },
        { id: "03", title: "Zen Health", type: "Wellness", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop" },
        { id: "04", title: "Orbit AI", type: "SaaS", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop" },
    ];

    return (
        <section ref={sectionRef} className="bg-zinc-950 overflow-hidden">
            <div ref={triggerRef} className="h-screen w-full flex items-center relative overflow-hidden pl-12 md:pl-24">
                <div className="absolute top-12 left-12 md:left-24 z-10 pointer-events-none">
                    <h3 className="font-heading text-xl md:text-3xl text-white uppercase opacity-70">Selected Works</h3>
                    <span className="text-zinc-500 font-mono text-xs">SCROLL HORIZONTALLY</span>
                </div>

                <div className="flex gap-8 md:gap-12 pr-24 items-center">
                    <div className="work-card min-w-[20vw] h-[50vh] flex items-center justify-center opacity-30">
                        <h2 className="font-heading text-6xl text-white uppercase transform -rotate-90 whitespace-nowrap">Drag &rarr;</h2>
                    </div>
                    {works.map((work) => (
                        <div key={work.id} className="work-card relative min-w-[80vw] md:min-w-[40vw] h-[60vh] md:h-[70vh] bg-zinc-900 group border border-zinc-800 flex-shrink-0 overflow-hidden">
                            <img src={work.img} alt={work.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                            <div className="absolute top-6 left-6 z-20">
                                <span className="font-mono text-cinema-gold text-xl p-2 bg-black/50 backdrop-blur">{work.id}</span>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform">
                                <h3 className="text-3xl md:text-5xl font-heading text-white uppercase mb-2">{work.title}</h3>
                                <span className="font-mono text-xs md:text-sm text-zinc-400 uppercase tracking-widest border border-zinc-700 px-3 py-1 rounded-full">{work.type}</span>
                            </div>
                        </div>
                    ))}
                    <div className="work-card min-w-[80vw] md:min-w-[40vw] h-[60vh] md:h-[70vh] bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0">
                        <div className="text-center">
                            <h2 className="font-heading text-4xl md:text-6xl text-zinc-700 uppercase mb-4">Coming Soon</h2>
                            <p className="font-mono text-zinc-500">More projects in the pipeline</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// 5. TECH STACK: Infinite Marquee
const SectionTech = () => {
    return (
        <section className="py-24 bg-cinema-gold text-black overflow-hidden relative z-10 tilt-section">
            <div className="absolute inset-0 bg-black/5 pattern-dots" />

            <div className="flex flex-col gap-8 transform -rotate-2 scale-110">
                {/* Row 1 - Left */}
                <div className="flex whitespace-nowrap overflow-hidden">
                    <div className="animate-marquee flex gap-12 items-center pr-12">
                        {["React", "Next.js", "TypeScript", "Node.js", "WebGL", "Three.js"].map((item, i) => (
                            <span key={i} className="text-6xl md:text-9xl font-heading uppercase font-bold tracking-tighter opacity-80 hover:opacity-100 transition-opacity">
                                {item} <span className="text-black/20 mx-4 text-4xl stroke-text">•</span>
                            </span>
                        ))}
                    </div>
                    <div className="animate-marquee flex gap-12 items-center pr-12" aria-hidden="true">
                        {["React", "Next.js", "TypeScript", "Node.js", "WebGL", "Three.js"].map((item, i) => (
                            <span key={i} className="text-6xl md:text-9xl font-heading uppercase font-bold tracking-tighter opacity-80 hover:opacity-100 transition-opacity">
                                {item} <span className="text-black/20 mx-4 text-4xl stroke-text">•</span>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Row 2 - Right (Reverse) */}
                <div className="flex whitespace-nowrap overflow-hidden">
                    <div className="animate-marquee-reverse flex gap-12 items-center pr-12">
                        {["Tailwind", "GSAP", "Framer", "Prisma", "Postgres", "AWS"].map((item, i) => (
                            <span key={i} className="text-6xl md:text-9xl font-heading uppercase font-bold tracking-tighter text-transparent stroke-black">
                                {item} <span className="text-black/20 mx-4 text-4xl">•</span>
                            </span>
                        ))}
                    </div>
                    <div className="animate-marquee-reverse flex gap-12 items-center pr-12" aria-hidden="true">
                        {["Tailwind", "GSAP", "Framer", "Prisma", "Postgres", "AWS"].map((item, i) => (
                            <span key={i} className="text-6xl md:text-9xl font-heading uppercase font-bold tracking-tighter text-transparent stroke-black">
                                {item} <span className="text-black/20 mx-4 text-4xl">•</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .stroke-black { -webkit-text-stroke: 2px black; }
                .animate-marquee { animation: marquee 20s linear infinite; }
                .animate-marquee-reverse { animation: marquee-reverse 20s linear infinite; }
                
                .tilt-section {
                    transform: skewY(-2deg);
                }
                .pattern-dots {
                    background-image: radial-gradient(#000 1px, transparent 1px);
                    background-size: 24px 24px;
                }
                .writing-vertical {
                    writing-mode: vertical-rl;
                    text-orientation: mixed;
                }

                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-100%); }
                }
                @keyframes marquee-reverse {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(0); }
                }
            `}</style>
        </section>
    );
};

// 6. PROCESS: Interactive Accordion
const SectionProcess = () => {
    const [active, setActive] = useState(0);

    const steps = [
        { title: "Discovery", desc: "We dive deep into your brand, goals, and audience to create a strategic roadmap. Understanding the core problem is half the solution." },
        { title: "Design", desc: "Visualizing the concept with high-fidelity wireframes and interactive prototypes. We focus on user experience and visual impact." },
        { title: "Development", desc: "Clean, scalable code built with the latest frameworks to ensure performance. We build for speed, accessibility, and SEO." },
        { title: "Deployment", desc: "Rigorous testing and seamless launch strategies. We monitor post-launch performance to ensure everything runs smoothly." }
    ];

    return (
        <section className="py-32 px-6 md:px-24 bg-zinc-950 relative">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-zinc-900/20 to-transparent pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
                <div className="sticky top-32 h-fit">
                    <span className="font-mono text-cinema-gold mb-4 block tracking-widest uppercase">The Workflow</span>
                    <h2 className="font-heading text-5xl md:text-6xl text-white uppercase mb-8 leading-tight">
                        From Concept <br /> To <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-600">Reality</span>
                    </h2>
                    <p className="text-zinc-400 max-w-md font-body text-lg">
                        Our process is a refined loop of feedback and iteration. We value transparency and speed without compromising on quality.
                    </p>
                </div>

                <div className="space-y-4">
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            onClick={() => setActive(i)}
                            className={`border-b border-zinc-800 pb-8 cursor-pointer group transition-all duration-300 ${active === i ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="font-mono text-cinema-gold text-lg">0{i + 1}</span>
                                <h3 className="font-heading text-3xl md:text-4xl text-white uppercase group-hover:pl-4 transition-all">{step.title}</h3>
                            </div>
                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${active === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                                <p className="text-zinc-400 pl-8 md:pl-10 leading-relaxed max-w-lg">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// 7. LAB / GALLERY: Grid Layout
const SectionGallery = () => {
    return (
        <section className="py-24 px-6 md:px-12 bg-black border-t border-zinc-900">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                <div>
                    <h2 className="font-heading text-4xl md:text-5xl text-white uppercase">The Lab</h2>
                    <p className="font-mono text-zinc-500 mt-2 text-sm uppercase tracking-widest">Experiments & Concepts</p>
                </div>
                <div className="hidden md:block">
                    <Link href="#" className="text-zinc-400 hover:text-white font-mono text-xs uppercase hover:underline">View All Experiments</Link>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
                <div className="col-span-2 row-span-2 bg-zinc-900 rounded-lg overflow-hidden relative group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-black/80 z-10" />
                    <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Abstract" />
                    <div className="absolute bottom-6 left-6 z-20">
                        <h3 className="text-white font-heading text-3xl">3D Shader</h3>
                        <span className="text-zinc-400 text-xs font-mono uppercase">WebGL / GLSL</span>
                    </div>
                </div>

                <div className="bg-zinc-800 rounded-lg overflow-hidden relative group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-black/80 z-10" />
                    <div className="absolute flex items-center justify-center inset-0">
                        <Code className="text-zinc-600 group-hover:text-white transition-colors" size={32} />
                    </div>
                </div>

                <div className="bg-zinc-800 rounded-lg overflow-hidden relative group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-900/50 to-black/80 z-10" />
                    <div className="absolute flex items-center justify-center inset-0">
                        <Layers className="text-zinc-600 group-hover:text-white transition-colors" size={32} />
                    </div>
                </div>

                <div className="col-span-2 bg-zinc-900 rounded-lg overflow-hidden relative group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-900/50 to-black/80 z-10" />
                    <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Tech" />
                    <div className="absolute bottom-6 left-6 z-20">
                        <h3 className="text-white font-heading text-2xl">Motion UI</h3>
                    </div>
                </div>

                <div className="col-span-2 row-span-2 bg-zinc-900 rounded-lg overflow-hidden relative group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/50 to-black/80 z-10" />
                    <img src="https://images.unsplash.com/photo-1614850523296-6313a9a55f72?q=80&w=2670&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Abstract" />
                    <div className="absolute bottom-6 left-6 z-20">
                        <h3 className="text-white font-heading text-3xl">Type Design</h3>
                        <span className="text-zinc-400 text-xs font-mono uppercase">Typography / Layout</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

// 8. FINAL CTA
const SectionFooter = () => {
    return (
        <section className="h-[90vh] bg-zinc-950 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cinema-gold blur-[200px] rounded-full mix-blend-screen animate-pulse" />
            </div>

            <div className="relative z-10 px-6">
                <h2 className="font-heading text-[12vw] leading-[0.8] text-white uppercase mb-12 mix-blend-difference">
                    Let's <br /><span className="text-cinema-gold">Create</span>
                </h2>
                <Link href="/contact">
                    <MagneticButton className="inline-block">
                        <button className="bg-transparent border border-white text-white px-12 py-5 rounded-full font-heading text-xl uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
                            Start Project
                        </button>
                    </MagneticButton>
                </Link>
            </div>

            <footer className="absolute bottom-8 w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-zinc-600 font-mono text-[10px] uppercase gap-4">
                <span>© 2025 HARSH BUDHAULIYA</span>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-white transition-colors">Instagram</a>
                    <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                </div>
            </footer>
        </section>
    );
};


export default function ProjectsPage() {
    return (
        <main className="bg-black min-h-screen text-white selection:bg-cinema-gold selection:text-black">
            <Link
                href="/"
                className="fixed top-8 left-8 z-50 mix-blend-difference text-white opacity-80 hover:opacity-100 transition-opacity hover:scale-110 duration-300"
            >
                <ArrowLeft size={32} />
            </Link>

            <SectionHero />
            <SectionVision />
            <SectionSpotlight />
            <SectionHorizontal />
            <SectionTech />
            <SectionProcess />
            <SectionGallery />
            <SectionFooter />
        </main>
    );
}
