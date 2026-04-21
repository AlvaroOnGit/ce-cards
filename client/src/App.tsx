import { useSelectedSet } from './hooks/useSelectedSet';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/Main';

function App() {
    const { selectedSet, setSelectedSet } = useSelectedSet();

    return (
        <div className="flex flex-col h-dvh">
            <Header />
            <div className="flex flex-1 min-h-0">
                <Sidebar onSetSelect={setSelectedSet} selectedSet={selectedSet} />
                <Main selectedSet={selectedSet} />
            </div>
        </div>
    )
}

export default App;
