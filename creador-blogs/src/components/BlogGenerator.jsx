import React from 'react';
import '../bootstrap.css';
import myImage from '../resource/landing.png';

function BlogGenerator() {
  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
      <div className="text-center">
      <img src={myImage} alt="Descripción de la imagen" />
        <br/>
        <br/>
        <h1 className="display-4">Genera tu Landing Page</h1>
        <br />
        <h2>Integrantes</h2>
        <p>Carlos Mora</p>
        <p>Daniel Peña</p>
        <p>Diego Bautista</p>
        <p>Steven Espejo</p>
      </div>
    </div>
  );
}

export default BlogGenerator;
