import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/popular.css';

const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';
const BASE_URL = 'https://api.themoviedb.org/3/movie';

const Popular = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const fetchData = async (page) => {
        setLoading(true);
        setError(null);

        let apiUrl = `${BASE_URL}/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
        
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Network response was not ok');

            const result = await response.json();
            setData(result.results);
            setTotalPages(result.total_pages); // Set total pages from response
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <div className="grid-container">
                {data.map((movie) => (
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
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Popular;
