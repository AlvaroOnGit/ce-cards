import type { Category } from './sidebar.ts';

export interface SidebarProps {
    onSetSelect: (code: string) => void;
    selectedSet: string;
}

export interface MainProps {
    selectedSet: string;
}

export interface SetSearchBarProps {
    categories: Category[];
    onSetSelect: (code: string) => void;
}