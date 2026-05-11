"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const footerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Parallax footer reveal effect
        const ctx = gsap.context(() => {
            if (!footerRef.current) return;
            
            gsap.fromTo(".footer-content", 
                { y: "-30%", opacity: 0 },
                {
                    y: "0%",
                    opacity: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top bottom",
                        end: "bottom bottom",
                        scrub: true,
                    }
                }
            );
        }, footerRef);
        return () => ctx.revert();
    }, []);

    return (
        <footer 
            ref={footerRef}
            id="contact"
            className="relative w-full h-[80vh] lg:h-screen bg-text-primary text-bg-primary overflow-hidden"
            style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
            <div className="footer-content fixed bottom-0 left-0 w-full h-[80vh] lg:h-screen flex flex-col justify-between p-6 md:p-12 lg:p-24 z-0">
                
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mt-24">
                    <div className="flex flex-col max-w-2xl">
                        <span className="text-bg-primary font-bold tracking-widest text-sm uppercase mb-6 block opacity-50">
                            [06] Contact
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Open to <br /> new <br /> opportunities.
                        </h2>
                        <a 
                            href="mailto:harshbudhauliya921@gmail.com" 
                            className="inline-flex w-fit text-xl md:text-3xl font-bold uppercase tracking-tight border-b-4 border-bg-primary pb-2 hover:opacity-50 transition-opacity"
                        >
                            harshbudhauliya921@gmail.com
                        </a>
                    </div>
                    
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2 mt-8">
                            <span className="text-sm font-bold tracking-widest uppercase opacity-50">Direct Line</span>
                            <span className="text-xl font-medium uppercase">+91 8929989312</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-sm font-bold tracking-widest uppercase opacity-50">Location</span>
                            <span className="text-xl font-medium uppercase max-w-xs leading-tight">WZ-73 Om Vihar Face 2, Uttam Nagar, New Delhi 110059</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-sm font-bold tracking-widest uppercase opacity-50">Socials</span>
                            <div className="flex gap-4">
                                <a href="https://www.linkedin.com/in/harsh-budhauliya/" target="_blank" rel="noopener noreferrer" className="text-xl font-bold uppercase hover:opacity-50 transition-opacity">LN</a>
                                <a href="https://github.com/harss80" target="_blank" rel="noopener noreferrer" className="text-xl font-bold uppercase hover:opacity-50 transition-opacity">GH</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-end border-t-2 border-bg-primary/20 pt-8 pb-4">
                    <h1 className="text-[10vw] md:text-[8vw] font-black uppercase tracking-tighter leading-none opacity-10">
                        Budhauliya
                    </h1>
                    <span className="text-sm font-bold uppercase tracking-widest opacity-50 pb-2">
                        © {new Date().getFullYear()} All rights reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
}
