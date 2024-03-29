import React, { useCallback, useContext, useEffect } from "react";
import { WatchListContext, WatchListAlertContext } from "../../App";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const MovieCard = ({ movie, index, path }) => {
  const indexString = index ? `${index}. ` : "";
  const [watchListData, setWatchListData] = useContext(WatchListContext);
  const setWatchListAlert = useContext(WatchListAlertContext);

  const handleAddToWatchList = useCallback(() => {
    const movieData = watchListData.filter((data) => data.id === movie.id);
    if (movieData.length === 0) {
      setWatchListData([...watchListData, movie]);
      setWatchListAlert(true);
      setTimeout(() => {
        setWatchListAlert(false);
      }, 2 * 1000);
    }
  }, [movie, watchListData, setWatchListAlert, setWatchListData]);

  useEffect(() => {
    localStorage.setItem("watchListData", JSON.stringify(watchListData));
  }, [watchListData]);

  return (
    <div className="movieCard">
      <div style={moviePosterDiv}>
        <Link to={`/movies/details/${movie.id}`}>
          <LazyLoadImage
            key={movie.poster_path}
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.poster_path}
            className="moviePoster"
            effect="blur"
            placeholderSrc={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          />
        </Link>
        <div style={moviePostInnerDiv}>
          <p>⭐ {movie.vote_average.toFixed(1)}</p>
          <p style={{ fontSize: "14px", cursor: "pointer", width: "180px" }}>
            <Link className="Link" to={`/movies/details/${movie.id}`}>
              {indexString}
              {movie.title}
            </Link>
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


export default MovieCard;
