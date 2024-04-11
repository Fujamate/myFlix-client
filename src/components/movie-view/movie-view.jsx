import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./movie-view.css";

export const MovieView = ({ movies }) => {
  const { Title } = useParams();
  const movie = movies.find((m) => m.Title === decodeURIComponent(Title));

  return (
    <Card>
      <Card.Img src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>Title: {movie.Title}</Card.Title>
        <Card.Text>Description: {movie.Description}</Card.Text>
        <Card.Text>Director: {movie.Director.Name}</Card.Text>
        <Link to={`/`}>
          <Button className="back-button">Back</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

//PropType conditions
MovieView.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
