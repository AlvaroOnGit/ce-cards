import type { MainProps } from '../types/props';
import { useCards } from '../hooks/useCards';
import CardItem from './Card';

function Main({ selectedSet }: MainProps) {
    const { visibleCards, loading, sentinelRef } = useCards(selectedSet);

    return (
        <div className="flex-1 min-w-0 overflow-y-auto custom-scrollbar">
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
        </div>
    );
}

export default Main;