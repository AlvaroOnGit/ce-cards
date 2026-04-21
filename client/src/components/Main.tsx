import type { MainProps } from '../types/props';
import { useCards } from '../hooks/useCards';
import CardItem from './Card';

function Main({ selectedSet }: MainProps) {
    const { visibleCards, loading, sentinelRef } = useCards(selectedSet);

    return (
        <div className="flex-1 min-w-0 overflow-y-auto custom-scrollbar">
            <section className="w-full h-50 bg-yellow-700"></section>
            <section className="filterbar-wrapper" />
            <section className="card-wrapper">
                {visibleCards.map((card) => (
                    <CardItem key={card.id} card={card} />
                ))}
            </section>
            {loading && (
                <p className="text-center py-10 opacity-50">Loading Cards...</p>
            )}
            <div ref={sentinelRef} className="h-1" />
        </div>
    );
}

export default Main;