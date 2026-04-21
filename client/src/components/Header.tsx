import topdeckLogo from '../assets/topdeck.svg'
import { useTheme } from '../hooks/useTheme'
import { Sun, Moon } from 'lucide-react'

function Header() {
    const { dark, toggle } = useTheme()
    return (
        <header className="header-wrapper">
            <div className="flex items-center justify-between p-2 cursor-pointer">
                <img src={topdeckLogo} alt="topdeck logo" className="h-8 w-8 dark:invert"/>
                <h1 className="text-2xl">
                    Topdeck
                </h1>
            </div>
            <div className="flex items-center justify-between gap-4">
                <button onClick={toggle} className="p-2 rounded-full hover:bg-orange-400 transition-colors cursor-pointer" aria-label="Toggle theme">
                    {dark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <div className="border-l border-border-light dark:border-white/10 h-5" />
                <a>Sign In</a>
            </div>
        </header>
    )
}

export default Header;