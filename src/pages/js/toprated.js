import React from 'react';
import '../css/popular.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';
const BASE_URL = 'https://api.themoviedb.org/3/movie';

const Toprated = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        setLoading(true);
        setError(null);

        let apiUrl = `${BASE_URL}/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
        
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Network response was not ok');

            const result = await response.json();
            setData(result.results);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="grid-container">
        {data && data.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
          <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="movie-image"
          />
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-rating">Rating: {movie.vote_average}</p>
        </Link>
        ))}
      </div>
    );
};

export default Toprated;
