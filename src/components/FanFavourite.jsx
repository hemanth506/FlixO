import React, { useEffect, useState } from "react";
import { fetchFanFavourite } from "../api/endpoints";
import { MovieCard } from "./sub-components/MovieCard";
import { MovieCardDetail } from "./sub-components/MovieCardDetail";

const FanFavourite = () => {
  const [page, setpage] = useState(1);
  const [favData, setFavData] = useState([]);
  console.log("🚀 ~ file: FanFavourite.jsx:5 ~ FanFavourite ~ page:", page);

  useEffect(() => {
    const handleBackButton = () => {
      setpage(1);
      console.log("back arrow pressed");
    };

    fetchFanFavourite(page)
      .then((data) => {
        setFavData([...data]);
      })
      .catch((err) => console.log(err));
    window.addEventListener("popstate", handleBackButton);
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
        gap: "16px",
        padding: "30px 50px",
      }}
    >
      {favData.map((movie) => {
        // console.log(movie);
        return (
          // <div key={movie.id}>{movie.title}</div>
          <MovieCardDetail key={movie.id} movie={movie} />
        );
      })}
    </div>
  );
};

export default FanFavourite;
