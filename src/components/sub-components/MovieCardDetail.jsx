import React from "react";

export const MovieCardDetail = ({ movie, neglectForWatchList }) => {
  return (
    <div className="movieCard">
      <div style={moviePosterDiv}>
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt={movie.poster_path}
        />
        <div style={moviePostInnerDiv}>
          <p>⭐ {movie.vote_average.toFixed(1)}</p>
          <p style={{ fontSize: "14px", cursor: "pointer" }}>{movie.title}</p>
        </div>
      </div>
      <div style={watchBtnDiv}>
        {neglectForWatchList && neglectForWatchList === "watchList" && (
          <p className="watchBtn">✔️ Watch Now</p>
        )}

        {!neglectForWatchList && <p className="watchBtn">➕ Watchlist</p>}
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
