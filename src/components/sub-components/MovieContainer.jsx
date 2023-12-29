import React from "react";
import { Link } from "react-router-dom";
import { MovieCard } from "./MovieCard";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";

export const MovieContainers = ({ title, path, dataArr, loadingState }) => {
  if (path === "trending" || path === "watchlist") {
    dataArr = dataArr.filter((value, index) => index < 10);
  } else {
    dataArr = dataArr.filter((value, index) => index < 15);
  }

  return (
    <section>
      {path !== "trending" && (
        <Link to={`/movies/${path}`} className="Link">
          <section className="section-title">
            <span className="bar" />
            <span className="title">{title}</span>
            <span className="loadMore">{">"}</span>
          </section>
        </Link>
      )}
      {path === "trending" && (
        <section className="Link">
          <section className="section-title-withoutLink">
            <span className="bar" />
            <span className="title">{title}</span>
          </section>
        </section>
      )}

      <div className="movieContainer">
        {!loadingState &&
          dataArr.map((movie, index) => {
            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                index={path === "trending" ? index + 1 : null}
                path={path}
              />
            );
          })}
        {loadingState && (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "250px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </div>
    </section>
  );
};
