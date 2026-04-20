import type { Card } from '../types/mtg.ts';


export async function getCardsBySet(setCode: string): Promise<Card[]> {
    const cards: Card[] = [];
    let url: string | null = `https://api.scryfall.com/cards/search?q=set:${setCode}`;

    while (url) {
        const res = await fetch(url);
        const data = await res.json();

        const cardMap: Card[] = data.data.map((c: any) => ({
            id:            c.id,
            name:          c.name,
            type:          c.type_line,
            oracle:        c.oracle_text ?? null,
            manaCost:      c.mana_cost ?? null,
            cmc:           c.cmc,
            power:         c.power ?? null,
            toughness:     c.toughness ?? null,
            colors:        c.colors ?? [],
            colorIdentity: c.color_identity ?? [],
            keywords:      c.keywords ?? [],
            rarity:        c.rarity,
            gameChanger:   c.game_changer ?? false,
            set:           c.set,
            setName:       c.set_name,
            layout:        c.layout,

            imageUris: c.image_uris ? {
                    normal: c.image_uris.normal ?? '',
                    large: c.image_uris.large ?? '',
                    art: c.image_uris.art_crop ??  '',
                }
                : undefined,

            cardFaces: c.card_faces?.map((face: any) => ({
                name: face.name,
                manaCost: face.mana_cost ?? '',
                type: face.type_line,
                oracle: face.oracle_text ?? '',
                colors: face.colors ?? [],
                power: face.power ?? '',
                toughness: face.toughness ?? '',
                imageUris: {
                    normal: face.image_uris?.normal ?? '',
                    large: face.image_uris?.large ?? '',
                    art: face.image_uris?.art_crop ?? '',
                }
            })) ?? undefined,
        }));

        cards.push(...cardMap);

        url = data.has_more ? data.next_page : null;
    }
    return cards;
}

const cards = await getCardsBySet("ecl");
console.log(cards);