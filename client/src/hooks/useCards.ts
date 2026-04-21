import {useState, useEffect, useRef, useCallback} from 'react';
import { getCardsBySet } from '../services/scryfall';
import type { Card } from '../types/mtg';

const PAGE_SIZE = 60;

export function useCards(selectedSet: string) {
    const [visibleCards, setVisibleCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(false);
    const allCards = useRef<Card[]>([]);
    const fetchingRef = useRef(false);
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setVisibleCards([]);
        allCards.current = [];
        fetchingRef.current = false;

        let cancelled = false;

        const fetchAll = async () => {
            setLoading(true);
            let currentPage = 1;
            let hasMore = true;
            let firstBatch = true;

            while (hasMore && !cancelled) {
                const result = await getCardsBySet(selectedSet, currentPage);

                if (cancelled) break;

                allCards.current = [...allCards.current, ...result.cards];

                if (firstBatch) {
                    setVisibleCards(allCards.current.slice(0, PAGE_SIZE));
                    setLoading(false);
                    firstBatch = false;
                }

                hasMore = result.hasMore;
                currentPage++;
            }
        };

        fetchAll();

        return () => { cancelled = true; };
    }, [selectedSet]);

    const hasMore = visibleCards.length < allCards.current.length;

    const loadMore = useCallback(() => {
        setVisibleCards(prev => {
            const nextSize = prev.length + PAGE_SIZE;
            return allCards.current.slice(0, nextSize);
        });
    }, []);

    useEffect(() => {
        if (!sentinelRef.current || loading || !hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) loadMore();
            },
            { threshold: 0.1 }
        );

        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [loading, hasMore, loadMore]);

    return { visibleCards, loading, hasMore, sentinelRef };
}

export function useCardFlip(card: Card) {
    const [flipped, setFlipped] = useState(false);

    const isDoubleFaced = Boolean(
        card.cardFaces &&
        card.cardFaces.length >= 2 &&
        card.cardFaces[0].imageUris?.normal &&
        card.cardFaces[1].imageUris?.normal
    );

    const currentImage = (() => {
        if (isDoubleFaced) {
            return flipped
                ? card.cardFaces![1].imageUris!.normal
                : card.cardFaces![0].imageUris!.normal;
        }
        if (card.imageUris?.normal) return card.imageUris.normal;
        if (card.cardFaces?.[0]?.imageUris?.normal) return card.cardFaces[0].imageUris.normal;
        return '';
    })();

    const currentFaceName = isDoubleFaced
        ? card.cardFaces![flipped ? 1 : 0].name
        : card.name;

    const flip = () => setFlipped(f => !f);

    return { flipped, isDoubleFaced, currentImage, currentFaceName, flip };
}