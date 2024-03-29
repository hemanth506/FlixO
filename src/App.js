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
import { Alert } from "@mui/material";

const WatchList = lazy(() => import("./components/WatchList"));
const MoviesComponent = lazy(() => import("./pages/MoviesComponent"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));

export const WatchListContext = createContext();
export const WatchListAlertContext = createContext();

function App() {
  const watchListArr = JSON.parse(localStorage.getItem("watchListData")) || [];
  const watchListData = useState(watchListArr);
  const comingSoonStateData = useState([]);
  const topRatedStateData = useState([]);
  const fanFavouriteStateData = useState([]);
  const inTheatreStateData = useState([]);
  const [addWatchListAlert, setAddWatchListAlert] = useState(false);

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
      <WatchListAlertContext.Provider value={setAddWatchListAlert}>
        <div className="App">
          <Header />
          {addWatchListAlert && (
            <div className="alertMessageDiv">
              <Alert className="alertMessage">Added to Watch List!</Alert>
            </div>
          )}
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
        </div>
      </WatchListAlertContext.Provider>
    </WatchListContext.Provider>
  );
}

export default App;
