import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';
const BASE_URL = 'https://api.themoviedb.org/3/movie';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetail = async () => {
            setLoading(true);
            setError(null);

            const apiUrl = `${BASE_URL}/${id}?api_key=${API_KEY}&language=en-US`;

            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('Network response was not ok');

                const result = await response.json();
                setMovie(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetail();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="movie-detail">
            {movie && (
                <>
                    <h1>{movie.title}</h1>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <p>{movie.overview}</p>
                    <p>Rating: {movie.vote_average}</p>
                    <p>Release Date: {movie.release_date}</p>
                </>
            )}
        </div>
    );
};

export default MovieDetail;
