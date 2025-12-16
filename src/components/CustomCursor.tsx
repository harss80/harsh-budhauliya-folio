"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower) return;

        // Use quickTo for high performance mouse movement
        const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
        const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });
        const xToFollower = gsap.quickTo(follower, "x", { duration: 0.3, ease: "power3" });
        const yToFollower = gsap.quickTo(follower, "y", { duration: 0.3, ease: "power3" });

        const moveCursor = (e: MouseEvent) => {
            xToCursor(e.clientX);
            yToCursor(e.clientY);
            xToFollower(e.clientX);
            yToFollower(e.clientY);
        };

        const handleMouseEnter = () => {
            gsap.to([cursor, follower], { opacity: 1, duration: 0.3 });
        };

        const handleMouseLeave = () => {
            gsap.to([cursor, follower], { opacity: 0, duration: 0.3 });
        };

        // Event Delegation for hover effects (works with dynamic content)
        const handleHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if hovering over interactive elements
            if (target.closest("a, button, .interactive, input, textarea, select")) {
                gsap.to(follower, { scale: 3, duration: 0.3, borderColor: "#c5a059", mixBlendMode: "difference" });
                gsap.to(cursor, { scale: 0.5, duration: 0.3, backgroundColor: "#ffffff" });
            }
        };

        const handleHoverOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("a, button, .interactive, input, textarea, select")) {
                gsap.to(follower, { scale: 1, duration: 0.3, borderColor: "#a1a1aa", mixBlendMode: "normal" });
                gsap.to(cursor, { scale: 1, duration: 0.3, backgroundColor: "#c5a059" });
            }
        };

        window.addEventListener("mousemove", moveCursor);
        document.body.addEventListener("mouseenter", handleMouseEnter);
        document.body.addEventListener("mouseleave", handleMouseLeave);

        // Use capture phase to ensure we catch events before they bubble away
        document.addEventListener("mouseover", handleHover, true);
        document.addEventListener("mouseout", handleHoverOut, true);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.body.removeEventListener("mouseenter", handleMouseEnter);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseover", handleHover, true);
            document.removeEventListener("mouseout", handleHoverOut, true);
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-3 h-3 bg-cinema-gold rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block" // Increased Z-index
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-8 h-8 border border-gray-400 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block transition-colors duration-300"
            />
        </>
    );
}
