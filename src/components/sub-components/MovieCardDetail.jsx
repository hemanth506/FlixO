import React, { useContext, useEffect } from "react";
import { WatchListContext } from "../../App";
import { Link } from "react-router-dom";

export const MovieCardDetail = ({ movie, neglectForWatchList }) => {
  const [watchListData, setWatchListData] = useContext(WatchListContext);

  const handleAddToWatchList = () => {
    const movieData = watchListData.filter((data) => data.id === movie.id);
    if (movieData.length === 0) {
      setWatchListData([...watchListData, movie]);
    }
  };

  useEffect(() => {
    localStorage.setItem("watchListData", JSON.stringify(watchListData));
  }, [watchListData]);

  return (
    <div className="movieCard">
      <div style={moviePosterDiv}>
        <Link to={`/movies/details/${movie.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.poster_path}
            style={{ width: "100%" }}
          />
        </Link>
        <div style={moviePostInnerDiv}>
          <p>⭐ {movie.vote_average.toFixed(1)}</p>
          <Link className="Link" to={`/movies/details/${movie.id}`}>
            <p style={{ fontSize: "14px", cursor: "pointer" }}>{movie.title}</p>
          </Link>
        </div>
      </div>
      <div style={watchBtnDiv}>
        {neglectForWatchList && neglectForWatchList === "watchList" && (
          <p className="watchBtn">✔️ Watch Now</p>
        )}

        {!neglectForWatchList && (
          <p className="watchBtn" onClick={handleAddToWatchList}>
            ➕ Watchlist
          </p>
        )}
      </div>
      <p>{movie.video && "Video available"}</p>
    </div>
  );
};

const moviePosterDiv = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  height: "440px",
};

const moviePostInnerDiv = {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  padding: "0px 10px",
};

const watchBtnDiv = { display: "flex", justifyContent: "center" };
