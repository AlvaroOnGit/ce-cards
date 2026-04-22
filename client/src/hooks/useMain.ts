import React from 'react';
import { useState, useEffect } from 'react';

export function useScrollTop(ref: React.RefObject<HTMLDivElement | null>, initialState = false) {
    const [showScrollTop, setShowScrollTop] = useState(initialState);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const onScroll = () => setShowScrollTop(el.scrollTop > 500);
        el.addEventListener('scroll', onScroll);
        return () => el.removeEventListener('scroll', onScroll);
    }, [ref]);

    return {
        showScrollTop,
        scrollToTop: () => ref.current?.scrollTo({ top: 0, behavior: 'smooth' })
    };
}