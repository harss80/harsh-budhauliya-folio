"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowLeft, Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, MessageSquare, Clock, Globe } from "lucide-react";

// --- SECTIONS ---

// 1. CONTACT HERO (Typographic)
const ContactHero = () => {
    return (
        <section className="h-[70vh] flex flex-col justify-center items-center text-center relative overflow-hidden bg-zinc-950 px-4">
            {/* Animated Rings */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <div className="w-[40vw] h-[40vw] border border-cinema-gold rounded-full animate-ping-slow" />
                <div className="w-[60vw] h-[60vw] border border-white rounded-full absolute animate-ping-slow" style={{ animationDelay: "2s" }} />
            </div>

            <div className="relative z-10">
                <p className="font-mono text-cinema-gold text-sm uppercase tracking-[0.5em] mb-6 animate-fade-in-up">Scene 6: Credits</p>
                <h1 className="font-heading text-6xl md:text-9xl font-bold uppercase text-white mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                    Let's Talk<br /><span className="text-transparent stroke-text">Production</span>
                </h1>
                <p className="font-body text-gray-400 text-xl max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                    Got a script? I have the camera. Let's turn your vision into a digital blockbuster.
                </p>
            </div>
            <style jsx>{`
                .stroke-text { -webkit-text-stroke: 1px #fff; }
                .animate-ping-slow { animation: ping 4s cubic-bezier(0, 0, 0.2, 1) infinite; }
                @keyframes ping {
                    75%, 100% { transform: scale(2); opacity: 0; }
                }
             `}</style>
        </section>
    );
};

// 2. CONTACT OPTIONS (Grid)
const ContactGrid = () => {
    const options = [
        { icon: <Mail size={32} />, title: "The Script", val: "harsh@taliyo.com", sub: "For Inquiries" },
        { icon: <Phone size={32} />, title: "Direct Line", val: "+91 987 654 3210", sub: "Mon-Fri, 9am-6pm" },
        { icon: <MapPin size={32} />, title: "Set Location", val: "New Delhi, India", sub: "Available Remote" },
    ];

    return (
        <section className="py-20 bg-cinema-bg px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {options.map((opt, i) => (
                    <div key={i} className="group p-8 border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 hover:border-cinema-gold transition-all duration-300 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 text-cinema-gold mb-6 group-hover:scale-110 transition-transform">
                            {opt.icon}
                        </div>
                        <h3 className="font-heading text-2xl text-white uppercase mb-2">{opt.title}</h3>
                        <p className="font-mono text-lg text-white mb-1">{opt.val}</p>
                        <p className="text-gray-500 text-sm">{opt.sub}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

// 3. THE SCRIPT FORM (Interactive)
const ContactForm = () => {
    const [focused, setFocused] = useState<string | null>(null);

    return (
        <section className="py-24 bg-white text-black px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-heading text-5xl uppercase mb-4">The Screenplay</h2>
                    <p className="text-gray-600">Tell me exactly what you need. The more details, the better the shot.</p>
                </div>

                <form className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className={`relative border-b-2 transition-colors duration-300 ${focused === 'name' ? 'border-black' : 'border-gray-200'}`}>
                            <label className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">Director's Name</label>
                            <input
                                type="text"
                                name="name"
                                onFocus={() => setFocused('name')}
                                onBlur={() => setFocused(null)}
                                className="w-full text-2xl font-heading uppercase outline-none bg-transparent py-2 placeholder-gray-300"
                                placeholder="JOHN DOE"
                            />
                        </div>
                        <div className={`relative border-b-2 transition-colors duration-300 ${focused === 'email' ? 'border-black' : 'border-gray-200'}`}>
                            <label className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">Production Email</label>
                            <input
                                type="email"
                                name="email"
                                onFocus={() => setFocused('email')}
                                onBlur={() => setFocused(null)}
                                className="w-full text-2xl font-heading uppercase outline-none bg-transparent py-2 placeholder-gray-300"
                                placeholder="STUDIO@MAIL.COM"
                            />
                        </div>
                    </div>

                    <div className={`relative border-b-2 transition-colors duration-300 ${focused === 'msg' ? 'border-black' : 'border-gray-200'}`}>
                        <label className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">Scene Description</label>
                        <textarea
                            name="message"
                            rows={4}
                            onFocus={() => setFocused('msg')}
                            onBlur={() => setFocused(null)}
                            className="w-full text-xl font-body outline-none bg-transparent py-2 resize-none placeholder-gray-300"
                            placeholder="I need a website that feels like a Christopher Nolan movie..."
                        />
                    </div>

                    <div className="pt-8 text-center">
                        <button type="submit" className="inline-flex items-center gap-3 px-10 py-4 bg-black text-white font-heading text-xl uppercase tracking-widest hover:bg-cinema-gold hover:text-black transition-all duration-300 group">
                            <span>Submit Script</span>
                            <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

// 4. FAQ SECTION (Accordion)
const FAQSection = () => {
    return (
        <section className="py-24 bg-zinc-950 px-4 border-t border-zinc-800">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="font-heading text-3xl text-gray-500 uppercase tracking-widest mb-12">Production Queries</h2>

                <div className="space-y-6 text-left">
                    {[
                        { q: "What is your typical timeline?", a: "Depending on the scope, a typical production takes 2-4 weeks from script to screen." },
                        { q: "Do you offer post-launch support?", a: "Yes, every project comes with 30 days of bug support, with optional retainer packages." },
                        { q: "What do you need to start?", a: "A clear brief, brand assets (logo, fonts), and your content readiness." },
                    ].map((item, i) => (
                        <div key={i} className="bg-zinc-900 border border-zinc-800 p-6 hover:border-cinema-gold transition-colors duration-300">
                            <h3 className="font-heading text-xl text-white uppercase mb-2">{item.q}</h3>
                            <p className="text-gray-400 font-body">{item.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// 5. SOCIAL FOOTER
const SocialFooter = () => {
    const socials = [
        { icon: <Github />, name: "Github", link: "#" },
        { icon: <Linkedin />, name: "LinkedIn", link: "#" },
        { icon: <Twitter />, name: "Twitter", link: "#" },
    ];

    return (
        <section className="py-20 bg-cinema-bg text-center border-t border-zinc-900">
            <h2 className="font-heading text-2xl text-white uppercase mb-8">Follow the Director</h2>
            <div className="flex justify-center gap-6 mb-12">
                {socials.map((s, i) => (
                    <a key={i} href={s.link} className="w-14 h-14 bg-zinc-900 flex items-center justify-center rounded-full text-cinema-gold hover:bg-cinema-gold hover:text-black hover:scale-110 transition-all duration-300">
                        {s.icon}
                    </a>
                ))}
            </div>
            <p className="font-mono text-xs text-zinc-600 uppercase tracking-widest">
                © 2025 Taliyo Technologies. Cut. Print. Check the Gate.
            </p>
        </section>
    );
};

export default function ContactPage() {
    return (
        <main className="bg-cinema-bg min-h-screen text-white selection:bg-cinema-gold selection:text-black">
            {/* Back Navigation */}
            <Link
                href="/"
                className="fixed top-6 left-6 z-50 group flex items-center gap-3 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-300"
            >
                <ArrowLeft size={16} />
                <span className="font-mono text-xs uppercase tracking-widest">Back Home</span>
            </Link>

            <ContactHero />
            <ContactGrid />
            <ContactForm />
            <FAQSection />
            <SocialFooter />
        </main>
    );
}
