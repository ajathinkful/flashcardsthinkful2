import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "./utils/api/index";

function Home() {
  // Initialize state to hold the list of decks
  const [decks, setDecks] = useState([]);
  function fetchData() {
    listDecks().then((data) => setDecks(data));
    console.log("sw");
  }
  useEffect(fetchData, []);

  // Define a function to handle deck deletion
  const handleDeleteDeck = async (deckId) => {
    try {
      await deleteDeck(deckId);
      setDecks(decks.filter((deck) => deck.id !== deckId)); // Update decks after deletion
    } catch (error) {
      console.error("Error deleting deck:", error);
    }
  };

  return (
    <div>
      <Link to="/decks/new" className="btn btn-secondary">
        Create Deck
      </Link>
      <div>
        {decks.map((deck) => (
          <div key={deck.id} className="card">
            <div className="card-body">
              <h5 className="card-title">{deck.name}</h5>
              <p className="card-text">{deck.description}</p>
              <p className="card-text">{deck.cards.length} cards</p>
              <Link to={`/decks/${deck.id}`} className="btn btn-primary">
                View
              </Link>
              <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
                Study
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => {
                  if (
                    window.confirm("Are you sure you want to delete this deck?")
                  ) {
                    handleDeleteDeck(deck.id);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
