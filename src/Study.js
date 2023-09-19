import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "./utils/api/index";

function Study() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

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
      setFlipped(false); // Reset flip when moving to the next card
    } else {
      const restart = window.confirm("Restart cards?");
      if (restart) {
        setCardIndex(0);
        setFlipped(false); // Reset flip when restarting
      }
    }
  };

  const handleFlip = () => {
    setFlipped(!flipped); // Toggle flipped state
  };

  const handleAddCards = () => {
    history.push(`/decks/${deckId}/addCard`);
  };

  if (!deck) {
    return <div>Loading...</div>;
  }

  const card = deck.cards[cardIndex];

  if (deck.cards.length < 3) {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <h1>Not enough cards</h1>
        <p>
          You need at least 3 cards to study. There are {deck.cards.length}{" "}
          cards in this deck.
        </p>
        <button className="btn btn-primary" onClick={handleAddCards}>
          Add Cards
        </button>
      </div>
    );
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h1>Study: {deck.name}</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Card {cardIndex + 1} of {deck.cards.length}
          </h5>
          {flipped ? (
            <p className="card-text">{card.back}</p>
          ) : (
            <p className="card-text">{card.front}</p>
          )}
          <button className="btn btn-secondary" onClick={handleFlip}>
            Flip
          </button>
          {flipped && (
            <button className="btn btn-secondary" onClick={handleNext}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Study;
