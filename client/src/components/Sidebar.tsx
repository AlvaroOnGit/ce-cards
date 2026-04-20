import { ChevronUp, ChevronDown, Menu } from 'lucide-react';
import type { Category } from "../types/sidebar.ts";
import { useSidebarCategories, useSidebarToggle } from "../hooks/useSidebar.ts";

const createSet = (code: string, name: string) => ({
    code,
    name,
    icon: `ss-${code}`
});

const CATEGORIES: Category[] = [
    {
        id: "mtg",
        label: "Magic the Gathering",
        expanded: true,
        sets: [
            createSet("sos", "Secrets of Strixhaven"),
            createSet("ecl", "Lorwyn Eclipsed"),
            createSet("ecl", "Lorwyn Eclipsed"),
            createSet("ecl", "Lorwyn Eclipsed"),
            createSet("ecl", "Lorwyn Eclipsed"),
            createSet("ecl", "Lorwyn Eclipsed"),
            createSet("ecl", "Lorwyn Eclipsed"),
            createSet("ecl", "Lorwyn Eclipsed"),
            createSet("ecl", "Lorwyn Eclipsed"),
            createSet("ecl", "Lorwyn Eclipsed"),
            createSet("ecl", "Lorwyn Eclipsed"),
            createSet("ecl", "Lorwyn Eclipsed"),
            createSet("ecl", "Lorwyn Eclipsed"),
            createSet("ecl", "Lorwyn Eclipsed"),
            createSet("ecl", "Lorwyn Eclipsed"),
            createSet("ecl", "Lorwyn Eclipsed"),
            createSet("ecl", "Lorwyn Eclipsed"),
        ]
    },
    {
        id: "ub",
        label: "Universes Beyond",
        expanded: true,
        sets: [
            createSet("tmt", "Teenage Mutant Ninja Turtles"),
            createSet("tla", "Avatar: The Last Airbender"),
        ]
    },
    {
        id: "cmm",
        label: "Commander",
        expanded: true,
        sets: [
            createSet("soc", "Secrets of Strixhaven Commander"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
            createSet("tmc", "Teenage Mutant Ninja Turtles Eternal"),
        ]
    },
]

function Sidebar() {
    const { isOpen, toggleSidebar } = useSidebarToggle(true);
    const { categories, toggleCategory } = useSidebarCategories(CATEGORIES);

    return (
        <aside className="sticky z-20">
            <div className={`sidebar-wrapper transition-all duration-500 ${isOpen ? 'w-60' : 'w-8'}`}>
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
                                            className={`ss ${set.icon} ss-3x ss-fw ss-grad ss-mythic`}
                                            title={set.name}
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
            >
                <Menu size={18}/>
            </button>
        </aside>
    )
}

export default Sidebar;