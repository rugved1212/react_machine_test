import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/movie_detail.css';

const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';
const BASE_URL = 'https://api.themoviedb.org/3/movie';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const movieResponse = await fetch(`${BASE_URL}/${id}?api_key=${API_KEY}&language=en-US`);
        const movieData = await movieResponse.json();
        const castResponse = await fetch(`${BASE_URL}/${id}/credits?api_key=${API_KEY}`);
        const castData = await castResponse.json();

        setMovie(movieData);
        setCast(castData.cast.slice(0, 10));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="movie-detail">
      {movie && (
        <>
          <div className="movie-header">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <div className="movie-info">
              <h1>{movie.title}</h1>
              <p className="rating">Rating: {movie.vote_average}</p>
              <p className="details">
                {movie.runtime} min | {movie.genres.map(genre => genre.name).join(', ')}
              </p>
              <p className="release-date">Release Date: {movie.release_date}</p>
              <p className="overview">{movie.overview}</p>
            </div>
          </div>

          <h2>Cast</h2>
          <div className="cast-list">
            {cast.map((member) => (
              <div key={member.cast_id} className="cast-member">
                <img
                  src={
                    member.profile_path
                      ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                      : 'https://via.placeholder.com/200'
                  }
                  alt={member.name}
                  className="cast-photo"
                />
                <p className="cast-name">{member.name}</p>
                <p className="cast-character">Character: {member.character}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MovieDetail;