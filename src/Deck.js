import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck } from "./utils/api/index";

function Deck() {
  const { deckId } = useParams();
  const history = useHistory();
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

  const handleEdit = () => {
    history.push(`/decks/${deckId}/edit`);
  };

  const handleStudy = () => {
    history.push(`/decks/${deckId}/study`);
  };

  const handleAddCards = () => {
    history.push(`/decks/${deckId}/cards/new`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this deck?"
    );

    if (confirmDelete) {
      try {
        await deleteDeck(deckId);
        history.push("/");
      } catch (error) {
        console.error("Error deleting deck:", error);
      }
    }
  };

  if (!deck) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-4">
        <h1>{deck.name}</h1>
        <p>{deck.description}</p>
        <button className="btn btn-secondary mr-2" onClick={handleEdit}>
          Edit
        </button>
        <button className="btn btn-primary mr-2" onClick={handleStudy}>
          Study
        </button>
        <button className="btn btn-primary mr-2" onClick={handleAddCards}>
          Add Cards
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
      <h2>Cards</h2>
      {deck.cards.map((card) => (
        <div className="card mb-2" key={card.id}>
          <div className="card-body">
            <h5 className="card-title">{card.front}</h5>
            <p className="card-text">{card.back}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Deck;
