import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Expendables 3",
      image:
        "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ruW3malZtlg66ODfg614dFbXO68.jpg",
      description: "Barney, Christmas and the rest of the team comes face-to-face with Conrad Stonebanks, who years ago co-founded The Expendables with Barney. Stonebanks subsequently became a ruthless arms trader and someone who Barney was forced to kill… or so he thought. "
    },
    {
      id: 2,
      title: "Oppenheimer",
      image:
        "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
      description: "The story of J. Robert Oppenheimer’s role in the development of the atomic bomb during World War II."
    },
    {
      id: 3,
      title: "Oldboy",
      image:
        "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/pWDtjs568ZfOTMbURQBYuT4Qxka.jpg",
      description: "With no clue how he came to be imprisoned, drugged and tortured for 15 years, a desperate businessman seeks revenge on his captors."
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  


  return (
    <div>
      {movies.map((movie) => (
          <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};