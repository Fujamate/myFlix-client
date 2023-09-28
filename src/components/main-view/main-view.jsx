import { useState, useEffect } from "react";

import "./main-view.css";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Button, Row, Col } from "react-bootstrap";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user")) || null;
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://myflixx-by-kevin-holscher.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Movies from API: ", data);
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie.id,
            Title: movie.Title,
            ImagePath: movie.ImagePath,
            Description: movie.Description,
            Genre: {
              Name: movie.Genre.Name,
            },
            Director: {
              Name: movie.Director.Name,
            },
            Featured: movie.Featured,
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  if (!user) {
    return (
      <Row className="justify-content-md-center">
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          or
          <SignupView />
        </Col>
      </Row>
    );
  }

  if (selectedMovie) {
    return (
      <Row className="justify-content-md-center">
        <Col md={8}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      </Row>
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      <Row sm={1} md={2} lg={3} xl={4}>
        {movies.map((movie) => (
          <Col key={movie.Title}>
            <MovieCard
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
        ))}
      </Row>
      <Button
        className="mt-2"
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </Button>
    </div>
  );
};
