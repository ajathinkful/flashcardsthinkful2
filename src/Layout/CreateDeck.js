import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";

function CreateDeck() {
  const history = useHistory();
  const [deck, setDeck] = useState({ name: "", description: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDeck({ ...deck, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newDeck = await createDeck(deck);
      history.push(`/decks/${newDeck.id}`);
    } catch (error) {
      console.error("Error creating deck:", error);
    }
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>

      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={deck.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={deck.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
        <button
          type="button"
          className="btn btn-secondary ml-2"
          onClick={() => history.push("/")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
