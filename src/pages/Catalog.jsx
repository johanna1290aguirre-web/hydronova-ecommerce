import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { FaShoppingCart, FaEye } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { getProducts } from '../services/api';

const Catalog = () => {
  const { addToCart } = useCart();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await getProducts();
        setProductos(data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  const verProducto = (id) => {
    window.location.href = `/producto/${id}`;
  };

  if (loading) {
    return <Container className="text-center mt-5">Cargando productos...</Container>;
  }

  return (
    <Container className="main-container">
      <h1>Catálogo de Productos</h1>
      
      <div className="products-grid">
        {productos.map(producto => (
          <div key={producto.id} className="producto-card">
            <div className="card-title">{producto.nombre}</div>
            <div className="card-text">{producto.descripcion}</div>
            <div className="precio">
              ${Number(producto.precio).toLocaleString('es-CO')} COP
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button
                onClick={() => verProducto(producto.id)}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: '1px solid #FFD700',
                  color: '#FFD700',
                  padding: '0.8rem',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <FaEye /> Ver
              </button>
              
              <button
                onClick={() => addToCart(producto)}
                style={{
                  flex: 1,
                  background: '#E02B59',
                  border: 'none',
                  color: 'white',
                  padding: '0.8rem',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <FaShoppingCart /> Agregar
              </button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Catalog;