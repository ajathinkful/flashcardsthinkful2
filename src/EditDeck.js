import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "./utils/api/index";

function EditDeck() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const loadedDeck = await readDeck(deckId);
        setDeck(loadedDeck);
        setFormData({
          name: loadedDeck.name,
          description: loadedDeck.description,
        });
      } catch (error) {
        console.error("Error fetching deck:", error);
      }
    }
    fetchData();
  }, [deckId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDeck({
        id: deckId,
        name: formData.name,
        description: formData.description,
      });
      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.error("Error updating deck:", error);
    }
  };

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  if (!deck) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
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

export default EditDeck;
