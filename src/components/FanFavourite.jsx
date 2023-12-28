import React, { useEffect, useState, useRef } from "react";
import { fetchFanFavourite } from "../api/endpoints";
import { MovieCardDetail } from "./sub-components/MovieCardDetail";
import { Grid } from "@mui/material";

const FanFavourite = () => {
  const [page, setpage] = useState(1);
  const [favData, setFavData] = useState([]);
  const loadRef = useRef(null);
  console.log("🚀FanFavourite.jsx:5 ~ page:", page);

  useEffect(() => {
    fetchFanFavourite(page)
      .then((data) => {
        if (page === 1) {
          setFavData([...data]);
        } else {
          setFavData((prevData) => [...prevData, ...data]);
        }
      })
      .catch((err) => console.log(err));
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        console.log("It is matching!!");
        setpage((prevPage) => prevPage + 1);
      }
    });

    if (loadRef.current) {
      observer.observe(loadRef.current);
    }

    return () => {
      if (loadRef.current) {
        observer.disconnect();
      }
    };
  }, [favData]);

  return (
    <div style={divStyle}>
      {favData.map((movie, index) => {
        return (
          <Grid
            ref={index + 1 === favData?.length ? loadRef : undefined}
            key={index}
          >
            <MovieCardDetail movie={movie} />
          </Grid>
        );
      })}
    </div>
  );
};

export default FanFavourite;

const divStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
  gap: "16px",
  padding: "30px 50px",
};
