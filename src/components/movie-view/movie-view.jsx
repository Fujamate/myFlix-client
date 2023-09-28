import PropTypes from "prop-types";
import "./movie-view.css";
import { Card, Button } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Card>
      <Card.Img src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>Title: {movie.Title}</Card.Title>
        <Card.Text>Description: {movie.Description}</Card.Text>
        <Card.Text>Director: {movie.Director.Name}</Card.Text>
        <Button onClick={onBackClick}>Back</Button>
      </Card.Body>
    </Card>
    /* <div>
      <div>
        <img src={movie.ImagePath} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Genre:</span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>Director:</span>
        <span>{movie.Director.Name}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div> */
  );
};

//PropType conditions
MovieView.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
