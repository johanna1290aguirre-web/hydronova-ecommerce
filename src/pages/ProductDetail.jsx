import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProductById } from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const data = await getProductById(id);
        setProducto(data);
      } catch (error) {
        console.error('Error al cargar producto:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarProducto();
  }, [id]);

  if (loading) {
    return <Container className="text-center mt-5">Cargando producto...</Container>;
  }

  if (!producto) {
    return <Container className="text-center mt-5">Producto no encontrado</Container>;
  }

  return (
    <Container className="main-container">
      <Row>
        <Col md={6}>
          <div style={{
            background: 'linear-gradient(145deg, #1A1A1A 0%, #2D2D2D 100%)',
            borderRadius: '20px',
            padding: '3rem',
            textAlign: 'center',
            border: '1px solid rgba(224, 43, 89, 0.2)'
          }}>
            <span style={{ fontSize: '8rem' }}>🥗</span>
          </div>
        </Col>
        <Col md={6}>
          <div style={{
            background: 'linear-gradient(145deg, #1A1A1A 0%, #2D2D2D 100%)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(224, 43, 89, 0.2)'
          }}>
            <h1 style={{ color: '#fff', marginBottom: '1rem' }}>{producto.nombre}</h1>
            <p style={{ color: '#ccc', fontSize: '1.1rem', lineHeight: '1.6' }}>
              {producto.descripcion}
            </p>
            <div style={{
              color: '#FFD700',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              margin: '2rem 0'
            }}>
              ${Number(producto.precio).toLocaleString('es-CO')} COP
            </div>
            <button
              onClick={() => addToCart(producto)}
              style={{
                background: 'linear-gradient(135deg, #E02B59 0%, #C01A4A 100%)',
                color: 'white',
                border: 'none',
                padding: '1rem 3rem',
                borderRadius: '50px',
                fontSize: '1.2rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <FaShoppingCart /> Agregar al carrito
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;