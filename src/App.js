import "./App.css";
import React, { Suspense, lazy, useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Loading } from "./components/Loading";
import { PageNotFound } from "./components/PageNotFound";

const WatchList = lazy(() => import("./components/WatchList"));
const FanFavourite = lazy(() => import("./components/FanFavourite"));
const InTheatres = lazy(() => import("./components/InTheatres"));
const ComingSoon = lazy(() => import("./components/ComingSoon"));
const MovieDetails = lazy(() => import("./components/MovieDetails"));
const TopRated = lazy(() => import("./components/TopRated"));

export const WatchListContext = createContext();

function App() {
  const watchListData = useState([]);

  return (
    <WatchListContext.Provider value={watchListData}>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="movies">
                <Route path="watchlist" element={<WatchList />} />
                <Route path="fan-favourite" element={<FanFavourite />} />
                <Route path="in-theatres" element={<InTheatres />} />
                <Route path="coming-soon" element={<ComingSoon />} />
                <Route path="top-rated" element={<TopRated />} />
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
