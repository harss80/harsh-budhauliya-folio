"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Calendar, Award } from "lucide-react";
import { Sticker, TechBadge } from "./SocialStickers";

gsap.registerPlugin(ScrollTrigger);

const experience = [
    {
        year: "2024 - Present",
        title: "Founder & Lead Developer",
        company: "Taliyo Technologies",
        description: "Directing the future of web experiences. Building scalable MERN applications and leading a team of creatives.",
        tech: ["React", "Node.js", "AWS"]
    },
    {
        year: "2023 - 2024",
        title: "Senior Frontend Developer",
        company: "TechCorp Studios",
        description: "Architected the main client dashboard used by 50k+ users. Optimized performance by 40%.",
        tech: ["Next.js", "GSAP", "Redux"]
    },
    {
        year: "2022 - 2023",
        title: "UI/UX Designer",
        company: "Creative Agents",
        description: "Designed award-winning interfaces for fintech startups. Focused on micro-interactions and accessibility.",
        tech: ["Figma", "Webflow", "Spline"]
    }
];

export default function TimelineSection() {
    const container = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate the vertical line drawing down
            gsap.fromTo(lineRef.current,
                { height: "0%" },
                {
                    height: "100%",
                    duration: 3,
                    ease: "none",
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top 60%",
                        end: "bottom 80%",
                        scrub: 1,
                    }
                }
            );

            // Staggered reveal for items
            gsap.utils.toArray(".timeline-item").forEach((item: any, i) => {
                gsap.fromTo(item,
                    { opacity: 0, x: -50 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="py-32 px-4 relative bg-cinema-bg overflow-hidden">
            <div className="absolute inset-0 cinema-grain" />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-end mb-12 md:mb-20">
                    <h2 className="text-4xl sm:text-6xl md:text-8xl font-heading text-white leading-none">
                        CAREER<br /><span className="text-cinema-gold">TIMELINE</span>
                    </h2>
                    <div className="mb-4 md:mb-6">
                        <div className="flex items-center gap-2 px-4 py-2 border border-cinema-gold rounded-full bg-black">
                            <Briefcase className="w-4 h-4 text-cinema-gold" />
                            <span className="text-xs font-mono text-cinema-gold tracking-widest uppercase">PROFESSIONAL JOURNEY</span>
                        </div>
                    </div>
                </div>

                <div className="relative pl-8 md:pl-16">
                    {/* The Drawing Line */}
                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-zinc-800" /> {/* Background Line */}
                    <div ref={lineRef} className="absolute left-0 top-0 w-[1px] bg-cinema-gold shadow-[0_0_10px_#c5a059]" /> {/* Active Line */}

                    <div className="space-y-16">
                        {experience.map((item, idx) => (
                            <div key={idx} className="timeline-item relative">
                                {/* Dot - lights up when scrolled past? */}
                                <div className="absolute -left-[41px] md:-left-[73px] top-2 w-5 h-5 bg-black border-2 border-cinema-gold rounded-full z-10 transition-colors duration-500 hover:bg-cinema-gold" />

                                <div className="flex flex-col md:flex-row gap-6 md:items-start group">
                                    <div className="md:w-1/4 pt-2">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-heading text-cinema-gold text-xs tracking-widest uppercase opacity-60">Scene {experience.length - idx}</span>
                                            <span className="font-heading text-3xl md:text-4xl text-white opacity-20 font-bold group-hover:opacity-100 transition-opacity duration-300">
                                                {item.year.split(' ')[0]}
                                            </span>
                                            <span className="font-mono text-xs text-gray-500">{item.year}</span>
                                        </div>
                                        <h3 className="mt-4 text-xl font-heading text-white uppercase tracking-wider">{item.company}</h3>
                                    </div>

                                    <div className="md:w-3/4 p-8 bg-zinc-950/50 border border-zinc-800/50 backdrop-blur-sm relative hover:border-cinema-gold transition-all duration-500 hover:translate-x-2 group-hover:bg-zinc-900/80">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 font-heading text-9xl overflow-hidden pointer-events-none select-none -translate-y-8 translate-x-8 text-white">
                                            {idx + 1}
                                        </div>
                                        <h4 className="text-xl font-heading text-cinema-white mb-4 block border-b border-zinc-800 pb-2 inline-block relative z-10">{item.title}</h4>
                                        <p className="text-gray-400 font-body mb-6 leading-relaxed">
                                            {item.description}
                                        </p>

                                        <div className="flex gap-2">
                                            {item.tech.map((t, i) => (
                                                <span key={i} className="text-xs font-mono text-gray-500 bg-black px-2 py-1 border border-zinc-800">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
