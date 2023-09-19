import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "./utils/api/index";

function AddCard() {
  const { deckId } = useParams();
  const [card, setCard] = useState({ front: "", back: "" });
  const [deck, setDeck] = useState(null);

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCard({ ...card, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createCard(deckId, card);
      setCard({ front: "", back: "" });

      if (deck) {
        // Update the deck with the new card
        const updatedDeck = { ...deck };
        updatedDeck.cards.push(card);
        setDeck(updatedDeck);
      }
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };

  if (!deck) {
    return <div>Loading...</div>;
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
            Add Card
          </li>
        </ol>
      </nav>
      <h1>{`${deck.name}: Add Card`}</h1> {/* Updated heading */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            className="form-control"
            id="front"
            name="front"
            rows="4"
            value={card.front}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            rows="4"
            value={card.back}
            onChange={handleChange}
            required
          />
        </div>
        <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-2">
          Done
        </Link>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}

export default AddCard;
