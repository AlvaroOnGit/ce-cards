import { useRef } from 'react';
import { useCards } from '../hooks/useCards';
import { useScrollTop } from '../hooks/useMain';
import type { MainProps } from '../types/props';
import CardItem from './Card';
import { ArrowBigUpDash } from 'lucide-react';

function Main({ selectedSet }: MainProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const { showScrollTop, scrollToTop } = useScrollTop(scrollRef);
    const { visibleCards, loading, sentinelRef } = useCards(selectedSet);

    return (
        <div ref={scrollRef} className="flex-1 min-w-0 overflow-y-auto custom-scrollbar">
            <section className="w-full h-50 bg-yellow-700"></section>
            <section className="filterbar-wrapper" />
            {!loading && (
                <section className="card-wrapper">
                    {visibleCards.map((card) => (
                        <CardItem key={card.id} card={card} />
                    ))}
                </section>
            )}
            {loading && (
                <section className="card-wrapper gap-2">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="card-skeleton">
                            <div
                                className="card-skeleton-overlay"
                                style={{ animation: 'shimmer 1.8s ease-in-out infinite', transform: 'translateX(-100%)' }}
                            />
                        </div>
                    ))}
                </section>
            )}
            <div ref={sentinelRef} className="h-1" />
            <button
                onClick={scrollToTop}
                className={`scroll-top-button transition-opacity duration-300 ${
                    showScrollTop 
                        ? 'opacity-100' 
                        : 'opacity-0 pointer-events-none'
                }`}
                aria-label="Scroll to top"
                title="Scroll to top"
            >
                <ArrowBigUpDash />
            </button>
        </div>
    );
}

export default Main;