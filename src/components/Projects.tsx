"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: "01",
        title: "Buda's Pub",
        category: "Restaurant Platform",
        image: "/poster-restaurant.png",
        tech: ["Next.js", "Tailwind", "MongoDB"]
    },
    {
        id: "02",
        title: "Social Connect",
        category: "Community App",
        image: "/poster-social.png",
        tech: ["React", "Socket.io", "Express"]
    },
    {
        id: "03",
        title: "E-Commerce",
        category: "Retail Tech",
        image: "/poster-ecommerce.png",
        tech: ["Node.js", "Stripe", "PostgreSQL"]
    },
    {
        id: "04",
        title: "AI Analytics",
        category: "Data Dashboard",
        image: "/poster-dashboard.png",
        tech: ["D3.js", "TypeScript", "Python"]
    },
];

export default function Projects() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const scrollWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Small timeout to ensure layout is fully calculated before ScrollTrigger binds
        const timer = setTimeout(() => {
            const ctx = gsap.context(() => {
                if (!scrollWrapperRef.current || !sectionRef.current) return;
                
                const wrapper = scrollWrapperRef.current;
                const section = sectionRef.current;

                // Main horizontal scroll animation
                gsap.to(wrapper, {
                    x: () => -(wrapper.scrollWidth - window.innerWidth + 80), // 80px padding buffer
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: () => `+=${wrapper.scrollWidth - window.innerWidth}`,
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true, // Recalculates on resize
                    }
                });
                
                // Parallax image effect inside cards
                gsap.utils.toArray<HTMLElement>(".project-img-inner").forEach((img) => {
                    gsap.to(img, {
                        x: "15%",
                        ease: "none",
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: () => `+=${wrapper.scrollWidth - window.innerWidth}`,
                            scrub: 1,
                            invalidateOnRefresh: true,
                        }
                    });
                });

            }, sectionRef);
            return () => ctx.revert();
        }, 100); // 100ms delay for safe layout paint

        return () => clearTimeout(timer);
    }, []);

    return (
        <section ref={sectionRef} id="projects" className="relative w-full h-screen bg-bg-secondary overflow-hidden border-t border-border-light flex items-center">
            
            {/* Title fixed on the left side during pin */}
            <div className="absolute top-12 left-6 md:left-12 lg:left-24 z-20 mix-blend-difference pointer-events-none">
                <span className="text-text-secondary font-bold tracking-widest text-xs uppercase mb-2 block">
                    [02] Selected Works
                </span>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-text-primary leading-[0.9]">
                    Featured <br /> Projects.
                </h2>
            </div>

            {/* Horizontal Scrolling Track */}
            <div ref={scrollWrapperRef} className="flex gap-12 lg:gap-24 px-6 md:px-12 lg:px-24 pt-32 w-max h-[70vh] items-center">
                
                {/* Spacer to push first item past the fixed title */}
                <div className="w-[10vw] lg:w-[20vw] flex-shrink-0"></div>

                {projects.map((project) => (
                    <div 
                        key={project.id} 
                        className="group relative flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[45vw] h-full flex flex-col justify-center cursor-pointer"
                    >
                        {/* Image Container with Parallax */}
                        <div className="relative w-full h-[60%] lg:h-[70%] overflow-hidden bg-bg-primary border border-border-light panel mb-8">
                            <div className="project-img-inner absolute inset-0 w-[120%] h-full -left-[10%]">
                                {/* Using a solid color fallback block if image is not present, with the actual image over it */}
                                <div className="absolute inset-0 bg-border-light mix-blend-multiply"></div>
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                />
                            </div>
                            
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-text-primary text-bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                                <span className="text-4xl font-black uppercase tracking-tighter mix-blend-difference text-bg-primary bg-text-primary px-6 py-2">
                                    View Project
                                </span>
                            </div>
                        </div>

                        {/* Project Details */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 w-full">
                            <div className="flex flex-col">
                                <span className="text-text-secondary text-sm font-bold tracking-widest uppercase mb-1">
                                    {project.id} — {project.category}
                                </span>
                                <h3 className="text-3xl md:text-5xl font-black text-text-primary uppercase tracking-tight">
                                    {project.title}
                                </h3>
                            </div>

                            <div className="flex gap-2 flex-wrap">
                                {project.tech.slice(0, 3).map((t, i) => (
                                    <span key={i} className="px-3 py-1 bg-transparent border border-border-light text-text-secondary text-xs font-bold uppercase tracking-widest">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
                
                {/* Spacer at the end */}
                <div className="w-[10vw] flex-shrink-0"></div>
            </div>
        </section>
    );
}
