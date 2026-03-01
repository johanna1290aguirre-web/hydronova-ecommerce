import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar as BNavbar } from 'react-bootstrap';
import { FaHeartbeat, FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { usuario, setUsuario, getItemCount } = useCart();
  const navigate = useNavigate();
  const itemCount = getItemCount();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
    navigate('/login');
  };

  return (
    <BNavbar expand="lg" className="custom-navbar">
      <Container>
        <BNavbar.Brand as={Link} to="/">
          <FaHeartbeat style={{ color: '#E02B59', marginRight: '10px' }} />
          Ecommerce Saludable
        </BNavbar.Brand>
        <BNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/catalog">Catálogo</Nav.Link>
            
            {usuario ? (
              <>
                <span className="nav-link" style={{ color: '#FFD700' }}>
                  <FaUser /> {usuario.nombre}
                </span>
                <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }}>
                  <FaSignOutAlt /> Cerrar sesión
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">
                <FaUser /> Ingresar
              </Nav.Link>
            )}
            
            <Nav.Link as={Link} to="/cart" style={{ position: 'relative' }}>
              <FaShoppingCart />
              {itemCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-10px',
                  background: '#E02B59',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {itemCount}
                </span>
              )}
            </Nav.Link>
          </Nav>
        </BNavbar.Collapse>
      </Container>
    </BNavbar>
  );
};

export default Navbar;