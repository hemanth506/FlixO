import React, { useEffect, useState, useContext, lazy, Suspense } from "react";
// import { MovieContainers } from "../components/sub-components/MovieContainer";

import {
  fetchComingSoon,
  fetchFanFavourite,
  fetchInTheatres,
  fetchTopRated,
  fetchTrending,
} from "../api/endpoints";
import { WatchListContext } from "../App";
import { Loading } from "../components/Loading";

const MovieContainers = lazy(() =>
  import("../components/sub-components/MovieContainer")
);

export const Home = ({
  fanFavouriteStateData,
  comingSoonStateData,
  inTheatreStateData,
  topRatedStateData,
}) => {
  const [comingSoonData, setComingSoonData] = comingSoonStateData;
  const [topRatedData, setTopRatedData] = topRatedStateData;
  const [fanFavouriteData, setFanFavouriteData] = fanFavouriteStateData;
  const [inTheatresData, setInTheatresData] = inTheatreStateData;
  const [trendingData, setTrendingData] = useState([]);
  const watchListData = useContext(WatchListContext);

  const [comingSoonLoading, setComingSoonLoading] = useState(true);
  const [topRatedLoading, setTopRatedLoading] = useState(true);
  const [fanFavouriteLoading, setFanFavouriteLoading] = useState(true);
  const [inTheatresLoading, setInTheatresLoading] = useState(true);
  const [trendingLoading, setTrendingLoading] = useState(true);

  const initialLoadFunctions = [
    {
      function: fetchComingSoon,
      dynamicSetState: setComingSoonData,
      dynamicSetLoading: setComingSoonLoading,
    },
    {
      function: fetchTopRated,
      dynamicSetState: setTopRatedData,
      dynamicSetLoading: setTopRatedLoading,
    },
    {
      function: fetchFanFavourite,
      dynamicSetState: setFanFavouriteData,
      dynamicSetLoading: setFanFavouriteLoading,
    },
    {
      function: fetchInTheatres,
      dynamicSetState: setInTheatresData,
      dynamicSetLoading: setInTheatresLoading,
    },
    {
      function: fetchTrending,
      dynamicSetState: setTrendingData,
      dynamicSetLoading: setTrendingLoading,
    },
  ];

  useEffect(() => {
    initialLoadFunctions.forEach((loadParams) => {
      loadParams
        .function()
        .then((data) => {
          loadParams.dynamicSetState([...data]);
        })
        .catch((err) => console.log(err))
        .finally(() => loadParams.dynamicSetLoading(false));
    });
  }, []);

  return (
    <main style={mainStyle}>
      <Suspense fallback={<Loading />}>
        <MovieContainers
          title="Top 10 of this week"
          path="trending"
          dataArr={trendingData}
          loadingState={trendingLoading}
        />
        <MovieContainers
          title="From your watchList"
          path="watchlist"
          dataArr={watchListData[0]}
          loadingState={comingSoonLoading}
        />
        <MovieContainers
          title="Fan Favourites"
          path="fan-favourite"
          dataArr={fanFavouriteData}
          loadingState={fanFavouriteLoading}
        />
        <MovieContainers
          title="Top Rated"
          path="top-rated"
          dataArr={topRatedData}
          loadingState={topRatedLoading}
        />
        <MovieContainers
          title="In Theatres"
          path="in-theatres"
          dataArr={inTheatresData}
          loadingState={inTheatresLoading}
        />
        <MovieContainers
          title="Coming soon to theatres"
          path="coming-soon"
          dataArr={comingSoonData}
          loadingState={comingSoonLoading}
        />
      </Suspense>
    </main>
  );
};

const mainStyle = {
  padding: "3% 4%",
  display: "flex",
  flexDirection: "column",
  gap: "28px",
};
