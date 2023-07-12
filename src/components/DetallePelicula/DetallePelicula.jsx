import './DetallePelicula.css';
import React, { useState, useEffect } from 'react';
import { Col, Row, Modal, Button } from 'react-bootstrap';
import rottenT from '../../img/rottenTomatoes.png';
import Metta from '../../img/Metacritic.png';
import imdb from '../../img/IMDB.png';
import Related from '../../components/Related/Related';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Reseña from '../Reseña/Reseña';

function DetallePelicula() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const API_URL = 'https://api.themoviedb.org/3';
  const API_KEY = '49149d975d5c0df0a79802f0a64ad893';
  const URL_IMAGE = 'https://image.tmdb.org/t/p/original';

  useEffect(() => {
    const fetchMovie = async () => {
      const { data } = await axios.get(`${API_URL}/movie/${id}`, {
        params: {
          api_key: API_KEY,
          append_to_response: 'videos',
        },
      });

      setMovie(data);

      if (data.videos && data.videos.results) {
        const trailer = data.videos.results.find((vid) => vid.name === 'Official Trailer');
        setTrailer(trailer ? trailer : data.videos.results[0]);
      }
    };

    fetchMovie();
  }, [id]);

  const handleShowTrailer = () => {
    setShowTrailer(true);
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };

  if (!movie) {
    return <h1>Loading...</h1>; // Mensaje de "Cargando" mientras se obtienen los datos de la película
  }

  return (
    <>
      {/* Div que contiene toda la descripcion basica de la pelicula */}
      <div className='DP-container d-flex' style={{background: `linear-gradient(rgba(5, 7, 12, 0.85), rgba(5, 7, 12, 0.85)), url(${URL_IMAGE}${movie.poster_path})`}}>
        {/* Fila "principal" que divide el div en 2 columnas */}
        <Row className='d-flex align-items-center justify-content-center' style={{ margin: '0px' }}>
          {/* Columna del poster de la pelicula */}
          <Col xs={10} sm={4} lg={4} className='DP-poster d-flex align-items-center justify-content-center'>
            <img
              id='DP-poster'
              src={`${URL_IMAGE}${movie.poster_path}`}
              alt='Poster Pelicula'
              onClick={handleShowTrailer}
            />
          </Col>

          {/* Columna con la informacion de la pelicula */}
          <Col xs={11} sm={8} lg={8} className='DP-informacion d-flex flex-column'>
            {/* Fila que contiene titulo, clasificacion, publicacion, genero principal y duracion */}
            <Row className='d-flex justify-content-left' style={{ margin: '0px' }}>
              <Col xs={12} sm={12} lg={12} className='DP-informacion d-flex flex-column text-center'>
                <h2 style={{ marginTop: '5px' }}>
                  <b>{movie.title}</b> ({movie.release_date.slice(0, 4)})
                </h2>
                <p>
                  {movie.vote_average} - {movie.release_date} - {movie.runtime} min
                </p>
              </Col>
            </Row>

            {/* Fila que contiene las calificaciones segun RottenTomatoes, IMDB y Metacritics */}
            <Row className='d-flex ' style={{ margin: '0px' }}>
              <Col xs={4} sm={3.5} lg={3.5} className='DP-informacion d-flex flex-column text-center'>
                <img src={rottenT} style={{ width: '60px', alignSelf: 'center' }} alt='RottenTomatoes Icon' />
                <p>
                  Puntuacion de Rotten Tomatoes: <b>{movie.vote_average}%</b>
                </p>
              </Col>

              <Col xs={4} sm={3.5} lg={3.5} className='DP-informacion d-flex flex-column text-center'>
                <img src={Metta} style={{ width: '60px', alignSelf: 'center' }} alt='Mettacritics Icon' />
                <p>
                  Puntuacion de MetaCritics: <b>{movie.vote_average}%</b>
                </p>
              </Col>

              <Col xs={4} sm={3} lg={3} className='DP-informacion d-flex flex-column text-center'>
                <img src={imdb} style={{ height: '60px', alignSelf: 'center' }} alt='RottenTomatoes Icon' />
                <p>
                  Puntuacion de Imdb: <b>{movie.vote_average}/10</b>
                </p>
              </Col>
            </Row>

            {/* Fila que contiene una frase caracteristica sobre la pelicula */}
            <Row className='d-flex ' style={{ margin: '0px' }}>
              <Col xs={12} sm={12} lg={12} className='DP-informacion d-flex flex-column text-center'>
                <em>"{movie.tagline}"</em>
              </Col>
            </Row>

            {/* Fila que contiene la sinopsis de la pelicula */}
            <Row className='d-flex ' style={{ margin: '0px' }}>
              <Col xs={12} sm={11} lg={11} className='DP-informacion d-flex flex-column text-justify'>
                <h4>Sinopsis: </h4>
                <p style={{ textAlign: 'justify' }}>{movie.overview}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      {/* Div que contiene la llamada al componente que genera el carrusel de peliculas similares */}
      <div>
        <h2 style={{ margin: '8px', color: 'white' }}>Peliculas similares:</h2>
        <Related />
      </div>

      {/* Div que contiene el componente que genera las reseñas */}
      <div>
        {/* link que lleva a la pagina de reseñas Completas */}
        {/* No se alcanzo a Implementar esa pagina por lo que lleva a la pagina de error */}
        <Link style={{ textDecoration: 'none' }} to='*'>
          <h2 style={{ color: 'white', marginLeft: '10px' }}> Reseñas:</h2>
        </Link>

        <Row className='d-flex ' style={{ margin: '0px' }}>
          {[...Array(2)].map((_, index) => (
            <Col xs={12} sm={6} lg={6} key={index} className='DP-informacion d-flex flex-column mb-3'>
              <Reseña movieId={id} />
            </Col>
          ))}
        </Row>
      </div>

      {/* Código completo del Modal */}
      <Modal show={showTrailer} onHide={handleCloseTrailer} size='lg' centered>
        <Modal.Body>
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
            style={{
              width: '100%',
              height: '75vh',
            }}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
          ></iframe>
        </Modal.Body>
        <Modal.Footer className='align-items-center justify-content-center'>
          {/* Boton para cerrar el Modal (aunque tambien clickeando fuera se cierra) */}
          <Button variant='outline-dark' onClick={handleCloseTrailer}>
            Visto
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DetallePelicula;