"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experience = [
    {
        year: "2025 - Present",
        title: "Frontend Developer & Marketing",
        company: "Taliyo Technologies",
        description: "Spearheaded the development of AI-powered web applications using React. Bridged the gap between technical execution and marketing strategies to drive product adoption.",
    },
    {
        year: "2024 - 2025",
        title: "Frontend Developer",
        company: "Examboost",
        description: "Developed and maintained highly responsive user interfaces. Optimized web performance and collaborated with designers to deliver seamless student experiences.",
    },
    {
        year: "2023 - 2024",
        title: "Intern",
        company: "V5 IT Solution",
        description: "Assisted in building full-stack web applications. Gained hands-on experience in modern frontend frameworks and agile development cycles.",
    }
];

export default function TimelineSection() {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".exp-elem", {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 80%",
                },
                opacity: 0,
                x: -50,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out"
            });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="py-32 relative max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 w-full border-t border-border-light bg-bg-secondary">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                
                <div className="lg:col-span-4 flex flex-col justify-start">
                    <span className="text-text-secondary font-bold tracking-widest text-xs uppercase mb-4 block">
                        [04] History
                    </span>
                    <h2 className="text-5xl md:text-6xl font-black tracking-tight text-text-primary uppercase leading-[0.9]">
                        Career <br /> Timeline.
                    </h2>
                </div>

                <div className="lg:col-span-8 flex flex-col">
                    {experience.map((item, idx) => (
                        <div key={idx} className="exp-elem flex flex-col lg:flex-row gap-6 lg:gap-12 py-12 border-b border-border-light group">
                            
                            <div className="lg:w-1/3 flex flex-col">
                                <span className="text-text-secondary font-bold tracking-widest text-sm uppercase">
                                    {item.year}
                                </span>
                            </div>
                            
                            <div className="lg:w-2/3 flex flex-col">
                                <h3 className="text-3xl font-black uppercase text-text-primary mb-2 group-hover:pl-4 transition-all duration-300">
                                    {item.company}
                                </h3>
                                <h4 className="text-text-secondary text-lg mb-6 font-medium">
                                    {item.title}
                                </h4>
                                <p className="text-text-secondary text-lg leading-relaxed font-light">
                                    {item.description}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
