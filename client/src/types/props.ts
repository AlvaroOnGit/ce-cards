export interface SidebarProps {
    onSetSelect: (code: string) => void;
    selectedSet: string;
}

export interface MainProps {
    selectedSet: string;
}