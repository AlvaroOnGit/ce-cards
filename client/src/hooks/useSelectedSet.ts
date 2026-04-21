import { useState } from 'react';

const DEFAULT_SET = "sos"

export function useSelectedSet() {
    const [selectedSet, setSelectedSet] = useState<string>(DEFAULT_SET);

    return {
        selectedSet,
        setSelectedSet,
    };
}