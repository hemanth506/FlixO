import React, { useContext } from "react";
import { WatchListContext } from "../App";
import { MovieCardDetail } from "./sub-components/MovieCardDetail";
import { Grid } from "@mui/material";

const WatchList = () => {
  const [watchListData] = useContext(WatchListContext);
  return (
    <div style={divStyle}>
      {watchListData.map((movie, index) => {
        return (
          <Grid key={index}>
            <MovieCardDetail movie={movie} neglectForWatchList="watchList" />
          </Grid>
        );
      })}
    </div>
  );
};

export default WatchList;

const divStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
  gap: "16px",
  padding: "30px 50px",
};
