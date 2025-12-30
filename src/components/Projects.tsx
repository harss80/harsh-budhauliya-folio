"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Play, X, ExternalLink, Github, Info, Maximize2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---
const projects = [
    {
        id: 1,
        title: "BUDA'S PUB",
        genre: "Hospitality / Dining",
        role: "Lead Developer",
        image: "/poster-restaurant.png",
        video: "/budas-pub-demo.webp",
        description: "A premium restaurant interface featuring a dynamic menu with over 80 dishes, real-time event tracking for live music, and immersive visual storytelling. Built with a focus on ease of navigation and appetizing aesthetics.",
        stack: ["Next.js", "Tailwind", "Framer Motion", "Vercel"],
        link: "https://harsh-budhauliya-restaurant.vercel.app",
        year: "2025",
    },
    {
        id: 2,
        title: "E-COMMERCE EMPIRE",
        genre: "Action / Commerce",
        role: "Director & Lead Dev",
        image: "/poster-ecommerce.png",
        video: "https://assets.mixkit.co/videos/preview/mixkit-online-shopping-with-credit-card-tablet-and-laptop-44465-large.mp4",
        description: "A full-scale MERN stack shopping experience with AI recommendations, secure Stripe payments, and a realtime inventory system.",
        stack: ["React", "Express", "MongoDB", "Stripe"],
        link: "#",
        year: "2024",
    },
    {
        id: 3,
        title: "SOCIAL CONNECT",
        genre: "Drama / Social",
        role: "Frontend Architect",
        image: "/poster-social.png",
        video: "https://assets.mixkit.co/videos/preview/mixkit-man-holding-smartphone-with-social-media-apps-42770-large.mp4",
        description: "Real-time social network with premium UI, instant messaging, and story sharing capabilities. Features a glassmorphic design system.",
        stack: ["Next.js", "Socket.io", "SASS", "Firebase"],
        link: "#",
        year: "2023",
    },
    {
        id: 4,
        title: "AI DASHBOARD",
        genre: "Sci-Fi / Tech",
        role: "UI/UX Designer",
        image: "/poster-dashboard.png",
        video: "https://assets.mixkit.co/videos/preview/mixkit-artificial-intelligence-concept-brain-turning-11623-large.mp4",
        description: "Data visualization platform powered by machine learning algorithms, displaying complex datasets in simplified, interactive charts.",
        stack: ["Python", "D3.js", "React", "TensorFlow"],
        link: "#",
        year: "2024",
    },
];

