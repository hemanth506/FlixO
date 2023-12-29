import "./App.css";
import React, { Suspense, lazy, useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Loading } from "./components/Loading";
import { PageNotFound } from "./components/PageNotFound";
import {
  fetchComingSoon,
  fetchFanFavourite,
  fetchInTheatres,
  fetchTopRated,
} from "./api/endpoints";

const WatchList = lazy(() => import("./components/WatchList"));
const MoviesComponent = lazy(() => import("./pages/MoviesComponent"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));

export const WatchListContext = createContext();

function App() {
  const watchListData = useState([]);
  const comingSoonStateData = useState([]);
  const topRatedStateData = useState([]);
  const fanFavouriteStateData = useState([]);
  const inTheatreStateData = useState([]);

  const routeCategories = [
    {
      path: "fan-favourite",
      movieStateData: fanFavouriteStateData,
      fetchMovies: fetchFanFavourite,
    },
    {
      path: "in-theatres",
      movieStateData: inTheatreStateData,
      fetchMovies: fetchInTheatres,
    },
    {
      path: "coming-soon",
      movieStateData: comingSoonStateData,
      fetchMovies: fetchComingSoon,
    },
    {
      path: "top-rated",
      movieStateData: topRatedStateData,
      fetchMovies: fetchTopRated,
    },
  ];

  return (
    <WatchListContext.Provider value={watchListData}>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    fanFavouriteStateData={fanFavouriteStateData}
                    comingSoonStateData={comingSoonStateData}
                    inTheatreStateData={inTheatreStateData}
                    topRatedStateData={topRatedStateData}
                  />
                }
              />
              <Route path="movies">
                <Route path="watchlist" element={<WatchList />} />
                {routeCategories.map((movieParams, index) => (
                  <Route
                    key={index}
                    path={movieParams.path}
                    element={
                      <MoviesComponent
                        movieStateData={movieParams.movieStateData}
                        fetchMovies={movieParams.fetchMovies}
                      />
                    }
                  />
                ))}
                <Route path="details/:movieId" element={<MovieDetails />} />
              </Route>
              <Route path="/*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
    </WatchListContext.Provider>
  );
}

export default App;
