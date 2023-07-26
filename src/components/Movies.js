import Movie from "./Movie";

export default function Movies({ films }) {
  const renderMovie = films.map((film) => {
    return <Movie key={film.imdbID} {...film} />;
  });

  return <>{renderMovie}</>;
}
