import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readCard, updateCard } from "./utils/api/index";

function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();

  const [card, setCard] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    const loadCard = async () => {
      try {
        const loadedCard = await readCard(cardId, abortController.signal);
        setCard(loadedCard);
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    };
    loadCard();
  }, [cardId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCard({ ...card, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCard(card);
    history.push(`/decks/${deckId}`);
  };

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <h2>Edit Card</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="front" className="form-label">
            Front
          </label>
          <textarea
            className="form-control"
            id="front"
            name="front"
            rows="3"
            value={card.front}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="back" className="form-label">
            Back
          </label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            rows="3"
            value={card.back}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mr-2">
          Save
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditCard;
