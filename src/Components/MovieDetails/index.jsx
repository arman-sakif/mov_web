import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState("");
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`https://omdbapi.com/?apikey=7b85d604&i=${id}`, { signal })
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
      });

    return () => {
      controller.abort();
    };
  }, [id]);

  const handlePredictRating = () => {
    setLoading(true);
    setRating(null); // Clear previous rating during delay

    setTimeout(() => {
      const randomRating = Math.random() < 0.5 ? "Mid" : "High";
      setRating(randomRating);
      setLoading(false);
    }, 2000);
  };

  return (
    <header className="page-header movie-details-header">
      <div className="container">
        {movie.Title ? (
          <div className="movie-details">
            <div className="movie-poster">
              <img src={movie.Poster} alt={movie.Title} />
            </div>
            <div className="details-content">
              {movie.Director && (
                <h5 className="director">{movie.Director.split(",")[0]}</h5>
              )}
              <h2 className="title">{movie.Title}</h2>
              <div className="banner-meta">
                <ul>
                  <li className="vid">
                    <span className="type">{movie.Type}</span>
                    <span className="quality">HD</span>
                  </li>
                  <li className="category">
                    <span>{movie.Genre?.split(",").slice(0, 2).join(", ")}</span>
                  </li>
                  <li className="time">
                    <span>
                      <i className="ri-calendar-2-line"></i> {movie.Year}
                    </span>
                    <span>
                      <i className="ri-time-line"></i> {movie.Runtime}
                    </span>
                  </li>
                </ul>
              </div>
              <p className="desc">{movie.Plot}</p>

              {/* Predict Rating Button */}
              <button
                className="btn watch-btn"
                onClick={handlePredictRating}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i className="ri-loader-4-line spin-icon"></i> Predicting...
                  </>
                ) : (
                  "Show Predicted Rating"
                )}
              </button>

              {/* Display Predicted Rating with Styling */}
              {rating && (
                <div
                  style={{
                    marginTop: "15px",
                    padding: "10px",
                    backgroundColor: "#222",
                    color: "#fff",
                    fontSize: "18px",
                    fontWeight: "bold",
                    textAlign: "center",
                    borderRadius: "8px",
                    display: "inline-block",
                  }}
                >
                  Predicted Rating: {rating}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default MovieDetails;
