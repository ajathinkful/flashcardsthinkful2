import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "./utils/api/index";

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const loadedDeck = await readDeck(deckId);
        setDeck(loadedDeck);
      } catch (error) {
        console.error("Error fetching deck:", error);
      }
    }
    fetchData();
  }, [deckId]);

  const handleNext = () => {
    if (cardIndex < deck.cards.length - 1) {
      setCardIndex(cardIndex + 1);
    } else {
      const restart = window.confirm("Restart cards?");

      if (restart) {
        setCardIndex(0);
      }
    }
  };

  if (!deck) {
    return <div>Loading...</div>;
  }

  const card = deck.cards[cardIndex];

  return (
    <div>
      <h1>Study: {deck.name}</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Card {cardIndex + 1} of {deck.cards.length}
          </h5>
          <p className="card-text">{card.front}</p>
          <button className="btn btn-secondary" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Study;
