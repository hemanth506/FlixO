import React from "react";
import { Link } from "react-router-dom";
import { MovieCard } from "./MovieCard";

export const MovieContainers = ({ title, path, dataArr }) => {
  if(path === "trending") {
    dataArr = dataArr.filter((value, index) => index < 10);
    console.log("🚀 ~ file: MovieContainer.jsx:10 ~ MovieContainers ~ dataArr:", dataArr)
  } else {
    dataArr = dataArr.filter((value, index) => index < 15);
  }
  return (
    <section>
      <Link to={`/movies/${path}`} className="Link">
        <section className="section-title">
          <span className="bar" />
          <span className="title">{title}</span>
          <span className="loadMore">{">"}</span>
        </section>
      </Link>
      <div className="movieContainer">
        {dataArr.map((movie, index) => {
          return <MovieCard movie={movie} index={path === "trending" ? index+1 : null} />;
        })}
      </div>
    </section>
  );
};
