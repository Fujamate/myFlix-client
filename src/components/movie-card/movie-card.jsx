import PropTypes from "prop-types";
import "./movie-card.css";
import { Card, Col, Row } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Row>
      <Col
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        <Card>
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
          </Card.Body>
        </Card>
        {/* <img src={movie.ImagePath} />
      {movie.Title}  */}
      </Col>
    </Row>
  );
};

//PropTypes conditions
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
