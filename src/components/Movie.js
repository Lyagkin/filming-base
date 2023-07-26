export default function Movie({ Title: title, Poster: poster, Type: type, Year: year }) {
  return (
    <>
      <div className="card">
        <div className="card-image">
          <img src={poster} alt={title} />
        </div>
        <div className="card-content">
          <span className="card-title">{title}</span>
          <p>
            <span>Type: {type}</span>
            <span className="right">Year: {year}</span>
          </p>
        </div>
      </div>
    </>
  );
}
