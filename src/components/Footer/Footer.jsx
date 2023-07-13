import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from '../../img/logo.png'
import {Link} from 'react-router-dom'
import Freddy from '../Presentation/Freddy';
import Guillermo from '../Presentation/Guillermo';
import Juan from '../Presentation/Juan';
import Jose from '../Presentation/Jose';


function Footer() {
  return (
    <Container fluid style={{backgroundColor:'#121212'}} className='p-5'>

      {/* Código de la primera fila que contiene el logo, el made by y las redes sociales */}
      <Row className='text-white'>

        {/* Código de la primera columna que tiene el logo */}
        <Col className='col d-flex align-items-center justify-content-center m-3'>
          <Link to='/'>
            <img src={logo} alt="Moview" width={180}/>
          </Link>
        </Col>

        {/* Código de la segunda columna que tiene el modal de cada uno */}
        <Col className='col text-center m-3'>
          <p className='h4'>Made by </p>
          <Freddy/>
          <Guillermo/>
          <Juan/>
          <Jose/>
        </Col>
        {/* Código de la tercera columna que tiene las redes sociales */}
        <Col className='list-unstyled text-center m-3'>
          <p className='h4'>Redes Sociales</p>
          {/* Como es una empresa ficticia que no tiene redes sociales reales, los hiperenlaces son por defecto */}
          <li className='col'>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer"><i class="bi bi-facebook m-2" style={{fontSize:'1.5rem', color:'white'}}></i></a >
            <a href="https://twitter.com/?lang=es" target="_blank" rel="noreferrer"><i class="bi bi-twitter m-2" style={{fontSize:'1.5rem', color:'white'}}></i></a >
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer"><i class="bi bi-instagram m-2" style={{fontSize:'1.5rem', color:'white'}}></i></a >
            <a href="https://www.youtube.com" target="_blank" rel="noreferrer"><i class="bi bi-youtube m-2" style={{fontSize:'1.5rem', color:'white'}}></i></a >
          </li>
        </Col>
      </Row>

        {/* Código de la segunda fila que tiene el Disclaimer */}
      <Row className='text-center'>
          <p className='mb-4 mt-5 h6' style={{color:'#C2C2C2'}}>            
          Descargo de responsabilidad: ningún contenido con derechos de autor está alojado en este servidor, todos los archivos están alojados en sitios web de terceros. Al utilizar nuestro sitio web, usted cumple y acepta nuestra T&C y nuestra Política de cookies.
          </p>
      </Row>
    </Container>
  );
}

export default Footer;