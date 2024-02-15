import React, { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
const MovieCard = lazy(() => import("./MovieCard"));

const MovieContainers = ({ title, path, dataArr, loadingState }) => {
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
              <Suspense key={movie.id}>
                <MovieCard
                  movie={movie}
                  index={path === "trending" ? index + 1 : null}
                  path={path}
                />
              </Suspense>
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

export default MovieContainers;
