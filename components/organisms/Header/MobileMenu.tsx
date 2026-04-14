"use client";

import { useState, useEffect, Suspense } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import SearchBar from "@/components/molecules/SearchBar/SearchBar";
import ThemeToggle from "@/components/molecules/ThemeToggle/ThemeToggle";

interface Category {
    id: string;
    name: string;
    slug: string;
}

interface Tool {
    name: string;
    slug: string;
}

interface MobileMenuProps {
    categories: Category[];
    tools: Tool[];
}

export default function MobileMenu({ categories, tools }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [openSection, setOpenSection] = useState<'articles' | 'tools' | 'institution' | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const toggleSection = (section: 'articles' | 'tools' | 'institution') => {
        setOpenSection(openSection === section ? null : section);
    };

    const closeMenu = () => {
        setIsOpen(false);
        setOpenSection(null);
    };

    const menuContent = (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                onClick={closeMenu}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 z-[110] h-dvh w-[85vw] max-w-[350px] bg-background border-l border-border shadow-2xl transition-transform duration-300 ease-in-out transform flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header within drawer */}
                <div className="flex items-center justify-between p-6 border-b border-border/50 shrink-0">
                    <span className="font-serif text-xl font-normal tracking-tight text-foreground">
                        Menu
                    </span>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <button
                            onClick={closeMenu}
                            className="p-2 -mr-2 text-foreground/70 transition-colors hover:text-foreground focus:outline-none"
                            aria-label="Close menu"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Scrollable navigation content */}
                <div className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-6">
                    {/* Search */}
                    <div className="mb-2">
                        <Suspense fallback={<div className="h-9 w-full animate-pulse bg-muted rounded-md" />}>
                            <SearchBar />
                        </Suspense>
                    </div>

                    {/* Articles Accordion */}
                    <div className="flex flex-col border-b border-border/50 pb-6">
                        <button
                            onClick={() => toggleSection('articles')}
                            className="flex items-center justify-between w-full text-left text-sm font-medium uppercase tracking-wide text-foreground outline-none py-2"
                        >
                            Articles
                            <ChevronDown className={`h-4 w-4 opacity-70 transition-transform duration-300 ${openSection === 'articles' ? '-rotate-180' : ''}`} />
                        </button>
                        <div className={`flex flex-col gap-3 overflow-hidden transition-all duration-300 ${openSection === 'articles' ? 'mt-4 max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/category/${category.slug}`}
                                    onClick={closeMenu}
                                    className="text-[15px] font-medium transition-colors hover:text-foreground text-muted-foreground pl-2"
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Tools Accordion */}
                    <div className="flex flex-col border-b border-border/50 pb-6">
                        <button
                            onClick={() => toggleSection('tools')}
                            className="flex items-center justify-between w-full text-left text-sm font-medium uppercase tracking-wide text-foreground outline-none py-2"
                        >
                            Tools
                            <ChevronDown className={`h-4 w-4 opacity-70 transition-transform duration-300 ${openSection === 'tools' ? '-rotate-180' : ''}`} />
                        </button>
                        <div className={`flex flex-col gap-3 overflow-hidden transition-all duration-300 ${openSection === 'tools' ? 'mt-4 max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            {tools.map((tool) => (
                                <Link
                                    key={tool.slug}
                                    href={`/tools/${tool.slug}`}
                                    onClick={closeMenu}
                                    className="text-[15px] font-medium transition-colors hover:text-foreground text-muted-foreground pl-2"
                                >
                                    {tool.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Institution Accordion */}
                    <div className="flex flex-col border-b border-border/50 pb-6">
                        <button
                            onClick={() => toggleSection('institution')}
                            className="flex items-center justify-between w-full text-left text-sm font-medium uppercase tracking-wide text-foreground outline-none py-2"
                        >
                            Institution
                            <ChevronDown className={`h-4 w-4 opacity-70 transition-transform duration-300 ${openSection === 'institution' ? '-rotate-180' : ''}`} />
                        </button>
                        <div className={`flex flex-col gap-3 overflow-hidden transition-all duration-300 ${openSection === 'institution' ? 'mt-4 max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <Link href="/about" onClick={closeMenu} className="text-[15px] font-medium transition-colors hover:text-foreground text-muted-foreground pl-2">About</Link>
                            <Link href="/editorial-policy" onClick={closeMenu} className="text-[15px] font-medium transition-colors hover:text-foreground text-muted-foreground pl-2">Editorial Policy</Link>
                            <Link href="/policy-and-privacy" onClick={closeMenu} className="text-[15px] font-medium transition-colors hover:text-foreground text-muted-foreground pl-2">Policy and Privacy</Link>
                        </div>
                    </div>

                    {/* Static Links */}
                    <div className="flex flex-col gap-5 pt-2">
                        <Link href="/contact" onClick={closeMenu} className="text-[15px] font-medium uppercase tracking-wide transition-colors hover:text-foreground text-muted-foreground">
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <div className="mobile-only">
            {/* Hamburger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 -mr-2 text-foreground transition-colors hover:text-foreground/80 focus:outline-none flex items-center justify-center shrink-0"
                aria-label="Open menu"
            >
                <Menu className="h-6 w-6" />
            </button>

            {mounted && createPortal(menuContent, document.body)}
        </div>
    );
}
