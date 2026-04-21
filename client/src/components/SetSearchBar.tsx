import { Search, X } from 'lucide-react';
import { useSetSearch } from '../hooks/useSidebar';
import type { SetSearchBarProps } from '../types/props'

function SetSearchBar({ categories, onSetSelect }: SetSearchBarProps) {
    const { query, results, isOpen, containerRef, handleChange, handleSelect, handleClear, handleFocus } = useSetSearch(categories);

    return (
        <div ref={containerRef} className="sidebar-searchbar-wrapper">
            <div className="sidebar-searchbar">
                <Search size={14} className="opacity-50 shrink-0" />
                <input
                    type="text"
                    value={query}
                    onChange={e => handleChange(e.target.value)}
                    onFocus={handleFocus}
                    placeholder="Search sets..."
                />
                {query && (
                    <button onClick={handleClear}>
                        <X size={14} className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer" />
                    </button>
                )}
            </div>

            {isOpen && results.length > 0 && (
                <ul className="sidebar-searchbar-dropdown">
                    {results.map(set => (
                        <li
                            key={set.code}
                            onClick={() => handleSelect(set, onSetSelect)}
                            className=""
                        >
                            <span className="flex items-center justify-center w-6 h-6 shrink-0">
                                <span className={`ss ss-${set.code} ss-fw ss-grad ss-mythic ss-2x`} />
                            </span>
                            {set.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SetSearchBar;