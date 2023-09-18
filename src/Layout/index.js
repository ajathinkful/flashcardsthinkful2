import React from "react";
import { Switch, Route } from "react-router-dom"; // Import Switch and Route
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home"; // Import the Home component
import CreateDeck from "./CreateDeck"; // Import the CreateDeck component

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/" exact>
            {" "}
            {/* This is the Home route */}
            <Home />
          </Route>
          <Route path="/decks/new">
            {" "}
            {/* This is the Create Deck route */}
            <CreateDeck />
          </Route>
          <Route path="*">
            {" "}
            {/* This is a catch-all route for 404 Not Found */}
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
