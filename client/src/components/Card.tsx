import { useCardFlip } from '../hooks/useCards';
import type { Card } from '../types/mtg';
import { Repeat } from 'lucide-react';


function CardItem({ card }: { card: Card }) {
    const { flipped, isDoubleFaced, currentImage, currentFaceName, flip } = useCardFlip(card);

    return (
        <div className="relative group">
            <img
                src={currentImage}
                alt={currentFaceName}
                className="card"
                title={currentFaceName}
            />
            {isDoubleFaced && (
                <button
                    onClick={flip}
                    className="card-flip"
                    title={`${card.cardFaces![flipped ? 0 : 1].name}`}
                >
                    <Repeat size={20}/>
                </button>
            )}
        </div>
    );
}

export default CardItem;