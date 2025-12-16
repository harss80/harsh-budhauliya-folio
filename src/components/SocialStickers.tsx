"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Code, Cpu, Trophy, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const variants = [
    { text: "TOP RATED", class: "rotate-[-5deg] top-[-10px] left-[-10px] bg-cinema-gold text-black" },
    { text: "100% SECURE", class: "rotate-[5deg] bottom-[-10px] right-[-10px] bg-white text-black" },
    { text: "VERIFIED", class: "rotate-[-10deg] top-[50%] right-[-20px] bg-cinema-red text-white" },
    { text: "HIGH PERF", class: "rotate-[8deg] bottom-[20%] left-[-15px] bg-black text-cinema-gold border border-cinema-gold" }
];

export default function SocialStickers() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
            {/* Random Stickers placed around based on container relative position - best used inside sections */}
        </div>
    );
}

export function Sticker({ text, className = "", style = {} }: { text: string, className?: string, style?: any }) {
    return (
        <div
            className={`sticker ${className} cursor-default`}
            style={style}
        >
            {text}
        </div>
    );
}

export function TechBadge({ icon: Icon, text }: { icon: any, text: string }) {
    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-full">
            <Icon className="w-4 h-4 text-cinema-gold" />
            <span className="text-xs font-mono text-cinema-gold tracking-widest uppercase">{text}</span>
        </div>
    );
}
