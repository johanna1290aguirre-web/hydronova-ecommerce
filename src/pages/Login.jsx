import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/api';

const Login = () => {
  const [esRegistro, setEsRegistro] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    if (esRegistro) {
      // Validar que las contraseñas coincidan
      if (formData.password !== formData.confirmPassword) {
        setMensaje('❌ Las contraseñas no coinciden');
        return;
      }

      try {
        const response = await registerUser({
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password
        });
        setMensaje('✅ Registro exitoso. Ya puedes iniciar sesión.');
        setTimeout(() => {
          setEsRegistro(false);
          setFormData({ nombre: '', email: '', password: '', confirmPassword: '' });
        }, 2000);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          setMensaje(`❌ ${error.response.data.error}`);
        } else {
          setMensaje('❌ Error al registrar. Intenta de nuevo.');
        }
      }
    } else {
      try {
        const response = await loginUser({
          email: formData.email,
          password: formData.password
        });
        localStorage.setItem('token', response.token);
        localStorage.setItem('usuario', JSON.stringify(response.usuario));
        setMensaje('✅ Login exitoso. Redirigiendo...');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } catch (error) {
        // ✅ Mensaje personalizado para credenciales incorrectas
        setMensaje('❌ Correo o contraseña incorrectos');
      }
    }
  };

  return (
    <Container>
      <div className="login-container">
        <h1 className="login-title">
          {esRegistro ? 'Crear Cuenta' : 'Iniciar Sesión'}
        </h1>
        
        {mensaje && (
          <div style={{
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: '10px',
            backgroundColor: mensaje.includes('✅') ? '#27ae60' : '#E02B59',
            color: 'white',
            textAlign: 'center'
          }}>
            {mensaje}
          </div>
        )}

        <Form onSubmit={handleSubmit} className="login-form">
          {esRegistro && (
            <Form.Group className="mb-3">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Tu nombre"
                required
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              required
            />
          </Form.Group>

          {esRegistro && (
            <Form.Group className="mb-3">
              <Form.Label>Confirmar contraseña</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="********"
                required
              />
            </Form.Group>
          )}

          <button type="submit" className="login-btn-custom">
            {esRegistro ? 'Registrarse' : 'Ingresar'}
          </button>
        </Form>

        <div className="login-footer">
          {esRegistro ? (
            <>
              ¿Ya tienes cuenta? <a href="#" onClick={(e) => { e.preventDefault(); setEsRegistro(false); }}>Inicia sesión aquí</a>
            </>
          ) : (
            <>
              ¿No tienes cuenta? <a href="#" onClick={(e) => { e.preventDefault(); setEsRegistro(true); }}>Regístrate aquí</a>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Login;