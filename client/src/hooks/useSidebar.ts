import { useState } from "react";
import type { Category } from "../types/sidebar.ts";

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