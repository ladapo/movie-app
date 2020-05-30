import React, { useState } from "react";
import axios from "axios";
import Search from "./components/search.js";
import Results from "./components/results";
import Popup from "./components/popup";
function App() {
  const APP_URL = "http://www.omdbapi.com/?apikey=60f83a7d";
  const APP_KEY = "60f83a7d";

  const [state, setState] = useState({
    //set default states of the search query,our result and selected popup
    s: "",
    results: [],
    selected: {},
  });
  //Handles search query
  const search = (e) => {
    if (e.key === "Enter") {
      axios(APP_URL + "&s=" + state.s).then(({ data }) => {
        let results = data.Search;

        setState((prevState) => {
          return { ...prevState, results: results };
        });
      });
    }
  };
  const handleInput = (e) => {
    //updating the search input awhile typing..
    let s = e.target.value;
    setState((prevState) => {
      return { ...prevState, s: s };
    });
  };
  //POP UP view request
  const openPopup = (id) => {
    axios(APP_URL + "&i=" + id).then(({ data }) => {
      let results = data;
      setState((prevState) => {
        return { ...prevState, selected: results };
      });
    });
  };

  const closePopup = () => {
    setState((prevState) => {
      return { ...prevState, selected: {} };
    });
  };
  return (
    <div className="App">
      <header>
        <h1>MOVIE APP</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />
        <Results results={state.results} openPopup={openPopup} />

        {typeof state.selected.Title != "undefined" ? (
          <Popup selected={state.selected} closePopup={closePopup} />
        ) : (
          false
        )}
      </main>
    </div>
  );
}

export default App;
