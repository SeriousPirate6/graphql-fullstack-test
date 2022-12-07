import React, { useState } from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client";

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      id
      name
      year
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      id
      name
      year
    }
  }
`;

function DisplayMovies() {
  const [movieSearched, setMovieSearched] = useState();

  const {
    data: dataMovies,
    loading: loadingMovies,
    error: errorMovies,
  } = useQuery(QUERY_ALL_MOVIES);

  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  if (loadingMovies) {
    return (
      <div className="text-center mt-4">
        <div className={"spinner-border"} role="status"></div>
      </div>
    );
  }

  if (dataMovies) {
    console.log(dataMovies);
  }

  if (errorMovies) {
    console.log(errorMovies);
  }

  if (movieError) {
    console.log(movieError);
  }

  return (
    <div className={"container"}>
      <div>
        <h1 className={"text-center mt-4"}>List of Movies</h1>
      </div>
      <div className={"py-4"}>
        <table className={"table border shadow"}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Year</th>
            </tr>
          </thead>
          <tbody>
            {dataMovies &&
              dataMovies.movies.map((movie, index) => {
                return (
                  <tr>
                    <th>{index + 1}</th>
                    <td>{movie.name}</td>
                    <td>{movie.year}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div>
        <h1 className={"text-center mt-4"}>Fetch a Movie</h1>
      </div>
      <div className={"input-group mb-3 mt-4"}>
        <input
          type="text"
          className={"form-control"}
          placeholder="Inception"
          onChange={(event) => {
            setMovieSearched(event.target.value);
          }}
        ></input>
        <div className={"input-group-append"}>
          <button
            className={"btn btn-info"}
            type="button"
            onClick={() => {
              fetchMovie({
                variables: {
                  name: movieSearched,
                },
              });
            }}
          >
            Fetch Movie
          </button>
        </div>
      </div>
      <div>
        {movieSearchedData && (
          <div>
            <h4 className={"text-center mt-4"}>
              Movie Name: {movieSearchedData.movie.name}
            </h4>
            <h4 className={"text-center mt-4"}>
              Movie Year: {movieSearchedData.movie.year}
            </h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default DisplayMovies;
