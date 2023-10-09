import React, { useState } from "react";
import PropTypes from "prop-types";
import "./movie-card.css";
import { Card, Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
></link>;

export const MovieCard = ({ movie, user, token, setUser }) => {
  console.log(user);
  const [isFavorite, setIsFavorite] = useState(
    user && user.FavoriteMovies.includes(movie._id)
  );

  console.log("Current Favourites status:", isFavorite);

  const toggleFavorite = () => {
    const isCurrentlyFavorite = user && user.FavoriteMovies.includes(movie._id);
    console.log("Current Favourites status:", isCurrentlyFavorite);

    if (isCurrentlyFavorite) {
      // Deleting Fav movies
      fetch(
        `https://myflixx-by-kevin-holscher.onrender.com/users/${user.Username}/movies/${movie._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            // update
            const updatedFavorites = user.FavoriteMovies.filter(
              (movieId) => movieId !== movie._id
            );
            setUser({ ...user, FavoriteMovies: updatedFavorites });
            setIsFavorite(false); // update usestate
            console.log("new Favourites status:", !isCurrentlyFavorite);
          }
        })
        .catch((error) => {
          console.error(
            "Error when removing the film from the favourites:",
            error
          );
          alert("Something went wrong.");
        });
    } else {
      // adding fav movies
      fetch(
        `https://myflixx-by-kevin-holscher.onrender.com/users/${user.Username}/movies/${movie._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            const updatedFavorites = [...user.FavoriteMovies, movie._id];
            setUser({ ...user, FavoriteMovies: updatedFavorites });
            setIsFavorite(true);
          }
        })
        .catch((error) => {
          console.error("Error when adding the film to the favourites:", error);
          alert("Something went wrong.");
        });
    }
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Link to={`/movies/${encodeURIComponent(movie.Title)}`}>
              <Button variant="link">Open</Button>
            </Link>
            {isFavorite ? (
              <Button variant="danger" onClick={toggleFavorite}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-heart-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                  />
                </svg>
              </Button>
            ) : (
              <Button variant="outline-danger" onClick={toggleFavorite}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-heart"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                  />
                </svg>
              </Button>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

//PropTypes conditions
MovieCard.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
  }).isRequired,
};
