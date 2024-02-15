import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails, fetchMovieImage } from "../api/endpoints";
import { LazyLoadImage } from "react-lazy-load-image-component";

const MovieDetails = () => {
  const params = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.movieId) {
      setLoading(true);
      fetchMovieDetails(params.movieId)
        .then((res) => setDetails(res))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [params.movieId]);

  return (
    <div>
      {!loading && (
        <section style={{ margin: "20px 30px" }}>
          <LazyLoadImage
            src={`https://image.tmdb.org/t/p/original/${details?.backdrop_path}`}
            alt="load img"
            style={{ width: "100%" }}
            effect="blur"
            placeholderSrc={`https://image.tmdb.org/t/p/original/${details?.backdrop_path}`}
          />
          <section>
            <section style={{ margin: "20px 0px 30px 0px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <strong style={{ fontSize: "30px" }}>{details?.title}</strong>
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                  }}
                >
                  <p>
                    ⭐ <strong style={{ color: "CadetBlue" }}>Rating:</strong>{" "}
                    {details?.vote_average?.toFixed(1)}
                  </p>
                  <p>
                    <strong style={{ color: "CadetBlue" }}>Vote Count:</strong>{" "}
                    {details?.vote_count}
                  </p>
                </div>
              </div>
              <p>{details?.tagline}</p>
            </section>
            <section
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <p style={{ fontSize: "20px" }}>{details?.overview}</p>
              <span>
                <strong style={{ color: "CadetBlue" }}>Genres: </strong>
                {details?.genres?.map((genre, index) => (
                  <span key={index}>
                    {genre.name}{" "}
                    {index + 1 !== details?.genres?.length ? " | " : ""}
                  </span>
                ))}
              </span>
              <div style={{ display: "flex", gap: "10px" }}>
                <span>
                  <strong style={{ color: "CadetBlue" }}>Status:</strong>{" "}
                  {details?.status}
                </span>
                {details?.status === "Released" && (
                  <span>
                    <strong style={{ color: "CadetBlue" }}>
                      Release Date:
                    </strong>{" "}
                    {details?.release_date}
                  </span>
                )}
              </div>
            </section>
          </section>
        </section>
      )}
      {loading && (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "250px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
