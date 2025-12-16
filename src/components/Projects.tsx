"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        title: "E-COMMERCE EMPIRE",
        genre: "Action / Commerce",
        role: "Director & Lead Dev",
        image: "/poster-ecommerce.png",
        description: "A full-scale MERN stack shopping experience with AI recommendations.",
        year: "2024",
    },
    {
        id: 2,
        title: "SOCIAL CONNECT",
        genre: "Drama / Social",
        role: "Frontend Architect",
        image: "/poster-social.png",
        description: "Real-time social network with premium UI and instant messaging.",
        year: "2023",
    },
    {
        id: 3,
        title: "AI DASHBOARD",
        genre: "Sci-Fi / Tech",
        role: "UI/UX Designer",
        image: "/poster-dashboard.png",
        description: "Data visualization platform powered by machine learning algorithms.",
        year: "2024",
    },
];

export default function Projects() {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(".project-card", { opacity: 0, y: 50 });

            ScrollTrigger.batch(".project-card", {
                start: "top 85%",
                onEnter: (batch) => {
                    gsap.to(batch, {
                        opacity: 1,
                        y: 0,
                        stagger: 0.2,
                        duration: 1,
                        ease: "power3.out",
                        overwrite: true
                    });
                },
                once: true
            });
        }, scrollRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={scrollRef} className="py-24 px-4 min-h-screen relative overflow-hidden bg-cinema-bg">
            <div className="absolute inset-0 cinema-grain" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <span className="text-cinema-gold font-heading tracking-[0.5em] text-sm uppercase">
                        ★ Scene 4 ★
                    </span>
                    <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl mt-4 text-white uppercase tracking-wider">
                        FEATURED FILMS
                    </h2>
                    <div className="w-24 h-[2px] mx-auto mt-4 bg-cinema-gold" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="project-card group relative aspect-[2/3] perspective-1000"
                            onMouseMove={(e) => {
                                const card = e.currentTarget;
                                const rect = card.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const y = e.clientY - rect.top;
                                const centerX = rect.width / 2;
                                const centerY = rect.height / 2;
                                const rotateX = ((y - centerY) / centerY) * -5; // Max 5 deg rotation
                                const rotateY = ((x - centerX) / centerX) * 5;

                                const content = card.querySelector('.project-content');
                                if (content) {
                                    (content as HTMLElement).style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                                }
                            }}
                            onMouseLeave={(e) => {
                                const card = e.currentTarget;
                                const content = card.querySelector('.project-content');
                                if (content) {
                                    (content as HTMLElement).style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                                }
                            }}
                        >
                            <div className="project-content w-full h-full relative transition-transform duration-100 ease-out overflow-hidden bg-black border border-zinc-800 shadow-2xl">
                                {/* Poster Image */}
                                <div className="absolute inset-0 bg-zinc-900 z-0" />
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-all duration-700 group-hover:scale-105 z-0 opacity-80 group-hover:opacity-40"
                                />

                                {/* Year Badge */}
                                <div className="absolute top-4 right-4 px-3 py-1 bg-cinema-gold text-black font-heading text-sm tracking-widest z-20">
                                    {project.year}
                                </div>

                                {/* Content Always Visible but Subtle, Highlight on Hover */}
                                <div className="absolute inset-0 flex flex-col justify-end p-6 z-30 bg-gradient-to-t from-black via-black/80 to-transparent">
                                    <div>
                                        <p className="text-cinema-silver font-heading tracking-widest text-xs mb-2 uppercase">
                                            {project.genre}
                                        </p>
                                        <h3 className="text-3xl font-heading text-white uppercase mb-3 leading-none">
                                            {project.title}
                                        </h3>
                                        <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-500">
                                            <p className="text-gray-300 font-body text-sm mb-4">
                                                {project.description}
                                            </p>
                                            <div className="flex justify-between items-center text-xs text-gray-400 font-mono border-t border-zinc-700 pt-3">
                                                <span>{project.role}</span>
                                                <span className="text-cinema-red font-bold hover:text-white transition-colors cursor-pointer">
                                                    PLAY TRAILER &rarr;
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Border Highlight */}
                                <div className="absolute inset-0 border border-white/0 group-hover:border-cinema-gold/50 transition-colors duration-300 pointer-events-none z-40" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
