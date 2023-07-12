import './Carrusel.css';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MainCarrusel() {

  // Constantes de la API
  const API_URL = 'https://api.themoviedb.org/3';
  const API_KEY = '49149d975d5c0df0a79802f0a64ad893';
  const URL_IMAGE = 'https://image.tmdb.org/t/p/original';

  // Declaracion de las variables de estado
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [movie, setMovie] = useState({ title: 'Loading Movies' });

  // Petición a la API para obtener la lista de géneros
  const fetchGenres = async () => {
    const response = await axios.get(`${API_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
      },
    });
    const genresMap = response.data.genres.reduce((acc, genre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {});
    setGenres(genresMap);
  };

  // Petición a la API para obtener las películas próximas
  const fetchMovies = async () => {
    const {
      data: { results },
    } = await axios.get(`${API_URL}/movie/upcoming`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        page: 1,
      },
    });

    setMovies(results);
    setMovie(results[0]);
  };

  useEffect(() => {
    fetchGenres();
    fetchMovies();
  }, []);

  const renderGenres = (genreIds) => {
    return genreIds
      .map((genreId) => genres[genreId])
      .filter((genre) => genre) // Filtrar los géneros que existen en la lista de géneros
      .join(', ');
  };

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 !== 0;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i className="bi bi-star-fill" key={`full-star-${i}`} style={{ fontSize:'2.5vw',color: 'yellow', marginRight: '5px' }}></i>);
    }

    if (hasHalfStar) {
      stars.push(<i className="bi bi-star-half" key="half-star" style={{ fontSize:'2.5vw', color: 'yellow', marginRight: '5px' }}></i>);
    }

    return stars;
  };

  const renderSlides = () => {
    return movies.map((movie) => (
      <Carousel.Item key={movie.id}>
        <Link to={`/detalle/${movie.id}`}>
          <img src={`${URL_IMAGE}${movie.poster_path}`} alt="Poster" style={{ opacity: '0.2', height: '75vw' }} />
          <Carousel.Caption className="caption text-white">
            {renderRatingStars(movie.vote_average)}
            <h3>
              <b>{movie.title}</b>
            </h3>
            <p>
              <b>{movie.release_date}</b>
            </p>
            <p>
              <b>Generos: {renderGenres(movie.genre_ids)}</b>
            </p>
            <p>{movie.overview}</p>
          </Carousel.Caption>
        </Link>
      </Carousel.Item>
    ));
  };

  return (
    <Carousel
      indicators={false}
      prevIcon={
        <span
          className="bi bi-caret-left-fill carousel-control-prev"
          style={{
            color: 'white',
            background: 'none',
            border: 'none',
            fontSize: '4vw',
          }}
        />
      }
      nextIcon={
        <span
          className="bi bi-caret-right-fill carousel-control-next"
          style={{
            color: 'white',
            background: 'none',
            border: 'none',
            fontSize: '4vw',
          }}
        />
      }
    >
      {renderSlides()}
    </Carousel>
  );
}

export default MainCarrusel;