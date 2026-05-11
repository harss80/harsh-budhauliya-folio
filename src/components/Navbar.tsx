"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        gsap.fromTo(".nav-item", 
            { y: -20, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.1 }
        );
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [mobileMenuOpen]);

    return (
        <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[800px] transition-all duration-300">
            <div className={`relative z-50 flex justify-between items-center px-6 md:px-8 py-4 rounded-full border border-white/10 transition-all duration-500 ${scrolled && !mobileMenuOpen ? "bg-bg-primary/80 backdrop-blur-xl shadow-2xl" : "bg-bg-primary/40 backdrop-blur-md"}`}>
                
                <Link href="/" className="nav-item text-text-primary font-bold tracking-tight text-xl z-50 relative" onClick={() => setMobileMenuOpen(false)}>
                    HARSH.
                </Link>

                <nav className="hidden md:flex items-center gap-8 nav-item">
                    <Link href="/#projects" className="text-text-secondary hover:text-text-primary transition-colors text-xs font-bold uppercase tracking-widest">Work</Link>
                    <Link href="/about" className="text-text-secondary hover:text-text-primary transition-colors text-xs font-bold uppercase tracking-widest">About</Link>
                    <Link href="/contact" className="text-text-secondary hover:text-text-primary transition-colors text-xs font-bold uppercase tracking-widest">Contact</Link>
                </nav>

                <div className="nav-item flex items-center gap-6">
                    <div className="hidden lg:flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                        <span className="text-[10px] text-text-secondary font-bold tracking-widest uppercase">Open To Work</span>
                    </div>
                    {/* Mobile Menu Toggle */}
                    <button 
                        className="md:hidden text-text-primary z-50 relative"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Fullscreen Menu */}
            <div className={`fixed w-[100vw] h-[100vh] top-[-24px] left-1/2 -translate-x-1/2 bg-bg-primary/95 backdrop-blur-3xl flex flex-col items-center justify-center gap-12 transition-all duration-500 md:hidden z-40 ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <div className="flex flex-col items-center gap-10">
                    <Link href="/#projects" onClick={() => setMobileMenuOpen(false)} className={`text-5xl font-black uppercase tracking-tighter transition-all duration-500 delay-100 ${mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>Work</Link>
                    <Link href="/about" onClick={() => setMobileMenuOpen(false)} className={`text-5xl font-black uppercase tracking-tighter transition-all duration-500 delay-200 ${mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>About</Link>
                    <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className={`text-5xl font-black uppercase tracking-tighter transition-all duration-500 delay-300 ${mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>Contact</Link>
                </div>
            </div>
        </header>
    );
}
