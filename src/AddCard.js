import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "./utils/api/index";
import CardForm from "./CardForm"; // Import CardForm component

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
      <h1>{`${deck.name}: Add Card`}</h1>
      <CardForm
        card={card}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-2">
        Done
      </Link>
    </div>
  );
}

export default AddCard;
