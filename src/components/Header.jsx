import React from "react";
import { BsBookmarkPlus } from "react-icons/bs";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header style={header}>
      <section style={innerSection}>
        <section style={flexCenter}>
          <Link to="/" style={appName}>
            FlixO
          </Link>
        </section>
        <section style={{ ...flexCenter, gap: "15px" }}>
          <input type="text" style={searchInput} placeholder="Search FlixO" />
          <Link to="/movies/watchList" style={LinkStyle}>
            <div style={watchListDiv}>
              <BsBookmarkPlus style={watchListIcon} />
              <span style={{ fontWeight: 700 }}>WatchList</span>
            </div>
          </Link>
        </section>
      </section>
    </header>
  );
};

const header = {
  height: "55px",
  backgroundColor: "rgb(18, 18, 18)",
  display: "flex",
  justifyContent: "center",
};

const searchInput = {
  width: "40vw",
  height: "29px",
  borderRadius: "5px",
  outlineColor: "#FFE42B",
  fontFamily: "Poppins",
  fontSize: "15px",
  padding: "0px 10px",
};

const LinkStyle = { textDecoration: "none", color: "white" };

const watchListIcon = { fontSize: "20px" };

const watchListDiv = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "2px",
  fontSize: "16px",
  cursor: "pointer",
};

const innerSection = {
  display: "flex",
  width: "90%",
  justifyContent: "space-between",
};

const flexCenter = {
  display: "flex",
  alignItems: "center",
};

const appName = {
  fontSize: "23px",
  backgroundColor: "#DFC206",
  color: "black",
  borderRadius: "5px",
  padding: "0px 5px",
  fontWeight: "900",
  cursor: "pointer",
  textDecoration: "none",
};
