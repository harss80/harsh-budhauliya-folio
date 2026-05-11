"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Code, Database, Server, GitBranch, Layers, Activity, BookOpen, Terminal, Code2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// 1. HERO
const HeroEntrance = () => {
    return (
        <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden px-4 lg:px-24 bg-bg-primary">
            <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col justify-center items-start mt-20">
                <div className="overflow-hidden mb-6">
                    <p className="font-mono text-text-secondary tracking-[0.5em] uppercase text-sm animate-slide-up opacity-0" style={{ animationFillMode: "forwards" }}>
                        Software Engineer
                    </p>
                </div>
                
                <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-text-primary leading-[0.85] mb-12">
                    <div className="overflow-hidden">
                        <span className="block animate-slide-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>The</span>
                    </div>
                    <div className="overflow-hidden">
                        <span className="block text-text-secondary animate-slide-up opacity-0" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>Architect.</span>
                    </div>
                </h1>
                
                <div className="overflow-hidden max-w-3xl">
                    <p className="font-body text-xl md:text-3xl text-text-secondary font-light leading-relaxed animate-slide-up opacity-0" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
                        I don't just write code. I engineer scalable systems, craft flawless user experiences, and push the boundaries of what's possible on the web.
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(100%); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-up {
                    animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1);
                }
            `}</style>
        </section>
    );
};

// 2. CORE PHILOSOPHY
const CorePhilosophy = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".philosophy-card", 
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const philosophies = [
        { title: "Scalability First", desc: "Building architecture that grows. Anticipating traffic spikes and data complexity before they happen." },
        { title: "Performance is UX", desc: "A slow app is a broken app. Relentlessly optimizing web vitals, rendering paths, and server response times." },
        { title: "Clean Code", desc: "Writing code for humans first, machines second. Emphasizing readability, strict typing, and modularity." },
        { title: "Pixel Perfection", desc: "Bridging the gap between engineering and design. Ensuring every component looks exactly as intended." },
    ];

    return (
        <section ref={sectionRef} className="py-24 md:py-32 lg:py-48 px-4 lg:px-24 bg-bg-primary relative border-t border-border-light">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                <div className="col-span-1 lg:col-span-4 flex flex-col justify-start">
                    <span className="font-mono text-xs tracking-widest uppercase text-text-secondary mb-8 block">
                        [01] Values
                    </span>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-text-primary leading-[0.9] sticky top-32">
                        Core <br /> Philosophy.
                    </h2>
                </div>
                <div className="col-span-1 lg:col-span-8 flex flex-col gap-12">
                    {philosophies.map((p, i) => (
                        <div key={i} className="philosophy-card border-b border-border-light pb-12 last:border-0">
                            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-text-primary mb-4">{p.title}</h3>
                            <p className="text-xl md:text-2xl text-text-secondary font-light leading-relaxed">{p.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// 3. TECHNICAL ARSENAL (Bento Grid)
const TechnicalArsenal = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".bento-card", 
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const stack = [
        { title: "Frontend", icon: <Code size={32} />, skills: ["React", "Next.js", "TypeScript", "Tailwind"], colSpan: "md:col-span-2", rowSpan: "md:row-span-1" },
        { title: "Backend", icon: <Server size={32} />, skills: ["Node.js", "Express", "NestJS"], colSpan: "md:col-span-1", rowSpan: "md:row-span-2" },
        { title: "Database", icon: <Database size={32} />, skills: ["PostgreSQL", "MongoDB", "Redis"], colSpan: "md:col-span-1", rowSpan: "md:row-span-1" },
        { title: "DevOps", icon: <GitBranch size={32} />, skills: ["Docker", "AWS", "CI/CD"], colSpan: "md:col-span-1", rowSpan: "md:row-span-1" },
        { title: "Architecture", icon: <Layers size={32} />, skills: ["Microservices", "System Design", "GraphQL"], colSpan: "md:col-span-2", rowSpan: "md:row-span-1" },
    ];

    return (
        <section ref={sectionRef} className="py-24 md:py-32 lg:py-48 px-4 lg:px-24 bg-bg-secondary relative border-t border-border-light">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                <div className="col-span-1 lg:col-span-4 flex flex-col justify-start">
                    <span className="font-mono text-xs tracking-widest uppercase text-text-secondary mb-8 block">
                        [02] Stack
                    </span>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-text-primary leading-[0.9] sticky top-32">
                        The <br /> Arsenal.
                    </h2>
                </div>
                <div className="col-span-1 lg:col-span-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
                        {stack.map((item, i) => (
                            <div key={i} className={`bento-card group p-8 border border-border-light bg-bg-primary hover:border-white/20 transition-all duration-500 flex flex-col justify-between overflow-hidden relative ${item.colSpan} ${item.rowSpan}`}>
                                <div className="absolute -right-4 -top-4 text-white/5 group-hover:text-white/10 transition-colors duration-500 transform group-hover:scale-110 group-hover:-rotate-12">
                                    {item.icon}
                                </div>
                                <div>
                                    <div className="text-white/50 mb-6 group-hover:text-white transition-colors duration-300">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">{item.title}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2 relative z-10">
                                    {item.skills.map((skill, j) => (
                                        <span key={j} className="px-3 py-1 bg-bg-secondary border border-border-light text-text-secondary text-xs font-mono uppercase">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// 4. CAREER JOURNEY
const CareerJourney = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".journey-card", 
                { x: 50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const roles = [
        { year: "2025 - Present", title: "Frontend Dev & Marketing", company: "Taliyo Technologies", desc: "Spearheaded the development of AI-powered web applications using React. Bridged the gap between technical execution and marketing strategies to drive product adoption." },
        { year: "2024 - 2025", title: "Frontend Developer", company: "Examboost", desc: "Developed and maintained highly responsive user interfaces. Optimized web performance and collaborated with designers to deliver seamless student experiences." },
        { year: "2023 - 2024", title: "Intern", company: "V5 IT Solution", desc: "Assisted in building full-stack web applications. Gained hands-on experience in modern frontend frameworks and agile development cycles." },
    ];

    return (
        <section ref={sectionRef} className="py-24 md:py-32 lg:py-48 px-4 lg:px-24 bg-bg-primary relative border-t border-border-light">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                <div className="col-span-1 lg:col-span-4 flex flex-col justify-start">
                    <span className="font-mono text-xs tracking-widest uppercase text-text-secondary mb-8 block">
                        [03] Timeline
                    </span>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-text-primary leading-[0.9] sticky top-32">
                        Career <br /> Journey.
                    </h2>
                </div>
                <div className="col-span-1 lg:col-span-8 flex flex-col gap-8">
                    {roles.map((role, i) => (
                        <div key={i} className="journey-card p-8 md:p-12 bg-bg-secondary border border-border-light group hover:border-white/20 transition-all duration-300">
                            <span className="text-text-secondary font-mono text-sm uppercase block mb-4">{role.year}</span>
                            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white mb-2">{role.title}</h3>
                            <h4 className="text-xl font-medium text-text-secondary mb-6">{role.company}</h4>
                            <p className="text-lg text-text-secondary font-light leading-relaxed">{role.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// 5. SCALE & IMPACT
const ScaleAndImpact = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".stat-num", 
                { textContent: 0 },
                {
                    textContent: 1, // we'll use snap for textContent
                    duration: 2,
                    ease: "power2.out",
                    snap: { textContent: 1 },
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const stats = [
        { num: 5, suffix: "+", label: "Years Exp." },
        { num: 50, suffix: "+", label: "Projects" },
        { num: 40, suffix: "%", label: "Perf. Boost" },
        { num: 1, suffix: "M+", label: "Lines Coded" }
    ];

    return (
        <section ref={sectionRef} className="py-24 md:py-32 lg:py-48 px-4 lg:px-24 bg-text-primary text-bg-primary border-t border-border-light relative overflow-hidden">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                <div className="col-span-1 lg:col-span-4 flex flex-col justify-start">
                    <span className="font-mono text-xs tracking-widest uppercase opacity-70 mb-8 block text-bg-primary font-bold">
                        [04] Metrics
                    </span>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-bg-primary">
                        Scale & <br /> Impact.
                    </h2>
                </div>
                <div className="col-span-1 lg:col-span-8 grid grid-cols-2 md:grid-cols-2 gap-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col items-start justify-center p-8 border-l-4 border-bg-primary/20">
                            <div className="flex items-baseline mb-2 text-bg-primary">
                                <span className="stat-num font-heading text-6xl md:text-8xl font-black tracking-tighter">{stat.num}</span>
                                <span className="font-heading text-4xl md:text-6xl font-bold">{stat.suffix}</span>
                            </div>
                            <span className="font-mono text-sm tracking-widest uppercase font-bold opacity-70">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// 6. BEYOND THE IDE
const BeyondIDE = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".interest-card", 
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const interests = [
        { icon: <BookOpen size={24} />, title: "Continuous Learning", desc: "Always exploring new patterns, languages, and architectures." },
        { icon: <Terminal size={24} />, title: "Open Source", desc: "Contributing to tools that power the modern web ecosystem." },
        { icon: <Code2 size={24} />, title: "Mentorship", desc: "Guiding junior developers to write cleaner, better code." },
        { icon: <Activity size={24} />, title: "Optimization", desc: "Finding joy in shaving milliseconds off load times." },
    ];

    return (
        <section ref={sectionRef} className="py-24 md:py-32 lg:py-48 px-4 lg:px-24 bg-bg-primary border-t border-border-light relative">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                <div className="col-span-1 lg:col-span-4 flex flex-col justify-start">
                    <span className="font-mono text-xs tracking-widest uppercase text-text-secondary mb-8 block">
                        [05] Off-Screen
                    </span>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-text-primary leading-[0.9] sticky top-32">
                        Beyond <br /> The IDE.
                    </h2>
                </div>
                <div className="col-span-1 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {interests.map((item, i) => (
                        <div key={i} className="interest-card group p-8 bg-bg-secondary border border-border-light hover:border-white/20 transition-all duration-300 flex flex-col items-start">
                            <div className="mb-6 text-text-secondary group-hover:text-white transition-colors duration-300">
                                {item.icon}
                            </div>
                            <h4 className="font-heading text-2xl font-black tracking-tighter uppercase mb-3 text-text-primary">{item.title}</h4>
                            <p className="text-lg font-body text-text-secondary font-light leading-relaxed group-hover:text-white transition-colors duration-300">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// 7. THE NEXT CHAPTER (CTA)
const NextChapterCTA = () => {
    return (
        <section className="py-24 md:py-32 lg:py-48 px-4 text-center bg-bg-secondary border-t border-border-light relative overflow-hidden">
            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary mb-8 block">
                    [06] The Next Chapter
                </span>
                <h2 className="font-heading text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-text-primary leading-[0.85] mb-12">
                    Let's Build <br /> <span className="text-text-secondary">Together.</span>
                </h2>
                <Link
                    href="/contact"
                    className="group relative inline-flex items-center justify-center px-12 py-6 bg-white text-black font-mono text-sm uppercase tracking-widest font-bold overflow-hidden transition-transform duration-300 hover:scale-105"
                >
                    <span className="relative z-10">Open For Opportunities</span>
                </Link>
            </div>
        </section>
    );
};

// MAIN PAGE COMPONENT
export default function AboutPage() {
    return (
        <main className="bg-bg-primary min-h-screen text-text-primary selection:bg-white selection:text-black font-body">
            <HeroEntrance />
            <CorePhilosophy />
            <TechnicalArsenal />
            <CareerJourney />
            <ScaleAndImpact />
            <BeyondIDE />
            <NextChapterCTA />
        </main>
    );
}
