import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Lock } from 'lucide-react';

const Login = () => {
  const { login } = useSite();
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!login(pass)) setError(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)', padding: '2rem' }}>
      <div className="glass-card" style={{ padding: '3rem', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ width: '60px', height: '60px', background: 'rgba(59,130,246,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>
          <Lock size={30} />
        </div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.5rem' }}>Acceso Restringido</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem' }}>Ingresa la contraseña maestra para administrar el sitio.</p>
        
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={pass} 
            onChange={(e) => { setPass(e.target.value); setError(false); }}
            style={{ width: '100%', padding: '14px', background: 'rgba(0,0,0,0.3)', border: `1px solid ${error ? '#ef4444' : 'var(--glass-border)'}`, color: 'white', borderRadius: '8px', outline: 'none' }} 
          />
          {error && <span style={{ color: '#ef4444', fontSize: '0.8rem', textAlign: 'left', marginTop: '-0.5rem' }}>Contraseña incorrecta</span>}
          <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', justifyContent: 'center' }}>
            Ingresar al Panel
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
