import axios from "axios";

export const apiHeaders = {
  accept: "application/json",
  Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
}

const makeAPICall = (endpoint, page, searchText = "") => {
  let additionalQuery = "";
  if (page) {
    additionalQuery = `?page=${page}`;
  }
  if(searchText) {
    additionalQuery += `&query=${searchText}`;
  }
  const options = {
    method: "GET",
    url: `${process.env.REACT_APP_MOVIE_BASE_URL}/${endpoint}${additionalQuery}`,
    headers: apiHeaders
  };

  const response = axios
    .request(options)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      return err;
    });

  return response;
};



export const fetchComingSoon = async (page = 1) => {
  const data = await makeAPICall("movie/upcoming", page);
  return data.results;
};

export const fetchTrending = async (page = 1, period = "week") => {
  const data = await makeAPICall(`trending/movie/${period}`, page);
  return data.results;
};

export const fetchTopRated = async (page = 1, period = "week") => {
  const data = await makeAPICall(`movie/top_rated`, page);
  return data.results;
};

export const fetchFanFavourite = async (page = 1) => {
  const data = await makeAPICall("movie/popular", page);
  return data.results;
};

export const fetchInTheatres = async (page = 1) => {
  const data = await makeAPICall("movie/now_playing", page);
  return data.results;
};

export const fetchMovieDetails = async (movieId) => {
  return await makeAPICall(`movie/${movieId}`);
}

export const fetchSearchResults = async (page = 1, searchText) => {
  const data = await makeAPICall(`search/movie`, page, searchText);
  return data.results;
};

