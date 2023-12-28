import React from "react";

export const MovieCard = ({ movie, index }) => {
  console.log(movie);

  const indexString = index ? `${index}. ` : "";

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
          <p style={{ fontSize: "clamp(9px, 2vw, 14px)", cursor: "pointer" }}>
            {indexString}
            {movie.title}
          </p>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p className="watchBtn">➕ Watchlist</p>
      </div>
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
