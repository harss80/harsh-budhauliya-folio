"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface IntroContextType {
    hasPlayed: boolean;
    setHasPlayed: (value: boolean) => void;
}

const IntroContext = createContext<IntroContextType | undefined>(undefined);

// Declare global type
declare global {
    interface Window {
        hasIntroPlayed?: boolean;
    }
}

export const IntroProvider = ({ children }: { children: ReactNode }) => {
    const [hasPlayed, setHasPlayedState] = useState(false);

    React.useEffect(() => {
        // Use a window variable that persists during client-side navigation
        // but resets on full page reload (F5).
        if (typeof window !== "undefined" && window.hasIntroPlayed) {
            setHasPlayedState(true);
        }
    }, []);

    const setHasPlayed = (value: boolean) => {
        setHasPlayedState(value);
        if (typeof window !== "undefined" && value) {
            window.hasIntroPlayed = true;
        }
    };

    return (
        <IntroContext.Provider value={{ hasPlayed, setHasPlayed }}>
            {children}
        </IntroContext.Provider>
    );
};

export const useIntro = () => {
    const context = useContext(IntroContext);
    if (!context) {
        throw new Error("useIntro must be used within an IntroProvider");
    }
    return context;
};
