export interface Card {
    id: string;
    name: string;
    type: string;
    oracle: string;
    manaCost: string;
    cmc: number;
    power: string;
    toughness: string;
    colors: string[];
    colorIdentity: string[];
    keywords: string[];
    rarity: string;
    gameChanger: boolean;
    set: string;
    setName: string;
    layout: string;
    imageUris?: {
        normal: string;
        large: string;
        art: string;
    }
    cardFaces?: CardFace[];
}

interface CardFace {
    name: string;
    manaCost: string;
    type: string;
    oracle: string;
    colors: string[];
    power: string;
    toughness: string;
    imageUris: {
        normal: string;
        large: string;
        art: string;
    };
}

export interface Set {
    code: string,
    name: string,
    icon: string,
}