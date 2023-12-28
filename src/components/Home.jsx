import React, { useEffect, useState } from "react";
import { MovieContainers } from "./sub-components/MovieContainer";
import {
  fetchComingSoon,
  fetchFanFavourite,
  fetchInTheatres,
  fetchTopRated,
  fetchTrending,
} from "../api/endpoints";

export const Home = () => {
  const [comingSoonData, setComingSoonData] = useState([]);
  const [topRatedData, setTopRatedData] = useState([]);
  const [fanFavouriteData, setFanFavouriteData] = useState([]);
  const [inTheatresData, setInTheatresData] = useState([]);
  const [trendingData, setTrendingData] = useState([]);
  const [watchListData, setWatchListData] = useState([]);

  const initialLoadFunctions = [
    { function: fetchComingSoon, dynamicSetState: setComingSoonData },
    { function: fetchTopRated, dynamicSetState: setTopRatedData },
    { function: fetchFanFavourite, dynamicSetState: setFanFavouriteData },
    { function: fetchInTheatres, dynamicSetState: setInTheatresData },
    { function: fetchTrending, dynamicSetState: setTrendingData },
  ];

  useEffect(() => {
    initialLoadFunctions.forEach((loadParams) => {
      loadParams
        .function()
        .then((data) => {
          // console.log(data);
          loadParams.dynamicSetState([...data]);
        })
        .catch((err) => console.log(err));
    });
  }, []);

  return (
    <main
      style={{
        padding: "3% 4%",
        display: "flex",
        flexDirection: "column",
        gap: "28px",
      }}
    >
      <MovieContainers
        title="Top 10 of this week"
        path="trending"
        dataArr={trendingData}
      />

      <MovieContainers
        title="From your watchList"
        path="watchlist"
        dataArr={watchListData}
      />
      <MovieContainers
        title="Fan Favourites"
        path="fan-favourite"
        dataArr={fanFavouriteData}
      />
      <MovieContainers
        title="Top Rated"
        path="top-rated"
        dataArr={topRatedData}
      />
      <MovieContainers
        title="In Theatres"
        path="in-theatres"
        dataArr={inTheatresData}
      />
      <MovieContainers
        title="Coming soon to theatres"
        path="coming-soon"
        dataArr={comingSoonData}
      />
    </main>
  );
};
