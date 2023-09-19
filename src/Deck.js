import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "./utils/api/index";

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
    history.push(`/decks/${deckId}/cards/new`); // Updated URL
  };

  const handleDeleteDeck = async () => {
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

  const handleDeleteCard = async (cardId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this card?"
    );

    if (confirmDelete) {
      try {
        await deleteCard(cardId);
        const updatedDeck = { ...deck };
        updatedDeck.cards = updatedDeck.cards.filter(
          (card) => card.id !== cardId
        );
        setDeck(updatedDeck);
      } catch (error) {
        console.error("Error deleting card:", error);
      }
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
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
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
          Add Card
        </button>
        <button className="btn btn-danger mr-2" onClick={handleDeleteDeck}>
          Delete Deck
        </button>
      </div>
      <h2>Cards</h2>
      {deck.cards.map((card) => (
        <div className="card mb-2" key={card.id}>
          <div className="card-body">
            <h5 className="card-title">{card.front}</h5>
            <p className="card-text">{card.back}</p>
            <button
              className="btn btn-secondary mr-2"
              onClick={() => handleDeleteCard(card.id)}
            >
              Delete
            </button>
            {/* Add Edit button */}
            <Link
              className="btn btn-secondary"
              to={`/decks/${deckId}/cards/${card.id}/edit`}
            >
              Edit
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Deck;
