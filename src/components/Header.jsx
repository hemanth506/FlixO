import React, { useEffect, useState } from "react";
import { BsBookmarkPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
import { fetchSearchResults } from "../api/endpoints";

export const Header = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchSearchResults(1, searchText)
        .then((data) => {
          setSearchResults([...data]);
        })
        .catch((err) => console.log(err));
    }, 2 * 1000);

    return () => {
      window.clearTimeout(timeOut);
    };
  }, [searchText]);

  const clearSearchField = () => setSearchText("");

  return (
    <header style={header}>
      <section style={innerSection}>
        <section style={flexCenter}>
          <Link to="/" style={appName} onClick={clearSearchField}>
            FlixO
          </Link>
        </section>
        <section style={{ ...flexCenter, gap: "15px" }}>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              style={searchInput}
              placeholder="Search FlixO"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {searchText && (
              <div
                style={{
                  position: "absolute",
                  backgroundColor: "rgba(0,0,0,0.9)",
                  width: "40.2vw",
                  display: "flex",
                  gap: "4px",
                  flexDirection: "column",
                  padding: "10px",
                  borderBottomLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                }}
              >
                {searchResults.map((movie, index) => (
                  <Link
                    to={`/movies/details/${movie.id}`}
                    style={LinkStyle}
                    onClick={clearSearchField}
                    key={index}
                  >
                    <span className="searchResults">{movie.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            to="/movies/watchList"
            style={LinkStyle}
            onClick={clearSearchField}
          >
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
