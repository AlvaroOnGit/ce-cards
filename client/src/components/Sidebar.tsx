import { ChevronUp, ChevronDown, Menu } from 'lucide-react';
import SetSearchBar from "./SetSearchBar";
import type { Category } from "../types/sidebar.ts";
import type { SidebarProps } from '../types/props';
import { useSidebarCategories, useSidebarToggle } from "../hooks/useSidebar.ts";
import categoryData from '../data/categories.json';

const createSet = (code: string, name: string) => ({
    code,
    name,
    icon: `ss-${code}`
});

const CATEGORIES: Category[] = categoryData.map(cat => ({
    ...cat,
    sets: cat.sets.map(s => createSet(s.code, s.name))
}));

function Sidebar({ onSetSelect, selectedSet }: SidebarProps) {
    const { isOpen, toggleSidebar } = useSidebarToggle(true);
    const { categories, toggleCategory } = useSidebarCategories(CATEGORIES);

    return (
        <aside className="sticky z-20">
            <div className={`sidebar-wrapper transition-all duration-500 ${
                isOpen 
                    ? 'w-60' 
                    : 'w-8'
            }`}>
                <div className={`transition-all ${
                    isOpen
                        ? 'opacity-100 duration-1000'
                        : 'opacity-0 pointer-events-none'
                }`}>
                    <SetSearchBar categories={categories} onSetSelect={onSetSelect}/>
                </div>
                <nav className={`sidebar-category-wrapper transition-all ease-in ${
                    isOpen
                        ? 'opacity-100 duration-1000'
                        : 'opacity-0 duration-100 pointer-events-none'
                }`}>
                    {categories.map((cat) => (
                        <div key={cat.id} className="sidebar-category">
                            <button onClick={() => toggleCategory(cat.id)}>
                                <span>
                                    {cat.label}
                                </span>
                                {cat.expanded ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
                            </button>
                            {cat.expanded && (
                                <div className="sidebar-category-sets">
                                    {cat.sets.map((set) => (
                                        <span
                                            key={set.code}
                                            className={`ss ${set.icon} ss-3x ss-fw ss-grad ss-mythic ${
                                                selectedSet === set.code 
                                                    ? 'opacity-100' 
                                                    : 'opacity-50'
                                            }`}
                                            title={set.name}
                                            onClick={() => onSetSelect(set.code)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </div>
            <button
                className="sidebar-toggle"
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
                title="Toggle sidebar"
            >
                <Menu size={18}/>
            </button>
        </aside>
    )
}

export default Sidebar;