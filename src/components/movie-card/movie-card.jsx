import PropTypes from "prop-types";
import "./movie-card.css";
import { Card, Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
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