export default function Projects() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

    // Initial Scroll Animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(".project-card", { opacity: 0, y: 100, rotateX: 10 });

            ScrollTrigger.batch(".project-card", {
                start: "top 80%",
                onEnter: (batch) => {
                    gsap.to(batch, {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        stagger: 0.15,
                        duration: 1.2,
                        ease: "power4.out",
                        overwrite: true
                    });
                },
                once: true
            });
        }, scrollRef);

        return () => ctx.revert();
    }, []);

    // Modal Animation
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = "hidden"; // Lock scroll
            gsap.fromTo(".modal-overlay",
                { opacity: 0 },
                { opacity: 1, duration: 0.5, ease: "power2.out" }
            );
            gsap.fromTo(".modal-content",
                { y: 100, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 0.6, delay: 0.1, ease: "back.out(1.2)" }
            );
        } else {
            document.body.style.overflow = "auto"; // Unlock scroll
        }
    }, [selectedProject]);

    const handleClose = () => {
        gsap.to(".modal-content", { y: 100, opacity: 0, scale: 0.9, duration: 0.4, ease: "power2.in" });
        gsap.to(".modal-overlay", { opacity: 0, duration: 0.4, ease: "power2.in", onComplete: () => setSelectedProject(null) });
    };

    return (
        <section ref={scrollRef} className="py-32 px-4 min-h-screen relative overflow-hidden bg-cinema-bg">
            <div className="absolute inset-0 cinema-grain opacity-50 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-24">
                    <span className="text-cinema-gold font-heading tracking-[0.5em] text-xs uppercase animate-pulse">
                        ★ Now Showing ★
                    </span>
                    <h2 className="font-heading text-5xl md:text-8xl mt-4 text-white uppercase tracking-tighter loading-none">
                        Featured <span className="text-transparent stroke-text">Works</span>
                    </h2>
                    <p className="text-gray-400 mt-6 max-w-2xl mx-auto font-body text-lg">
                        A curated selection of digital experiences. Click on a poster to view the theatrical trailer and details.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            onClick={() => setSelectedProject(project)}
                            className="project-card group cursor-pointer relative perspective-1000"
                        >
                            {/* Card Container */}
                            <div className="relative aspect-[2/3] bg-zinc-900 overflow-hidden rounded-sm border border-zinc-800 transition-all duration-500 group-hover:border-cinema-gold/50 group-hover:shadow-[0_0_30px_rgba(255,215,0,0.1)] group-hover:-translate-y-2">

                                {/* Image */}
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                                {/* Play Button Mockup */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                                    <div className="w-16 h-16 rounded-full bg-cinema-gold/90 flex items-center justify-center backdrop-blur-md text-black shadow-lg">
                                        <Play fill="currentColor" size={24} className="ml-1" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <p className="text-cinema-gold text-xs font-mono uppercase tracking-widest mb-1 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                        {project.genre}
                                    </p>
                                    <h3 className="text-2xl font-heading text-white uppercase leading-none mb-2">
                                        {project.title}
                                    </h3>
                                    <div className="h-0.5 w-0 group-hover:w-full bg-cinema-gold transition-all duration-700 ease-in-out" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cinematic Modal */}
            {selectedProject && (
                <div className="modal-overlay fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md">

                    {/* Background Noise with low opacity */}
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none" />

                    {/* Close Area (clicking outside) */}
                    <div className="absolute inset-0 z-0" onClick={handleClose} />

                    {/* Modal Content */}
                    <div className="modal-content relative w-full max-w-7xl max-h-[90vh] bg-zinc-950 border border-cinema-gold/30 shadow-[0_0_50px_rgba(212,175,55,0.1)] overflow-hidden flex flex-col lg:flex-row z-10">
                        {/* 1. MEDIA SECTION (Left/Top) */}
                        <div className="relative w-full lg:w-[65%] h-[40vh] lg:h-auto bg-black border-b lg:border-b-0 lg:border-r border-zinc-800 group">

                            {/* Media Player */}
                            {selectedProject.video.endsWith('.mp4') ? (
                                <video
                                    src={selectedProject.video}
                                    poster={selectedProject.image}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                                />
                            ) : (
                                /* Using standard img tag for animated WebP support */
                                <img
                                    src={selectedProject.video}
                                    alt="Project Demo"
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                                />
                            )}

                            {/* Overlay Gradient for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent lg:hidden" />

                            {/* Floating ACTION Buttons (Mobile Only) */}
                            <div className="absolute bottom-4 right-4 flex gap-3 lg:hidden z-20">
                                <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="p-3 bg-cinema-gold text-black rounded-full shadow-lg">
                                    <ExternalLink size={20} />
                                </a>
                            </div>

                            {/* Close Button (Mobile) */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full backdrop-blur-md lg:hidden z-30"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* 2. DETAILS SECTION (Right/Bottom) */}
                        <div className="w-full lg:w-[35%] flex flex-col relative bg-zinc-950 text-white">

                            {/* Decorative Border Lines */}
                            <div className="absolute top-4 bottom-4 left-4 right-4 border border-zinc-800 pointer-events-none" />
                            <div className="absolute top-5 bottom-5 left-5 right-5 border border-zinc-800/50 pointer-events-none" />

                            {/* Close Button (Desktop) */}
                            <button
                                onClick={handleClose}
                                className="absolute top-6 right-6 hidden lg:flex items-center gap-2 text-zinc-500 hover:text-cinema-gold transition-colors z-20"
                            >
                                <span className="uppercase text-xs tracking-widest">Close</span>
                                <X size={20} />
                            </button>

                            {/* Content Start */}
                            <div className="p-8 lg:p-12 h-full flex flex-col relative z-10 overflow-hidden">

                                {/* Header Info */}
                                <div className="mb-8">
                                    <div className="flex items-center gap-3 text-cinema-gold font-mono text-xs uppercase tracking-[0.2em] mb-4">
                                        <span>No. 0{projects.indexOf(selectedProject) + 1}</span>
                                        <div className="w-8 h-[1px] bg-cinema-gold/50" />
                                        <span>{selectedProject.year}</span>
                                    </div>

                                    <h2 className="font-heading text-4xl lg:text-5xl uppercase leading-[0.9] text-white mb-2">
                                        {selectedProject.title}
                                    </h2>
                                    <p className="font-mono text-zinc-500 text-sm uppercase tracking-wide">
                                        {selectedProject.role}
                                    </p>
                                </div>

                                {/* Scrollable Description */}
                                <div className="flex-grow overflow-y-auto custom-scrollbar pr-4 -mr-4">
                                    <p className="font-body text-zinc-300 leading-relaxed text-sm lg:text-base mb-8">
                                        {selectedProject.description}
                                    </p>

                                    {/* Tech Stack Grid */}
                                    <div className="mb-8">
                                        <h4 className="font-heading text-sm text-zinc-500 uppercase tracking-widest mb-4 border-b border-zinc-800 pb-2">
                                            Technology Stack
                                        </h4>
                                        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                                            {selectedProject.stack.map((tech, i) => (
                                                <div key={i} className="flex items-center gap-2 text-zinc-400 font-mono text-xs">
                                                    <span className="w-1 h-1 bg-cinema-gold rounded-full" />
                                                    {tech}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Actions (Desktop) */}
                                <div className="mt-8 pt-6 border-t border-zinc-800 hidden lg:flex gap-4">
                                    <a
                                        href={selectedProject.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 bg-cinema-gold text-black py-4 font-heading uppercase text-sm tracking-widest hover:bg-white transition-colors"
                                    >
                                        Visit Site <ExternalLink size={16} />
                                    </a>
                                    <a
                                        href="#"
                                        className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-zinc-700 text-zinc-400 py-4 font-heading uppercase text-sm tracking-widest hover:border-white hover:text-white transition-all"
                                    >
                                        Code <Github size={16} />
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .stroke-text {
                    -webkit-text-stroke: 1px #fff;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #18181b; 
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #3f3f46; 
                    border-radius: 2px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #52525b; 
                }
            `}</style>
        </section>
    );
}
