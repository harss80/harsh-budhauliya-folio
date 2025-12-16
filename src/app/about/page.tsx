"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowLeft, Code, Cpu, Globe, Zap, Coffee, Heart, Music, Gamepad, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// --- SECTIONS ---

// 1. INTRO HERO
const IntroHero = () => {
    return (
        <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden px-4">
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cinema-gold blur-[150px] rounded-full mix-blend-screen animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cinema-red blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDelay: "2s" }} />
            </div>

            <div className="relative z-10 text-center">
                <p className="font-mono text-cinema-gold opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                    SCENE 1: THE AUTEUR
                </p>
                <h1 className="font-heading text-6xl md:text-9xl font-bold uppercase tracking-tighter my-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                    THE MAN BEHIND<br /><span className="text-cinema-outline text-transparent stroke-white">THE MACHINE</span>
                </h1>
                <p className="font-body text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                    "I don't just write code. I engineer digital emotions and craft cinematic web experiences."
                </p>
            </div>

            <style jsx>{`
                .text-cinema-outline {
                    -webkit-text-stroke: 2px rgba(255, 255, 255, 0.8);
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 1s ease-out forwards;
                }
            `}</style>
        </section>
    );
};

// 2. MANIFESTO (Horizontal Scroll)
const Manifesto = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const sections = gsap.utils.toArray(".manifesto-item");
            gsap.to(sections, {
                xPercent: -100 * (sections.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (sections.length - 1),
                    end: "+=3000",
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const principles = [
        { title: "OBSESSION", desc: "Good enough is not enough. We strive for pixel-perfect precision." },
        { title: "PERFORMANCE", desc: "Speed is a feature. Animation should never cost usability." },
        { title: "STORYTELLING", desc: "Every scroll is a scene. Every click is a beat. The web is a narrative." },
        { title: "INNOVATION", desc: "Breaking the Fourth Wall. Pushing browser capabilities to the edge." },
    ];

    return (
        <section ref={sectionRef} className="overflow-hidden bg-white text-black">
            <div ref={triggerRef} className="h-screen flex items-center w-[400vw]">
                {principles.map((p, i) => (
                    <div key={i} className="manifesto-item w-screen h-screen flex flex-col justify-center items-center p-8 border-r border-black/10 relative">
                        <span className="absolute top-10 left-10 font-mono text-xl opacity-50">0{i + 1} // PRINCIPLE</span>
                        <h2 className="font-heading text-[10vw] leading-none font-bold uppercase mb-8">{p.title}</h2>
                        <p className="font-body text-2xl md:text-4xl max-w-4xl text-center leading-relaxed font-light">{p.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

// 3. THE ARSENAL (Tech Stack)
const TheArsenal = () => {
    const tools = [
        { icon: <Code size={40} />, label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
        { icon: <Zap size={40} />, label: "Animation", items: ["GSAP", "Three.js", "Framer Motion", "WebGL"] },
        { icon: <Globe size={40} />, label: "Backend", items: ["Node.js", "PostgreSQL", "GraphQL", "AWS"] },
        { icon: <Cpu size={40} />, label: "Architecture", items: ["Docker", "CI/CD", "Microservices", "System Design"] },
    ];

    return (
        <section className="py-32 px-4 bg-zinc-950 border-y border-zinc-800 relative">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20 text-center">
                    <span className="text-cinema-gold font-mono tracking-widest text-sm uppercase">The Toolkit</span>
                    <h2 className="text-white font-heading text-5xl md:text-7xl mt-4 uppercase">Production Arsenal</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {tools.map((tool, i) => (
                        <div key={i} className="group p-10 border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 hover:border-cinema-gold transition-all duration-500 rounded-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 group-hover:text-cinema-gold transition-all duration-500">
                                {tool.icon}
                            </div>
                            <h3 className="text-2xl font-heading text-white mb-6 uppercase tracking-wider">{tool.label}</h3>
                            <div className="flex flex-wrap gap-3">
                                {tool.items.map((item, j) => (
                                    <span key={j} className="px-4 py-2 border border-zinc-700 text-gray-400 text-sm font-mono uppercase hover:bg-white hover:text-black transition-colors duration-300 cursor-default">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// 4. STATS (Counters)
const BoxOfficeStats = () => {
    return (
        <section className="py-24 bg-cinema-gold text-black">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                {[
                    { val: "5+", label: "Years Experience" },
                    { val: "50+", label: "Projects Shipped" },
                    { val: "100%", label: "Client Satisfaction" },
                    { val: "∞", label: "Lines of Code" }
                ].map((stat, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <span className="font-heading text-6xl md:text-8xl font-bold mb-2">{stat.val}</span>
                        <span className="font-mono text-sm tracking-[0.2em] uppercase border-t border-black pt-2 w-full max-w-[100px]">{stat.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}

// 5. BEHIND THE SCENES (Interests)
const BehindTheScenes = () => {
    const interests = [
        { icon: <Music size={32} />, title: "Soundscapes", desc: "Producing lofi beats & ambient mixes." },
        { icon: <Gamepad size={32} />, title: "Interactive Art", desc: "Gaming & exploring narrative design." },
        { icon: <Coffee size={32} />, title: "Fuel", desc: "Connoisseur of dark roast coffee." },
        { icon: <Heart size={32} />, title: "Community", desc: "Mentoring new developers." },
    ];

    return (
        <section className="py-32 px-4 bg-cinema-bg relative">
            <div className="max-w-6xl mx-auto">
                <div className="mb-20">
                    <h2 className="text-white font-heading text-5xl md:text-7xl uppercase text-right">Off Camera</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {interests.map((item, i) => (
                        <div key={i} className="aspect-square bg-zinc-900 border border-zinc-800 p-8 flex flex-col justify-between hover:scale-105 hover:bg-white hover:text-black transition-all duration-300 group cursor-pointer group">
                            <div className="text-cinema-gold group-hover:text-black transition-colors">{item.icon}</div>
                            <div>
                                <h4 className="font-heading text-xl uppercase mb-2">{item.title}</h4>
                                <p className="text-sm font-mono opacity-60 group-hover:opacity-100">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 6. DIRECTOR'S COMMENTARY (FAQ/Accordion)
const DirectorsCommentary = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        { q: "What is your main tech stack?", a: "I specialize in the MERN stack (MongoDB, Express, React, Node.js) but I'm heavily invested in the Next.js ecosystem for production-grade apps." },
        { q: "Do you do freelance work?", a: "Yes, I am available for select freelance projects and long-term contracts. I prefer projects that value high-end UI/UX." },
        { q: "How do you handle performance?", a: "I build with performance in mind from day one. Server-side rendering, code splitting, image optimization, and efficient asset delivery are standard." },
        { q: "Can you design as well as code?", a: "Absolutely. I believe the best developers have a strong grasp of design principles. I use Figma for prototyping and design systems." },
    ];

    return (
        <section className="py-32 px-4 bg-zinc-950">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-white font-heading text-4xl mb-12 uppercase text-center tracking-widest text-cinema-silver">Director's Commentary</h2>

                <div className="flex flex-col gap-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border-b border-zinc-800">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full py-6 flex justify-between items-center text-left hover:text-cinema-gold transition-colors"
                            >
                                <span className="font-heading text-xl md:text-2xl uppercase text-white">{faq.q}</span>
                                <span className="text-2xl text-cinema-gold">{openIndex === i ? "—" : "+"}</span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === i ? "max-h-48 opacity-100 mb-6" : "max-h-0 opacity-0"}`}
                            >
                                <p className="font-body text-gray-400 text-lg leading-relaxed">{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// MAIN PAGE COMPONENT
export default function AboutPage() {
    return (
        <main className="bg-cinema-bg min-h-screen text-white selection:bg-cinema-gold selection:text-black">
            {/* Back Navigation */}
            <Link
                href="/"
                className="fixed top-6 left-6 z-50 group flex items-center gap-3 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-300"
            >
                <ArrowLeft size={16} />
                <span className="font-mono text-xs uppercase tracking-widest">Back to Home</span>
            </Link>

            <IntroHero />
            <Manifesto />
            <TheArsenal />
            <BoxOfficeStats />
            <BehindTheScenes />
            <DirectorsCommentary />

            {/* FINALE CTA */}
            <section className="py-20 text-center bg-zinc-900 border-t border-zinc-800">
                <h2 className="font-heading text-3xl mb-8 uppercase text-gray-500">End of Scene</h2>
                <Link
                    href="/contact"
                    className="inline-block px-12 py-6 bg-cinema-gold text-black font-heading text-2xl uppercase tracking-widest hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_50px_rgba(197,160,89,0.2)]"
                >
                    Start Your Project
                </Link>
            </section>
        </main>
    );
}
