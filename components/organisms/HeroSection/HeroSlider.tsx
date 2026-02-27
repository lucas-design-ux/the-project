'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { Article } from '@/lib/cms/interface';

interface HeroSliderProps {
    articles: Article[];
}

export default function HeroSlider({ articles }: HeroSliderProps) {
    const [sliderRef] = useKeenSlider<HTMLDivElement>({
        slides: {
            perView: 'auto',
            spacing: 16,
        },
    });

    if (!articles || articles.length === 0) return null;

    return (
        <div className="w-full relative mt-12 mb-4 border-t-2 border-border/50 pt-8">
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-6 text-muted-foreground">Últimas Notícias</h3>
            {/* 
              Slider Implementation:
              Using keen-slider for a smooth, touch-friendly carousel.
              We add overflow-x-auto and snap-x as fallbacks.
            */}
            <div ref={sliderRef} className="keen-slider flex flex-row overflow-x-auto snap-x snap-mandatory w-full touch-pan-x hide-scrollbar" style={{ height: '320px' }}>
                {articles.map((article) => (
                    <div key={article.id} className="keen-slider__slide snap-start shrink-0 px-2" style={{ minWidth: '300px', maxWidth: '300px' }}>
                        <div className="flex flex-col h-full bg-card dark:bg-card border border-border shadow-sm rounded-lg overflow-hidden group">
                            <Link href={`/article/${article.slug}`} className="flex shrink-0 items-center w-full aspect-video rounded-t-lg overflow-hidden relative">
                                <div className="absolute left-0 top-0 z-20">
                                    <span className="inline-block px-2 py-1 text-[10px] font-bold text-white bg-red-600 rounded-br-lg rounded-tl-lg uppercase tracking-wider shadow-sm">
                                        {article.category.name}
                                    </span>
                                </div>
                                <div className="absolute inset-0 z-10 pointer-events-none bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
                                <Image
                                    src={article.coverImage}
                                    alt={article.title}
                                    fill
                                    sizes="300px"
                                    className="object-cover transition-transform duration-500 group-hover:scale-105 z-0"
                                />
                            </Link>
                            <figcaption className="flex flex-col p-4 grow bg-muted/20">
                                <Link href={`/article/${article.slug}`} className="grow flex flex-col justify-start">
                                    <h3 className="font-serif text-[1.15rem] leading-snug group-hover:underline text-foreground line-clamp-3 mb-2">
                                        {article.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-auto">
                                        {new Date(article.publishedAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </Link>
                            </figcaption>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
