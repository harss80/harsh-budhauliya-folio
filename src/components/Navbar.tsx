"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Menu, X, ArrowUpRight } from "lucide-react";

// Updated paths to point to real pages
const menuItems = [
    { name: "Premiere", path: "/", id: "01", category: "Start" },
    { name: "Filmography", path: "/projects", id: "02", category: "Work" },
    { name: "Behinds", path: "/about", id: "03", category: "About" },
    { name: "Production", path: "/services", id: "04", category: "Services" },
    { name: "Credits", path: "/contact", id: "05", category: "Contact" },
];

const socialLinks = [
    { name: "LinkedIn", href: "https://linkedin.com" },
    { name: "GitHub", href: "https://github.com" },
    { name: "Twitter", href: "https://twitter.com" },
    { name: "Instagram", href: "https://instagram.com" }
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    // Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    // Initial State Setup
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!isOpen) {
                gsap.set(bgRef.current, { opacity: 0 });
                gsap.set(menuRef.current, { yPercent: -100 });
            }
        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Animation Logic
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (isOpen) {
                // OPEN
                const tl = gsap.timeline();
                tl.to(bgRef.current, { opacity: 1, duration: 0.5 })
                    .to(menuRef.current, { yPercent: 0, duration: 1, ease: "power3.inOut" }, "-=0.5")
                    .fromTo(".nav-item-text",
                        { y: 100, rotate: 5, opacity: 0 },
                        { y: 0, rotate: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power4.out" }, "-=0.4")
                    .fromTo(".nav-meta",
                        { opacity: 0, x: -20 },
                        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 }, "-=0.8");
            }
        }, containerRef);
        return () => ctx.revert();
    }, [isOpen]);

    const closeMenu = () => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ onComplete: () => setIsOpen(false) });
            tl.to(menuRef.current, { yPercent: -100, duration: 0.8, ease: "power3.inOut" })
                .to(bgRef.current, { opacity: 0, duration: 0.5 }, "-=0.5");
        }, containerRef);
    };

    const toggleMenu = () => {
        if (isOpen) closeMenu();
        else setIsOpen(true);
    };

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        // Just close the menu, standard Link navigation will take over
        closeMenu();

        // Removed custom scroll logic since we are now using full pages
    };

    return (
        <>
            {/* Minimal Floating Button */}
            <button
                onClick={toggleMenu}
                className="fixed top-6 right-6 z-[60] group flex items-center justify-center w-14 h-14 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:scale-110 hover:bg-white text-white hover:text-black transition-all duration-300 pointer-events-auto mix-blend-difference"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Full Screen Overlay */}
            <div ref={containerRef} className={`fixed inset-0 z-[50] ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
                <div ref={bgRef} className="absolute inset-0 bg-black/90" onClick={closeMenu} />

                {/* Menu Wrapper */}
                <div
                    ref={menuRef}
                    className="absolute inset-0 w-full h-full bg-zinc-950 flex flex-col justify-center overflow-hidden"
                >
                    <div className="absolute inset-0 cinema-grain opacity-30" />

                    {/* Main Grid Layout */}
                    <div className="relative z-10 w-full max-w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-12 h-[80vh] items-center">

                        {/* Desktop: Left Info (Hidden on Mobile) */}
                        <div className="hidden lg:flex lg:col-span-4 flex-col justify-between h-full py-10 border-r border-white/5 pr-10">
                            <div>
                                <h2 className="text-cinema-gold text-sm tracking-[0.5em] font-heading mb-4">CASTING</h2>
                                <h1 className="text-white text-4xl font-heading font-bold uppercase leading-tight">
                                    Harsh<br />Budhauliya
                                </h1>
                            </div>
                            <div className="space-y-6">
                                <p className="text-gray-400 text-sm max-w-xs">
                                    Crafting award-winning digital experiences with code and creativity.
                                </p>
                                <div className="flex flex-col gap-2">
                                    {socialLinks.map((link, i) => (
                                        <a key={i} href={link.href} target="_blank" className="text-white hover:text-cinema-gold transition-colors text-sm uppercase tracking-wider flex items-center gap-2 group">
                                            {link.name} <ArrowUpRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Navigation Links (Center/Right) */}
                        <div className="col-span-1 lg:col-span-8 flex flex-col justify-center h-full px-4 lg:px-20">
                            <nav className="flex flex-col gap-2 lg:gap-4">
                                {menuItems.map((item, idx) => (
                                    <Link
                                        key={idx}
                                        href={item.path}
                                        onClick={(e) => handleLinkClick(e, item.path)}
                                        className="group block relative overflow-hidden"
                                    >
                                        <div className="flex items-baseline gap-4 md:gap-8 hover:translate-x-4 transition-transform duration-500 ease-out">
                                            <span className="nav-meta text-xs md:text-sm font-mono text-cinema-gold opacity-60">
                                                {item.id}
                                            </span>
                                            <div className="overflow-hidden">
                                                <div className="nav-item-text text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold uppercase text-transparent stroke-text group-hover:text-white transition-colors duration-300">
                                                    {item.name}
                                                </div>
                                            </div>
                                            <span className="nav-meta hidden md:block text-xs font-mono text-gray-500 uppercase tracking-widest self-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                {item.category}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </nav>

                            {/* Mobile Only Footer */}
                            <div className="lg:hidden mt-8 pt-8 border-t border-white/10 flex flex-wrap gap-4 justify-center">
                                {socialLinks.map((link, i) => (
                                    <a key={i} href={link.href} className="text-xs text-cinema-silver uppercase tracking-widest">
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .stroke-text {
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
                    color: transparent;
                }
                .stroke-text:hover {
                    -webkit-text-stroke: 1px #fff;
                    color: #fff;
                }
            `}</style>
        </>
    );
}
