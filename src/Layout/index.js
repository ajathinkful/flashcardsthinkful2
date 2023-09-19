import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home";
import CreateDeck from "./CreateDeck";
import Deck from "../Deck";
import Study from "../Study";
import EditDeck from "../EditDeck";
import AddCard from "../AddCard";
import EditCard from "../EditCard"; // Import the EditCard component

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            {" "}
            {/* Add route for EditCard */}
            <EditCard />
          </Route>
          <Route path="/decks/:deckId">
            <Deck />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
