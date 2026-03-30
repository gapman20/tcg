import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, ArrowLeft, Check } from 'lucide-react';
import { useUser } from '../context/UserContext';
import SEO from '../components/SEO';

const UserLogin = () => {
  const navigate = useNavigate();
  const { user, login, isLoggedIn } = useUser();
  const [formData, setFormData] = useState({ email: '', name: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Por favor ingresa un email válido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    login(formData.email, formData.name);
    setSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  if (success) {
    return (
      <div className="page">
        <div className="login-success">
          <div className="success-icon">
            <Check size={48} />
          </div>
          <h2>¡Sesión iniciada!</h2>
          <p>Redirigiendo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page login-page">
      <SEO 
        title="Iniciar Sesión" 
        description="Identifícate para ver tus pedidos y más"
      />
      
      <Link to="/" className="back-link">
        <ArrowLeft size={16} />
        Volver al inicio
      </Link>

      <div className="login-container">
        <div className="login-header">
          <div className="login-icon">
            <User size={32} />
          </div>
          <h1>Identifícate</h1>
          <p>Ingresa tu email para ver tus pedidos y recibir ofertas exclusivas</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">
              <Mail size={18} />
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              className={errors.email ? 'input-error' : ''}
              autoComplete="email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="name">
              <User size={18} />
              Nombre (opcional)
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="¿Cómo te llamas?"
              autoComplete="name"
            />
          </div>

          <button type="submit" className="btn-primary login-btn">
            Iniciar Sesión
          </button>
        </form>

        <div className="login-benefits">
          <h3>Al identificarte podrás:</h3>
          <ul>
            <li>
              <Check size={18} />
              Ver el estado de tus pedidos
            </li>
            <li>
              <Check size={18} />
              Recibir ofertas personalizadas
            </li>
            <li>
              <Check size={18} />
              Historial de compras
            </li>
          </ul>
        </div>

        <p className="login-note">
          No necesitas contraseña. Solo ingresa tu email para identificarte.
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
