"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// 1. HERO ENTRANCE
const ContactHero = () => {
    return (
        <section className="min-h-[80vh] flex flex-col justify-center items-start relative overflow-hidden px-4 lg:px-24 bg-bg-primary">
            <div className="relative z-10 w-full max-w-[1440px] mx-auto mt-20">
                <div className="overflow-hidden mb-6">
                    <p className="font-mono text-text-secondary tracking-[0.5em] uppercase text-sm animate-slide-up opacity-0" style={{ animationFillMode: "forwards" }}>
                        Start A Conversation
                    </p>
                </div>
                
                <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-text-primary leading-[0.85] mb-12">
                    <div className="overflow-hidden">
                        <span className="block animate-slide-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>Let's</span>
                    </div>
                    <div className="overflow-hidden">
                        <span className="block text-text-secondary animate-slide-up opacity-0" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>Build.</span>
                    </div>
                </h1>
                
                <div className="overflow-hidden max-w-3xl">
                    <p className="font-body text-xl md:text-3xl text-text-secondary font-light leading-relaxed animate-slide-up opacity-0" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
                        Have a project in mind, a team that needs scaling, or just want to talk architecture? My inbox is always open.
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(100%); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-up {
                    animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1);
                }
            `}</style>
        </section>
    );
};

// 2. CONTACT DETAILS & FORM (Split Layout)
const ContactInterface = () => {
    const [focused, setFocused] = useState<string | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".contact-stagger", 
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const options = [
        { icon: <Mail size={24} />, title: "Email", val: "harshbudhauliya921@gmail.com" },
        { icon: <Phone size={24} />, title: "Phone", val: "+91 8929989312" },
        { icon: <MapPin size={24} />, title: "Location", val: "WZ-73 Om Vihar Face 2, Uttam Nagar, New Delhi 110059" },
    ];

    const socials = [
        { icon: <Github size={20} />, name: "GitHub", link: "https://github.com/harss80" },
        { icon: <Linkedin size={20} />, name: "LinkedIn", link: "https://www.linkedin.com/in/harsh-budhauliya/" },
        { icon: <Twitter size={20} />, name: "Twitter", link: "#" },
    ];

    return (
        <section ref={sectionRef} className="py-24 md:py-32 lg:py-48 px-4 lg:px-24 bg-bg-secondary relative border-t border-border-light">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                
                {/* Left Side: Contact Details */}
                <div className="col-span-1 lg:col-span-5 flex flex-col justify-start">
                    <span className="font-mono text-xs tracking-widest uppercase text-text-secondary mb-8 block contact-stagger">
                        [01] Direct Lines
                    </span>
                    
                    <div className="space-y-12 mb-16">
                        {options.map((opt, i) => (
                            <div key={i} className="contact-stagger group flex items-start gap-6 cursor-default">
                                <div className="text-text-secondary group-hover:text-white transition-colors duration-300 mt-1">
                                    {opt.icon}
                                </div>
                                <div>
                                    <h3 className="font-heading text-xl font-bold uppercase tracking-wider text-text-primary mb-1">{opt.title}</h3>
                                    <p className="font-mono text-lg text-text-secondary group-hover:text-white transition-colors duration-300">{opt.val}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="contact-stagger">
                        <span className="font-mono text-xs tracking-widest uppercase text-text-secondary mb-6 block">
                            Socials
                        </span>
                        <div className="flex gap-4">
                            {socials.map((s, i) => (
                                <a key={i} href={s.link} className="w-12 h-12 rounded-full border border-border-light flex items-center justify-center text-text-secondary hover:text-black hover:bg-white hover:scale-110 transition-all duration-300">
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: The Form */}
                <div className="col-span-1 lg:col-span-7">
                    <span className="font-mono text-xs tracking-widest uppercase text-text-secondary mb-8 block contact-stagger">
                        [02] Send a Message
                    </span>

                    <form className="space-y-10 contact-stagger" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className={`relative border-b transition-colors duration-300 pb-2 ${focused === 'name' ? 'border-white' : 'border-border-light'}`}>
                                <label className={`block text-xs font-mono uppercase tracking-widest transition-colors duration-300 mb-2 ${focused === 'name' ? 'text-white' : 'text-text-secondary'}`}>
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    onFocus={() => setFocused('name')}
                                    onBlur={() => setFocused(null)}
                                    className="w-full text-xl md:text-2xl font-body outline-none bg-transparent placeholder-white/20 text-text-primary"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className={`relative border-b transition-colors duration-300 pb-2 ${focused === 'email' ? 'border-white' : 'border-border-light'}`}>
                                <label className={`block text-xs font-mono uppercase tracking-widest transition-colors duration-300 mb-2 ${focused === 'email' ? 'text-white' : 'text-text-secondary'}`}>
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    onFocus={() => setFocused('email')}
                                    onBlur={() => setFocused(null)}
                                    className="w-full text-xl md:text-2xl font-body outline-none bg-transparent placeholder-white/20 text-text-primary"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className={`relative border-b transition-colors duration-300 pb-2 ${focused === 'msg' ? 'border-white' : 'border-border-light'}`}>
                            <label className={`block text-xs font-mono uppercase tracking-widest transition-colors duration-300 mb-2 ${focused === 'msg' ? 'text-white' : 'text-text-secondary'}`}>
                                Project Details
                            </label>
                            <textarea
                                name="message"
                                rows={4}
                                onFocus={() => setFocused('msg')}
                                onBlur={() => setFocused(null)}
                                className="w-full text-xl font-body outline-none bg-transparent resize-none placeholder-white/20 text-text-primary"
                                placeholder="I'm looking to build..."
                            />
                        </div>

                        <div className="pt-4">
                            <button type="submit" className="group inline-flex items-center gap-4 px-10 py-5 bg-white text-black font-mono text-sm uppercase tracking-widest font-bold hover:bg-black hover:text-white hover:border-white border border-transparent transition-all duration-300 w-full sm:w-auto justify-center">
                                <span>Submit Inquiry</span>
                                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

// 3. FAQ SECTION
const FAQSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".faq-item", 
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const faqs = [
        { q: "Are you available for freelance work?", a: "Yes, I take on select freelance projects depending on my current bandwidth. Send me details about your project timeline and scope." },
        { q: "What is your typical turnaround time?", a: "It depends heavily on the project scope. A standard landing page takes 1-2 weeks, while a full-stack SaaS MVP can take 4-8 weeks." },
        { q: "Do you only work with React/Next.js?", a: "While React/Next.js is my primary frontend stack, I'm language-agnostic. I frequently work with Node.js, Python, and various database architectures depending on the specific requirements." },
        { q: "Are you open to full-time roles?", a: "I am always open to discussing full-time opportunities with innovative engineering teams building high-impact products." },
    ];

    return (
        <section ref={sectionRef} className="py-24 md:py-32 lg:py-48 px-4 lg:px-24 bg-bg-primary border-t border-border-light">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                <div className="col-span-1 lg:col-span-4 flex flex-col justify-start">
                    <span className="font-mono text-xs tracking-widest uppercase text-text-secondary mb-8 block">
                        [03] Queries
                    </span>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-text-primary leading-[0.9] sticky top-32">
                        FAQ.
                    </h2>
                </div>
                
                <div className="col-span-1 lg:col-span-8 space-y-6">
                    {faqs.map((item, i) => (
                        <div key={i} className="faq-item p-8 bg-bg-secondary border border-border-light hover:border-white/20 transition-colors duration-300">
                            <h3 className="font-heading text-2xl font-bold text-white uppercase mb-4">{item.q}</h3>
                            <p className="text-lg font-body text-text-secondary font-light leading-relaxed">{item.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// 4. GLOBAL FOOTER
const GlobalFooter = () => {
    return (
        <section className="py-12 bg-bg-primary border-t border-border-light text-center px-4">
            <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <span className="font-heading text-2xl font-black uppercase tracking-tighter text-white">HARSH.</span>
                <p className="font-mono text-xs text-text-secondary uppercase tracking-widest">
                    © {new Date().getFullYear()} Harsh Budhauliya. Software Engineer.
                </p>
                <div className="flex gap-6 font-mono text-xs font-bold uppercase tracking-widest">
                    <Link href="/" className="text-text-secondary hover:text-white transition-colors">Home</Link>
                    <Link href="/about" className="text-text-secondary hover:text-white transition-colors">About</Link>
                </div>
            </div>
        </section>
    );
};

export default function ContactPage() {
    return (
        <main className="bg-bg-primary min-h-screen text-text-primary selection:bg-white selection:text-black font-body">
            <ContactHero />
            <ContactInterface />
            <FAQSection />
            <GlobalFooter />
        </main>
    );
}
