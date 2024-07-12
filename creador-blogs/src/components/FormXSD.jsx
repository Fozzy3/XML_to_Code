import React, { useState } from 'react';
import { create } from 'xmlbuilder2';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Modal, Button, Alert, Form } from 'react-bootstrap';
import { db_posts } from '../db/posts';

function FormXSD() {
  // States
  const [header, setHeader] = useState('');
  const [setRedesSociales] = useState(false);
  const [setIconoHeader] = useState('');
  const [setUrlHeader] = useState('');
  const [navbar, setNavbar] = useState('');
  const [imagenLogoHeader, setImagenLogoHeader] = useState('');
  const [urlImagenLogoHeader, setUrlImagenLogoHeader] = useState('');
  const [nombrePagesHeader, setNombrePagesHeader] = useState('');
  const [urlPagesHeader, setUrlPagesHeader] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);


  const [setTitulo] = useState('');
  const [setDescripcion] = useState('');
  const [setPosts] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', body: '', variant: '' });


  //rerp
  const [setSelectionPosts] = useState('');
  const [number, setNumber] = useState('1');
  const [selectionContacto, setSelectionContacto] = useState('');
  const [email, setEmail] = useState('');
  const [paginaWeb, setpaginaWeb] = useState('');

  const [PostDestacado, setPostDestacado] = useState(false);

  // Handlers
  const handleHeaderChange = e => setHeader(e.target.value === 'si');
  const handleNavbarChange = e => setNavbar(e.target.value === 'si');
  const handleImagenLogoHeader = e => setImagenLogoHeader(e.target.value);
  const handleUrlImagenLogoHeader = e => setUrlImagenLogoHeader(e.target.value);
  const handlenombrePagesHeader = e => setNombrePagesHeader(e.target.value);
  const handleurlPagesHeader = e => setUrlPagesHeader(e.target.value);
  const handlePostChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedPost = db_posts[selectedIndex];
    setSelectedPost(selectedPost);
  };

  const handlePostDestacadoChange = e => setPostDestacado(e.target.value === 'si');

  //handlers rerp
  const handleNumberPostsChange = (e) => { setNumber(e.target.value); };
  const handleContactoChange = (e) => {
    setSelectionContacto(e.target.value);
    setEmail('');
    setpaginaWeb('');
  };

  const handleEmailChange = (e) => { setEmail(e.target.value); };

  const handlepaginaWebChange = (e) => { setpaginaWeb(e.target.value); };


  //FOOTER ____________________________________________________________________________________
  // estado footer
  const [footer, setFooter] = useState({ active: false, url: { isActive: false, content: '' }, imagen: { isActive: false, content: '' }, texto: { content: '' } });
  // handlers footer
  const handleFooterUrlChange = e => setFooter({ ...footer, url: { ...footer.url, content: e.target.value } });
  const handleFooterImagenChange = e => setFooter({ ...footer, imagen: { ...footer.imagen, content: e.target.value } });
  const handleFooterTextoChange = e => setFooter({ ...footer, texto: { ...footer.texto, content: e.target.value } });
  const handleFooterActiveChange = e => setFooter({ ...footer, active: e.target.checked });
  const handleFooterUrlActiveChange = e => setFooter({ ...footer, url: { ...footer.url, isActive: e.target.checked } });
  const handleFooterImagenActiveChange = e => setFooter({ ...footer, imagen: { ...footer.imagen, isActive: e.target.checked } });
  //FOOTER ____________________________________________________________________________________

  //REDES SOCIALES ____________________________________________________________________________________
  // estado redes sociales
  const [redesSociales1, setRedesSociales1] = useState({
    active: false,
    facebook: { isActive: false, url: '', name: '001-facebook' },
    youtube: { isActive: false, url: '', name: '008-youtube' },
    instagram: { isActive: false, url: '', name: '011-instagram' },
    twitter: { isActive: false, url: '', name: '002-twitter' },
    whatsapp: { isActive: false, url: '', name: '003-whatsapp' },
  });
  // handlers redes sociales
  const handleRedesSocialesActiveChange = e => setRedesSociales1({ ...redesSociales1, active: e.target.value === 'si' });
  const handleRedesSocialesFacebookActiveChange = e => setRedesSociales1({ ...redesSociales1, facebook: { ...redesSociales1.facebook, isActive: e.target.checked } });
  const handleRedesSocialesYoutubeActiveChange = e => setRedesSociales1({ ...redesSociales1, youtube: { ...redesSociales1.youtube, isActive: e.target.checked } });
  const handleRedesSocialesTwitterActiveChange = e => setRedesSociales1({ ...redesSociales1, twitter: { ...redesSociales1.twitter, isActive: e.target.checked } });
  const handleRedesSocialesInstagramActiveChange = e => setRedesSociales1({ ...redesSociales1, instagram: { ...redesSociales1.instagram, isActive: e.target.checked } });
  const handleRedesSocialesWhatsappActiveChange = e => setRedesSociales1({ ...redesSociales1, whatsapp: { ...redesSociales1.whatsapp, isActive: e.target.checked } });
  const handleRedesSocialesFacebookUrlChange = e => setRedesSociales1({ ...redesSociales1, facebook: { ...redesSociales1.facebook, url: e.target.value } });
  const handleRedesSocialesYoutubeUrlChange = e => setRedesSociales1({ ...redesSociales1, youtube: { ...redesSociales1.youtube, url: e.target.value } });
  const handleRedesSocialesTwitterUrlChange = e => setRedesSociales1({ ...redesSociales1, twitter: { ...redesSociales1.twitter, url: e.target.value } });
  const handleRedesSocialesInstagramUrlChange = e => setRedesSociales1({ ...redesSociales1, instagram: { ...redesSociales1.instagram, url: e.target.value } });
  const handleRedesSocialesWhatsappUrlChange = e => setRedesSociales1({ ...redesSociales1, whatsapp: { ...redesSociales1.whatsapp, url: e.target.value } });
  //REDES SOCIALES ____________________________________________________________________________________


  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const xml = create({ version: '1.0', encoding: 'UTF-8' })
        .ele('blog')
        .att('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
        .att('xsi:noNamespaceSchemaLocation', 'schema.xsd')

      if (header) {
        const headerElement = xml.ele('header');
        if (redesSociales1.active) {
          const redesSocialesElement = headerElement.ele('redesSociales');
          if (redesSociales1.facebook.isActive) {
            const facebookElement = redesSocialesElement.ele('socialMedia');
            facebookElement.ele('icono').txt(redesSociales1.facebook.name);
            facebookElement.ele('url').txt(redesSociales1.facebook.url);
          }
          if (redesSociales1.instagram.isActive) {
            const instagramElement = redesSocialesElement.ele('socialMedia');
            instagramElement.ele('icono').txt(redesSociales1.instagram.name);
            instagramElement.ele('url').txt(redesSociales1.instagram.url);
          }
          if (redesSociales1.youtube.isActive) {
            const youtubeElement = redesSocialesElement.ele('socialMedia');
            youtubeElement.ele('icono').txt(redesSociales1.youtube.name);
            youtubeElement.ele('url').txt(redesSociales1.youtube.url);
          }
          if (redesSociales1.twitter.isActive) {
            const twitterElement = redesSocialesElement.ele('socialMedia');
            twitterElement.ele('icono').txt(redesSociales1.twitter.name);
            twitterElement.ele('url').txt(redesSociales1.twitter.url);
          }
          if (redesSociales1.whatsapp.isActive) {
            const whatsappElement = redesSocialesElement.ele('socialMedia');
            whatsappElement.ele('icono').txt(redesSociales1.whatsapp.name);
            whatsappElement.ele('url').txt(redesSociales1.whatsapp.url);
          }
        }
        if (navbar) {
          const navbarElement = headerElement.ele('navbar');
          const logoElement = navbarElement.ele('logo');
          logoElement.ele('imagen').txt(imagenLogoHeader);
          logoElement.ele('url').txt(urlImagenLogoHeader);
          const pagesElement = navbarElement.ele('pages');
          pagesElement.ele('nombre').txt(nombrePagesHeader);
          pagesElement.ele('url').txt(urlPagesHeader);
        }
      }

      const mainElement = xml.ele('main');
      if (PostDestacado) {
        const blogDestacadoElement = mainElement.ele('blogDestacado');
        if (selectedPost != null) {
          blogDestacadoElement.ele('imagen').txt(selectedPost.imagen);
          blogDestacadoElement.ele('titulo').txt(selectedPost.titulo);
          blogDestacadoElement.ele('descripcion').txt(selectedPost.descripcion);
          blogDestacadoElement.ele('url').txt(selectedPost.url)
        } else {
          throw new Error("No se ha seleccionado un post destacado.");
        }
      }
      const todosLosBlogsElement = mainElement.ele('todosLosBlogs');
      for (var i = 0; i < number; i++) {
        const postsElement = todosLosBlogsElement.ele('posts');
        postsElement.ele('imagen').txt(db_posts[i].imagen);
        postsElement.ele('titulo').txt(db_posts[i].titulo);
        postsElement.ele('descripcion').txt(db_posts[i].descripcion);
        postsElement.ele('url').txt(db_posts[i].url);
      }
      if (selectionContacto === 'si') {
        const contactoElement = mainElement.ele('contacto');
        contactoElement.ele('correo').txt(email);
        contactoElement.ele('paginaWeb').txt(paginaWeb);
      }
      if (footer.active) {
        const footerElement = xml.ele('footer');
        if (footer.url.isActive) {
          footerElement.ele('url').txt(footer.url.content);
        }
        if (footer.imagen.isActive) {
          footerElement.ele('imagen').txt(footer.imagen.content);
        }
        footerElement.ele('texto').txt(footer.texto.content);
      }

      const xmlString = xml.end({ prettyPrint: true });

      // Enviar el XML al backend para validación

      const formData = new FormData();
      formData.append('file', new Blob([xmlString], { type: 'text/xml' }), 'file.xml');
      console.log(xmlString)

      try {
        await axios.post('http://localhost:8000/validate_xml', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(res => {
            // console.log("DATA: ", res.data)
            switch (res.data.status) {
              case 200:  // Todo está bien
                setModalContent({
                  title: res.data.message,
                  body: <a href={res.data.data}>Descargar</a>,
                  variant: 'success'
                });
                break;
              case 400:  // Bad Request
                setModalContent({
                  title: 'Error',
                  body: res.data.message,
                  variant: 'danger'
                });
                break;
              default:
                setModalContent({
                  title: 'Error',
                  body: 'Ha ocurrido un error desconocido.',
                  variant: 'danger'
                });
            }
            setShowModal(true);
          })
          .catch(err => {
            setModalContent({
              title: 'Error',
              body: err.message,
              variant: 'danger'
            });
            setShowModal(true);
          });
      } catch (error) {
        console.error("Se capturó una excepción:", error.message);
      }

    } catch (error) {
      console.error("Se capturó una excepción:", error.message);
      // alert("REVISA EL FORMULARIO: " + error.message);
    }
  };

  // Component render

  // AQUI PARA ABAJO ESTA EL HTML ES DONDE SE TIENE QUE EDITAR. bueno
  return (
        <div className='container my-5 p-4 bg-light rounded'>
    <div className="row">
        <div className="col-lg-6">
            <form className='formulario' onSubmit={handleSubmit}>
                <h2 className="mb-4 text-center text-primary">Crear Nuevo Blog</h2>

                {/* Configuración del Encabezado */}
                <div className="card mb-4 border-primary">
                    <div className="card-header bg-primary text-white">Configuración del Encabezado</div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="header" className="form-label">Header:</label>
                            <select id="header" onChange={handleHeaderChange} className="form-control">
                                <option value="no">No</option>
                                <option value="si">Sí</option>
                            </select>
                        </div>

                        {header && (
                            <>
                                {/* Redes Sociales */}
                                <div className="mb-3">
                                    <label htmlFor="redesSociales1" className="form-label">Redes Sociales:</label>
                                    <select id="redesSociales1" onChange={handleRedesSocialesActiveChange} className="form-control">
                                        <option value="no">No</option>
                                        <option value="si">Sí</option>
                                    </select>

                                    {redesSociales1.active && (
                                        <div className="mt-3">
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" type="checkbox" id="redesSociales1FacebookSwitch" checked={redesSociales1.facebook.isActive} onChange={handleRedesSocialesFacebookActiveChange} />
                                                <label className="form-check-label" htmlFor="redesSociales1FacebookSwitch">Facebook:</label>
                                                {redesSociales1.facebook.isActive && (
                                                    <input type="text" placeholder="URL Facebook" className="form-control mt-2" onChange={handleRedesSocialesFacebookUrlChange} value={redesSociales1.facebook.url} />
                                                )}
                                            </div>
                                            
                                            <div className="form-check form-switch mt-3">
                                                <input className="form-check-input" type="checkbox" id="redesSociales1InstagramSwitch" checked={redesSociales1.instagram.isActive} onChange={handleRedesSocialesInstagramActiveChange} />
                                                <label className="form-check-label" htmlFor="redesSociales1InstagramSwitch">Instagram:</label>
                                                {redesSociales1.instagram.isActive && (
                                                    <input type="text" placeholder="URL Instagram" className="form-control mt-2" onChange={handleRedesSocialesInstagramUrlChange} value={redesSociales1.instagram.url} />
                                                )}
                                            </div>
                                            
                                            <div className="form-check form-switch mt-3">
                                                <input className="form-check-input" type="checkbox" id="redesSociales1TwitterSwitch" checked={redesSociales1.twitter.isActive} onChange={handleRedesSocialesTwitterActiveChange} />
                                                <label className="form-check-label" htmlFor="redesSociales1TwitterSwitch">Twitter:</label>
                                                {redesSociales1.twitter.isActive && (
                                                    <input type="text" placeholder="URL Twitter" className="form-control mt-2" onChange={handleRedesSocialesTwitterUrlChange} value={redesSociales1.twitter.url} />
                                                )}
                                            </div>
                                            
                                            <div className="form-check form-switch mt-3">
                                                <input className="form-check-input" type="checkbox" id="redesSociales1YoutubeSwitch" checked={redesSociales1.youtube.isActive} onChange={handleRedesSocialesYoutubeActiveChange} />
                                                <label className="form-check-label" htmlFor="redesSociales1YoutubeSwitch">Youtube:</label>
                                                {redesSociales1.youtube.isActive && (
                                                    <input type="text" placeholder="URL Youtube" className="form-control mt-2" onChange={handleRedesSocialesYoutubeUrlChange} value={redesSociales1.youtube.url} />
                                                )}
                                            </div>
                                            
                                            <div className="form-check form-switch mt-3">
                                                <input className="form-check-input" type="checkbox" id="redesSociales1WhatsappSwitch" checked={redesSociales1.whatsapp.isActive} onChange={handleRedesSocialesWhatsappActiveChange} />
                                                <label className="form-check-label" htmlFor="redesSociales1WhatsappSwitch">Whatsapp:</label>
                                                {redesSociales1.whatsapp.isActive && (
                                                    <input type="text" placeholder="URL Whatsapp" className="form-control mt-2" onChange={handleRedesSocialesWhatsappUrlChange} value={redesSociales1.whatsapp.url} />
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Navbar */}
                                <div className="mb-3">
                                    <label htmlFor="navbar" className="form-label">Navbar:</label>
                                    <select id="navbar" onChange={handleNavbarChange} className="form-control">
                                        <option value="no">No</option>
                                        <option value="si">Sí</option>
                                    </select>

                                    {navbar && (
                                        <div className="mt-3 card border-info">
                                            <div className="card-body">
                                                <div className="mb-3">
                                                    <label htmlFor="logo" className="form-label">Logo</label>
                                                    <input type="text" placeholder="URL Imagen Logo" className="form-control" onChange={handleImagenLogoHeader} />
                                                </div>
                                                
                                                <div className="mb-3">
                                                    <label htmlFor="Pages" className="form-label">Páginas</label>
                                                    <input type="text" placeholder="Nombre Página" className="form-control" onChange={handlenombrePagesHeader} />
                                                    <input type="text" placeholder="URL Página" className="form-control mt-2" onChange={handleurlPagesHeader} />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Agregar Posts */}
                <div className="card mb-4 border-secondary">
                    <div className="card-header bg-secondary text-white">Agregar Posts</div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">Número de Posts:</label>
                            <select value={number} onChange={handleNumberPostsChange} className="form-control">
                                {[...Array(10)].map((_, index) => (
                                    <option key={index} value={index + 1}>{index + 1}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Botón de Enviar */}
                <button type="submit" className="btn btn-primary btn-lg w-100">Enviar</button>
            </form>
        </div>

        <div className="col-lg-6">
            {/* Post Destacado */}
            <div className="card mb-4 border-warning">
                <div className="card-header bg-warning text-white">Post Destacado</div>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="PostDestacado" className="form-label">Post Destacado:</label>
                        <select id="PostDestacado" onChange={handlePostDestacadoChange} className="form-control">
                            <option value="no">No</option>
                            <option value="si">Sí</option>
                        </select>

                        {PostDestacado && (
                            <>
                                <select className="form-control mt-2" onChange={handlePostChange}>
                                    {db_posts.map((post, index) => (
                                        <option key={index} value={post.url}>{post.titulo}</option>
                                    ))}
                                </select>
                                {selectedPost && (
                                    <div className="mt-3">
                                        <h3>{selectedPost.titulo}</h3>
                                        <p>{selectedPost.descripcion}</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Datos de Contacto */}
            <div className="card mb-4 border-success">
                <div className="card-header bg-success text-white">Datos de Contacto</div>
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">¿Desea agregar datos de contacto?</label>
                        <select value={selectionContacto} onChange={handleContactoChange} className="form-control">
                            <option value="no">No</option>
                            <option value="si">Sí</option>
                        </select>

                        {selectionContacto === 'si' && (
                            <div className="mt-3">
                                <label className="form-label">Correo Electrónico:</label>
                                <input type="text" value={email} onChange={handleEmailChange} className="form-control" />
                                <label className="form-label mt-2">Página Web:</label>
                                <input type="text" value={paginaWeb} onChange={handlepaginaWebChange} className="form-control" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Pie de Página */}
            <div className="card mb-4 border-dark">
                <div className="card-header bg-dark text-white">Pie de Página</div>
                <div className="card-body">
                    <div className="form-check form-switch mb-3">
                        <input className="form-check-input" type="checkbox" id="footerSwitch" checked={footer.active} onChange={handleFooterActiveChange} />
                        <label className="form-check-label" htmlFor="footerSwitch">FOOTER</label>
                    </div>
                    {footer.active && (
                        <>
                            <div className="mb-3">
                                <label className="form-label">Texto del Pie de Página:</label>
                                <input type="text" placeholder="Texto" className="form-control" onChange={handleFooterTextoChange} value={footer.texto.content} />
                            </div>
                            <div className="form-check form-switch mb-3">
                                <input className="form-check-input" type="checkbox" id="footerUrlSwitch" checked={footer.url.isActive} onChange={handleFooterUrlActiveChange} />
                                <label className="form-check-label" htmlFor="footerUrlSwitch">URL del Pie de Página:</label>
                                {footer.url.isActive && (
                                    <input type="text" placeholder="URL de Redirección" className="form-control" onChange={handleFooterUrlChange} value={footer.url.content} />
                                )}
                            </div>
                            <div className="form-check form-switch mb-3">
                                <input className="form-check-input" type="checkbox" id="footerImagenSwitch" checked={footer.imagen.isActive} onChange={handleFooterImagenActiveChange} />
                                <label className="form-check-label" htmlFor="footerImagenSwitch">Imagen del Pie de Página:</label>
                                {footer.imagen.isActive && (
                                    <input type="text" placeholder="URL de la Imagen" className="form-control" onChange={handleFooterImagenChange} value={footer.imagen.content} />
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    </div>

    {/* Modal */}
    <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="modal-xl">
        <Modal.Header closeButton>
            <Modal.Title>{modalContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Alert variant={modalContent.variant}>
                {modalContent.body}
            </Alert>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cerrar
            </Button>
        </Modal.Footer>
    </Modal>
</div>



    );
}

export default FormXSD;
