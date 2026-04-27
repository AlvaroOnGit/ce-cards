import { Search } from "lucide-react";

const COLORS = [
    { code: 'W', label: 'White', icon: 'https://svgs.scryfall.io/card-symbols/W.svg' },
    { code: 'U', label: 'Blue',  icon: 'https://svgs.scryfall.io/card-symbols/U.svg' },
    { code: 'B', label: 'Black', icon: 'https://svgs.scryfall.io/card-symbols/B.svg' },
    { code: 'R', label: 'Red',   icon: 'https://svgs.scryfall.io/card-symbols/R.svg' },
    { code: 'G', label: 'Green', icon: 'https://svgs.scryfall.io/card-symbols/G.svg' },
];

function CardFilterItem({ onNameChange, value, selectedColors, onColorToggle }: {
    onNameChange: (value: string) => void;
    value: string;
    selectedColors: string[];
    onColorToggle: (code: string) => void;
}) {
    return (
        <section className="filterbar-wrapper">
            <div className="flex items-center">
                {COLORS.map(({ code, label, icon }) => (
                    <button
                        key={code}
                        title={label}
                        onClick={() => onColorToggle(code)}
                        className={`transition-all cursor-pointer duration-200 ${
                            selectedColors.includes(code)
                                ? 'scale-110'
                                : 'opacity-40 hover:opacity-70'
                        }`}
                    >
                        <img src={icon} alt={label} className="w-8 mr-2" />
                    </button>
                ))}
            </div>
            <div className="border-l border-border-light dark:border-white/10 h-8 pl-2" />
            <div className="searchbar w-50">
                <Search size={14} className="opacity-50 shrink-0" />
                <input
                    type="text"
                    placeholder="Card name..."
                    className="w-full"
                    value={value}
                    onChange={(e) => onNameChange(e.target.value)}
                />
            </div>
        </section>
    );
}

export default CardFilterItem;