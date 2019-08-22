import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import EditMovie from "./Movies/EditMovie.js";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movie, setMovie] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/"
        render={props=>{
          return <MovieList {...props} movies={movies} setMovies={setMovies}/>;
        }} 
     />
      
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} movie={movie} setMovie={setMovie} />;
        }}
      />
      <Route
        path="/update-movie/:id"
        render={props => {
          return <EditMovie {...props} movie={movie} setMovie={setMovie}/>;
        }}
      />
    </>
  );
};

export default App;
