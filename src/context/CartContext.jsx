import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { addToCartBackend, getCartFromBackend, removeFromCartBackend } from '../services/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [usuario, setUsuario] = useState(null);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  // Cargar carrito desde el backend cuando el usuario cambie
  useEffect(() => {
    const cargarCarrito = async () => {
      if (usuario && usuario.id) {
        try {
          const data = await getCartFromBackend(usuario.id);
          setCart(data);
        } catch (error) {
          console.error('Error al cargar carrito:', error);
        }
      }
    };
    cargarCarrito();
  }, [usuario]);

  const addToCart = async (product) => {
    if (!usuario) {
      toast.warning('Debes iniciar sesión para agregar productos');
      return;
    }

    try {
      await addToCartBackend(usuario.id, product.id, 1);
      
      // Actualizar carrito local
      const updatedCart = await getCartFromBackend(usuario.id);
      setCart(updatedCart);
      
      toast.success(`✅ ${product.nombre} agregado al carrito`);
    } catch (error) {
      toast.error('Error al agregar al carrito');
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await removeFromCartBackend(itemId);
      
      const updatedCart = await getCartFromBackend(usuario.id);
      setCart(updatedCart);
      
      toast.info('🗑️ Producto eliminado del carrito');
    } catch (error) {
      toast.error('Error al eliminar');
    }
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (Number(item.precio) * item.cantidad), 0);
  };

  const getItemCount = () => {
    return cart.reduce((count, item) => count + item.cantidad, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      getTotal,
      getItemCount,
      usuario,
      setUsuario
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
};