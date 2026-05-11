"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const container = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Mask reveal for paragraph lines
            gsap.fromTo(".about-line", 
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top 75%",
                    }
                }
            );

            // Image entrance
            if (imageRef.current) {
                gsap.fromTo(imageRef.current,
                    { y: 100, opacity: 0, rotateZ: -5 },
                    {
                        y: 0,
                        opacity: 1,
                        rotateZ: 0,
                        duration: 1.5,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: container.current,
                            start: "top 70%",
                        }
                    }
                );
            }
        }, container);
        return () => ctx.revert();
    }, []);

    // 3D Tilt effect on mouse move for the image
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageRef.current) return;
        const { left, top, width, height } = imageRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        gsap.to(imageRef.current, {
            rotationY: x * 20,
            rotationX: -y * 20,
            transformPerspective: 1000,
            ease: "power1.out",
            duration: 0.5
        });
    };

    const handleMouseLeave = () => {
        if (!imageRef.current) return;
        gsap.to(imageRef.current, {
            rotationY: 0,
            rotationX: 0,
            ease: "power3.out",
            duration: 0.8
        });
    };

    return (
        <section
            ref={container}
            id="about"
            className="py-24 md:py-32 lg:py-48 relative w-full border-t border-border-light bg-bg-secondary overflow-hidden"
        >
            {/* Background glow effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[10%] w-[50vw] h-[50vw] bg-white/[0.02] rounded-full blur-[120px] mix-blend-overlay"></div>
                <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] bg-white/[0.03] rounded-full blur-[100px] mix-blend-overlay"></div>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
                    
                    {/* Left structural title & Image */}
                    <div className="lg:col-span-5 flex flex-col gap-12">
                        <div className="flex flex-col justify-start">
                            <span className="text-text-secondary font-bold tracking-widest text-xs uppercase mb-6 flex items-center gap-4">
                                <span className="w-8 h-[1px] bg-text-secondary"></span>
                                [01] The Architect
                            </span>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tight text-text-primary uppercase leading-[0.85] font-heading">
                                About <br /> The <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-500">Engineer.</span>
                            </h2>
                        </div>

                        {/* Image Container with Tilt Effect */}
                        <div className="about-line perspective-1000">
                            <div 
                                className="relative w-full max-w-[320px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group cursor-none will-change-transform"
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                ref={imageRef}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/20 to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                                <Image
                                    src="/profilephoto.webp"
                                    alt="Harsh Budhauliya"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                                    sizes="(max-width: 768px) 100vw, 400px"
                                />
                                {/* Decorative framing */}
                                <div className="absolute inset-4 border border-white/20 rounded-xl z-20 pointer-events-none transition-transform duration-500 group-hover:scale-[0.98]"></div>
                                <div className="absolute bottom-6 left-6 z-30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <p className="text-sm font-bold text-white uppercase tracking-widest font-heading">Harsh Budhauliya</p>
                                    <p className="text-xs text-zinc-400 font-medium">Software Engineer</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right structural text & Info */}
                    <div className="lg:col-span-7 flex flex-col gap-12 justify-center lg:pl-8">
                        <div className="flex flex-col gap-8 text-2xl md:text-4xl text-text-primary font-light leading-snug font-body">
                            <div className="overflow-hidden pb-2">
                                <p className="about-line">
                                    I am a <span className="font-medium text-white border-b border-white/20 pb-1">software engineer</span> and <span className="font-medium text-white border-b border-white/20 pb-1">UI/UX architect</span> obsessed with structural perfection and fluid motion.
                                </p>
                            </div>
                            <div className="overflow-hidden pb-2">
                                <p className="about-line text-zinc-400 text-xl md:text-2xl leading-relaxed">
                                    Stripping away the unnecessary to focus purely on high-performance code, exact layouts, and premium digital experiences. I specialize in building robust web applications using the MERN stack and Next.js, combined with cutting-edge animations.
                                </p>
                            </div>
                            <div className="overflow-hidden pb-2">
                                <p className="about-line text-xl md:text-2xl leading-relaxed text-zinc-400">
                                    Operating precisely at the intersection of <span className="text-white italic">rigid engineering</span> and <span className="text-white italic">creative design</span> to deliver products that don't just work, but feel extraordinary.
                                </p>
                            </div>
                        </div>

                        {/* Interactive Stats/Bento Mini */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/10">
                            <div className="about-line flex flex-col gap-2 group cursor-default">
                                <span className="text-4xl md:text-5xl font-bold font-heading group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-500 transition-all duration-300">2+</span>
                                <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold group-hover:text-zinc-300 transition-colors duration-300">Years Experience</span>
                            </div>
                            <div className="about-line flex flex-col gap-2 group cursor-default">
                                <span className="text-4xl md:text-5xl font-bold font-heading group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-500 transition-all duration-300">10+</span>
                                <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold group-hover:text-zinc-300 transition-colors duration-300">Projects Built</span>
                            </div>
                            <div className="about-line flex flex-col gap-2 group cursor-default">
                                <span className="text-4xl md:text-5xl font-bold font-heading group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-500 transition-all duration-300">500+</span>
                                <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold group-hover:text-zinc-300 transition-colors duration-300">Cups of Coffee</span>
                            </div>
                            <div className="about-line flex flex-col gap-2 group cursor-default">
                                <span className="text-4xl md:text-5xl font-bold font-heading group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-500 transition-all duration-300">1M+</span>
                                <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold group-hover:text-zinc-300 transition-colors duration-300">Lines of Code</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
