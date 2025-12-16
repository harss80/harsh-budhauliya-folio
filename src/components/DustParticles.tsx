"use client";

import { useEffect, useRef } from "react";

export default function DustParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let particles: Particle[] = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Bollywood gold/saffron color palette for particles
        const colors = [
            "rgba(212, 175, 55, ", // Gold
            "rgba(255, 102, 0, ",  // Saffron
            "rgba(255, 215, 0, ",  // Bright Gold
            "rgba(184, 134, 11, ", // Deep Gold
            "rgba(220, 20, 60, ",  // Crimson (occasional)
        ];

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            opacity: number;
            color: string;
            twinkleSpeed: number;
            twinklePhase: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.size = Math.random() * 2.5 + 0.5;
                this.speedX = Math.random() * 0.4 - 0.2;
                this.speedY = Math.random() * 0.2 + 0.05;
                this.opacity = Math.random() * 0.6 + 0.2;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.twinkleSpeed = Math.random() * 0.02 + 0.01;
                this.twinklePhase = Math.random() * Math.PI * 2;
            }

            update(time: number) {
                this.x += this.speedX;
                this.y += this.speedY;

                // Twinkle effect
                this.opacity = 0.3 + Math.sin(time * this.twinkleSpeed + this.twinklePhase) * 0.3;

                // Reset particle when it goes off screen
                if (this.y > canvas!.height) {
                    this.y = 0;
                    this.x = Math.random() * canvas!.width;
                }
                if (this.x > canvas!.width || this.x < 0) {
                    this.x = Math.random() * canvas!.width;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color + this.opacity + ")";
                ctx.fill();

                // Add glow effect for larger particles
                if (this.size > 1.5) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
                    ctx.fillStyle = this.color + (this.opacity * 0.3) + ")";
                    ctx.fill();
                }
            }
        }

        // Create particles
        const createParticles = () => {
            const particleCount = Math.min(120, Math.floor((canvas.width * canvas.height) / 12000));
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        createParticles();

        let time = 0;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time++;

            particles.forEach((particle) => {
                particle.update(time);
                particle.draw();
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[45] opacity-70"
        />
    );
}
