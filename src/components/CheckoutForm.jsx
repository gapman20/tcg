import React from 'react';

const inputSt = {
  width: '100%', padding: '12px 14px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid var(--glass-border)',
  borderRadius: '8px', color: 'var(--text-primary)',
  fontFamily: 'var(--font-body)', fontSize: '0.95rem',
  outline: 'none', resize: 'vertical',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

const focus = e => { e.target.style.borderColor = 'var(--accent-gold)'; e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.15)'; };
const blur = e => { e.target.style.borderColor = 'var(--glass-border)'; e.target.style.boxShadow = 'none'; };

const labelStyle = {
  display: 'block',
  fontSize: '0.78rem',
  fontWeight: '700',
  color: 'var(--text-secondary)',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  marginBottom: '0.5rem'
};

const CheckoutForm = ({ formData, errors, onChange, onSubmit, loading }) => {
  return (
    <form onSubmit={onSubmit} className="glass-card checkout-form" style={{ padding: '2rem' }}>
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>Información de Envío</h3>
      <div className="form-grid">
        <div className="form-grid-full">
          <label style={labelStyle}>Nombre completo</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={onChange} 
            placeholder="Tu nombre completo"
            style={inputSt}
            onFocus={focus}
            onBlur={blur}
          />
          {errors.name && <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{errors.name}</span>}
        </div>
        <div className="form-grid-full">
          <label style={labelStyle}>Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={onChange} 
            placeholder="tu@email.com"
            style={inputSt}
            onFocus={focus}
            onBlur={blur}
          />
          {errors.email && <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{errors.email}</span>}
        </div>
        <div className="form-grid-full">
          <label style={labelStyle}>Dirección</label>
          <input 
            type="text" 
            name="street" 
            value={formData.street} 
            onChange={onChange} 
            placeholder="Calle y número"
            style={inputSt}
            onFocus={focus}
            onBlur={blur}
          />
          {errors.street && <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{errors.street}</span>}
        </div>
        <div>
          <label style={labelStyle}>Ciudad</label>
          <input 
            type="text" 
            name="city" 
            value={formData.city} 
            onChange={onChange} 
            placeholder="Ciudad"
            style={inputSt}
            onFocus={focus}
            onBlur={blur}
          />
          {errors.city && <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{errors.city}</span>}
        </div>
        <div>
          <label style={labelStyle}>Estado</label>
          <input 
            type="text" 
            name="state" 
            value={formData.state} 
            onChange={onChange} 
            placeholder="Estado"
            style={inputSt}
            onFocus={focus}
            onBlur={blur}
          />
          {errors.state && <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{errors.state}</span>}
        </div>
        <div>
          <label style={labelStyle}>CP</label>
          <input 
            type="text" 
            name="zip" 
            value={formData.zip} 
            onChange={onChange} 
            placeholder="Código postal"
            style={inputSt}
            onFocus={focus}
            onBlur={blur}
          />
          {errors.zip && <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{errors.zip}</span>}
        </div>
        <div className="form-grid-full">
          <label style={labelStyle}>País</label>
          <select 
            name="country" 
            value={formData.country} 
            onChange={onChange} 
            style={inputSt}
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
