import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "./utils/api/index";
import CardForm from "./CardForm"; // Import CardForm component

function EditCard() {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState({ front: "", back: "" });

  useEffect(() => {
    async function fetchData() {
      try {
        const loadedDeck = await readDeck(deckId);
        setDeck(loadedDeck);
        const loadedCard = await readCard(cardId);
        setCard(loadedCard);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [deckId, cardId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCard({ ...card, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateCard(card);
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  if (!deck || !card) {
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
            <Link to={`/decks/${deckId}`}>Deck: {deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h1>Edit Card</h1>
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

export default EditCard;
