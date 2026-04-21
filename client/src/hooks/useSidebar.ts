import { useState, useMemo, useRef, useEffect } from 'react';
import type { Category } from '../types/sidebar';
import type { Set } from '../types/mtg';

export function useSidebarToggle(initialState = true) {
    const [isOpen, setIsOpen] = useState(initialState);

    const toggleSidebar = () => {
        setIsOpen(prev => !prev);
    };

    const openSidebar = () => setIsOpen(true);
    const closeSidebar = () => setIsOpen(false);

    return {
        isOpen,
        toggleSidebar,
        openSidebar,
        closeSidebar,
        setIsOpen
    };
}
export function useSidebarCategories(CATEGORIES: Category[]) {
    const [categories, setCategories] = useState<Category[]>(CATEGORIES);

    const toggleCategory = (id: string) => {
        setCategories(prev =>
            prev.map(cat =>
                cat.id === id
                    ? { ...cat, expanded: !cat.expanded }
                    : cat
            )
        );
    };

    return {
        categories,
        toggleCategory,
    };
}
export function useSetSearch(categories: Category[]) {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const allSets = useMemo(
        () => categories.flatMap(cat => cat.sets),
        [categories]
    );

    const results = useMemo(() => {
        if (!query.trim()) return [];
        const lower = query.toLowerCase();
        return allSets.filter(s => s.name.toLowerCase().includes(lower)).slice(0, 8);
    }, [query, allSets]);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleChange = (value: string) => {
        setQuery(value);
        setIsOpen(true);
    };

    const handleSelect = (set: Set, onSetSelect: (code: string) => void) => {
        onSetSelect(set.code);
        setQuery(set.name);
        setIsOpen(false);
    };

    const handleClear = () => {
        setQuery('');
        setIsOpen(false);
    };

    const handleFocus = () => {
        if (query) setIsOpen(true);
    };

    return { query, results, isOpen, containerRef, handleChange, handleSelect, handleClear, handleFocus };
}