import React from 'react';

const CheckoutForm = ({ formData, errors, onChange, onSubmit, loading }) => {
  return (
    <form onSubmit={onSubmit} className="glass-card checkout-form">
      <h3 style={{ marginBottom: '1.5rem' }}>Información de Envío</h3>
      <div className="form-grid">
        <div className="form-grid-full">
          <label className="form-label">Nombre completo</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={onChange} 
            className={`form-input ${errors.name ? 'error' : ''}`}
            placeholder="Tu nombre completo"
          />
          {errors.name && <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.name}</span>}
        </div>
        <div className="form-grid-full">
          <label className="form-label">Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={onChange} 
            className={`form-input ${errors.email ? 'error' : ''}`}
            placeholder="tu@email.com"
          />
          {errors.email && <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.email}</span>}
        </div>
        <div className="form-grid-full">
          <label className="form-label">Dirección</label>
          <input 
            type="text" 
            name="street" 
            value={formData.street} 
            onChange={onChange} 
            className={`form-input ${errors.street ? 'error' : ''}`}
            placeholder="Calle y número"
          />
          {errors.street && <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.street}</span>}
        </div>
        <div>
          <label className="form-label">Ciudad</label>
          <input 
            type="text" 
            name="city" 
            value={formData.city} 
            onChange={onChange} 
            className={`form-input ${errors.city ? 'error' : ''}`}
            placeholder="Ciudad"
          />
          {errors.city && <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.city}</span>}
        </div>
        <div>
          <label className="form-label">Estado</label>
          <input 
            type="text" 
            name="state" 
            value={formData.state} 
            onChange={onChange} 
            className={`form-input ${errors.state ? 'error' : ''}`}
            placeholder="Estado"
          />
          {errors.state && <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.state}</span>}
        </div>
        <div>
          <label className="form-label">CP</label>
          <input 
            type="text" 
            name="zip" 
            value={formData.zip} 
            onChange={onChange} 
            className={`form-input ${errors.zip ? 'error' : ''}`}
            placeholder="Código postal"
          />
          {errors.zip && <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.zip}</span>}
        </div>
        <div className="form-grid-full">
          <label className="form-label">País</label>
          <select 
            name="country" 
            value={formData.country} 
            onChange={onChange} 
            className="form-input"
          >
            <option value="MX">México</option>
            <option value="US">Estados Unidos</option>
          </select>
        </div>
      </div>
      <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', marginTop: '2rem' }}>
        {loading ? 'Procesando...' : 'Completar Pedido'}
      </button>
    </form>
  );
};

export default CheckoutForm;
