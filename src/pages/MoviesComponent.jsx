import React, { useEffect, useState, useRef } from "react";
import { MovieCardDetail } from "../components/sub-components/MovieCardDetail";
import { Grid } from "@mui/material";

const MoviesComponent = ({ movieStateData, fetchMovies }) => {
  const [page, setpage] = useState(1);
  const [moviesData, setMoviesData] = movieStateData;
  const loadRef = useRef(null);
  console.log("MoviesComponent.jsx:5 ~ page:", page);

  useEffect(() => {
    fetchMovies(page)
      .then((data) => {
        if (page === 1) {
          setMoviesData([...data]);
        } else {
          setMoviesData((prevData) => [...prevData, ...data]);
        }
      })
      .catch((err) => console.log(err));
  }, [page, fetchMovies, setMoviesData]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        console.log("It is matching!!");
        setpage((prevPage) => prevPage + 1);
      }
    });

    const currentRef = loadRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.disconnect();
      }
    };
  }, [moviesData]);

  return (
    <div style={divStyle}>
      {moviesData.map((movie, index) => {
        return (
          <Grid
            ref={index + 1 === moviesData?.length ? loadRef : undefined}
            key={index}
          >
            <MovieCardDetail movie={movie} />
          </Grid>
        );
      })}
    </div>
  );
};

export default MoviesComponent;

const divStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
  gap: "16px",
  padding: "30px 50px",
};
