import React, { useContext } from "react";
import { WatchListContext } from "../Home";

export const MovieCard = ({ movie, index, path }) => {
  const indexString = index ? `${index}. ` : "";
  const [watchListData, setWatchListData] = useContext(WatchListContext);

  const handleAddToWatchList = () => {
    const movieData = watchListData.filter((data) => data.id === movie.id);
    if (movieData.length === 0) {
      setWatchListData([...watchListData, movie]);
    }
  };

  return (
    <div className="movieCard" key={movie.id}>
      <div style={moviePosterDiv}>
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt={movie.poster_path}
          className="moviePoster"
        />
        <div style={moviePostInnerDiv}>
          <p>⭐ {movie.vote_average.toFixed(1)}</p>
          <p style={{ fontSize: "14px", cursor: "pointer", width: "180px" }}>
            {indexString}
            {movie.title}
          </p>
        </div>
      </div>
      {path !== "watchlist" && (
        <div style={watchBtnDiv} onClick={handleAddToWatchList}>
          <p className="watchBtn">➕ Watchlist</p>
        </div>
      )}
      {path === "watchlist" && (
        <div style={watchBtnDiv}>
          <p className="watchBtn">✔️ Watch now</p>
        </div>
      )}
    </div>
  );
};

const moviePosterDiv = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "10px",
};

const moviePostInnerDiv = {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  padding: "0px 10px",
};

const watchBtnDiv = { display: "flex", justifyContent: "center" };
