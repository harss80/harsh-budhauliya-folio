"use client";

import { useState } from "react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";

const navItems = [
    { label: "INTRO", id: "intro" },
    { label: "STORY", id: "origin" },
    { label: "ARSENAL", id: "arsenal" },
    { label: "FILMS", id: "feature-films" },
    { label: "SERVICES", id: "services" },
    { label: "CREDITS", id: "credits" },
];

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        if (!isOpen) {
            setIsOpen(true);
            gsap.to(".menu-overlay", {
                clipPath: "circle(150% at 100% 0%)",
                duration: 1,
                ease: "power2.inOut",
            });
            gsap.fromTo(
                ".menu-item",
                { y: 80, opacity: 0, rotateX: 45 },
                { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.1, delay: 0.3, ease: "back.out(1.7)" }
            );
        } else {
            gsap.to(".menu-overlay", {
                clipPath: "circle(0% at 100% 0%)",
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: () => setIsOpen(false),
            });
        }
    };

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
        toggleMenu();
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={toggleMenu}
                className="fixed top-6 right-6 z-[60] text-bollywood-cream bg-bollywood-maroon/50 backdrop-blur-md p-4 border border-bollywood-gold/30 hover:border-bollywood-gold hover:bg-bollywood-gold/10 transition-all duration-300"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Overlay */}
            <div
                className="menu-overlay fixed inset-0 z-[55] flex items-center justify-center pointer-events-auto"
                style={{
                    clipPath: "circle(0% at 100% 0%)",
                    background: "linear-gradient(135deg, rgba(74, 14, 14, 0.98), rgba(10, 5, 5, 0.99))",
                }}
            >
                {/* Decorative Elements */}
                <div className="absolute top-10 left-10 text-6xl text-bollywood-gold/20">✦</div>
                <div className="absolute bottom-10 right-10 text-6xl text-bollywood-gold/20">✦</div>
                <div className="absolute top-1/4 right-1/4 text-3xl text-bollywood-saffron/20">★</div>
                <div className="absolute bottom-1/4 left-1/4 text-3xl text-bollywood-saffron/20">★</div>

                <nav className="flex flex-col gap-6 text-center">
                    <div className="text-bollywood-gold/50 font-heading tracking-[0.5em] text-sm mb-8 border-b border-bollywood-gold/20 pb-4">
                        ★ SCENE SELECTION ★
                    </div>

                    {navItems.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => scrollToSection(item.id)}
                            className="menu-item text-4xl md:text-6xl font-heading text-bollywood-cream uppercase tracking-wider hover:text-bollywood-gold transition-colors duration-300 relative group"
                        >
                            <span className="relative z-10">{item.label}</span>
                            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[2px] bg-bollywood-gold group-hover:w-full transition-all duration-300" />
                        </button>
                    ))}
                </nav>
            </div>
        </>
    );
}
