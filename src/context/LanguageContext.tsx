import React, { useState, useContext, useMemo, useEffect } from "react";
 
import es from "../locales/es.json";
import en from "../locales/en.json";
 
const translations = { es, en } as const;
type TranslationKeys = keyof typeof es;
 
export type Language = "es" | "en";
 
type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: TranslationKeys) => string;
};
 
const LanguageContext = React.createContext<LanguageContextType | undefined>(
    undefined,
);
 
type LanguageProviderProps = {
    children: React.ReactNode;
};
 
const getInitialLanguage = (): Language => {
    const storedLang = localStorage.getItem("app-language") as Language | null;
    return (storedLang === "es" || storedLang === "en") ? storedLang : "es";
};
 
export function LanguageProvider({ children }: LanguageProviderProps) {
    const [language, setCurrentLanguage] = useState<Language>(getInitialLanguage);
 
    useEffect(() => {
        localStorage.setItem("app-language", language);
    }, [language]);
 
    const t = (key: TranslationKeys): string => {
        const translation = translations[language];
        return translation[key] || `MISSING_TRANSLATION:${key}`;
    };
 
    const setLanguage = (lang: Language) => {
        setCurrentLanguage(lang);
    };
 
    const contextValue = useMemo(
        () => ({ language, setLanguage, t }),
        [language],
    );
 
    return (
        <LanguageContext.Provider value={contextValue}>
            {children}
        </LanguageContext.Provider>
    );
}
 
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};