import React, { Component } from "react";
function Search({ handleInput, search }) {
  return (
    <section>
      <input
        type="text"
        placeholder="Search for a movie....."
        className="search-box"
        onChange={handleInput}
        onKeyPress={search}
      />
    </section>
  );
}

export default Search;
