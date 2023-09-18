import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "./utils/api";

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loadedDeck = await readDeck(deckId);
        setDeck(loadedDeck);
      } catch (error) {
        console.error("Error fetching deck:", error);
      }
    };

    fetchData();
  }, [deckId]);

  const currentCard = deck?.cards[currentCardIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentCardIndex < deck.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      // Reached end of cards
      alert("End of cards");
    }
  };

  return (
    <div>
      <h2>Study Screen</h2>
      {deck && (
        <>
          <h3>{deck.name}</h3>
          <div>
            <div>
              <p>{isFlipped ? currentCard.back : currentCard.front}</p>
            </div>
            <button onClick={handleFlip}>Flip</button>
          </div>
          <button onClick={handleNext}>Next</button>
        </>
      )}
    </div>
  );
}

export default Study;
