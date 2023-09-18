// src/AddCard.js

import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createCard } from "./utils/api/index";

function AddCard() {
  const { deckId } = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({ front: "", back: "" });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newCard = await createCard(deckId, formData);
    // Assuming createCard returns the newly created card
    // You may want to handle errors here
    console.log("New Card:", newCard);
    history.push(`/decks/${deckId}`);
  };

  const handleDone = () => {
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <h2>Add Card</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="front">Front:</label>
          <textarea
            id="front"
            name="front"
            value={formData.front}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="back">Back:</label>
          <textarea
            id="back"
            name="back"
            value={formData.back}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={handleDone}>
          Done
        </button>
      </form>
    </div>
  );
}

export default AddCard;
