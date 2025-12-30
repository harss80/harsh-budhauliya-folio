"use client";

import { IntroProvider } from "@/context/IntroContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <IntroProvider>
            {children}
        </IntroProvider>
    );
}
